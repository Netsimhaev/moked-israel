import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BuyNowButton } from "@/components/BuyNowButton";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ProductOrderForm } from "@/components/ProductOrderForm";
import { ProductFAQ } from "@/components/ProductFAQ";
import { HomeSafeComparisonTable } from "@/components/HomeSafeComparisonTable";
import { SafeImageGallery } from "@/components/SafeImageGallery";
import {
  homeSafeProducts,
  getHomeSafeBySlug,
  homeSafeDiscountPercent,
} from "@/lib/homeSafes";

export function generateStaticParams() {
  return homeSafeProducts.map((p) => ({ slug: p.slug }));
}

export default async function HomeSafePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getHomeSafeBySlug(slug);
  if (!product) notFound();

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
              <Link href="/safes/home" className="text-navy-deep">
                כספות ביתיות
              </Link>{" "}
              &gt; <b className="text-navy-deep">{product.name}</b>
            </p>

            <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr]">
              <div>
                <SafeImageGallery
                  images={product.images}
                  productName={product.name}
                  fallbackGradient="linear-gradient(135deg, #2c5a4a, #1f3f36)"
                />

                <div className="mt-8 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-5">
                  <h3 className="font-num text-[1rem] font-semibold text-navy-deep">
                    מי מייצר, מי מתקין
                  </h3>
                  <p className="mt-2 text-[0.88rem] text-gray">
                    {product.name} מיוצרת על ידי Techom — יצרן כספות ישראלי,
                    פיתוח ישראלי. המוקד היא חברה חיצונית שבחרה את הדגם לאחר
                    בדיקה מעמיקה של השוק, מתאמת משלוח והתקנה, ונותנת עליה
                    אחריות ושירות ישירים — כתובת אחת לכל שאלה, גם אחרי
                    הרכישה.
                  </p>
                </div>
              </div>

              <div>
                <h1 className="text-[1.5rem]">{product.name}</h1>
                <p className="mt-1.5 text-[0.92rem] text-gray">
                  {product.tagline}
                </p>

                <div className="mt-4">
                  <PriceDisplay
                    manufacturerPrice={product.manufacturerPrice}
                    ourPrice={product.ourPrice}
                    discountPercent={homeSafeDiscountPercent(product)}
                    note="מחיר מחירון היצרן מול מחיר המוקד — מחיר הכספת בלבד, משלוח והתקנה בנפרד"
                  />
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.82rem]">
                    <span className="rounded-full bg-cream px-3 py-1.5 text-charcoal">
                      משלוח: <b className="font-num">₪{product.shippingPrice}</b>
                    </span>
                    <span className="rounded-full bg-cream px-3 py-1.5 text-charcoal">
                      התקנה מקצועית: <b className="font-num">₪{product.installationPrice}</b>
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-[0.92rem] text-charcoal">
                  {product.description}
                </p>

                <ul className="mt-5 flex flex-col gap-2 text-[0.9rem]">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <span className="flex-none font-bold text-sage">
                        ✓
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <BuyNowButton slug={product.slug} variant="hero" />
                  <ProductOrderForm
                    productSlug={product.slug}
                    productName={product.name}
                    colors={product.colors}
                    submitLabel="יש לי שאלה לפני שרוכשים — השאירו פרטים"
                  />
                  <p className="mt-3 text-center text-[0.85rem]">
                    <a
                      href={`https://wa.me/972500000000?text=${encodeURIComponent(
                        `היי, יש לי שאלה לגבי ${product.name}`,
                      )}`}
                      className="text-navy underline"
                    >
                      עדיין שוקלים? דברו איתנו בוואטסאפ לפני ההזמנה
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* ============ הבעיה שהמוצר פותר ============ */}
            <div className="mt-14 max-w-[70ch] border-t border-[var(--color-line)] pt-10">
              <h2 className="text-[1.3rem]">{product.problemStatement.title}</h2>
              <p className="mt-3 text-[0.95rem] text-charcoal">
                {product.problemStatement.body}
              </p>
            </div>

            {/* ============ מפרט טכני ============ */}
            <div className="mt-12">
              <h2 className="text-[1.3rem]">מפרט טכני</h2>
              <p className="mt-2 text-[0.85rem] text-gray">
                כל השורות מבוססות על דף המוצר הרשמי של Techom — לא מומצא.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-[0.9rem]">
                  <tbody>
                    {product.specs.map((s) => (
                      <tr key={s.label}>
                        <td className="border-b border-[var(--color-line)] py-2.5 text-gray">
                          {s.label}
                        </td>
                        <td className="border-b border-[var(--color-line)] py-2.5 text-start font-num font-semibold text-navy-deep">
                          {s.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ============ למי הדגם מתאים בול ============ */}
            {product.bestFor && (
              <div className="mt-12 rounded-[var(--radius-m)] bg-cream/60 border border-[var(--color-line)] p-6">
                <h2 className="text-[1.15rem]">איפה {product.name} נמצאת בקטלוג שלנו</h2>
                <p className="mt-3 text-[0.9rem] text-charcoal">
                  {product.bestFor}
                </p>
              </div>
            )}

            {/* ============ השוואת דגמים ============ */}
            <div className="mt-12">
              <h2 className="text-[1.3rem]">השוואת דגמים</h2>
              <p className="mt-2 text-[0.85rem] text-gray">
                כל השורות מבוססות על המפרט המאומת של כל דגם — לא מומצא.
              </p>
              <div className="mt-6">
                <HomeSafeComparisonTable currentSlug={product.slug} />
              </div>
            </div>

            {/* ============ הוכחה חברתית ============ */}
            {/* TODO: אין עדיין עדות לקוח אמיתית לכספות הבית — להוסיף כאן
                ציטוט אמיתי אחרי המכירות הראשונות. אין להמציא שם/ציטוט/דירוג,
                ראה product-page-agent/ib250.md, sc250.md, bsa250.md */}

            {/* ============ מענה להתנגדויות ============ */}
            {product.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[1.3rem]">שאלות שכדאי לשאול לפני שמזמינים</h2>
                <div className="mt-6 max-w-[70ch]">
                  <ProductFAQ items={product.faq} />
                </div>
              </div>
            )}

            {/* ============ איך ההזמנה עובדת ============ */}
            <div className="mt-12 mb-4 max-w-[70ch]">
              <h2 className="text-[1.3rem]">מהרגע שהזמנתם ועד שהכספת בבית</h2>
              <ol className="mt-4 flex flex-col gap-2.5 text-[0.9rem] text-charcoal">
                <li>1. ממלאים את הטופס למעלה (שם, טלפון, אזור מגורים).</li>
                <li>
                  2. ניצור קשר תוך יום עסקים לתיאום משלוח בלבד או משלוח +
                  התקנה מקצועית — כפי שיתאים לכם.
                </li>
                <li>
                  3. אם בחרתם בהתקנה — טכנאי מטעם המוקד מגיע ומעגן את הכספת
                  לקיר או לרצפה בעצמו.
                </li>
                <li>4. מקבלים אחריות ישירות מהמוקד — כתובת אחת לכל שאלה.</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
