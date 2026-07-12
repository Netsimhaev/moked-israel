import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RegulationPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[760px] px-6 py-16 sm:px-8">
        <h1 className="text-[1.7rem]">מידע רגולטורי — כספות נשק</h1>
        <p className="mt-4 text-[0.95rem] text-gray">
          עמוד זה הוא placeholder — פרטי ההיתר/תקן המשטרתי המדויקים יתווספו
          כאן בתיאום עם security-compliance-agent לפני שקה (ראה roadmap.md:
          קיים היתר/תקן משטרתי מאומת, טרם מפורסם באתר).
        </p>
      </main>
      <Footer />
    </>
  );
}
