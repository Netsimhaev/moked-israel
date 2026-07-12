export function Footer() {
  return (
    <footer className="mt-auto bg-navy-deep py-10 text-center text-[0.85rem] text-cream/60">
      <div className="mx-auto max-w-[1180px] px-6">
        <p>
          <span className="text-gold">המוקד</span> · מנעולים חכמים וכספות ·
          חברה ישראלית · ישראל © {new Date().getFullYear()}
        </p>
        <p className="mt-2 space-x-4 space-x-reverse">
          <a href="/privacy">מדיניות פרטיות</a>
          <a href="/regulation">מידע רגולטורי — כספות נשק</a>
        </p>
      </div>
    </footer>
  );
}
