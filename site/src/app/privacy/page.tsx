import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[760px] px-6 py-16 sm:px-8">
        <h1 className="text-[1.7rem]">מדיניות פרטיות</h1>
        <p className="mt-4 text-[0.95rem] text-gray">
          עמוד זה הוא placeholder — הנוסח המשפטי הסופי ייקבע בתיאום עם
          security-compliance-agent לפני שקה.
        </p>
      </main>
      <Footer />
    </>
  );
}
