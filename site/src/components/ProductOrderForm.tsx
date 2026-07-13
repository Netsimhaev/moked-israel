"use client";

import { useState, type FormEvent } from "react";
import type { LockColor } from "@/lib/locks";
import { ColorVariantSelector } from "./ColorVariantSelector";

export function ProductOrderForm({
  productSlug,
  productName,
  colors = [],
  selectedColor,
  submitLabel = "הזמינו עכשיו — כולל התקנה",
  // Default false so the 3 existing catalog-page call sites (locks via
  // ProductHeroGallery, home safes, gun safes) render pixel-identical to
  // before — only the new /lp/[slug] landing pages opt in.
  showUpdatesOptIn = false,
}: {
  productSlug: string;
  productName: string;
  colors?: LockColor[];
  // When the caller already renders its own ColorVariantSelector (e.g.
  // ProductHeroGallery, which syncs the hero image to the chosen color),
  // pass the selected color here instead of `colors` — the form then skips
  // rendering its own picker and just uses this value on submit.
  selectedColor?: LockColor;
  submitLabel?: string;
  showUpdatesOptIn?: boolean;
}) {
  const [internalColor, setInternalColor] = useState(colors[0]);
  const color = selectedColor ?? internalColor;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          product: productName,
          color: color?.label,
          source: `product-${productSlug}`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-[var(--radius-m)] bg-sage/10 px-5 py-4 font-num text-[0.92rem] text-sage">
        קיבלנו את הזמנתכם ({productName}
        {color ? `, ${color.label}` : ""}) — ניצור קשר תוך יום עסקים לתיאום
        המשך.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]"
    >
      {!selectedColor && colors.length > 0 && (
        <div className="mb-5">
          <ColorVariantSelector colors={colors} onChange={setInternalColor} />
        </div>
      )}

      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="po-name">
        שם מלא
      </label>
      <input
        id="po-name"
        name="name"
        type="text"
        required
        placeholder="לדוגמה: מיכל כהן"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="po-phone">
        טלפון
      </label>
      <input
        id="po-phone"
        name="phone"
        type="tel"
        required
        placeholder="050-0000000"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="po-area">
        אזור מגורים
      </label>
      <input
        id="po-area"
        name="area"
        type="text"
        placeholder="לדוגמה: רעננה"
        className="mb-5 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />

      {showUpdatesOptIn && (
        <label className="mb-5 flex cursor-pointer items-start gap-2.5 text-[0.85rem] text-charcoal">
          <input
            type="checkbox"
            name="updatesOptIn"
            defaultChecked={false}
            className="mt-0.5 h-4 w-4 flex-none"
          />
          עדכנו אותי במבצעים והנחות על {productName}
        </label>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[var(--radius-s)] bg-gold px-6 py-3.5 font-num text-[0.95rem] font-semibold text-navy-deep transition hover:brightness-105 disabled:opacity-60"
      >
        {status === "sending" ? "שולח…" : submitLabel}
      </button>
      {status === "error" && (
        <p className="mt-3 text-[0.8rem] text-brick">
          משהו השתבש, נסו שוב או התקשרו אלינו.
        </p>
      )}
    </form>
  );
}
