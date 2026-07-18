"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

type MediaBlock = { kind: "image" | "video"; url: string; alt: string };
type CheckoutLink = {
  url: string;
  productName: string;
  bundleProductName?: string;
  discountPercent?: number;
};

// Only assistant messages ever carry media/checkoutLink — the server
// (lib/claude.ts tool calls) is the sole source of these, never the model's
// free text and never client input sent back up.
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  media?: MediaBlock[];
  checkoutLink?: CheckoutLink;
};

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
//
// Upgraded 2026-07-17 alongside the sales-agent backend: assistant messages
// can now carry real product images/video and a checkout CTA, decided by
// the model's own tool calls (see lib/claude.ts) — this component only
// renders what the server already validated, it never parses free text for
// image URLs or links.

// Proactive opener — client-side only, never an API call. Shown at most
// once per slug per browser session (sessionStorage), whether the panel
// opens itself after a short delay or the visitor clicks it manually first.
// Deliberately plain, warm text — no "בוט"/instructional framing here; the
// one honest AI disclosure lives in the small badge in the panel header
// instead (per explicit user decision), not repeated inline in every message.
function greetingFor(productName: string): ChatMessage {
  return {
    role: "assistant",
    content: `היי, שמתי לב שאתם מסתכלים על ${productName} — יש לכם שאלה שאוכל לעזור בה?`,
  };
}

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
  const greetedRef = useRef(false);

  function greetOnce() {
    if (greetedRef.current) return;
    greetedRef.current = true;
    sessionStorage.setItem(`chat-greeted-${slug}`, "1");
    setMessages((prev) => (prev.length > 0 ? prev : [greetingFor(productName)]));
  }

  useEffect(() => {
    if (sessionStorage.getItem(`chat-greeted-${slug}`)) {
      greetedRef.current = true;
      return;
    }
    const timer = setTimeout(() => {
      greetOnce();
      setOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

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
        body: JSON.stringify({
          slug,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error ?? "chat_failed");
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply,
          media: data.media,
          checkoutLink: data.checkoutLink,
        },
      ]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-gold/50"
          />
        )}
        <button
          type="button"
          onClick={() => {
            setOpen((v) => {
              const next = !v;
              if (next) greetOnce();
              return next;
            });
          }}
          aria-expanded={open}
          aria-label={open ? "סגרו את הצ׳אט" : `שאלו שאלה על ${productName}`}
          className="relative flex max-w-[calc(100vw-3rem)] items-center gap-2 rounded-full bg-gold px-6 py-4 font-num text-[0.95rem] font-semibold text-navy-deep shadow-[var(--shadow-card)] transition hover:brightness-105"
        >
          <span aria-hidden className="flex-none text-[1.25rem]">
            {open ? "✕" : "💬"}
          </span>
          <span>{open ? "סגירת הצ׳אט" : "אשמח לענות על כל שאלה"}</span>
        </button>
      </div>

      {open && (
        <div className="fixed bottom-28 left-6 z-40 flex max-h-[min(520px,calc(100vh-9rem))] w-[min(360px,calc(100vw-3rem))] flex-col rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)]">
          <div className="flex-none border-b border-[var(--color-line)] p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 flex-none rounded-full bg-sage"
                />
                <p className="font-num text-[0.95rem] font-semibold text-navy-deep">
                  הצוות של המוקד
                </p>
              </div>
              {/* One honest, unobtrusive AI disclosure — not repeated
                  elsewhere in the panel (per explicit user decision to keep
                  a small/subtle marker rather than none, or one on every
                  message). */}
              <span className="rounded-full bg-cream px-2 py-0.5 font-num text-[0.68rem] font-semibold text-gray">
                AI
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex max-w-[85%] flex-col gap-2 rounded-[var(--radius-m)] px-4 py-2.5 text-[0.9rem] ${
                  m.role === "user"
                    ? "self-end bg-navy text-cream"
                    : "self-start bg-cream text-charcoal"
                }`}
              >
                {m.content}

                {m.media?.map((block, j) =>
                  block.kind === "image" ? (
                    <Image
                      key={j}
                      src={block.url}
                      alt={block.alt}
                      width={280}
                      height={180}
                      className="h-auto w-full rounded-[var(--radius-s)] object-cover"
                    />
                  ) : (
                    <video
                      key={j}
                      src={block.url}
                      controls
                      className="w-full rounded-[var(--radius-s)]"
                    />
                  ),
                )}

                {m.checkoutLink && (
                  <Link
                    href={m.checkoutLink.url}
                    className="rounded-[var(--radius-s)] bg-gold px-4 py-2.5 text-center font-num text-[0.85rem] font-semibold text-navy-deep transition hover:brightness-105"
                  >
                    מעבר לתשלום — {m.checkoutLink.productName}
                    {m.checkoutLink.bundleProductName &&
                      ` + ${m.checkoutLink.bundleProductName} (${m.checkoutLink.discountPercent}% הנחה)`}
                  </Link>
                )}
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
            לשאלות דחופות או מורכבות: וואטסאפ, או שירות הלקוחות בטלפון *5104.
          </p>
        </div>
      )}
    </>
  );
}
