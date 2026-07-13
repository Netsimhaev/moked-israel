"use client";

import { useState, type FormEvent } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Non-streaming request/response chat, matching the rest of the site's
// simple fetch-based form pattern (LeadForm/ProductOrderForm/CheckoutFlow)
// rather than introducing SSE/useChat plumbing for the first time in this
// codebase. Conversation state lives only in this component — nothing is
// persisted server-side (see app/api/chat/route.ts).
export function ProductChatWidget({
  slug,
  productName,
}: {
  slug: string;
  productName: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || status === "sending") return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setStatus("sending");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error ?? "chat_failed");
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white p-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 text-start"
        aria-expanded={open}
      >
        <span>
          <span className="block font-num text-[1.05rem] font-semibold text-navy-deep">
            💬 יש לכם שאלה על {productName}?
          </span>
          <span className="mt-1 block text-[0.85rem] text-gray">
            שאלו את הצ׳אט שלנו — עונה על סמך המידע המדויק של המוצר הזה
          </span>
        </span>
        <span aria-hidden className="flex-none text-gray">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="mt-5">
          <div className="flex max-h-[360px] flex-col gap-3 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-[0.85rem] text-gray">
                לדוגמה: &quot;מה קורה אם נגמרת הסוללה?&quot; או &quot;מה כולל
                המחיר?&quot;
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-[var(--radius-m)] px-4 py-2.5 text-[0.9rem] ${
                  m.role === "user"
                    ? "self-end bg-navy text-cream"
                    : "self-start bg-cream text-charcoal"
                }`}
              >
                {m.content}
              </div>
            ))}
            {status === "sending" && (
              <div className="self-start rounded-[var(--radius-m)] bg-cream px-4 py-2.5 text-[0.9rem] text-gray">
                כותב תשובה…
              </div>
            )}
          </div>

          {status === "error" && (
            <p className="mt-3 text-[0.82rem] text-brick">
              משהו השתבש. אפשר לנסות שוב, או להשאיר פרטים למטה ונחזור אליכם.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="כתבו שאלה…"
              maxLength={500}
              className="flex-1 rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
            />
            <button
              type="submit"
              disabled={status === "sending" || !input.trim()}
              className="rounded-[var(--radius-s)] bg-navy px-5 py-2.5 font-num text-[0.9rem] font-semibold text-cream transition hover:brightness-110 disabled:opacity-50"
            >
              שלחו
            </button>
          </form>
          <p className="mt-2.5 text-[0.75rem] text-gray">
            הבוט עונה על בסיס מידע המוצר שלנו. לשאלות מחייבות או מורכבות —
            פנו לנציג אנושי בטופס למטה או בוואטסאפ.
          </p>
        </div>
      )}
    </div>
  );
}