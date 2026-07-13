// Course "product" data, added 2026-07-10 for checkout wiring. No price
// field existed anywhere for the course before this — ₪790 confirmed
// explicitly by the user, flat price, no manufacturer/list comparison price
// (there's no honest external reference price to show, unlike locks/safes
// which compare against Techom's published list price — do not invent one).
//
// Extended 2026-07-13: the rich syllabus/benefits/FAQ content used to live
// hardcoded directly in app/courses/lock-installation/page.tsx — migrated
// here (verbatim, no rewrite) so both that page and the new /lp/[slug]
// landing page can share one source. Content itself sourced from the
// official syllabus document supplied 2026-07-09 (7 chapters/24 lessons,
// exam, certification, personal on-site mentoring) — no invented duration
// or unverifiable superlative claims carried over, only facts actually in
// the syllabus. video is optional and absent today — AI-generated clips to
// be added later per product, see lib/landingPage.ts.
export type CourseProduct = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  highlights: string[];
  description?: string;
  included?: { label: string; value: string }[];
  syllabus?: { n: string; title: string; body: string }[];
  graduateBenefits?: { title: string; body: string }[];
  faq?: { question: string; answer: string }[];
  disclaimer?: string;
  images?: string[];
  video?: { src: string; poster: string };
};

export const courseProducts: CourseProduct[] = [
  {
    slug: "lock-installation",
    name: "קורס התקנה ותכנות מנעולים חכמים",
    tagline: "לומדים היום, מתקינים מחר",
    price: 790,
    highlights: [
      "7 פרקים · 24 שיעורים",
      "מפגשים פרונטליים עם נציג מקצועי",
      "מבחן אמריקאי + תעודת מתקין מוסמך",
      "ליווי אישי בבית לקוחות אמיתיים",
    ],
    description:
      "התחום של מנעולים חכמים מתפתח מהר, אבל רוב בעלי המקצוע לא מקבלים הכשרה מדויקת ומעמיקה. הקורס נבנה מתוך צורך אמיתי בשטח: לתת לכם את כל הכלים הפרקטיים, ידע עדכני וביטחון מקצועי — כדי שתדעו לעבוד נכון עם מנעולים חכמים, לסגור עסקאות רווחיות ולספק שירות התקנה איכותי. את ההכשרה מעבירים הטכנאים שמתקינים בפועל בבתי הלקוחות של המוקד — לא מרצים תיאורטיים מנותקים מהשטח.",
    included: [
      { label: "היקף הקורס", value: "7 פרקים · 24 שיעורים" },
      { label: "פורמט", value: "מפגשים פרונטליים עם נציג מקצועי" },
      { label: "בחינת סיום", value: "מבחן אמריקאי למעבר הקורס" },
      { label: "בסיום", value: "תעודת מתקין מוסמך" },
    ],
    syllabus: [
      { n: "01", title: "מה זה מנעול חכם?", body: "העקרונות והמנגנונים שמאחורי מנעול חכם — הבסיס לכל מה שבא אחר כך." },
      { n: "02", title: "שימושים ויתרונות של מנעול חכם", body: "למי המוצר מתאים ומה בדיוק הוא פותר — כדי לדעת להסביר את זה ללקוח בשטח." },
      { n: "03", title: "כיצד ליצור מותג מנצח", body: "כל הטיפים לבניית שיווק מצליח לעסק ההתקנות שלכם." },
      { n: "04", title: "כיצד למכור מנעול חכם", body: "כל הכלים למכירה בפועל — מהפנייה הראשונה ועד סגירת העסקה." },
      { n: "05", title: "כיצד מתקינים", body: "כל הכלים להתקנה מקצועית ואיכותית בשטח, על סוגי דלתות שונים." },
      { n: "06", title: "כיצד לתכנת / להגדיר מנעול חכם", body: "תכנות, הרשאות וקונפיגורציה נכונה של המנעול אחרי ההתקנה." },
      { n: "07", title: "תמיכה מדויקת וסגירת עסקאות רווחיות", body: "איך ממשיכים ליווי לקוח נכון וסוגרים עסקאות נוספות לאורך זמן." },
    ],
    graduateBenefits: [
      { title: "מחירון מתקין מוסמך", body: "גישה למחירים מיוחדים מהיבואן הרשמי, למטרות סחר." },
      { title: "חשיפה ופרסום", body: "שילוב ברשימת המתקינים המומלצים של המוקד, כולל הפניית לקוחות." },
      { title: "תמיכה טכנית וליווי מקצועי", body: "ליווי בזמן עבודתכם בתחום, עם נציג אישי ובקבוצה סגורה." },
    ],
    faq: [
      {
        question: "האם התעודה היא רישיון ממשלתי מוסדר?",
        answer:
          "לא — זוהי תעודת מתקין מוסמך מטעם המוקד, המבוססת על ניסיון ההתקנה שלנו בשטח והמבחן בסיום הקורס. היא אינה תעודה ממשלתית או רישיון מקצועי מוסדר.",
      },
      {
        question: "אני מנעולן ותיק — הקורס מתאים גם לי?",
        answer:
          "כן. הקורס בנוי גם עבור מנעולנים וטכנאים עם ניסיון שרוצים להוסיף התמחות ספציפית במנעולים חכמים — התכנות, ההתקנה הפיזית והמכירה של הקטגוריה הזו שונים ממנעול מכני רגיל.",
      },
      {
        question: "מה כולל הליווי האישי בבית לקוחות?",
        answer:
          "לאחר החלק העיוני והמעשי, יש ימי ליווי צמוד עם מתקין מוסמך מטעם המוקד בעבודה אמיתית בבית לקוח — כדי לתרגל את כל מה שנלמד בתנאי שטח אמיתיים, לא בסימולציה בלבד.",
      },
      {
        question: "מה קורה אחרי שסיימתי את הקורס בהצלחה?",
        answer:
          "מקבלים תעודת מתקין מוסמך שמקנה גישה למחירון מתקינים ייעודי מהיבואן הרשמי, הפניית לקוחות דרך רשימת המתקינים המומלצים של המוקד, ותמיכה טכנית שוטפת עם נציג אישי.",
      },
    ],
    disclaimer:
      "* ההכשרה אינה מהווה תעודה ממשלתית או רישיון מקצועי מוסדר — זוהי הכשרה מעשית מטעם המוקד המבוססת על ניסיון ההתקנה שלנו בשטח.",
  },
];

export function getCourseBySlug(slug: string): CourseProduct | undefined {
  return courseProducts.find((c) => c.slug === slug);
}