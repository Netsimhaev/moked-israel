import Link from "next/link";

// Confirmed direction ("האור במוקד") per brand-identity.md §3 — the pulsing
// gold point above the ו is the brand's signature motif. Keep it to this
// component and the hero; do not scatter it across every section.
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={`relative inline-block font-display text-[1.6rem] font-bold ${dark ? "text-cream" : "text-navy-deep"}`}
    >
      המוקד
      <span
        className="window-lit absolute -top-1.5 left-[38%] h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_10px_2px_rgba(217,162,76,0.55)] [animation:window-breathe_3.6s_ease-in-out_infinite]"
        aria-hidden
      />
    </Link>
  );
}
