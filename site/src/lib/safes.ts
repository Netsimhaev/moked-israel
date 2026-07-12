// Gun safe catalog — first category-of-one, sourced from Techom's own
// product page (techom-safes.co.il), not the smart-lock PDF catalogs used in
// lib/locks.ts. **Updated 2026-07-10 after legal review with counsel +
// Techom:** do NOT describe המוקד as an "authorized distributor/marketer" of
// Techom. Approved framing: Techom manufactures (Israeli development —
// Techom's, not המוקד's own), המוקד is an external company that selects +
// installs after thorough market research, with direct warranty/service.
// "פיתוח ישראלי" wording IS allowed when attributed to Techom — see
// CLAUDE.md and strategy-agent/positioning.md.
//
// Sourced 2026-07-09 from:
// - Model F: https://www.techom-safes.co.il/product/כספת-לנשק-מודל-f/
// - Model E: https://www.techom-safes.co.il/product/כספת-לנשק-מודל-e/
//
// IMPORTANT — battery mention on Techom's Model F page: their spec table
// lists "4 סוללות AA" alongside "פתיחה: מפתחות מכניים בלבד", which directly
// contradicts their own marketing copy ("בלי קודנים ובלי טכנולוגיה
// מיותרת"). Confirmed with the user (2026-07-09) that this is a copy/editing
// error on Techom's site — Model F is pure mechanical-key, no batteries or
// electronics at all. The battery line is intentionally excluded from Model
// F's copy below; do not reintroduce it without a fresh source check.
// Model E's battery mention (4× AA) is NOT the same situation — it has
// fingerprint + digital code as primary access methods, so batteries are
// consistent with its own spec, and the mechanical key is an explicit backup
// (not the sole method as with Model F). No contradiction there.
//
// Pricing/fulfillment structure is NOT the same as lib/locks.ts: ourPrice
// here is the safe itself only. Shipping and installation are separate,
// user-confirmed line items (2026-07-09) — do not assume "כולל התקנה" like
// the lock products.
//
// The "עומדת בתקן / דרישות אגף הירייה" line is Techom's own compliance claim
// about their product, not an independent legal assertion by המוקד — always
// attribute it to the manufacturer in copy, and flag for
// security-compliance-agent review before any paid/broad marketing use,
// per CLAUDE.md's gun-safe compliance guidance.

export type SafeSpec = { label: string; value: string };

export type SafeFeatures = {
  fingerprint: boolean;
  digitalCode: boolean;
  mechanicalKey: boolean; // present on every model so far — either the sole opening method, or the backup
  batteryPowered: boolean; // false only for models with zero electronics (e.g. Model F)
};

export type GunSafeProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  manufacturerPrice: number; // Techom's own listed "before" price
  ourPrice: number; // the safe itself, before shipping/installation
  shippingPrice: number; // delivery only, self-installed
  installationPrice: number; // delivery + professional installation by המוקד
  highlights: string[];
  specs: SafeSpec[];
  features: SafeFeatures;
  // Real product photography, added 2026-07-10. Unlike lib/locks.ts's
  // per-color images map, gun safes have a single finish and no
  // door-mounted "installation" concept — just an ordered gallery of
  // studio angles. images[0] is the hero shown in the top box; the rest
  // render as a click-to-enlarge thumbnail strip (SafeImageGallery.tsx).
  // Optional: falls back to the gradient placeholder when absent.
  images?: string[];
  standardNote: string;
  bestFor?: string;
  problemStatement: { title: string; body: string };
  faq: { question: string; answer: string }[];
};

export const gunSafeProducts: GunSafeProduct[] = [
  {
    slug: "model-f",
    name: "כספת נשק מודל F",
    tagline: "כספת נשק קלאסית ואמינה — פתיחה במפתח מכני בלבד, בלי סוללות",
    description:
      "כספת נשק מודל F נבנתה לבעלי רישיון שרוצים פתרון פשוט ואמין: פתיחה במפתח מכני בלבד, בלי קודים, בלי סוללות ובלי טכנולוגיה שיכולה להשתבש בדיוק ברגע שאתם צריכים אותה. הגוף בעובי 4 מ״מ ודלת בעובי 8 מ״מ, עם שני בריחים נעים ושני בריחים מקובעים שנותנים אחיזה אמיתית למסגרת. הכספת מעוגנת לקיר בטון באמצעות 6 עוגנים בקוטר 14 מ״מ, ולפי הצהרת היצרן (Techom) היא עונה על התקן המעודכן לכספות נשק ועל דרישות אגף הירייה.",
    manufacturerPrice: 1300,
    ourPrice: 790,
    shippingPrice: 90,
    installationPrice: 350,
    images: [
      "/images/safes/guns/model-f/hero.jpg",
      "/images/safes/guns/model-f/angle-2.jpg",
      "/images/safes/guns/model-f/angle-3.jpg",
      "/images/safes/guns/model-f/angle-4.jpg",
      "/images/safes/guns/model-f/angle-5.jpg",
    ],
    highlights: [
      "פתיחה במפתח מכני בלבד — בלי קודים, בלי סוללות, בלי מה שיכול להשתבש",
      "גוף בעובי 4 מ״מ ודלת בעובי 8 מ״מ — פלדה מלאה, לא פח דק",
      "2 בריחים נעים + 2 בריחים מקובעים לאחיזה אמיתית במסגרת",
      "6 עוגנים בקוטר 14 מ״מ לחיבור בטוח לקיר בטון",
      "לפי הצהרת היצרן (Techom): עומדת בתקן המעודכן לכספות נשק ובדרישות אגף הירייה",
      "משלוח והתקנה מתואמים ישירות מול המוקד — לא ערכת הרכבה עצמית מבולבלת",
    ],
    specs: [
      { label: "מידות חיצוניות", value: "36 × 26 × 26 ס״מ" },
      { label: "משקל", value: "26 ק״ג" },
      { label: "פתיחה", value: "מפתחות מכניים בלבד" },
      { label: "עובי גוף", value: "4 מ״מ פלדה" },
      { label: "עובי דלת", value: "8 מ״מ פלדה" },
      { label: "בריחים", value: "2 נעים + 2 מקובעים" },
      { label: "עיגון לקיר", value: "6 עוגנים, קוטר 14 מ״מ, לקיר בטון" },
    ],
    features: {
      fingerprint: false,
      digitalCode: false,
      mechanicalKey: true,
      batteryPowered: false,
    },
    standardNote:
      "לפי הצהרת היצרן (Techom): הכספת עומדת בתקן המעודכן לכספות נשק ובדרישות אגף הירייה. אנחנו ממליצים לוודא מול הגורם שהנפיק את הרישיון שלכם שהיא מתאימה לתנאי הרישיון הספציפיים שלכם.",
    bestFor:
      "מודל F הוא הדגם הכי פשוט בקטלוג הכספות שלנו — מפתח מכני בלבד, בלי שום רכיב חשמלי. אם אתם מעדיפים גישה מהירה בטביעת אצבע או קודן דיגיטלי (עם מפתח מכני כגיבוי) — מודל E מתאים יותר, במחיר מעט גבוה יותר (₪1,050 מול ₪790).",
    problemStatement: {
      title: "כספת פשוטה, לא עוד דבר שיכול להתקלקל",
      body: "כשמדובר בנשק בבית עם ילדים, הדבר האחרון שאתם צריכים זה כספת עם סוללה שנגמרת או קוד שנשכח בדיוק ברגע הלא נכון. מודל F נפתחת במפתח מכני בלבד — בלי חשמל, בלי אפליקציה, בלי הפתעות. היא לא מנסה להיות ״חכמה״ — היא עושה דבר אחד ועושה אותו נכון: שומרת את הנשק שלכם מחוץ להישג ידם של ילדים, בכל שעה ובכל מצב.",
    },
    faq: [
      {
        question: "האם הכספת עומדת בתקן?",
        answer:
          "לפי הצהרת היצרן (Techom), כספת מודל F עונה על התקן המעודכן לכספות נשק ועל דרישות אגף הירייה. מומלץ לוודא מול הגורם שהנפיק את הרישיון שלכם שהיא מתאימה לתנאי הרישיון הספציפיים שלכם.",
      },
      {
        question: "האם צריך סוללות או חשמל?",
        answer:
          "לא. מודל F נפתחת במפתח מכני בלבד — אין בה שום רכיב חשמלי, קוד או סוללה. זו בדיוק הסיבה שהיא לא יכולה להיתקע בגלל סוללה שנגמרה.",
      },
      {
        question: "מה כולל המחיר, ומה עולה בנפרד?",
        answer:
          "₪790 הוא מחיר הכספת עצמה — 39% מתחת למחיר המחירון של היצרן (₪1,300). משלוח בלבד (להתקנה עצמאית) עולה ₪90; משלוח עם התקנה מקצועית על ידי טכנאי מטעם המוקד עולה ₪350. שני האפשרויות מוצגות בשקיפות מראש, בלי הפתעות בסוף.",
      },
      {
        question: "מי מתקין את הכספת, ואיך היא מתחברת לקיר?",
        answer:
          "אם תבחרו בהתקנה מקצועית — טכנאי מטעם המוקד עצמו, לא קבלן משנה. הכספת מתחברת לקיר בטון באמצעות 6 עוגנים בקוטר 14 מ״מ, לעיגון יציב שלא ניתן להזיז.",
      },
      {
        question: "מי מייצר את הכספת?",
        answer:
          "מודל F מיוצר על ידי Techom — פיתוח ישראלי. המוקד היא חברה חיצונית שבחרה את הדגם לאחר בדיקה מעמיקה של השוק, מתאמת משלוח והתקנה, ונותנת עליו אחריות ושירות ישירים — כתובת אחת לכל שאלה.",
      },
      {
        question: "מה ההבדל בין מודל F למודל E?",
        answer:
          "מודל F נפתחת רק במפתח מכני, בלי שום רכיב חשמלי — הכי פשוט ובלי תלות בסוללה. מודל E נפתחת גם בטביעת אצבע וגם בקודן דיגיטלי, עם מפתח מכני לגיבוי — נוח ומהיר יותר ביום-יום, במחיר מעט גבוה יותר (₪1,050 מול ₪790). שתי הכספות מאותו גוף (4 מ״מ/8 מ״מ, אותם בריחים ועיגון לקיר).",
      },
    ],
  },
  {
    slug: "model-e",
    name: "כספת נשק מודל E",
    tagline: "טביעת אצבע וקודן דיגיטלי, עם מפתח מכני לגיבוי מלא",
    description:
      "כספת נשק מודל E משלבת שלוש דרכי פתיחה: טביעת אצבע לגישה מהירה, קודן דיגיטלי למי שמעדיף קוד, ומפתח מכני כגיבוי מלא שלא תלוי בסוללה. הגוף בעובי 4 מ״מ ודלת בעובי 8 מ״מ, עם שני בריחים נעים ושני בריחים מקובעים, ועיגון לקיר בטון באמצעות 6 עוגנים בקוטר 14 מ״מ. פועלת על 4 סוללות AA רגילות, ללא תלות בחיבור לחשמל. לפי הצהרת היצרן (Techom), עונה על התקן המעודכן לכספות נשק ועל דרישות אגף הירייה.",
    manufacturerPrice: 1400,
    ourPrice: 1050,
    shippingPrice: 90,
    installationPrice: 350,
    images: [
      "/images/safes/guns/model-e/hero.png",
      "/images/safes/guns/model-e/angle-2.webp",
      "/images/safes/guns/model-e/angle-3.webp",
      "/images/safes/guns/model-e/angle-4.webp",
    ],
    highlights: [
      "3 דרכי פתיחה: טביעת אצבע לגישה מהירה, קודן דיגיטלי, ומפתח מכני לגיבוי מלא",
      "פועלת על 4 סוללות AA רגילות — ואם הסוללה נגמרת, המפתח המכני תמיד עובד",
      "גוף בעובי 4 מ״מ ודלת בעובי 8 מ״מ — פלדה מלאה, לא פח דק",
      "2 בריחים נעים + 2 בריחים מקובעים לאחיזה אמיתית במסגרת",
      "6 עוגנים בקוטר 14 מ״מ לחיבור בטוח לקיר בטון",
      "לפי הצהרת היצרן (Techom): עומדת בתקן המעודכן לכספות נשק ובדרישות אגף הירייה",
    ],
    specs: [
      { label: "מידות חיצוניות", value: "36 × 26 × 26 ס״מ" },
      { label: "משקל", value: "26 ק״ג" },
      { label: "פתיחה", value: "טביעת אצבע / קודן דיגיטלי / מפתח מכני (גיבוי)" },
      { label: "מקור הפעלה", value: "4 סוללות AA רגילות" },
      { label: "עובי גוף", value: "4 מ״מ פלדה" },
      { label: "עובי דלת", value: "8 מ״מ פלדה" },
      { label: "בריחים", value: "2 נעים + 2 מקובעים" },
      { label: "עיגון לקיר", value: "6 עוגנים, קוטר 14 מ״מ, לקיר בטון" },
    ],
    features: {
      fingerprint: true,
      digitalCode: true,
      mechanicalKey: true,
      batteryPowered: true,
    },
    standardNote:
      "לפי הצהרת היצרן (Techom): הכספת עומדת בתקן המעודכן לכספות נשק ובדרישות אגף הירייה. אנחנו ממליצים לוודא מול הגורם שהנפיק את הרישיון שלכם שהיא מתאימה לתנאי הרישיון הספציפיים שלכם.",
    bestFor:
      "מודל E נותן לכם את המהירות והנוחות של טביעת אצבע וקודן דיגיטלי, עם מפתח מכני לגיבוי מלא אם הסוללה נגמרת. אם אתם מעדיפים פשטות מוחלטת בלי שום רכיב חשמלי — מודל F נותן בדיוק את זה, במחיר נמוך יותר (₪790 מול ₪1,050).",
    problemStatement: {
      title: "גישה מהירה כשהיא הכי חשובה, בלי לוותר על גיבוי",
      body: "בשנייה שאתם צריכים לפתוח את הכספת, אתם לא רוצים לחפש מפתח בחושך או להתעסק עם מנעול מסורבל. מודל E נפתחת בטביעת אצבע תוך שנייה, עם קודן דיגיטלי כאפשרות נוספת — ואם הסוללה נגמרת, מפתח מכני מלא תמיד עובד. זו כספת שנותנת לכם מהירות ביום-יום, בלי לוותר על אמינות ברגע האמת.",
    },
    faq: [
      {
        question: "כמה דרכים יש לפתוח את הכספת?",
        answer:
          "שלוש: טביעת אצבע לגישה הכי מהירה, קודן דיגיטלי, ומפתח מכני שתמיד עובד גם אם הסוללה נגמרת.",
      },
      {
        question: "מה קורה אם נגמרת הסוללה?",
        answer:
          "יש מפתח מכני מלא שמשמש כגיבוי עצמאי — לא תלויים רק בטביעת אצבע או בקוד. הכספת פועלת על 4 סוללות AA רגילות, קלות להחלפה.",
      },
      {
        question: "האם הכספת עומדת בתקן?",
        answer:
          "לפי הצהרת היצרן (Techom), כספת מודל E עונה על התקן המעודכן לכספות נשק ועל דרישות אגף הירייה. מומלץ לוודא מול הגורם שהנפיק את הרישיון שלכם שהיא מתאימה לתנאי הרישיון הספציפיים שלכם.",
      },
      {
        question: "מה כולל המחיר, ומה עולה בנפרד?",
        answer:
          "₪1,050 הוא מחיר הכספת עצמה — 25% מתחת למחיר המחירון של היצרן (₪1,400). משלוח בלבד (להתקנה עצמאית) עולה ₪90; משלוח עם התקנה מקצועית על ידי טכנאי מטעם המוקד עולה ₪350.",
      },
      {
        question: "מי מתקין את הכספת, ואיך היא מתחברת לקיר?",
        answer:
          "אם תבחרו בהתקנה מקצועית — טכנאי מטעם המוקד עצמו, לא קבלן משנה. הכספת מתחברת לקיר בטון באמצעות 6 עוגנים בקוטר 14 מ״מ, לעיגון יציב שלא ניתן להזיז.",
      },
      {
        question: "מה ההבדל בין מודל E למודל F?",
        answer:
          "מודל E נפתחת גם בטביעת אצבע וגם בקודן דיגיטלי, עם מפתח מכני לגיבוי — הכי נוח ומהיר ביום-יום. מודל F נפתחת רק במפתח מכני, בלי סוללות בכלל — הכי פשוט, במחיר נמוך יותר (₪790 מול ₪1,050). שתי הכספות מאותו גוף (4 מ״מ/8 מ״מ, אותם בריחים ועיגון לקיר).",
      },
    ],
  },
];

export function getGunSafeBySlug(slug: string): GunSafeProduct | undefined {
  return gunSafeProducts.find((p) => p.slug === slug);
}

export function safeDiscountPercent(p: GunSafeProduct): number {
  return Math.round(
    ((p.manufacturerPrice - p.ourPrice) / p.manufacturerPrice) * 100,
  );
}
