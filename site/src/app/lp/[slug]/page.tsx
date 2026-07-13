import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";
import { ProductLandingHero } from "@/components/ProductLandingHero";
import { ProductSpecSheet } from "@/components/ProductSpecSheet";
import { ProductChatWidget } from "@/components/ProductChatWidget";
import { ProductOrderForm } from "@/components/ProductOrderForm";
import { ProductFAQ } from "@/components/ProductFAQ";
import {
  getLandingPageProduct,
  landingPageProducts,
  categoryLabel,
} from "@/lib/landingPage";

export function generateStaticParams() {
  return landingPageProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getLandingPageProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${categoryLabel[product.category]} | המוקד`,
    description: product.tagline,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.media.images[0] ? [product.media.images[0]] : undefined,
    },
    // This page is a richer duplicate of the existing catalog page for the
    // same product (built for direct-link traffic, not search) — excluded
    // from search results to avoid the two surfaces competing for the same
    // queries, while staying crawlable for link equity. Flagged to
    // seo-agent as a decision to ratify, not a permanent silent default.
    robots: { index: false, follow: true },
  };
}

const manufacturerTrustCopy: Record<string, string> = {
  lock: "מיוצר על ידי Techom — יצרן מנעולים חכמים ישראלי, פיתוח ישראלי. המוקד היא חברה חיצונית שבחרה את הדגם לאחר בדיקה מעמיקה של השוק, מתקינה אותו בעצמה בבית שלכם, ונותנת עליו אחריות ושירות ישירים — כתובת אחת לכל שאלה, גם אחרי הרכישה.",
  "home-safe": "מיוצרת על ידי Techom — יצרן כספות ישראלי, פיתוח ישראלי. המוקד היא חברה חיצונית שבחרה את הדגם לאחר בדיקה מעמיקה של השוק, מתאמת משלוח והתקנה, ונותנת עליה אחריות ושירות ישירים.",
  "gun-safe": "מיוצרת על ידי Techom — יצרן כספות ישראלי, פיתוח ישראלי. המוקד היא חברה חיצונית שבחרה את הדגם לאחר בדיקה מעמיקה של השוק, מתאמת משלוח והתקנה, ונותנת עליה אחריות ושירות ישירים.",
};

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getLandingPageProduct(slug);
  if (!product) notFound();

  const trustCopy = manufacturerTrustCopy[product.category];

  return (
    <>
      {/* Minimal header, no category navigation — this page is promoted via
          paid traffic (Google/Facebook) for one specific product; a nav menu
          to other models/categories would just leak visitors away from it.
          Matches the same pattern already established in campaign/michal. */}
      <header className="border-b border-[var(--color-line)] py-4">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 sm:px-8">
          <Logo />
          <a
            href="tel:+97230000000"
            className="font-num text-[0.85rem] font-semibold text-navy"
          >
            📞 התקשרו עכשיו
          </a>
        </div>
      </header>
      <main>
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <ProductLandingHero product={product} />

            {trustCopy && (
              <div className="mt-8 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-5">
                <h3 className="font-num text-[1rem] font-semibold text-navy-deep">
                  מי מייצר, מי מתקין
                </h3>
                <p className="mt-2 text-[0.88rem] text-gray">{trustCopy}</p>
              </div>
            )}

            {product.problemStatement && (
              <div className="mt-14 max-w-[70ch] border-t border-[var(--color-line)] pt-10">
                <h2 className="text-[1.3rem]">{product.problemStatement.title}</h2>
                <p className="mt-3 text-[0.95rem] text-charcoal">
                  {product.problemStatement.body}
                </p>
              </div>
            )}

            {product.benefitTranslations.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[1.3rem]">איך זה עובד בשבילכם</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {product.benefitTranslations.map((b) => (
                    <div key={b.feature}>
                      <h3 className="font-num text-[0.95rem] font-semibold text-navy-deep">
                        {b.feature}
                      </h3>
                      <p className="mt-1.5 text-[0.88rem] text-gray">{b.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.category === "course" ? (
              <div className="mt-12">
                <h2 className="text-[1.3rem]">מה כלול בקורס</h2>
                <p className="mt-2 text-[0.85rem] text-gray">
                  כל הפרטים מבוססים על הסילבוס הרשמי — לא מומצא.
                </p>
              </div>
            ) : (
              product.specs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-[1.3rem]">מפרט טכני מלא</h2>
                  <p className="mt-2 text-[0.85rem] text-gray">
                    כל השורות מבוססות על המפרט המאומת של המוצר — לא מומצא.
                  </p>
                  <div className="mt-6">
                    <ProductSpecSheet specs={product.specs} />
                  </div>
                </div>
              )
            )}

            {product.bestFor && (
              <div className="mt-12 rounded-[var(--radius-m)] bg-cream/60 border border-[var(--color-line)] p-6">
                <h2 className="text-[1.15rem]">איפה {product.name} נמצא בקטלוג שלנו</h2>
                <p className="mt-3 text-[0.9rem] text-charcoal">{product.bestFor}</p>
              </div>
            )}

            {product.standardNote && (
              <div className="mt-12 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-cream p-6">
                <h2 className="text-[1.15rem]">תקן ורישוי</h2>
                <p className="mt-3 text-[0.9rem] text-charcoal">{product.standardNote}</p>
              </div>
            )}

            {product.disclaimer && (
              <p className="mt-8 text-[0.82rem] text-gray">{product.disclaimer}</p>
            )}

            {product.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="text-[1.3rem]">שאלות שכדאי לשאול לפני שמזמינים</h2>
                <div className="mt-6 max-w-[70ch]">
                  <ProductFAQ items={product.faq} />
                </div>
              </div>
            )}

            <div className="mt-12 max-w-[70ch]">
              <ProductChatWidget slug={product.slug} productName={product.name} />
            </div>

            <div id="lead" className="mt-12 scroll-mt-24 max-w-[560px]">
              <h2 className="text-[1.3rem]">
                רוצים שנציג יחזור אליכם ויסביר על {product.name}?
              </h2>
              <p className="mt-2 text-[0.9rem] text-gray">
                השאירו פרטים ונחזור אליכם עם כל המידע שצריך כדי להחליט —
                בלי התחייבות.
              </p>
              <div className="mt-6">
                <ProductOrderForm
                  productSlug={product.slug}
                  productName={product.name}
                  colors={product.colors}
                  submitLabel="השאירו פרטים — נציג יחזור אליכם"
                  showUpdatesOptIn
                />
              </div>
              <p className="mt-3 text-center text-[0.85rem]">
                <a
                  href={`https://wa.me/972500000000?text=${encodeURIComponent(
                    `היי, יש לי שאלה לגבי ${product.name}`,
                  )}`}
                  className="text-navy underline"
                >
                  עדיין שוקלים? דברו איתנו בוואטסאפ
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}