import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";
import { ProductListCard } from "@/components/ProductListCard";
import { lockProducts, discountPercent } from "@/lib/locks";

export default function LocksCatalogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-navy uppercase">
              מנעולים חכמים
            </p>
            <h1 className="mt-3 max-w-[26ch] text-[1.9rem]">
              4 דגמים, נבחרו ונבדקו על ידי המוקד
            </h1>
            <p className="mt-3 max-w-[60ch] text-gray">
              הדגמים מיוצרים על ידי Techom — יצרן מנעולים חכמים ישראלי, פיתוח
              ישראלי. המוקד היא חברה חיצונית שבוחרת את הדגמים לאחר בדיקה
              מעמיקה של השוק, מתקינה אותם בעצמה, ונותנת עליהם אחריות ושירות
              ישירים — בלי מתווכים.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <TrustBadge variant="light" label="שירות ישראלי ישיר" />
              <TrustBadge variant="light" label="אחריות שנתיים על המוצר וההתקנה" />
              <TrustBadge variant="light" label="התקנה ארצית מהירה" />
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {lockProducts.map((p) => (
                <ProductListCard
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  name={p.name}
                  tagline={p.tagline}
                  image={p.images?.[p.colors[0]?.id]}
                  fallbackGradient="linear-gradient(135deg, #234a6b, #1a3552)"
                  colors={p.colors}
                  ourPrice={p.ourPrice}
                  manufacturerPrice={p.manufacturerPrice}
                  discountPercent={discountPercent(p)}
                  badge={p.catalogBadge}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
