// Home/general safe catalog (documents, cash, jewelry — not gun safes, see
// lib/safes.ts for that separate, legally-sensitive category). **Updated
// 2026-07-10 after legal review with counsel + Techom:** do NOT describe
// המוקד as an "authorized distributor/marketer" of Techom. Approved framing:
// Techom manufactures (Israeli development — Techom's, not המוקד's own),
// המוקד is an external company that selects + installs after thorough
// market research, with direct warranty/service. "פיתוח ישראלי" wording IS
// allowed when attributed to Techom — see CLAUDE.md and
// strategy-agent/positioning.md.
//
// Sourced 2026-07-09 from Techom's own product pages:
// - IB250:   https://www.techom-safes.co.il/product/ib250/
// - SC250:   https://www.techom-safes.co.il/product/sc250/
// - BSA250:  https://www.techom-safes.co.il/product/bsa250/
// - B600:    https://www.techom-safes.co.il/product/כספת-b600/
// - Model 3: https://www.techom-safes.co.il/product/model-3/
//
// Per explicit user instruction (2026-07-09): prices stay exactly as shown
// on Techom's own site — no המוקד markup/discount decision needed here,
// unlike the gun safes (lib/safes.ts) where the user set custom pricing.
//
// IB250/SC250/BSA250 share near-identical bodies (25×35×20cm, 6.5kg, 1mm
// body / 3mm door steel, 2 heavy bolts, 4 anchors, 1 built-in drawer, 4 AA
// batteries with low-battery alert) — verified independently on each
// product page, not assumed by analogy. The real differences are the
// opening mechanism and price:
// - IB250:  digital code + mechanical key backup, illuminated keypad. Cheapest.
// - SC250:  digital code + mechanical key backup, built-in LCD status screen.
// - BSA250: fingerprint + digital code + mechanical key backup. Priciest of
//           the three, also marketed as lightweight/easy to relocate.
// No source contradictions found on any of these three pages (unlike Model F
// in lib/safes.ts) — all battery mentions are consistent with each model's
// own stated opening mechanism.
//
// B600 and Model 3 are a different, higher tier — added 2026-07-09, prices
// again left exactly as shown on Techom's site:
// - B600:    business/office-grade heavy safe (60×40×36cm, 64kg, 4mm body,
//            10mm door, 5 bolts, 2×14mm concrete anchors). Fingerprint +
//            personal code + mechanical key backup, 4 AA batteries.
// - Model 3: designer/luxury safe — full leather exterior coating, 4 color
//            options (white/gray/orange/red), 2 internal drawers. Runs on a
//            built-in RECHARGEABLE LITHIUM battery, not replaceable AA cells
//            like every other safe in this file — call this out explicitly
//            in copy, don't let it blend into the generic "batteryPowered"
//            flag. Body/door thickness, bolt count, and anchoring are NOT
//            stated anywhere on Techom's page for this model — do not
//            invent them; the spec table below omits those rows rather than
//            guessing.
// Model 3's mechanical-key-backup claim required a third, narrowly-scoped
// fetch to confirm — the first two fetches of the same page gave
// contradictory answers (one said no key backup existed, one said it did).
// The spec table's exact "פתיחה" row was isolated and quoted verbatim on
// the third pass ("טביעת אצבע, קוד, מפתחות מכניים"), which settled it. If
// this is ever in doubt again, re-verify against that exact spec row, not
// the marketing prose.

import type { LockColor } from "@/lib/locks";

export type HomeSafeSpec = { label: string; value: string };

export type HomeSafeFeatures = {
  fingerprint: boolean;
  digitalCode: boolean;
  mechanicalKey: boolean;
  lcdScreen: boolean;
  batteryPowered: boolean;
};

export type HomeSafeProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  manufacturerPrice: number; // Techom's own listed "before" price
  ourPrice: number; // the safe itself, before shipping/installation
  shippingPrice: number;
  installationPrice: number; // professional installation by המוקד
  highlights: string[];
  specs: HomeSafeSpec[];
  features: HomeSafeFeatures;
  colors?: LockColor[]; // only Model 3 has real color variants so far
  // Real product photography, added 2026-07-10. Same pattern as
  // GunSafeProduct.images in lib/safes.ts: an ordered gallery (images[0] is
  // the hero), not a per-color map — home safes with real photos so far
  // (IB250/SC250/BSA250/B600) have a single finish, no door-mounted
  // "installation" concept. Rendered via SafeImageGallery.tsx (shared with
  // gun safes, not lock-specific).
  images?: string[];
  // AI-generated demo video slot, added later per product — see
  // lib/landingPage.ts. Absent today for all 4 home safes.
  video?: { src: string; poster: string };
  bestFor?: string;
  problemStatement: { title: string; body: string };
  faq: { question: string; answer: string }[];
};

export const homeSafeProducts: HomeSafeProduct[] = [
  {
    slug: "ib250",
    name: "כספת IB250",
    tagline: "כספת בית קלאסית — קוד דיגיטלי בלוח מקשים מואר, ומפתח מכני לגיבוי",
    description:
      "כספת IB250 שומרת על דרכונים, מסמכים, מזומן ותכשיטים בלי דרמות — קוד דיגיטלי בלוח מקשים מואר לגישה נוחה גם בחושך, ומפתח מכני כגיבוי מלא. גוף פלדה בעובי 1 מ״מ ודלת בעובי 3 מ״מ, עם 2 בריחים עבים ומגירה פנימית מובנית לארגון התכולה. מתחברת לקיר או לרצפה באמצעות 4 עוגנים.",
    manufacturerPrice: 490,
    ourPrice: 390,
    shippingPrice: 42,
    installationPrice: 350,
    images: [
      "/images/safes/home/ib250/hero.jpg",
      "/images/safes/home/ib250/angle-2.jpg",
      "/images/safes/home/ib250/angle-3.jpg",
      "/images/safes/home/ib250/angle-4.jpg",
      "/images/safes/home/ib250/angle-5.jpg",
      "/images/safes/home/ib250/angle-6.jpg",
      "/images/safes/home/ib250/detail-1.jpg",
      "/images/safes/home/ib250/detail-2.jpg",
    ],
    highlights: [
      "קוד דיגיטלי בלוח מקשים מואר + מפתח מכני לגיבוי מלא",
      "מגירה פנימית מובנית לארגון דרכונים, מסמכים ותכשיטים",
      "גוף פלדה 1 מ״מ ודלת פלדה 3 מ״מ, עם 2 בריחים עבים",
      "4 עוגנים לחיבור בטוח לקיר או לרצפה",
      "התראה על סוללה חלשה — לא מגלים שהסוללה נגמרה ברגע הלא נכון",
      "המחיר הנגיש ביותר בקטלוג כספות הבית שלנו",
    ],
    specs: [
      { label: "מידות חיצוניות", value: "25 × 35 × 20 ס״מ" },
      { label: "משקל", value: "6.5 ק״ג" },
      { label: "פתיחה", value: "קוד דיגיטלי (לוח מקשים מואר) + מפתח מכני" },
      { label: "מקור הפעלה", value: "4 סוללות AA, עם התראת סוללה חלשה" },
      { label: "עובי גוף", value: "1 מ״מ פלדה" },
      { label: "עובי דלת", value: "3 מ״מ פלדה" },
      { label: "בריחים", value: "2 בריחים עבים" },
      { label: "עיגון", value: "4 עוגנים לקיר או לרצפה" },
      { label: "אחסון פנימי", value: "מגירה מובנית אחת" },
    ],
    features: {
      fingerprint: false,
      digitalCode: true,
      mechanicalKey: true,
      lcdScreen: false,
      batteryPowered: true,
    },
    bestFor:
      "IB250 היא נקודת הכניסה שלנו לכספות בית — קוד דיגיטלי ומפתח מכני, במחיר הנגיש ביותר בקטלוג. אם חשוב לכם לראות את מצב הכספת על מסך — SC250 מוסיפה תצוגת LCD. אם אתם רוצים גם פתיחה בטביעת אצבע וכספת קלה יותר להעברה בין חדרים — BSA250 מתאימה יותר.",
    problemStatement: {
      title: "מקום אחד בטוח, בלי סיבוכים",
      body: "דרכונים שנעלמים לפני טיסה, תכשיטים שמפזרים בין מגירות, מזומן שלא בטוח להשאיר בארון — IB250 נותנת לכל זה בית אחד בטוח, עם קוד שכל בן משפחה יכול לזכור ומפתח פיזי לגיבוי אם הסוללה מפתיעה אתכם.",
    },
    faq: [
      {
        question: "מה קורה אם נגמרת הסוללה?",
        answer:
          "הכספת מתריעה מראש על סוללה חלשה, ויש גם מפתח מכני לגיבוי מלא — לא תישארו בחוץ.",
      },
      {
        question: "איפה מתקינים את הכספת?",
        answer:
          "ניתן לעגן אותה לקיר או לרצפה באמצעות 4 עוגנים, לפי המקום הנוח לכם בבית — ארון, חדר עבודה, או חדר שינה.",
      },
      {
        question: "מה כולל המחיר, ומה עולה בנפרד?",
        answer:
          "₪390 הוא מחיר הכספת עצמה — 20% מתחת למחיר המחירון של היצרן (₪490). משלוח עולה ₪42; התקנה מקצועית על ידי טכנאי מטעם המוקד עולה ₪350 בנפרד.",
      },
      {
        question: "מה ההבדל בין IB250 ל-SC250 ול-BSA250?",
        answer:
          "שלוש הכספות מאותו גוף פיזי. IB250 היא הבסיסית והזולה ביותר — קוד ומפתח בלבד. SC250 מוסיפה מסך LCD שמציג את מצב הכספת, במחיר מעט גבוה יותר. BSA250 מוסיפה גם פתיחה בטביעת אצבע, במחיר הגבוה ביותר מבין השלוש.",
      },
    ],
  },
  {
    slug: "sc250",
    name: "כספת SC250",
    tagline: "כספת בית עם מסך LCD — רואים את מצב הכספת במבט אחד",
    description:
      "כספת SC250 היא פתרון אחסון ביתי פשוט ויעיל, עם קוד דיגיטלי ומפתח מכני כגיבוי — ותוספת אחת שימושית: מסך LCD מובנה שמציג את מצב הכספת במבט אחד. גוף פלדה בעובי 1 מ״מ ודלת בעובי 3 מ״מ, עם 2 בריחים עבים ומגירה פנימית מובנית. מתחברת לקיר או לרצפה באמצעות 4 עוגנים.",
    manufacturerPrice: 650,
    ourPrice: 550,
    shippingPrice: 42,
    installationPrice: 350,
    images: [
      "/images/safes/home/sc250/hero.jpg",
      "/images/safes/home/sc250/angle-2.jpg",
      "/images/safes/home/sc250/angle-3.jpg",
      "/images/safes/home/sc250/angle-4.jpg",
      "/images/safes/home/sc250/angle-5.jpg",
      "/images/safes/home/sc250/angle-6.jpg",
      "/images/safes/home/sc250/angle-7.jpg",
      "/images/safes/home/sc250/angle-8.jpg",
    ],
    highlights: [
      "מסך LCD מובנה שמציג את מצב הכספת — נעולה, פתוחה, או סוללה חלשה",
      "קוד דיגיטלי + מפתח מכני לגיבוי מלא",
      "מגירה פנימית מובנית לארגון מסמכים, מזומן ותכשיטים",
      "גוף פלדה 1 מ״מ ודלת פלדה 3 מ״מ, עם 2 בריחים עבים",
      "4 עוגנים לחיבור בטוח לקיר או לרצפה",
      "פתרון בסיסי ויעיל, בלי תוספות מיותרות מעבר למסך השימושי",
    ],
    specs: [
      { label: "מידות חיצוניות", value: "25 × 35 × 20 ס״מ" },
      { label: "משקל", value: "6.5 ק״ג" },
      { label: "פתיחה", value: "קוד דיגיטלי + מפתח מכני" },
      { label: "תצוגה", value: "מסך LCD מובנה" },
      { label: "מקור הפעלה", value: "4 סוללות AA, עם התראת סוללה חלשה" },
      { label: "עובי גוף", value: "1 מ״מ פלדה" },
      { label: "עובי דלת", value: "3 מ״מ פלדה" },
      { label: "בריחים", value: "2 בריחים עבים" },
      { label: "עיגון", value: "4 עוגנים לקיר או לרצפה" },
      { label: "אחסון פנימי", value: "מגירה מובנית אחת" },
    ],
    features: {
      fingerprint: false,
      digitalCode: true,
      mechanicalKey: true,
      lcdScreen: true,
      batteryPowered: true,
    },
    bestFor:
      "SC250 מתאימה למי שרוצה לדעת בבירור מה מצב הכספת בלי לנחש — המסך מציג את זה ישירות. אם המחיר הנגיש ביותר חשוב לכם יותר מהמסך — IB250 נותנת את אותה רמת אבטחה בלי התצוגה. אם אתם רוצים גם פתיחה בטביעת אצבע — BSA250 מתאימה יותר.",
    problemStatement: {
      title: "לא צריך לנחש אם הכספת נעולה",
      body: "עם כספת רגילה קשה לדעת במבט חטוף אם הדלת באמת נעולה, או אם הסוללה עומדת להיגמר. המסך המובנה של SC250 מראה את זה ישירות — בלי לנחש, בלי לבדוק ידנית כל פעם.",
    },
    faq: [
      {
        question: "מה המסך מראה בדיוק?",
        answer:
          "את מצב הכספת — נעולה או פתוחה, וכן התראה כשהסוללה מתקרבת לסוף.",
      },
      {
        question: "מה קורה אם נגמרת הסוללה?",
        answer:
          "המסך מתריע מראש, ויש גם מפתח מכני לגיבוי מלא — לא תישארו בחוץ.",
      },
      {
        question: "מה כולל המחיר, ומה עולה בנפרד?",
        answer:
          "₪550 הוא מחיר הכספת עצמה — 15% מתחת למחיר המחירון של היצרן (₪650). משלוח עולה ₪42; התקנה מקצועית על ידי טכנאי מטעם המוקד עולה ₪350 בנפרד.",
      },
      {
        question: "מה ההבדל בין SC250 ל-IB250 ול-BSA250?",
        answer:
          "שלוש הכספות מאותו גוף פיזי. SC250 מוסיפה מסך LCD מעל הבסיס של IB250 (קוד + מפתח בלבד), במחיר מעט גבוה יותר. BSA250 מוסיפה גם פתיחה בטביעת אצבע (בלי מסך), במחיר הגבוה ביותר מבין השלוש.",
      },
    ],
  },
  {
    slug: "bsa250",
    name: "כספת BSA250",
    tagline: "טביעת אצבע, קוד ומפתח מכני — כספת קלה שזזה איתכם בבית",
    description:
      "כספת BSA250 היא פתרון אחסון ביתי חכם וגמיש: פתיחה בטביעת אצבע לגישה מהירה, קוד דיגיטלי לשימוש רגיל, ומפתח מכני כגיבוי. המשקל הקל שלה (6.5 ק״ג בלבד) הופך אותה לקלה להעברה בין חדרים או לקיבוע במקום שמתאים לשגרה היומיומית שלכם, בלי המאמץ של כספות כבדות. גוף פלדה בעובי 1 מ״מ ודלת בעובי 3 מ״מ, עם 2 בריחים עבים ומגירה פנימית מובנית.",
    manufacturerPrice: 790,
    ourPrice: 650,
    shippingPrice: 42,
    installationPrice: 350,
    images: [
      "/images/safes/home/bsa250/hero.jpg",
      "/images/safes/home/bsa250/angle-2.jpg",
      "/images/safes/home/bsa250/angle-3.jpg",
      "/images/safes/home/bsa250/angle-4.jpg",
      "/images/safes/home/bsa250/angle-5.jpg",
      "/images/safes/home/bsa250/angle-6.jpg",
      "/images/safes/home/bsa250/angle-7.jpg",
      "/images/safes/home/bsa250/angle-8.jpg",
    ],
    highlights: [
      "3 דרכי פתיחה: טביעת אצבע לגישה מהירה, קוד דיגיטלי, ומפתח מכני לגיבוי",
      "משקל קל של 6.5 ק״ג בלבד — נוחה להעברה בין חדרים או לקיבוע איפה שנוח",
      "מגירה פנימית מובנית לארגון מסמכים, מזומן ותכשיטים",
      "גוף פלדה 1 מ״מ ודלת פלדה 3 מ״מ, עם 2 בריחים עבים",
      "4 עוגנים לחיבור בטוח לקיר או לרצפה, כשמעדיפים קיבוע קבוע",
      "התראה על סוללה חלשה — ותמיד יש גם מפתח מכני לגיבוי",
    ],
    specs: [
      { label: "מידות חיצוניות", value: "25 × 35 × 20 ס״מ" },
      { label: "משקל", value: "6.5 ק״ג" },
      { label: "פתיחה", value: "טביעת אצבע + קוד דיגיטלי + מפתח מכני" },
      { label: "מקור הפעלה", value: "4 סוללות AA, עם התראת סוללה חלשה" },
      { label: "עובי גוף", value: "1 מ״מ פלדה" },
      { label: "עובי דלת", value: "3 מ״מ פלדה" },
      { label: "בריחים", value: "2 בריחים עבים" },
      { label: "עיגון", value: "4 עוגנים לקיר או לרצפה" },
      { label: "אחסון פנימי", value: "מגירה מובנית אחת" },
    ],
    features: {
      fingerprint: true,
      digitalCode: true,
      mechanicalKey: true,
      lcdScreen: false,
      batteryPowered: true,
    },
    bestFor:
      "BSA250 מתאימה למי שרוצה גישה הכי מהירה (טביעת אצבע) וגמישות להעביר את הכספת בין חדרים בזכות המשקל הקל. אם המחיר הנגיש ביותר חשוב לכם יותר מהביומטריה — IB250 או SC250 נותנות רמת אבטחה דומה במחיר נמוך יותר.",
    problemStatement: {
      title: "כספת שזזה כשאתם זזים",
      body: "לא כל אחד צריך כספת כבדה שמקובעת פעם אחת ולנצח. BSA250 שוקלת רק 6.5 ק״ג — קלה להעביר לחדר אחר, למרתף לתקופה, או להשאיר נגישה על שידה. וכשאתם צריכים גישה מהירה, טביעת אצבע פותחת אותה בשנייה, בלי לחפש מפתח או להקליד קוד.",
    },
    faq: [
      {
        question: "האם כספת קלה כזו בטוחה?",
        answer:
          "כן — גוף פלדה 1 מ״מ ודלת פלדה 3 מ״מ, עם 2 בריחים עבים, בדיוק כמו שאר הדגמים בקטלוג. המשקל הקל נובע מהגודל הקומפקטי (25×35×20 ס״מ), לא מפשרה על החוזק. מומלץ לעגן אותה ל-4 העוגנים אם רוצים קיבוע קבוע.",
      },
      {
        question: "מה קורה אם טביעת האצבע לא מזוהה?",
        answer:
          "תמיד יש גם קוד דיגיטלי ומפתח מכני כגיבוי — לא תלויים רק בטביעת אצבע.",
      },
      {
        question: "מה כולל המחיר, ומה עולה בנפרד?",
        answer:
          "₪650 הוא מחיר הכספת עצמה — 18% מתחת למחיר המחירון של היצרן (₪790). משלוח עולה ₪42; התקנה מקצועית על ידי טכנאי מטעם המוקד עולה ₪350 בנפרד.",
      },
      {
        question: "מה ההבדל בין BSA250 ל-IB250 ול-SC250?",
        answer:
          "שלוש הכספות מאותו גוף פיזי. BSA250 היא היחידה עם פתיחה בטביעת אצבע, במחיר הגבוה ביותר מבין השלוש. IB250 (קוד + מפתח) היא הזולה ביותר; SC250 מוסיפה מסך LCD במחיר ביניים.",
      },
    ],
  },
  {
    slug: "b600",
    name: "כספת B600",
    tagline: "כספת עסקית כבדה — טביעת אצבע, קוד ומפתח מכני, דלת בעובי 10 מ״מ",
    description:
      "כספת B600 היא כספת פלדה מאובטחת בגרסה כבדה ורצינית, מיוצרת בהתאם לסטנדרטים מחמירים — מתאימה למסמכי עסק, מזומנים וחפצי ערך שדורשים רמת הגנה שלא תמצאו בכספות בית סטנדרטיות. פתיחה בטביעת אצבע לגישה מהירה, קוד אישי, ומפתחות מכניים כגיבוי. גוף פלדה בעובי 4 מ״מ ודלת מסיבית בעובי 10 מ״מ, עם 5 בריחים עבים ועיגון לקיר בטון באמצעות 2 עוגנים בעובי 14 מ״מ.",
    manufacturerPrice: 2800,
    ourPrice: 2400,
    shippingPrice: 140,
    installationPrice: 350,
    images: [
      "/images/safes/home/b600/hero.jpg",
      "/images/safes/home/b600/angle-2.jpg",
      "/images/safes/home/b600/angle-3.jpg",
      "/images/safes/home/b600/angle-4.jpg",
      "/images/safes/home/b600/angle-5.jpg",
      "/images/safes/home/b600/angle-6.jpg",
      "/images/safes/home/b600/detail-1.jpg",
    ],
    highlights: [
      "3 דרכי פתיחה: טביעת אצבע לגישה מהירה, קוד אישי, ומפתחות מכניים כגיבוי",
      "דלת מסיבית בעובי 10 מ״מ וגוף בעובי 4 מ״מ — כפול מעובי כספות הבית הבסיסיות שלנו",
      "5 בריחים עבים לאחיזה מקסימלית במסגרת",
      "משקל 64 ק״ג — כספת עסקית רצינית, לא כספת מגירה קלה",
      "עיגון לקיר בטון באמצעות 2 עוגנים בעובי 14 מ״מ",
      "התראה על סוללה חלשה — ותמיד יש גם מפתח מכני לגיבוי",
    ],
    specs: [
      { label: "מידות חיצוניות", value: "60 × 40 × 36 ס״מ" },
      { label: "משקל", value: "64 ק״ג" },
      { label: "פתיחה", value: "טביעת אצבע + קוד אישי + מפתחות מכניים" },
      { label: "מקור הפעלה", value: "4 סוללות AA, עם התראת סוללה חלשה" },
      { label: "עובי גוף", value: "4 מ״מ פלדה" },
      { label: "עובי דלת", value: "10 מ״מ פלדה" },
      { label: "בריחים", value: "5 בריחים עבים" },
      { label: "עיגון", value: "2 עוגנים, קוטר 14 מ״מ, לקיר בטון" },
    ],
    features: {
      fingerprint: true,
      digitalCode: true,
      mechanicalKey: true,
      lcdScreen: false,
      batteryPowered: true,
    },
    bestFor:
      "B600 היא הכספת החזקה ביותר בקטלוג כספות הבית שלנו — לעסקים ולבתים שצריכים רמת הגנה מעבר לכספת מגירה רגילה. אם אתם מחפשים כספת קלה ונגישה יותר למסמכים ותכשיטים יומיומיים — IB250, SC250 או BSA250 מתאימות יותר ובמחיר נגיש בהרבה.",
    problemStatement: {
      title: "כשכספת מגירה כבר לא מספיקה",
      body: "מסמכי עסק, תזרים מזומן, חפצי ערך יקרים — לפעמים כספת ביתית קטנה פשוט לא נותנת את תחושת הביטחון שאתם צריכים. B600 היא כספת ברמה עסקית: דלת בעובי 10 מ״מ ו-5 בריחים עבים, לא עוד קופסת פלדה קלה. שלוש דרכי פתיחה נותנות לכם גם מהירות ביום-יום וגם ביטחון שיש תמיד גיבוי.",
    },
    faq: [
      {
        question: "למה B600 יקרה יותר משאר כספות הבית שלכם?",
        answer:
          "B600 היא כספת ברמה עסקית — דלת בעובי 10 מ״מ (מול 3 מ״מ בכספות הבית הבסיסיות), גוף 4 מ״מ, ו-5 בריחים עבים. זו לא עוד כספת מגירה, אלא פתרון אבטחה רציני למסמכי עסק וחפצי ערך.",
      },
      {
        question: "מה קורה אם נגמרת הסוללה?",
        answer: "יש מפתחות מכניים לגיבוי מלא, וגם התראה מראש על סוללה חלשה.",
      },
      {
        question: "מה כולל המחיר, ומה עולה בנפרד?",
        answer:
          "₪2,400 הוא מחיר הכספת עצמה — 14% מתחת למחיר המחירון של היצרן (₪2,800). משלוח עולה ₪140 (כספת של 64 ק״ג); התקנה מקצועית על ידי טכנאי מטעם המוקד עולה ₪350 בנפרד.",
      },
      {
        question: "מי מתקין כספת כל כך כבדה?",
        answer:
          "טכנאי מטעם המוקד עצמו מגיע ומעגן את הכספת לקיר הבטון — לא מומלץ להזיז 64 ק״ג לבד.",
      },
    ],
  },
];

export function getHomeSafeBySlug(slug: string): HomeSafeProduct | undefined {
  return homeSafeProducts.find((p) => p.slug === slug);
}

export function homeSafeDiscountPercent(p: HomeSafeProduct): number {
  return Math.round(
    ((p.manufacturerPrice - p.ourPrice) / p.manufacturerPrice) * 100,
  );
}
