import { NextResponse } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";
import { saveLead } from "@/lib/leadStore";

// Stub lead-intake endpoint. Per payments-agent/provider-decision.md, Cardcom
// was chosen — as of 2026-07-10 real checkout exists at /api/checkout for
// direct purchases, but this route remains for the secondary "have a
// question first?" lead-capture path kept on every product page. Still just
// logs, no CRM forward yet. Validation/storage now lives in lib/leadStore.ts,
// shared with the chat sales agent's submitLead tool (lib/claude.ts).

const isRateLimited = createRateLimiter(5, 60_000);

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

  const result = saveLead(body as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
