import { NextResponse } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";

// Stub lead-intake endpoint. Per payments-agent/provider-decision.md, Cardcom
// was chosen — as of 2026-07-10 real checkout exists at /api/checkout for
// direct purchases, but this route remains for the secondary "have a
// question first?" lead-capture path kept on every product page. Still just
// logs, no CRM forward yet.

const MAX_FIELD_LENGTH = 300;
const PHONE_PATTERN = /^[\d\-+() ]{7,20}$/;

const isRateLimited = createRateLimiter(5, 60_000);

function sanitizeField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_FIELD_LENGTH) return undefined;
  return trimmed;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
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
  const phone = sanitizeField(raw.phone);

  if (!phone || !PHONE_PATTERN.test(phone)) {
    return NextResponse.json({ error: "invalid phone" }, { status: 400 });
  }

  const lead = {
    name: sanitizeField(raw.name),
    phone,
    area: sanitizeField(raw.area),
    need: sanitizeField(raw.need),
    company: sanitizeField(raw.company),
    role: sanitizeField(raw.role),
    scope: sanitizeField(raw.scope),
    source: sanitizeField(raw.source) ?? "unknown",
    // "עדכנו אותי במבצעים והנחות" opt-in, added 2026-07-13 for the /lp/[slug]
    // landing pages' lead form. A native checkbox omits the field entirely
    // from FormData when unchecked — `Boolean(raw.updatesOptIn)` is falsy in
    // that case and truthy for the "on" string sent when checked.
    updatesOptIn: Boolean(raw.updatesOptIn),
    at: new Date().toISOString(),
  };

  // TODO: forward to CRM / sales-agent pipeline instead of just logging.
  console.log("[lead]", lead);

  return NextResponse.json({ ok: true });
}
