import Link from "next/link";
import Image from "next/image";

// Shared catalog-listing card for /locks, /safes/home, /safes/guns — these
// three pages used to each hand-roll a near-identical card; consolidated
// here so a visual/trust update lands on all three catalogs at once.
export function ProductListCard({
  href,
  name,
  tagline,
  image,
  fallbackGradient,
  colors,
  ourPrice,
  manufacturerPrice,
  discountPercent,
  priceNote,
  badge,
}: {
  href: string;
  name: string;
  tagline: string;
  image?: string;
  fallbackGradient: string;
  colors?: { id: string; label: string; swatch: string }[];
  ourPrice: number;
  manufacturerPrice: number;
  discountPercent: number;
  priceNote?: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[0_4px_10px_rgba(18,40,61,0.1),0_16px_36px_rgba(18,40,61,0.14)]"
    >
      <div className="relative h-[200px] w-full overflow-hidden bg-white">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full" style={{ background: fallbackGradient }} />
        )}
        {badge && (
          <span className="absolute top-3 right-3 rounded-full bg-gold px-3 py-1 font-num text-[0.7rem] font-semibold text-navy-deep shadow-[var(--shadow-card)]">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-num text-[1.05rem] font-semibold text-navy-deep">
          {name}
        </h3>
        <p className="flex-1 text-[0.85rem] text-gray">{tagline}</p>

        {colors && colors.length > 0 && (
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <span
                key={c.id}
                title={c.label}
                className="h-4 w-4 rounded-full border border-[var(--color-line)]"
                style={{ background: c.swatch }}
              />
            ))}
          </div>
        )}

        <div className="mt-1 flex items-baseline gap-2">
          <span className="num text-[1.15rem] font-bold text-navy-deep">
            ₪<bdi>{ourPrice.toLocaleString("he-IL")}</bdi>
          </span>
          <span className="num text-[0.85rem] text-gray line-through">
            ₪<bdi>{manufacturerPrice.toLocaleString("he-IL")}</bdi>
          </span>
          <span className="rounded-full bg-brick/10 px-2 py-0.5 font-num text-[0.7rem] font-semibold text-brick">
            <bdi>{discountPercent}%</bdi>-
          </span>
        </div>
        {priceNote && <p className="text-[0.78rem] text-gray">{priceNote}</p>}

        <span className="mt-2 inline-flex items-center gap-1.5 font-num text-[0.85rem] font-semibold text-navy">
          לפרטי הדגם ←
        </span>
      </div>
    </Link>
  );
}
