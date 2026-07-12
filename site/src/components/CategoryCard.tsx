import Image from "next/image";

type Category = "locks" | "safes" | "guns" | "courses" | "robotics";

// Gradients stay within the brand's navy/copper/gold family — see
// design-agent/brand-identity.md §6. "robotics" deliberately avoids cold
// gray/blue-neon so it doesn't break the warm tone of the rest of the brand.
// Used as a fallback for categories without real product photography yet
// (courses, robotics) and as the loading backdrop behind real photos.
const mediaGradient: Record<Category, string> = {
  locks: "linear-gradient(135deg, #234a6b, #1a3552)",
  safes: "linear-gradient(135deg, #2c5a4a, #1f3f36)",
  guns: "linear-gradient(135deg, #6b4a2c, #4a3220)",
  courses: "linear-gradient(135deg, #b8863a, #8a5f2a)",
  robotics: "linear-gradient(135deg, #2f5163, #17303d)",
};

export function CategoryCard({
  category,
  title,
  usp,
  href,
  linkLabel = "לצפייה בדגמים",
  image,
}: {
  category: Category;
  title: string;
  usp: string;
  href: string;
  linkLabel?: string;
  image?: string;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)]">
      <a
        href={href}
        aria-label={title}
        className="relative block h-[190px] overflow-hidden"
        style={{ background: mediaGradient[category] }}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </a>
      <div className="flex flex-1 flex-col gap-2.5 p-5.5">
        <h3 className="font-num text-[1.2rem] font-semibold text-navy-deep">
          {title}
        </h3>
        <p className="flex-1 text-[0.9rem] text-gray">{usp}</p>
        <a
          href={href}
          className="mt-1 inline-flex items-center gap-1.5 font-num text-[0.85rem] font-semibold text-navy"
        >
          {linkLabel} ←
        </a>
      </div>
    </div>
  );
}
