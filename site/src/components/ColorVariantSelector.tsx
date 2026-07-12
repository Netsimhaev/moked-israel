"use client";

import { useState } from "react";
import type { LockColor } from "@/lib/locks";

export function ColorVariantSelector({
  colors,
  onChange,
}: {
  colors: LockColor[];
  onChange?: (color: LockColor) => void;
}) {
  const [selected, setSelected] = useState(colors[0]?.id);

  function select(color: LockColor) {
    setSelected(color.id);
    onChange?.(color);
  }

  return (
    <div>
      <p className="mb-2 font-num text-[0.82rem] text-gray">
        צבע:{" "}
        <span className="font-semibold text-navy-deep">
          {colors.find((c) => c.id === selected)?.label}
        </span>
      </p>
      <div className="flex gap-2.5" role="radiogroup" aria-label="בחירת צבע">
        {colors.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={selected === c.id}
            aria-label={c.label}
            onClick={() => select(c)}
            className={`h-9 w-9 rounded-full border-2 transition ${
              selected === c.id
                ? "border-navy ring-2 ring-navy/30 ring-offset-2"
                : "border-[var(--color-line)]"
            } focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-gold focus-visible:outline-offset-2`}
            style={{ background: c.swatch }}
          />
        ))}
      </div>
    </div>
  );
}
