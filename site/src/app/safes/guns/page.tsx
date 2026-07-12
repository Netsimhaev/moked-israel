import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";
import { ProductListCard } from "@/components/ProductListCard";
import { gunSafeProducts, safeDiscountPercent } from "@/lib/safes";

export default function GunSafesCatalogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-navy uppercase">
              כספות נשק
            </p>
            <h1 className="mt-3 max-w-[26ch] text-[1.9rem]">
              בטיחות משפחתית, לא ציוד טקטי
            </h1>
            <p className="mt-3 max-w-[60ch] text-gray">
              הדגמים מיוצרים על ידי Techom — יצרן כספות ישראלי, פיתוח ישראלי.
              המוקד היא חברה חיצונית שבוחרת את הדגמים לאחר בדיקה מעמיקה של
              השוק, מתאמת משלוח והתקנה, ונותנת עליהם אחריות ושירות ישירים —
              בלי מתווכים.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <TrustBadge variant="light" label="עומדות בתקן העדכני" />
              <TrustBadge variant="light" label="שירות ישראלי ישיר" />
              <TrustBadge variant="light" label="אחריות מורחבת" />
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gunSafeProducts.map((p) => (
                <ProductListCard
                  key={p.slug}
                  href={`/safes/guns/${p.slug}`}
                  name={p.name}
                  tagline={p.tagline}
                  image={p.images?.[0]}
                  fallbackGradient="linear-gradient(135deg, #6b4a2c, #4a3220)"
                  ourPrice={p.ourPrice}
                  manufacturerPrice={p.manufacturerPrice}
                  discountPercent={safeDiscountPercent(p)}
                  priceNote="מחיר הכספת בלבד — משלוח והתקנה בנפרד"
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
