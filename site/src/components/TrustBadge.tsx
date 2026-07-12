const variantClasses = {
  dark: "border-cream/20 bg-cream/[0.08] text-cream/90",
  light: "border-[var(--color-line)] bg-white text-charcoal shadow-[var(--shadow-card)]",
};

export function TrustBadge({
  label,
  variant = "dark",
}: {
  label: string;
  variant?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.82rem] ${variantClasses[variant]}`}
    >
      <span className="h-1.5 w-1.5 flex-none rounded-full bg-sage" />
      {label}
    </span>
  );
}
