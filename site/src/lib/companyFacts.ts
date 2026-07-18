// Company-wide facts for the AI sales agent (lib/chatSystemPrompt.ts) — not
// tied to any single product, so they don't belong in lib/locks.ts /
// lib/homeSafes.ts / lib/safes.ts / lib/courses.ts (would mean duplicating
// the same 3 facts across 11 product entries). Single source of truth here
// instead; edit these to "teach" the chat new company-wide information.
export const CUSTOMER_SERVICE_PHONE = "*5104";

export type CompanyFaqEntry = { question: string; answer: string };

// Physical installation only — not shown for the course category (nothing
// gets installed/drilled for a course). Gated by category in
// chatSystemPrompt.ts, not included unconditionally.
export const installationFaq: CompanyFaqEntry[] = [
  {
    question: "כמה זמן לוקח מרגע הרכישה עד ההתקנה?",
    answer:
      "עד 4 ימי עסקים לכל היותר מרגע הרכישה. נציג יוצר איתכם קשר טלפוני תוך מספר שעות לתיאום מועד ההתקנה בהתאם לזמינות שלכם.",
  },
  {
    question: "האם צריך לקדוח בדלת כדי להתקין?",
    answer:
      "ברוב המקרים לא — זה תלוי בפרזול הקיים בדלת. אם המתקין מחליט שבכל זאת נדרשת קדיחה, מדובר בחור מינימליסטי להעברת כבל בלבד, שניתן לסגור/לכסות בהמשך.",
  },
];

// Relevant regardless of category.
export const universalFaq: CompanyFaqEntry[] = [
  {
    question: "יש שירות לקוחות ישראלי?",
    answer: `כן — טלפון ${CUSTOMER_SERVICE_PHONE}, לכל שאלה או פנייה, גם לפני הרכישה וגם אחריה.`,
  },
];
