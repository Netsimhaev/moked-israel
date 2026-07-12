import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// מסלול נוסף יתווסף כאן כשיהיה תוכן אמיתי לו — לא להוסיף כרטיס placeholder.
const courses = [
  {
    slug: "lock-installation",
    title: "התקנה ותכנות מנעולים חכמים",
    duration: "7 פרקים · 24 שיעורים",
    level: "מתחילים ומנעולנים מוסמכים",
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

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {courses.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)]"
                >
                  <div
                    className="h-[110px]"
                    style={{
                      background: "linear-gradient(135deg, #b8863a, #8a5f2a)",
                    }}
                  />
                  <div className="flex flex-1 flex-col gap-2 p-5.5">
                    <h3 className="font-num text-[1.1rem] font-semibold text-navy-deep">
                      {c.title}
                    </h3>
                    <p className="text-[0.85rem] text-gray">
                      {c.duration} · {c.level}
                    </p>
                    <Link
                      href={`/courses/${c.slug}`}
                      className="mt-2 inline-flex items-center gap-1.5 font-num text-[0.85rem] font-semibold text-navy"
                    >
                      לפרטי הקורס ←
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
