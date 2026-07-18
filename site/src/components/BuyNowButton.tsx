import Link from "next/link";

// Primary purchase CTA — pure navigation to the dedicated checkout page for
// this product, not a form. Sits above the existing ProductOrderForm/LeadForm
// lead-capture CTA on every product page (that one stays as a secondary
// "have a question first?" path — not replaced, not deleted).
export function BuyNowButton({
  slug,
  selectedColorId,
  bundleSlug,
  label = "קנו עכשיו — תשלום מאובטח",
  variant = "primary",
  microcopy = "תשלום מאובטח · משלוח והתקנה מתואמים · אחריות יבואן רשמי",
}: {
  slug: string;
  selectedColorId?: string;
  // Preselects a bundle addon on the checkout page (any valid product pair,
  // not just the fixed organic default — see lib/crossSell.ts). Not used by
  // any page today; added so the AI sales agent's checkout links and a
  // future in-page bundle CTA share the same query param convention.
  bundleSlug?: string;
  label?: string;
  variant?: "primary" | "hero";
  microcopy?: string;
}) {
  const params = new URLSearchParams();
  if (selectedColorId) params.set("color", selectedColorId);
  if (bundleSlug) params.set("addon", bundleSlug);
  const query = params.toString();
  const href = query ? `/checkout/${slug}?${query}` : `/checkout/${slug}`;

  return (
    <div className={variant === "hero" ? "mb-5" : "mb-3"}>
      <Link
        href={href}
        className={`block w-full rounded-[var(--radius-s)] bg-gold text-center font-num font-semibold text-navy-deep shadow-[var(--shadow-card)] transition hover:brightness-105 ${
          variant === "hero" ? "px-6 py-4 text-[1.05rem]" : "px-6 py-3.5 text-[0.95rem]"
        }`}
      >
        {label} ←
      </Link>
      <p className="mt-2 text-center text-[0.78rem] text-gray">{microcopy}</p>
    </div>
  );
}
