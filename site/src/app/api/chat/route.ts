import { NextResponse } from "next/server";
import { getLandingPageProduct } from "@/lib/landingPage";
import { buildProductSystemPrompt } from "@/lib/chatSystemPrompt";
import { askProductChatbot, type ChatMessage } from "@/lib/claude";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";

// Per-product AI chatbot on /lp/[slug] landing pages. No conversation
// persistence — the client resends the full (capped) transcript each turn,
// same no-DB reality as the rest of this app. Unlike /api/lead, this does
// NOT log message content (only slug + timestamp) — visitors may type
// things into the chat they wouldn't want stored, and there's no lead-
// capture purpose here that would justify keeping it.
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;

// Two independent limiters: a tight per-minute window (a real conversation
// needs several round-trips) plus a longer daily ceiling to bound
// worst-case sustained-abuse cost — an LLM call is far costlier than the
// console.log a rate-limited /api/lead request falls back to.
const isRateLimitedShort = createRateLimiter(10, 60_000);
const isRateLimitedLong = createRateLimiter(60, 24 * 60 * 60_000);

function sanitizeMessages(raw: unknown): ChatMessage[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const messages: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_HISTORY)) {
    if (typeof item !== "object" || item === null) continue;
    const { role, content } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string" || !content.trim()) continue;
    messages.push({ role, content: content.slice(0, MAX_MESSAGE_LENGTH) });
  }
  return messages.length > 0 ? messages : undefined;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  // Call both unconditionally (not `||` short-circuited) so the daily
  // counter stays accurate regardless of short-window bursts.
  const shortLimited = isRateLimitedShort(ip);
  const longLimited = isRateLimitedLong(ip);
  if (shortLimited || longLimited) {
    return NextResponse.json({ error: "too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const slug = typeof raw.slug === "string" ? raw.slug : undefined;
  if (!slug) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }

  const product = getLandingPageProduct(slug);
  if (!product) {
    return NextResponse.json({ error: "unknown product" }, { status: 404 });
  }

  const messages = sanitizeMessages(raw.messages);
  if (!messages) {
    return NextResponse.json({ error: "invalid messages" }, { status: 400 });
  }

  console.log("[chat]", { slug, at: new Date().toISOString() });

  const systemPrompt = buildProductSystemPrompt(product);
  const result = await askProductChatbot({ systemPrompt, messages });

  if (!result.ok) {
    console.error("[chat:error]", { slug, error: result.error });
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    reply: result.reply,
    media: result.media,
    checkoutLink: result.checkoutLink,
  });
}