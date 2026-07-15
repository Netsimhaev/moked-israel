"use client";

import { useState, type FormEvent } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

// Non-streaming request/response chat, matching the rest of the site's
// simple fetch-based form pattern (LeadForm/ProductOrderForm/CheckoutFlow)
// rather than introducing SSE/useChat plumbing for the first time in this
// codebase. Conversation state lives only in this component — nothing is
// persisted server-side (see app/api/chat/route.ts).
//
// Rendered as a fixed floating trigger (bottom-left, RTL convention) so it
// tracks the viewport through scroll instead of living inline in page
// content — the user asked for a chat entry point that never disappears as
// they scroll a long landing page.
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
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "סגרו את הצ׳אט" : `שאלו שאלה על ${productName}`}
        className="fixed bottom-6 left-6 z-40 flex max-w-[calc(100vw-3rem)] items-center gap-2 rounded-full bg-navy px-5 py-3.5 font-num text-[0.88rem] font-semibold text-cream shadow-[var(--shadow-card)] transition hover:brightness-110"
      >
        <span aria-hidden className="flex-none text-[1.1rem]">
          {open ? "✕" : "💬"}
        </span>
        <span>{open ? "סגירת הצ׳אט" : "אשמח לענות על כל שאלה"}</span>
      </button>

      {open && (
        <div className="fixed bottom-28 left-6 z-40 flex max-h-[min(520px,calc(100vh-9rem))] w-[min(360px,calc(100vw-3rem))] flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)]">
          <div className="flex-none border-b border-[var(--color-line)] p-4">
            <p className="font-num text-[0.95rem] font-semibold text-navy-deep">
              💬 יש לכם שאלה על {productName}?
            </p>
            <p className="mt-1 text-[0.8rem] text-gray">
              שאלו את הצ׳אט שלנו — עונה על סמך המידע המדויק של המוצר הזה
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
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
            <p className="flex-none px-4 text-[0.82rem] text-brick">
              משהו השתבש. אפשר לנסות שוב, או להשאיר פרטים בטופס שבעמוד ונחזור
              אליכם.
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-none gap-2 border-t border-[var(--color-line)] p-3"
          >
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
          <p className="flex-none px-4 pb-3 text-[0.72rem] text-gray">
            הבוט עונה על בסיס מידע המוצר שלנו. לשאלות מחייבות או מורכבות —
            פנו לנציג אנושי בטופס שבעמוד או בוואטסאפ.
          </p>
        </div>
      )}
    </>
  );
}
