"use client";

import { useState, type FormEvent } from "react";

type Variant = "full" | "inline";

export function LeadForm({
  variant = "full",
  source,
  submitLabel = "קבלו הצעה מותאמת",
}: {
  variant?: Variant;
  source: string;
  submitLabel?: string;
}) {
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
        body: JSON.stringify({ ...payload, source }),
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
        קיבלנו את הפרטים — ניצור קשר תוך יום עסקים.
      </p>
    );
  }

  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2.5 rounded-full bg-white/55 p-1.5"
      >
        <input
          name="phone"
          type="tel"
          required
          placeholder="מספר טלפון"
          className="min-w-[140px] flex-1 bg-transparent px-4 py-2.5 text-[0.92rem] outline-none placeholder:text-charcoal/50"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 font-num text-[0.95rem] font-semibold text-navy-deep transition hover:brightness-105 disabled:opacity-60"
        >
          {status === "sending" ? "שולח…" : "שלחו לי הצעה"}
        </button>
        {status === "error" && (
          <p className="w-full text-[0.8rem] text-brick">
            משהו השתבש, נסו שוב או התקשרו אלינו.
          </p>
        )}
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[400px] rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]"
    >
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="name">
        שם מלא
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        placeholder="לדוגמה: מיכל כהן"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="phone2">
        טלפון
      </label>
      <input
        id="phone2"
        name="phone"
        type="tel"
        required
        placeholder="050-0000000"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="area">
        אזור מגורים
      </label>
      <input
        id="area"
        name="area"
        type="text"
        placeholder="לדוגמה: רעננה"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="need">
        מה הכי חשוב לכם?
      </label>
      <input
        id="need"
        name="need"
        type="text"
        placeholder="למשל: גם לילדים, גיבוי בלי אינטרנט, מחיר"
        className="mb-5 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
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
