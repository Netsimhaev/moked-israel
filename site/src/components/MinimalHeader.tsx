import { Logo } from "./Logo";

// Shared by every single-purpose funnel page (lp/[slug], checkout/[slug] +
// its success page, campaign/michal): logo + phone CTA only, no category
// nav — a full nav menu here would just leak visitors out of the funnel
// they're already in. Was duplicated inline in 4 places before this extraction.
export function MinimalHeader({
  maxWidth = "1180px",
}: {
  maxWidth?: "1180px" | "900px";
}) {
  return (
    <header className="border-b border-[var(--color-line)] py-4">
      <div
        className={`mx-auto flex items-center justify-between px-6 ${
          maxWidth === "1180px" ? "max-w-[1180px] sm:px-8" : "max-w-[900px]"
        }`}
      >
        <Logo />
        <a
          href="tel:+97230000000"
          className="font-num text-[0.85rem] font-semibold text-navy"
        >
          📞 התקשרו עכשיו
        </a>
      </div>
    </header>
  );
}
