import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";

// מסלול נוסף יתווסף כאן כשיהיה תוכן אמיתי לו — לא להוסיף כרטיס placeholder.
const courses = [
  {
    slug: "lock-installation",
    title: "התקנה ותכנות מנעולים חכמים",
    duration: "7 פרקים · 24 שיעורים",
    level: "מתחילים ומנעולנים מוסמכים",
    blurb:
      "הקורס נבנה מתוך צורך אמיתי בשטח — כלים פרקטיים להתקנה, תכנות ומכירה של מנעולים חכמים, ממי שמתקין בפועל בבתי לקוחות ברחבי הארץ.",
    stats: [
      { label: "היקף", value: "7 פרקים · 24 שיעורים" },
      { label: "בסיום", value: "תעודת מתקין מוסמך" },
      { label: "כולל", value: "ליווי אישי בבית לקוח" },
    ],
  },
];

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-copper uppercase">
              קורסים והכשרות
            </p>
            <h1 className="mt-3 max-w-[24ch] text-[1.9rem]">
              הכשרה מטעם החברה שבאמת מתקינה
            </h1>
            <p className="mt-3 max-w-[60ch] text-gray">
              מי שמלמד אתכם הם הטכנאים שמתקינים בפועל בבתי לקוחות אמיתיים
              ברחבי הארץ — לא מרצים אקדמיים מנותקים מהשטח. מסלולים לטכנאים
              ומנעולנים שרוצים להוסיף התמחות במנעולים חכמים, ולמתעניינים
              חדשים בתחום.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <TrustBadge variant="light" label="מלמדים מתקינים בפועל, לא תיאורטיקנים" />
              <TrustBadge variant="light" label="ליווי אישי בבית לקוח" />
              <TrustBadge variant="light" label="תעודת מתקין מוסמך בסיום" />
            </div>

            <div className="mt-10 grid gap-5">
              {courses.map((c) => (
                <Link
                  key={c.slug}
                  href={`/courses/${c.slug}`}
                  className="group grid gap-6 overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[0_4px_10px_rgba(18,40,61,0.1),0_16px_36px_rgba(18,40,61,0.14)] sm:grid-cols-[1.3fr_1fr] sm:p-8"
                >
                  <div>
                    <span className="inline-block rounded-full bg-copper/10 px-3 py-1 font-num text-[0.72rem] font-semibold text-copper">
                      {c.level}
                    </span>
                    <h3 className="mt-3 font-num text-[1.3rem] font-semibold text-navy-deep">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[0.9rem] text-gray">{c.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-num text-[0.85rem] font-semibold text-navy">
                      לפרטי הקורס המלאים ←
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 self-center">
                    {c.stats.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between rounded-[var(--radius-m)] bg-cream px-4 py-3"
                      >
                        <span className="font-num text-[0.8rem] text-gray">
                          {s.label}
                        </span>
                        <span className="font-num text-[0.85rem] font-semibold text-navy-deep">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
