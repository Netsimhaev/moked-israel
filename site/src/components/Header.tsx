import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-6 font-num text-[0.9rem] text-charcoal md:flex">
          <Link href="/locks">מנעולים חכמים</Link>
          <Link href="/safes/home">כספות ביתיות</Link>
          <Link href="/safes/guns">כספות נשק</Link>
          <Link href="/courses">קורסים והכשרות</Link>
          <Link href="/robotics">רובוטיקה</Link>
          <Link href="/blog">בלוג</Link>
          <Link href="/#why">התקנה ואחריות</Link>
        </nav>
        <a
          href="tel:+97230000000"
          className="rounded-full bg-navy px-5 py-2.5 font-num text-[0.85rem] font-semibold text-cream"
        >
          התקשרו עכשיו
        </a>
      </div>
    </header>
  );
}
