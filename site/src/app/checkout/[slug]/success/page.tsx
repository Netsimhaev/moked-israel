import Link from "next/link";
import { notFound } from "next/navigation";
import { MinimalHeader } from "@/components/MinimalHeader";
import { Footer } from "@/components/Footer";
import { getCheckoutItem } from "@/lib/checkout";

// Shown after Cardcom redirects back post-payment. The webhook confirmation
// (/api/checkout/callback) may arrive slightly after this redirect — this
// page deliberately does not claim 100% certainty tied to DB state that may
// not exist yet, it just confirms the redirect happened successfully.
export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCheckoutItem(slug);
  if (!item) notFound();

  return (
    <>
      <MinimalHeader />
      <main>
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-[560px] px-6 text-center sm:px-8">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-[1.6rem] text-sage">
              ✓
            </span>
            <h1 className="mt-5 text-[1.6rem]">תודה על הרכישה!</h1>
            <p className="mt-3 text-[0.95rem] text-charcoal">
              קיבלנו את ההזמנה שלכם עבור {item.name}. אישור סופי וחשבונית
              יישלחו למייל תוך דקות, וניצור קשר תוך יום עסקים לתיאום
              {item.category === "course" ? " ההרשמה" : " המשלוח וההתקנה"}.
            </p>
            <p className="mt-6 text-[0.85rem]">
              <a
                href={`https://wa.me/972500000000?text=${encodeURIComponent(
                  `היי, סיימתי לרכוש את ${item.name} ורציתי לוודא שהכל תקין`,
                )}`}
                className="text-navy underline"
              >
                יש שאלה על ההזמנה? דברו איתנו בוואטסאפ
              </a>
            </p>
            <Link
              href="/"
              className="mt-8 inline-block font-num text-[0.9rem] font-semibold text-navy"
            >
              חזרה לעמוד הבית ←
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
