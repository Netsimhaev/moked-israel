"use client";

import { useState, type FormEvent } from "react";

// B2B request-a-quote form for the robotics category — deliberately not an
// instant-price/checkout flow, per wireframes.md §5b and positioning.md §5ב
// (long B2B sales cycle, not eCommerce).
export function QuoteForm({ source }: { source: string }) {
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
        קיבלנו את הפנייה — נציג מטעם המוקד ייצור קשר לתיאום שיחת ייעוץ.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[440px] rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-6 shadow-[var(--shadow-card)]"
    >
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="company">
        שם החברה
      </label>
      <input
        id="company"
        name="company"
        type="text"
        required
        placeholder="לדוגמה: תעשיות רונן בע״מ"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="role">
        תפקיד
      </label>
      <input
        id="role"
        name="role"
        type="text"
        placeholder="לדוגמה: מנהל תפעול"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="qphone">
        טלפון
      </label>
      <input
        id="qphone"
        name="phone"
        type="tel"
        required
        placeholder="050-0000000"
        className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="scope">
        תיאור הצורך / היקף
      </label>
      <textarea
        id="scope"
        name="scope"
        rows={3}
        placeholder="לדוגמה: קו ייצור עם 3 עמדות עבודה, משמרות כפולות"
        className="mb-5 w-full resize-none rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[var(--radius-s)] bg-gold px-6 py-3.5 font-num text-[0.95rem] font-semibold text-navy-deep transition hover:brightness-105 disabled:opacity-60"
      >
        {status === "sending" ? "שולח…" : "קבעו שיחת ייעוץ"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-[0.8rem] text-brick">
          משהו השתבש, נסו שוב או התקשרו אלינו.
        </p>
      )}
    </form>
  );
}
