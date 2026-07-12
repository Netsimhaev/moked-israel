import { NextResponse } from "next/server";
import { getLowProfileResult } from "@/lib/cardcom";
import { pendingOrders, processedLowProfileIds } from "@/lib/orderStore";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";

const isRateLimited = createRateLimiter(30, 60_000);

// Cardcom webhook confirmation. ⚠️ TO VERIFY: whether Cardcom actually calls
// this as a POST with a JSON/form body containing LowProfileId (and/or
// ReturnValue), or as a GET redirect with query params — both patterns exist
// across Israeli payment gateways. This assumes POST JSON; adjust once
// confirmed from the Cardcom dashboard config for this merchant account.
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
  const lowProfileId =
    typeof raw.LowProfileId === "string"
      ? raw.LowProfileId
      : typeof raw.lowProfileId === "string"
        ? raw.lowProfileId
        : undefined;

  if (!lowProfileId) {
    return NextResponse.json({ error: "missing LowProfileId" }, { status: 400 });
  }

  // Idempotent: a retried webhook delivery for an already-processed payment
  // just returns 200 immediately without re-fulfilling.
  if (processedLowProfileIds.has(lowProfileId)) {
    return NextResponse.json({ ok: true });
  }

  // Server-side re-query of Cardcom — never trust the webhook payload's own
  // success/amount fields at face value, this is the anti-spoofing check.
  const result = await getLowProfileResult(lowProfileId);
  if (!result || !result.success) {
    console.warn("[checkout:callback-unverified]", { lowProfileId });
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const order = pendingOrders.get(result.returnValue);
  if (!order) {
    console.warn("[checkout:callback-unknown-order]", { lowProfileId, returnValue: result.returnValue });
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  processedLowProfileIds.add(lowProfileId);

  // TODO: forward to CRM/fulfillment pipeline instead of just logging — same
  // stub pattern as /api/lead.
  console.log("[checkout:completed]", {
    orderId: result.returnValue,
    slug: order.slug,
    crossSellSlug: order.crossSellSlug,
    amount: order.amount,
    fulfillment: order.fulfillment,
    transactionId: result.transactionId,
    customer: order.customer,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
