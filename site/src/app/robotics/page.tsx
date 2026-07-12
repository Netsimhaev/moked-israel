import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductFAQ } from "@/components/ProductFAQ";
import { QuoteForm } from "@/components/QuoteForm";

// Deliberately a single page, not a catalog + per-model product pages like
// locks/safes. Robotics here is not off-the-shelf SKUs — every deployment is
// built to the client's spec, so there is nothing to browse/compare/buy
// online. See product-marketing-strategy-agent/robotics.md and
// product-page-agent/robotics.md (2026-07-10 update) for the full brief.
const trustPoints = [
  "פלטפורמת הבקרה פותחה בישראל על ידי המוקד",
  "כל פתרון נבנה לפי הצורך הספציפי של הלקוח — לא מדף מוצרים קבוע",
  "שיחת ייעוץ ראשונה ללא עלות וללא התחייבות",
  "תמיכה טכנית ישראלית, לא תלות ביבואן",
];

const processSteps = [
  {
    title: "שיחת ייעוץ ראשונה",
    body: "ללא עלות וללא התחייבות. ממפים את הצורך התפעולי — סוג המשימה, סביבת העבודה, והיקף הפרויקט.",
  },
  {
    title: "מיפוי היתכנות הנדסי",
    body: "הצוות בודק מה מתאים בפועל לעסק שלכם, כולל בדיקת עמידה בדרישות בטיחות רלוונטיות.",
  },
  {
    title: "פיתוח והתאמת פלטפורמת הבקרה",
    body: "התוכנה שמנהלת את הרובוט נבנית ומותאמת לפי הצורך שלכם — לא תוכנת מדף גנרית.",
  },
  {
    title: "הצעת מחיר מותאמת לפרויקט",
    body: "לא מחיר מדף. משקפת את היקף העבודה, מורכבות הפתרון, ורמת ההתאמה הנדרשת.",
  },
  {
    title: "הטמעה בליווי צמוד",
    body: "התקנה, הדרכת צוות, ותמיכה טכנית ישראלית לאורך כל חיי המערכת.",
  },
];

const faqItems = [
  {
    question: "אפשר לקנות רובוט ספציפי דרך האתר?",
    answer:
      "לא. אנחנו לא מוכרים דגמים קבועים מהמדף — כל פתרון רובוטי נבנה בהתאמה אישית לצורך של הלקוח, כולל התוכנה שמנהלת אותו. הצעד הראשון הוא תמיד שיחת ייעוץ, לא הזמנה.",
  },
  {
    question: "המחיר בטח גבוה מדי בשבילנו.",
    answer:
      "אין מחיר אחיד כי כל פרויקט שונה בהיקפו — לכן הצעד הראשון הוא שיחת ייעוץ שממפה בדיוק מה נדרש ומה ההחזר על ההשקעה הצפוי, לפני כל מספר.",
  },
  {
    question: "אנחנו חוששים שזה יחליף/יאיים על העובדים שלנו.",
    answer:
      "המיצוב הוא כלי שמשחרר עובדים ממשימות מסוכנות או חוזרות ומעביר אותם לתפקידים בעלי ערך גבוה יותר — לא תחליף גורף. זו שאלה שנענית לעומק בשיחת הייעוץ הספציפית לפי אופי העסק שלכם.",
  },
  {
    question: "איך נדע שהטכנולוגיה אמינה ולא עוד גימיק?",
    answer:
      "פלטפורמת הבקרה פותחה ונבדקה בישראל על ידי הצוות שלנו עצמו — לא הרכבה של רכיבים מיובאים בלי בקרת איכות מרכזית. אפשר להדגים זאת בשיחת הייעוץ.",
  },
  {
    question: "מה קורה אם משהו מתקלקל — נצטרך לחכות לתמיכה מחו״ל?",
    answer:
      "לא. התמיכה הטכנית היא ישראלית ומקומית, כי הפלטפורמה פותחה כאן. זה ההבדל מול יבואני ציוד זר.",
  },
  {
    question: "האם זה בכלל חוקי/מאושר להפעלה בישראל?",
    answer:
      "תחום הרובוטיקה התעשייתית וההומנואידית נמצא בתהליך תקינה בינלאומי שעדיין מתפתח. כל התקנה בפועל עוברת ייעוץ הנדסי/משפטי ייעודי לפני הפעלה — זה חלק מהתהליך שאנחנו מובילים אתכם דרכו, לא משהו שמוסתר.",
  },
];

export default function RoboticsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[880px] px-6 sm:px-8">
            <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-navy uppercase">
              רובוטיקה מבוססת בינה מלאכותית
            </p>
            <h1 className="mt-3 max-w-[26ch] text-[1.9rem]">
              פתרונות רובוטיקה בהתאמה אישית, על פלטפורמת בקרה שפיתחנו בעצמנו
            </h1>
            <p className="mt-4 max-w-[62ch] text-[0.98rem] text-charcoal">
              אנחנו לא מוכרים דגמי רובוט קבועים מהמדף. כל פתרון — תעשייתי או
              דמוי-אדם — נבנה לפי הצורך המדויק של העסק שלכם, כולל התוכנה
              שמנהלת אותו, שאותה אנחנו מפתחים בעצמנו בישראל. פתרון B2B מלא
              המיועד לעסקים ולחברות — לא מוצר צריכה, ולא ניתן לרכישה מקוונת.
            </p>

            <a
              href="#quote"
              className="mt-7 inline-flex items-center gap-2 rounded-[var(--radius-s)] bg-gold px-6 py-3.5 font-num text-[0.95rem] font-semibold text-navy-deep transition hover:brightness-105"
            >
              קבעו שיחת ייעוץ
            </a>

            <div className="mt-9 flex flex-wrap gap-2.5">
              {trustPoints.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-[0.8rem] text-navy-deep"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-sage" />
                  {t}
                </span>
              ))}
            </div>

            {/* מפרטים טכניים כלליים ותמונות רובוטים יתווספו כאן בהמשך —
                placeholder בלבד, לא להמציא נתונים ספציפיים לדגם עד שיסופקו. */}
            <div className="mt-12 rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white p-6 sm:p-8">
              <h2 className="text-[1.2rem]">מפרטים ותחומי יישום — כללי</h2>
              <p className="mt-3 max-w-[60ch] text-[0.9rem] text-gray">
                בקרוב יתווספו כאן מפרטים טכניים ותמונות מהשטח, שיתנו תמונה
                כללית על טווחי היכולות (עומסים, דיוק, זמני פריסה) של פתרונות
                הרובוטיקה שלנו — ללא ספציפיקציה של דגם ספציפי, כי כל פתרון
                נבנה מחדש לפי הפרויקט.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {["רובוטיקה תעשייתית", "רובוטים דמויי-אדם", "פלטפורמת בקרה"].map(
                  (label) => (
                    <div
                      key={label}
                      className="h-[130px] rounded-[var(--radius-m)]"
                      style={{
                        background:
                          "linear-gradient(135deg, #2f5163, #17303d)",
                      }}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="mt-10 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-5 sm:p-6">
              <h3 className="font-num text-[1rem] font-semibold text-navy-deep">
                מי מפתח את זה
              </h3>
              <p className="mt-2 text-[0.9rem] text-gray">
                בניגוד לספקים שמייבאים רובוטים ומתקינים עליהם תוכנת בקרה זרה,
                פלטפורמת הבקרה כאן פותחה על ידי צוות המוקד עצמו בישראל, ומותאמת
                מחדש לכל לקוח לפי הצורך שלו — כך שהתאמה, תמיכה ותיקונים נעשים
                ישירות מולנו, בלי תלות ביבואן.
              </p>
            </div>

            <div className="mt-10 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-cream p-5 sm:p-6">
              <h3 className="font-num text-[1rem] font-semibold text-navy-deep">
                לפני שממשיכים — מה חשוב שתדעו
              </h3>
              <p className="mt-2 text-[0.9rem] text-gray">
                תחום הרובוטיקה התעשייתית וההומנואידית נמצא בתהליך תקינה
                בינלאומי שעדיין מתפתח. אנחנו לא ממהרים למכור לכם משהו לפני
                שבדקנו שהוא בטוח ומתאים — לכן כל פרויקט עובר מיפוי צורך ושיחת
                ייעוץ הנדסי לפני כל הצעת מחיר, וההתקנה בפועל כפופה לאישור
                הנדסי/משפטי מוסמך. זו לא שיחת מכירה — זו שיחת היתכנות.
              </p>
            </div>

            <h2 className="mt-12 text-[1.2rem]">איך זה עובד בפועל, שלב אחר שלב</h2>
            <ol className="mt-5 flex flex-col gap-4">
              {processSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-navy font-num text-[0.85rem] font-semibold text-cream">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-num text-[0.95rem] font-semibold text-navy-deep">
                      {s.title}
                    </p>
                    <p className="mt-1 text-[0.88rem] text-gray">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-[1.2rem]">שאלות נפוצות</h2>
            <div className="mt-5">
              <ProductFAQ items={faqItems} />
            </div>

            <div id="quote" className="mt-12 scroll-mt-24">
              <h2 className="text-[1.2rem]">השלב הראשון הוא שיחה, לא הזמנה</h2>
              <p className="mt-2 mb-5 max-w-[55ch] text-[0.9rem] text-gray">
                זהו פתרון בהתאמה אישית לעסק — אין מחיר מדף ואין אפשרות רכישה
                באתר. השאירו פרטים ונקבע שיחת ייעוץ להבנת הצורך המדויק.
              </p>
              <QuoteForm source="robotics-general" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
