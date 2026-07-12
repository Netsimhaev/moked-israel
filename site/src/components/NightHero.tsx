type Building = {
  height: number;
  width: number;
  litRow?: number;
  litCol?: number;
  rows: number;
  cols: number;
  back?: boolean;
};

// Fixed, deterministic skyline — one designated lit window (index 6).
// Values are hand-placed rather than randomized so server/client markup always matches.
const buildings: Building[] = [
  { height: 58, width: 30, rows: 3, cols: 2 },
  { height: 92, width: 34, rows: 4, cols: 2, back: true },
  { height: 70, width: 28, rows: 3, cols: 2 },
  { height: 110, width: 38, rows: 5, cols: 2, back: true },
  { height: 64, width: 26, rows: 3, cols: 1 },
  { height: 84, width: 32, rows: 4, cols: 2 },
  { height: 100, width: 36, rows: 4, cols: 2, litRow: 2, litCol: 1 },
  { height: 66, width: 28, rows: 3, cols: 2, back: true },
  { height: 78, width: 30, rows: 3, cols: 2 },
  { height: 54, width: 26, rows: 2, cols: 2, back: true },
  { height: 96, width: 34, rows: 4, cols: 2 },
];

// TODO before launch (see brand-identity.md §4/§5): replace this CSS placeholder
// with a real photograph or photorealistic render of an Israeli neighborhood at
// night with one lit window. Flat vector shapes are approved only for layout
// review, never as the shipped signature element.
export function NightHero() {
  return (
    <div
      role="img"
      aria-label="שכונה ישראלית בלילה, חלון אחד דולק באור חם — סמל המוקד"
      className="relative h-[280px] overflow-hidden rounded-[var(--radius-l)] shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:h-[340px]"
      style={{
        background:
          "linear-gradient(180deg, #0a1826 0%, #12314b 60%, #1b405f 100%)",
      }}
    >
      {process.env.NODE_ENV !== "production" && (
        <div className="absolute bottom-3 right-3.5 z-[5] rounded-full bg-[rgba(10,20,32,0.5)] px-2.5 py-1 font-num text-[0.68rem] text-cream/45 backdrop-blur-[2px]">
          Placeholder — להחליף בתצלום/רינדור פוטוריאליסטי לפני שקה
        </div>
      )}
      {/* atmospheric depth, not a flat vector fill */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 105%, rgba(217,162,76,0.05), transparent 60%), radial-gradient(ellipse 140% 90% at 50% 120%, rgba(0,0,0,0.55), transparent 55%)",
        }}
      />

      {/* stars */}
      <div className="absolute inset-0 z-[1] opacity-55">
        {[
          [8, 12],
          [18, 30],
          [30, 8],
          [42, 22],
          [55, 5],
          [65, 34],
          [78, 14],
          [88, 26],
          [12, 45],
          [48, 48],
        ].map(([right, top], i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#cfe0ee] shadow-[0_0_3px_rgba(207,224,238,0.6)]"
            style={{ right: `${right}%`, top: `${top}%` }}
          />
        ))}
      </div>

      {/* ground glow beneath the lit window */}
      <div
        className="absolute bottom-0 z-[2] h-[130px] w-[220px] blur-[6px]"
        style={{
          right: "18%",
          background:
            "radial-gradient(ellipse at center, rgba(217,162,76,0.22), transparent 70%)",
        }}
      />

      {/* skyline */}
      <div className="absolute inset-x-0 bottom-0 z-[2] flex h-[62%] items-end gap-[3px] drop-shadow-[0_-1px_0_rgba(0,0,0,0.3)]">
        {buildings.map((b, i) => (
          <div
            key={i}
            className={`relative flex-none rounded-t-[2px] ${b.back ? "blur-[1.5px] brightness-[0.85]" : ""}`}
            style={{
              height: b.height,
              width: b.width,
              background: "linear-gradient(180deg, #123047 0%, #0b2035 100%)",
            }}
          >
            {Array.from({ length: b.rows }).map((_, r) =>
              Array.from({ length: b.cols }).map((_, c) => {
                const isLit = b.litRow === r && b.litCol === c;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={
                      isLit
                        ? "window-lit absolute h-[10px] w-[8px] bg-gold [animation:window-breathe_3.6s_ease-in-out_infinite]"
                        : "absolute h-[10px] w-[8px] bg-[rgba(200,215,230,0.12)]"
                    }
                    style={{ bottom: 10 + r * 20, right: 6 + c * 14 }}
                  />
                );
              }),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
