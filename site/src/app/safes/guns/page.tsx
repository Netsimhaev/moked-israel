import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gunSafeProducts.map((p) => (
                <div
                  key={p.slug}
                  className="flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)]"
                >
                  {p.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-[130px] w-full bg-white object-contain p-3"
                    />
                  ) : (
                    <div
                      className="h-[130px]"
                      style={{
                        background: "linear-gradient(135deg, #6b4a2c, #4a3220)",
                      }}
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-num text-[1.05rem] font-semibold text-navy-deep">
                      {p.name}
                    </h3>
                    <p className="flex-1 text-[0.85rem] text-gray">
                      {p.tagline}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="num text-[1.15rem] font-bold text-navy-deep">
                        ₪<bdi>{p.ourPrice.toLocaleString("he-IL")}</bdi>
                      </span>
                      <span className="num text-[0.85rem] text-gray line-through">
                        ₪<bdi>{p.manufacturerPrice.toLocaleString("he-IL")}</bdi>
                      </span>
                      <span className="rounded-full bg-brick/10 px-2 py-0.5 font-num text-[0.7rem] font-semibold text-brick">
                        <bdi>{safeDiscountPercent(p)}%</bdi>-
                      </span>
                    </div>
                    <p className="text-[0.78rem] text-gray">
                      מחיר הכספת בלבד — משלוח והתקנה בנפרד
                    </p>
                    <Link
                      href={`/safes/guns/${p.slug}`}
                      className="mt-2 inline-flex items-center gap-1.5 font-num text-[0.85rem] font-semibold text-navy"
                    >
                      לפרטי הדגם ←
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
