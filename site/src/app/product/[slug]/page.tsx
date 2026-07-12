import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductFAQ } from "@/components/ProductFAQ";
import { ModelComparisonTable } from "@/components/ModelComparisonTable";
import { ProductHeroGallery } from "@/components/ProductHeroGallery";
import { lockProducts, getLockBySlug, discountPercent } from "@/lib/locks";

export function generateStaticParams() {
  return lockProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getLockBySlug(slug);
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
              <Link href="/locks" className="text-navy-deep">
                מנעולים חכמים
              </Link>{" "}
              &gt; <b className="text-navy-deep">{product.name}</b>
            </p>

            <ProductHeroGallery
              product={product}
              discountPercent={discountPercent(product)}
            />

            {/* ============ הבעיה שהמוצר פותר ============ */}
            <div className="mt-14 max-w-[70ch] border-t border-[var(--color-line)] pt-10">
              <h2 className="text-[1.3rem]">{product.problemStatement.title}</h2>
              <p className="mt-3 text-[0.95rem] text-charcoal">
                {product.problemStatement.body}
              </p>
            </div>

            {/* ============ איך זה עובד — יתרונות מתורגמים לתועלת ============ */}
            <div className="mt-12">
              <h2 className="text-[1.3rem]">איך זה עובד בשבילכם</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {product.benefitTranslations.map((b) => (
                  <div key={b.feature}>
                    <h3 className="font-num text-[0.95rem] font-semibold text-navy-deep">
                      {b.feature}
                    </h3>
                    <p className="mt-1.5 text-[0.88rem] text-gray">
                      {b.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ============ למי זה מתאים בול (רק אם קיים תוכן אמיתי) ============ */}
            {product.bestFor && (
              <div className="mt-12 rounded-[var(--radius-m)] bg-cream/60 border border-[var(--color-line)] p-6">
                <h2 className="text-[1.15rem]">איפה {product.name} נמצא בקטלוג שלנו</h2>
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
                <ModelComparisonTable currentSlug={product.slug} />
              </div>
            </div>

            {/* ============ הוכחה חברתית ============ */}
            {/* TODO: אין עדיין עדות לקוח אמיתית ל-{product.name} — להוסיף כאן
                ציטוט אמיתי אחרי ההתקנות הראשונות. אין להמציא שם/ציטוט/דירוג,
                ראה product-page-agent/{product.slug}.md */}

            {/* ============ מענה להתנגדויות ============ */}
            {product.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[1.3rem]">שאלות שכדאי לשאול לפני שמזמינים</h2>
                <div className="mt-6 max-w-[70ch]">
                  <ProductFAQ items={product.faq} />
                </div>
              </div>
            )}

            {/* ============ איך ההזמנה וההתקנה עובדות ============ */}
            <div className="mt-12 mb-4 max-w-[70ch]">
              <h2 className="text-[1.3rem]">מהרגע שהזמנתם ועד שהמנעול על הדלת</h2>
              <ol className="mt-4 flex flex-col gap-2.5 text-[0.9rem] text-charcoal">
                <li>1. ממלאים את הטופס למעלה (שם, טלפון, אזור מגורים).</li>
                <li>2. ניצור קשר תוך יום עסקים לתיאום מועד התקנה שנוח לכם.</li>
                <li>
                  3. טכנאי מטעם המוקד מגיע, מתקין ומדריך אתכם על השימוש בבית.
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
