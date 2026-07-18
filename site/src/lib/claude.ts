import { generateText, tool, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { getLandingPageProduct } from "@/lib/landingPage";
import { getCheckoutItem } from "@/lib/checkout";
import { isValidBundlePair, CROSS_SELL_DISCOUNT_PERCENT } from "@/lib/crossSell";
import { saveLead } from "@/lib/leadStore";

// Thin wrapper around the Anthropic call, mirroring lib/cardcom.ts's
// {ok, ...} discriminated-result convention and its CHATBOT_ENABLED /
// missing-key bypass checks (same shape as CARDCOM_DRY_RUN). Kept isolated
// here so the model id / provider / token cap can change in one place
// without touching the route handler or the widget.
export type ChatMessage = { role: "user" | "assistant"; content: string };

export type MediaBlock = { kind: "image" | "video"; url: string; alt: string };

export type CheckoutLink = {
  url: string;
  productName: string;
  bundleProductName?: string;
  discountPercent?: number;
};

export type ChatResult =
  | { ok: true; reply: string; media?: MediaBlock[]; checkoutLink?: CheckoutLink }
  | { ok: false; error: string };

// See the `claude-api` skill for current model ids before changing this —
// verified against the live model list at implementation time (2026-07-13).
const MODEL_ID = "claude-sonnet-5";
// Raised from 400 (2026-07-17) to leave headroom for tool-call round trips
// added by the sales-agent upgrade — the visible reply itself stays short
// per the system prompt's style rule, this cap is about the full step loop.
// Bumped again same day: a live multi-product catalog comparison (several
// items + a bundle mention) got cut off mid-sentence at 600 — verified via
// a real production request, not a guess.
const MAX_OUTPUT_TOKENS = 900;

export async function askProductChatbot({
  systemPrompt,
  messages,
}: {
  systemPrompt: string;
  messages: ChatMessage[];
}): Promise<ChatResult> {
  if (process.env.CHATBOT_ENABLED === "false") {
    return { ok: false, error: "chatbot disabled" };
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ok: false, error: "chatbot not configured" };
  }

  // Tool executions fill these closures instead of returning free text to
  // the model to relay verbatim — the widget renders media/checkoutLink as
  // real UI (image/video/CTA button), sourced only from getLandingPageProduct/
  // getCheckoutItem lookups, never from anything the model could invent.
  const media: MediaBlock[] = [];
  let checkoutLink: CheckoutLink | undefined;

  const tools = {
    getProductDetails: tool({
      description:
        "קבלת מפרט/יתרונות/למי-זה-מתאים מלאים על מוצר אחר בקטלוג (לא המוצר שעליו כבר יש לך עובדות מלאות בפרומפט). השתמש בזה כדי להשוות למוצר הנוכחי — לעולם אל תמציא פרטים על מוצר אחר בלי לקרוא לכלי הזה קודם.",
      inputSchema: z.object({
        slug: z.string().describe("ה-slug המדויק של המוצר, מתוך רשימת הקטלוג שבפרומפט"),
      }),
      execute: async ({ slug }: { slug: string }) => {
        const product = getLandingPageProduct(slug);
        if (!product) return { error: "מוצר לא נמצא בקטלוג" };
        return {
          name: product.name,
          category: product.category,
          tagline: product.tagline,
          price: product.pricing.ourPrice,
          highlights: product.highlights,
          bestFor: product.bestFor ?? null,
        };
      },
    }),
    showProductMedia: tool({
      description:
        "הצגת תמונה או וידאו אמיתיים של מוצר (הנוכחי או אחר שהושווה) בתוך הצ'אט. השתמש כשזה יעזור ללקוח לדמיין את המוצר — לא רק כשנשאל במפורש.",
      inputSchema: z.object({
        slug: z.string(),
        kind: z.enum(["image", "video"]),
      }),
      execute: async ({ slug, kind }: { slug: string; kind: "image" | "video" }) => {
        const product = getLandingPageProduct(slug);
        if (!product) return { error: "מוצר לא נמצא בקטלוג" };
        if (kind === "image") {
          const url = product.media.images[0];
          if (!url) return { error: "אין תמונה זמינה למוצר הזה" };
          media.push({ kind: "image", url, alt: product.name });
          return { ok: true };
        }
        const video = product.media.video ?? product.demoVideo;
        if (!video) return { error: "אין וידאו זמין למוצר הזה" };
        media.push({ kind: "video", url: video.src, alt: product.name });
        return { ok: true };
      },
    }),
    offerCheckout: tool({
      description:
        "יצירת קישור אמיתי לעמוד התשלום, כשהלקוח מראה סימני מוכנות לרכישה. אם עולה רעיון לרכוש שני מוצרים יחד, אפשר לצרף bundleSlug — זה מפעיל בפועל הנחה של 5% על המוצר הנוסף בעמוד התשלום (לא רק אמירה בשיחה).",
      inputSchema: z.object({
        slug: z.string().describe("המוצר העיקרי לרכישה (בד״כ המוצר הנוכחי)"),
        bundleSlug: z
          .string()
          .optional()
          .describe("מוצר נוסף לצירוף ב-5% הנחה, אם רלוונטי לשיחה"),
      }),
      execute: async ({ slug, bundleSlug }: { slug: string; bundleSlug?: string }) => {
        const item = getCheckoutItem(slug);
        if (!item) return { error: "מוצר לא נמצא בקטלוג" };
        if (bundleSlug && !isValidBundlePair(slug, bundleSlug)) {
          return { error: "צירוף המוצרים הזה לא תקין" };
        }
        const bundleItem = bundleSlug ? getCheckoutItem(bundleSlug) : undefined;
        checkoutLink = {
          url: bundleSlug ? `/checkout/${slug}?addon=${bundleSlug}` : `/checkout/${slug}`,
          productName: item.name,
          bundleProductName: bundleItem?.name,
          discountPercent: bundleItem ? CROSS_SELL_DISCOUNT_PERCENT : undefined,
        };
        return { ok: true, url: checkoutLink.url };
      },
    }),
    submitLead: tool({
      description:
        "שמירת פרטי ליד (שם, טלפון, הקשר) כשהלקוח לא סוגר רכישה בשיחה אבל מוכן להשאיר פרטים לחזרה של נציג. קרא לזה רק אחרי שכבר קיבלת בפועל שם וטלפון ואת ההקשר הרלוונטי משיחה טבעית — לא לפני. אם הכלי מחזיר שגיאת טלפון, בקש מהלקוח מספר תקין ונסה שוב — אל תאשר ללקוח שהפרטים נשמרו לפני שהכלי מחזיר הצלחה בפועל.",
      inputSchema: z.object({
        slug: z.string(),
        name: z.string(),
        phone: z.string(),
        context: z
          .string()
          .describe(
            "לפי קטגוריית המוצר: איפה רוצים להתקין (מנעול), לאיזה צורך צריך את הכספת (כספת), או למה רוצים ללמוד (קורס) — בדיוק כפי שהלקוח ניסח, לא מומצא",
          ),
      }),
      execute: async ({
        slug,
        name,
        phone,
        context,
      }: {
        slug: string;
        name: string;
        phone: string;
        context: string;
      }) => {
        const product = getLandingPageProduct(slug);
        if (!product) return { error: "מוצר לא נמצא בקטלוג" };
        const result = saveLead({
          name,
          phone,
          area: product.category === "lock" ? context : undefined,
          need: product.category !== "lock" ? context : undefined,
          source: `chat-${slug}`,
        });
        if (!result.ok) {
          return {
            error:
              result.error === "invalid phone"
                ? "מספר הטלפון לא תקין — בקש מהלקוח לכתוב אותו שוב"
                : "שמירת הפרטים נכשלה",
          };
        }
        return { ok: true };
      },
    }),
  };

  try {
    const result = await generateText({
      model: anthropic(MODEL_ID),
      instructions: systemPrompt,
      messages,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      tools,
      // Raised from 4 to 6 (2026-07-17) — a single turn can now plausibly
      // chain more tool calls (e.g. showProductMedia + submitLead) before
      // the final text response.
      stopWhen: stepCountIs(6),
    });
    return {
      ok: true,
      reply: result.text,
      media: media.length > 0 ? media : undefined,
      checkoutLink,
    };
  } catch (err) {
    console.error("[chat] anthropic request failed", err);
    return { ok: false, error: "chat_unavailable" };
  }
}
