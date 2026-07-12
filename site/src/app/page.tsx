import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { TrustBadge } from "@/components/TrustBadge";
import { NightHero } from "@/components/NightHero";
import { CategoryCard } from "@/components/CategoryCard";
import { DiffItem, IsraelFlagIcon } from "@/components/DiffItem";
import { Testimonial } from "@/components/Testimonial";
import { LeadForm } from "@/components/LeadForm";
import { InstallShowcase } from "@/components/InstallShowcase";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-navy-deep py-16 text-cream sm:py-24">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 sm:grid-cols-[1.05fr_0.95fr] sm:gap-12 sm:px-8">
            <div>
              <p className="mb-4 font-num text-[0.78rem] tracking-[0.1em] text-gold uppercase">
                המוקד · אבטחה חכמה לבית הישראלי
              </p>
              <h1 className="text-[1.85rem] leading-[1.25] text-cream sm:text-[2.6rem] sm:leading-[1.2]">
                המוקד הישראלי לאבטחה: בוחרים, מתקינים, ואחראים — הכל תחת קורת
                גג אחת.
              </h1>
              <p className="mt-4 max-w-[46ch] text-[1.05rem] text-cream/78">
                מנעולים חכמים וכספות שנבחרו ונבדקו על ידינו, עם התקנה ארצית
                ואחריות מורחבת — בלי לרדוף אחרי יבואן, מתקין, ומוקד שירות
                בנפרד.
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button variant="primary" href="#leads">
                  בדקו מה מתאים לבית שלכם
                </Button>
                <Button variant="ghost" href="https://wa.me/972500000000">
                  דברו איתנו בוואטסאפ
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <TrustBadge label="שירות ישראלי ישיר" />
                <TrustBadge label="אחריות מורחבת" />
                <TrustBadge label="התקנה ארצית מהירה" />
              </div>
            </div>
            <NightHero />
          </div>
        </section>

        {/* ================= CATEGORIES ================= */}
        <section className="border-b border-[var(--color-line)] py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div id="locks">
                <CategoryCard
                  category="locks"
                  title="מנעולים חכמים"
                  usp="הטכנולוגיה המאובטחת ביותר, בדלת שלכם — עם גיבוי מלא גם בלי סוללה וגם בלי אינטרנט."
                  href="/locks"
                  image="/images/locks/category-hero.png"
                />
              </div>
              <div id="safes">
                <CategoryCard
                  category="safes"
                  title="כספות ביתיות"
                  usp="מקום בטוח למה שחשוב - מסמכים, תכשיטים וזיכרונות, בכספת שמתאימה לבית שלכם."
                  href="/safes/home"
                  linkLabel="לכספות הביתיות שלנו"
                  image="/images/safes/home/category-hero.png"
                />
              </div>
              <div id="guns">
                <CategoryCard
                  category="guns"
                  title="כספות נשק"
                  usp="בטיחות משפחתית, לא ציוד טקטי — עומדות בתקן, מותקנות בבית שלכם תוך ימים ספורים."
                  href="/safes/guns"
                  linkLabel="לכספות הנשק שלנו"
                  image="/images/safes/guns/model-f/hero.jpg"
                />
              </div>
              <div id="courses">
                <CategoryCard
                  category="courses"
                  title="קורסים והכשרות"
                  usp="הכשרה מטעם החברה שבאמת מתקינה — לימודי התקנה ותכנות מנעולים חכמים ממי שעושה את זה בשטח."
                  href="/courses"
                  linkLabel="לפרטי הקורסים"
                />
              </div>
              <div id="robotics">
                <CategoryCard
                  category="robotics"
                  title="רובוטיקה מבוססת AI"
                  usp="רובוטים תעשייתיים ודמויי-אדם, מנוהלים בפלטפורמת בקרה שפיתחנו בעצמנו בישראל."
                  href="/robotics"
                  linkLabel="בקשו הצעת מחיר"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= INSTALL PROOF ================= */}
        <InstallShowcase />

        {/* ================= WHY ================= */}
        <section
          id="why"
          className="border-b border-[var(--color-line)] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <h2 className="text-[1.9rem]">למה המוקד</h2>
            <div className="mt-11 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              <DiffItem
                icon={<IsraelFlagIcon />}
                title="שירות ישראלי ישיר"
                description="מהבחירה של הדגם ועד ההתקנה בבית שלכם — הכל מתבצע ישירות על ידי צוות המוקד, בלי שרשרת מתווכים."
              />
              <DiffItem
                icon="⚙️"
                title="הכל תחת קורת גג אחת"
                description="מוצר, התקנה, אחריות ושירות — מגיעים מאותה חברה. יש כתובת אחת לפנות אליה, תמיד."
              />
              <DiffItem
                icon="🚚"
                title="פריסה ארצית וזמינות מהירה"
                description="מוקד המתקינים שלנו פרוס בכל הארץ, עם יעד להתקנה תוך 48–72 שעות מרגע התיאום."
              />
              <DiffItem
                icon="💬"
                title="שקיפות מחיר מלאה"
                description='המחיר מוצג מראש, כולל התקנה — בלי "השאירו פרטים ונחזור עם הצעה", בלי אותיות קטנות.'
              />
            </div>
          </div>
        </section>

        {/* ================= TRANSPARENCY ================= */}
        <section className="border-b border-[var(--color-line)] bg-navy-deep py-16 text-cream sm:py-20">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <div className="grid gap-10 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
              <div>
                <h2 className="text-[1.7rem] text-cream">מי מייצר, מי מתקין — בלי לערבב</h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-cream/78">
                  המנעולים והכספות שלנו מיוצרים על ידי Techom — יצרן ישראלי
                  עצמאי, פיתוח ישראלי. המוקד היא חברה חיצונית שבודקת את השוק
                  לעומק, בוחרת את הדגמים שאנחנו עומדים מאחוריהם, מתקינה אותם
                  בעצמה בבית שלכם, ונותנת עליהם אחריות ושירות ישירים.
                </p>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-cream/78">
                  כתובת אחת לכל שאלה — לפני ההזמנה, ביום ההתקנה, ובכל יום
                  שאחריו.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[var(--radius-m)] border border-cream/15 bg-cream/[0.05] p-5">
                  <p className="font-num text-[0.8rem] tracking-[0.08em] text-gold uppercase">
                    היצרן
                  </p>
                  <p className="mt-2 text-[0.9rem] text-cream/85">
                    Techom — יצרן מנעולים וכספות ישראלי, אחראי על הפיתוח
                    והייצור של המוצר עצמו.
                  </p>
                </div>
                <div className="rounded-[var(--radius-m)] border border-cream/15 bg-cream/[0.05] p-5">
                  <p className="font-num text-[0.8rem] tracking-[0.08em] text-gold uppercase">
                    המוקד
                  </p>
                  <p className="mt-2 text-[0.9rem] text-cream/85">
                    בוחרים את הדגם אחרי בדיקה מעמיקה, מתקינים בעצמנו, ואחראים
                    על האחריות והשירות מקצה לקצה.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="border-b border-[var(--color-line)] py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <h2 className="text-[1.9rem]">הוכחה חברתית</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <Testimonial
                name="מיכל ל."
                place="רעננה"
                quote="אחרי פריצה בשכונה שלנו התחלתי לחפש מנעול חכם, אבל כל מה שמצאתי הרגיש כמו עוד גאדג'ט. מה שכבש אותי אצל המוקד זו התשובה הפשוטה לשאלה שהכי הפחידה אותי — מה קורה כשנגמרת הסוללה. הראו לי בדיוק איך זה עובד לפני שהתקינו, והטכנאי שהגיע היה סבלני והסביר לילדים שלי איך להזין קוד. היום זה פשוט חלק מהבית."
              />
              {/* TODO: זו עדות המחשה (persona-based), לא לקוח אמיתי — אין
                  עדיין מכירת כספות נשק בפועל. יש להחליף בעדות אמיתית לאחר
                  ההזמנות הראשונות של מודל F, או להסיר את הסעיף עד אז.
                  ה-claim התקני עודכן 2026-07-09 כדי להתאים לניסוח המאומת של
                  Techom (ראה lib/safes.ts) — לא "תקן משטרת ישראל" כפי שנכתב
                  קודם, שאינו הניסוח המדויק של היצרן. */}
              <Testimonial
                name="אבינועם כ."
                place="מודיעין"
                quote="כבעל רישיון נשק הייתי צריך כספת שעומדת בתקן בלי פשרות, אבל גם לא רציתי שהסלון שלי ייראה כמו מחסן ציוד. לפי היצרן, הכספת עומדת בתקן המעודכן לכספות נשק ובדרישות אגף הירייה, והיא נראית כמו רהיט בית רגיל — וזה בדיוק מה שרציתי בבית עם ילדים. התיאום וההתקנה היו מהירים בהרבה ממה שציפיתי."
              />
              <Testimonial
                name="רונן פ."
                place="בעל עסק, פתח תקווה"
                quote="יש לי חנות עם כמה עובדים במשמרות, וניהול מפתחות היה סיוט אמיתי. עברתי למנעול חכם של המוקד עם קודים נפרדים לכל עובד, ופשוט מבטלים קוד באפליקציה כשמישהו עוזב. כשהייתה תקלה קטנה, טכנאי הגיע באותו יום."
              />
            </div>
          </div>
        </section>

        {/* ================= CTA BAND ================= */}
        <section id="leads" className="py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <div
              className="flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius-l)] p-8 sm:p-11"
              style={{
                background:
                  "linear-gradient(120deg, var(--color-copper), var(--color-gold))",
              }}
            >
              <div>
                <h3 className="text-[1.4rem] text-navy-deep">
                  שקט נפשי לבית שלכם מתחיל בשיחה קצרה
                </h3>
                <p className="mt-1.5 text-charcoal/75">
                  השאירו שם וטלפון ונחזור אליכם עם ההמלצה המתאימה לבית או
                  לעסק שלכם.
                </p>
              </div>
              <LeadForm
                variant="inline"
                source="homepage-cta"
                submitLabel="שלחו לי הצעה"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
