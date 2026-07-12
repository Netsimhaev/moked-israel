import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gold text-navy-deep hover:brightness-105 hover:-translate-y-px shadow-[0_6px_18px_rgba(217,162,76,0.35)]",
  ghost:
    "bg-transparent text-cream border border-cream/45 hover:border-cream hover:bg-cream/10",
  outline:
    "bg-transparent text-navy border border-navy hover:bg-navy/[0.06]",
};

export function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  type?: "button" | "submit";
  className?: string;
}) {
  const classes = `inline-flex items-center justify-center rounded-[var(--radius-s)] px-6 py-3.5 font-num font-semibold text-[0.95rem] transition-all duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2 ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
