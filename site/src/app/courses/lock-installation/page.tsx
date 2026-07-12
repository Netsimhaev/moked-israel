import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BuyNowButton } from "@/components/BuyNowButton";
import { LeadForm } from "@/components/LeadForm";
import { ProductFAQ } from "@/components/ProductFAQ";
import { formatPrice } from "@/lib/format";
import { getCourseBySlug } from "@/lib/courses";

const course = getCourseBySlug("lock-installation")!;

// Course content sourced from the official syllabus document supplied
// 2026-07-09 (7 chapters / 24 lessons, exam, certification, personal
// on-site mentoring). Delivered under the המוקד brand — the source
// material referenced a training-academy brand name, but המוקד is the
// installer running this program end to end, consistent with the rest of
// the site's positioning ("הכשרה מטעם החברה שמתקינה בפועל"). No invented
// duration ("X ימי הכשרה") or unverifiable superlative claims ("ראשונים
// בישראל") carried over — only facts that are actually in the syllabus.

const included = [
  { label: "היקף הקורס", value: "7 פרקים · 24 שיעורים" },
  { label: "פורמט", value: "מפגשים פרונטליים עם נציג מקצועי" },
  { label: "בחינת סיום", value: "מבחן אמריקאי למעבר הקורס" },
  { label: "בסיום", value: "תעודת מתקין מוסמך" },
];

const syllabus = [
  { n: "01", title: "מה זה מנעול חכם?", body: "העקרונות והמנגנונים שמאחורי מנעול חכם — הבסיס לכל מה שבא אחר כך." },
  { n: "02", title: "שימושים ויתרונות של מנעול חכם", body: "למי המוצר מתאים ומה בדיוק הוא פותר — כדי לדעת להסביר את זה ללקוח בשטח." },
  { n: "03", title: "כיצד ליצור מותג מנצח", body: "כל הטיפים לבניית שיווק מצליח לעסק ההתקנות שלכם." },
  { n: "04", title: "כיצד למכור מנעול חכם", body: "כל הכלים למכירה בפועל — מהפנייה הראשונה ועד סגירת העסקה." },
  { n: "05", title: "כיצד מתקינים", body: "כל הכלים להתקנה מקצועית ואיכותית בשטח, על סוגי דלתות שונים." },
  { n: "06", title: "כיצד לתכנת / להגדיר מנעול חכם", body: "תכנות, הרשאות וקונפיגורציה נכונה של המנעול אחרי ההתקנה." },
  { n: "07", title: "תמיכה מדויקת וסגירת עסקאות רווחיות", body: "איך ממשיכים ליווי לקוח נכון וסוגרים עסקאות נוספות לאורך זמן." },
];

const graduateBenefits = [
  {
    title: "מחירון מתקין מוסמך",
    body: "גישה למחירים מיוחדים מהיבואן הרשמי, למטרות סחר.",
  },
  {
    title: "חשיפה ופרסום",
    body: "שילוב ברשימת המתקינים המומלצים של המוקד, כולל הפניית לקוחות.",
  },
  {
    title: "תמיכה טכנית וליווי מקצועי",
    body: "ליווי בזמן עבודתכם בתחום, עם נציג אישי ובקבוצה סגורה.",
  },
];

const faq = [
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
];

export default function LockInstallationCoursePage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <p className="mb-5 text-[0.8rem] text-gray">
              <Link href="/" className="text-navy-deep">
                בית
              </Link>{" "}
              &gt;{" "}
              <Link href="/courses" className="text-navy-deep">
                קורסים והכשרות
              </Link>{" "}
              &gt; <b className="text-navy-deep">התקנה ותכנות מנעולים חכמים</b>
            </p>

            <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-copper uppercase">
                  קורס מנעולים חכמים
                </p>
                <h1 className="mt-2 text-[1.7rem] leading-tight">
                  לומדים היום, מתקינים מחר — ומתחילים להרוויח בגדול
                </h1>
                <p className="mt-4 text-[0.95rem] text-charcoal">
                  התחום של מנעולים חכמים מתפתח מהר, אבל רוב בעלי המקצוע לא
                  מקבלים הכשרה מדויקת ומעמיקה. הקורס נבנה מתוך צורך אמיתי
                  בשטח: לתת לכם את כל הכלים הפרקטיים, ידע עדכני וביטחון
                  מקצועי — כדי שתדעו לעבוד נכון עם מנעולים חכמים, לסגור
                  עסקאות רווחיות ולספק שירות התקנה איכותי. את ההכשרה מעבירים
                  הטכנאים שמתקינים בפועל בבתי הלקוחות של המוקד — לא מרצים
                  תיאורטיים מנותקים מהשטח.
                </p>

                <h2 className="mt-9 text-[1.2rem]">מה כלול בקורס</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 text-[0.88rem]">
                  {included.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-4"
                    >
                      <p className="font-num text-gray">{item.label}</p>
                      <p className="mt-1 font-semibold text-navy-deep">
                        {item.value}
                      </p>
                    </div>
                  ))}
                  <div className="col-span-2 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-4">
                    <p className="font-num text-gray">בנוסף</p>
                    <p className="mt-1 font-semibold text-navy-deep">
                      ליווי אישי עם מתקין מוסמך, לימים שלמים בבית לקוחות
                      אמיתיים
                    </p>
                  </div>
                </div>

                <h2 className="mt-10 text-[1.2rem]">סילבוס הקורס — 7 פרקים</h2>
                <ol className="mt-5 flex flex-col gap-4">
                  {syllabus.map((item) => (
                    <li key={item.n} className="flex gap-4">
                      <span className="flex-none font-num text-[0.9rem] font-semibold text-copper">
                        {item.n}
                      </span>
                      <div>
                        <p className="font-semibold text-navy-deep">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[0.88rem] text-gray">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <h2 className="mt-10 text-[1.2rem]">
                  מה מקבלים בסיום הלימודים
                </h2>
                <p className="mt-2 text-[0.9rem] text-gray">
                  סטודנטים שסיימו בהצלחה מקבלים תעודת מתקין מוסמך, המקנה:
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {graduateBenefits.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-[var(--radius-m)] bg-cream/60 border border-[var(--color-line)] p-4"
                    >
                      <p className="font-semibold text-navy-deep">
                        {b.title}
                      </p>
                      <p className="mt-1.5 text-[0.85rem] text-gray">
                        {b.body}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[0.82rem] text-gray">
                  * ההכשרה אינה מהווה תעודה ממשלתית או רישיון מקצועי מוסדר —
                  זוהי הכשרה מעשית מטעם המוקד המבוססת על ניסיון ההתקנה שלנו
                  בשטח.
                </p>

                <div className="mt-12">
                  <h2 className="text-[1.2rem]">
                    שאלות שכדאי לשאול לפני שנרשמים
                  </h2>
                  <div className="mt-5 max-w-[70ch]">
                    <ProductFAQ items={faq} />
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-24 flex flex-col gap-5">
                  <div
                    className="rounded-[var(--radius-l)] p-6 text-cream"
                    style={{
                      background: "linear-gradient(135deg, #b8863a, #8a5f2a)",
                    }}
                  >
                    <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-cream/75 uppercase">
                      קורס מנעולים חכמים
                    </p>
                    <div className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
                      {included.map((item) => (
                        <div key={item.label} className="flex items-baseline justify-between gap-3">
                          <span className="text-cream/75">{item.label}</span>
                          <span className="font-num font-semibold text-cream">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="num text-[1.5rem] font-bold text-navy-deep">
                      ₪<bdi>{formatPrice(course.price)}</bdi>
                    </span>
                    <p className="mt-1 text-[0.8rem] text-gray">
                      מחיר הקורס המלא — כולל חומרי לימוד, מבחן ותעודת מתקין
                      מוסמך
                    </p>
                  </div>
                  <BuyNowButton
                    slug={course.slug}
                    variant="hero"
                    label="הרשמה ותשלום עכשיו"
                    microcopy="תשלום מאובטח · מקום שמור לך במחזור הקרוב"
                  />
                  <h2 className="text-[1.2rem]">יש שאלה לפני שנרשמים?</h2>
                  <LeadForm
                    source="course-lock-installation"
                    submitLabel="שלחו לי פרטים ונחזור אליכם"
                  />
                  <p className="text-center text-[0.85rem]">
                    <a
                      href={`https://wa.me/972500000000?text=${encodeURIComponent(
                        "היי, יש לי שאלה לגבי קורס מנעולים חכמים",
                      )}`}
                      className="text-navy underline"
                    >
                      יש שאלה? דברו איתנו בוואטסאפ לפני ההרשמה
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
