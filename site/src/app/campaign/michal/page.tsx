import Image from "next/image";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Button } from "@/components/Button";
import { LeadForm } from "@/components/LeadForm";

// Per wireframes.md §3: single CTA throughout, minimal header (no full nav),
// no footer navigation — the page's only job is conversion for the "מיכל" persona.
export default function MichalCampaignPage() {
  return (
    <main>
      <MinimalHeader maxWidth="900px" />

      <section className="bg-cream py-14 text-center sm:py-16">
        <div className="mx-auto max-w-[700px] px-6">
          <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-brick">
            שמעתם על עוד פריצה בשכונה?
          </p>
          <h1 className="mx-auto mt-3.5 max-w-[20ch] text-[1.7rem] sm:text-[1.9rem]">
            שקט נפשי לבית מתחיל במנעול שבודקים אליו כל פרט
          </h1>
          <p className="mx-auto mt-3.5 max-w-[46ch] text-gray">
            גם בלי אינטרנט וגם בלי סוללה — לעולם לא נשארים ננעלים בחוץ.
            מנעול שבחרנו ובדקנו בעצמנו, עם התקנה וליווי אישי מהמוקד עצמו.
          </p>
          <div className="mt-7 flex justify-center">
            <Button variant="primary" href="#lead">
              קבלו הצעת מחיר תוך יום עסקים
            </Button>
          </div>
          <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-[560px] overflow-hidden rounded-[var(--radius-l)] shadow-[var(--shadow-card)]">
            <Image
              src="/images/locks/category-hero.png"
              alt="מנעול חכם מותקן בכניסה לבית"
              fill
              priority
              sizes="(min-width: 640px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-white py-7">
        <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-8 px-6 text-center">
          <div className="max-w-[220px] text-[0.85rem] text-gray">
            <b className="block font-num text-navy-deep">
              אף פעם לא ננעלים בחוץ
            </b>
            גיבוי מכני וסוללה חיצונית זמינה בכל רגע — גם אם נגמר החשמל או
            האינטרנט, נכנסים הביתה כרגיל.
          </div>
          <div className="max-w-[220px] text-[0.85rem] text-gray">
            <b className="block font-num text-navy-deep">
              מי שמתקין הוא מי שאחראי
            </b>
            הטכנאי שמגיע הביתה הוא איש צוות של המוקד עצמו, לא קבלן זר.
          </div>
          <div className="max-w-[220px] text-[0.85rem] text-gray">
            <b className="block font-num text-navy-deep">
              כתובת אחת לכל שאלה
            </b>
            אחריות שנתיים על המוצר ועל ההתקנה, ומוקד שירות זמין — גם אחרי הרכישה.
          </div>
        </div>
      </section>

      <section id="lead" className="py-14 sm:py-16">
        <div className="mx-auto max-w-[460px] px-6 text-center">
          <h2 className="text-[1.3rem]">קבלו הצעת מחיר מותאמת לבית שלכם</h2>
          <p className="mt-2 text-[0.9rem] text-gray">
            השאירו כמה פרטים ונחזור אליכם עם ההמלצה המתאימה — בלי
            התחייבות.
          </p>
          <div className="mt-6 text-right">
            <LeadForm
              source="campaign-michal"
              submitLabel="קבלו הצעת מחיר תוך יום עסקים"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--color-line)] py-6 text-center text-[0.78rem] text-gray">
        <a href="/privacy">מדיניות פרטיות</a> · המוקד © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
