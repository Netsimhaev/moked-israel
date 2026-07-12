import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {lockProducts.map((p) => (
                <div
                  key={p.slug}
                  className="flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)]"
                >
                  {p.images?.[p.colors[0]?.id] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[p.colors[0].id]}
                      alt={p.name}
                      className="h-[130px] w-full bg-white object-contain p-3"
                    />
                  ) : (
                    <div
                      className="h-[130px]"
                      style={{
                        background: "linear-gradient(135deg, #234a6b, #1a3552)",
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
                    <div className="flex items-center gap-2">
                      {p.colors.map((c) => (
                        <span
                          key={c.id}
                          title={c.label}
                          className="h-4 w-4 rounded-full border border-[var(--color-line)]"
                          style={{ background: c.swatch }}
                        />
                      ))}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="num text-[1.15rem] font-bold text-navy-deep">
                        ₪<bdi>{p.ourPrice.toLocaleString("he-IL")}</bdi>
                      </span>
                      <span className="num text-[0.85rem] text-gray line-through">
                        ₪<bdi>{p.manufacturerPrice.toLocaleString("he-IL")}</bdi>
                      </span>
                      <span className="rounded-full bg-brick/10 px-2 py-0.5 font-num text-[0.7rem] font-semibold text-brick">
                        <bdi>{discountPercent(p)}%</bdi>-
                      </span>
                    </div>
                    <Link
                      href={`/product/${p.slug}`}
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
