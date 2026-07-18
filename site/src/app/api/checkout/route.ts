import { NextResponse } from "next/server";
import { createLowProfileSession } from "@/lib/cardcom";
import { getCheckoutItem } from "@/lib/checkout";
import { isValidBundlePair, CROSS_SELL_DISCOUNT_PERCENT } from "@/lib/crossSell";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";
import { pendingOrders } from "@/lib/orderStore";

const MAX_FIELD_LENGTH = 300;
const PHONE_PATTERN = /^[\d\-+() ]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const slug = sanitizeField(raw.slug);
  if (!slug) {
    return NextResponse.json({ error: "invalid slug" }, { status: 400 });
  }

  const item = getCheckoutItem(slug);
  if (!item) {
    return NextResponse.json({ error: "unknown product" }, { status: 400 });
  }

  const customerRaw =
    typeof raw.customer === "object" && raw.customer !== null
      ? (raw.customer as Record<string, unknown>)
      : {};
  const phone = sanitizeField(customerRaw.phone);
  const email = sanitizeField(customerRaw.email);
  const name = sanitizeField(customerRaw.name);
  const address = sanitizeField(customerRaw.address);

  // Self-pickup (added 2026-07-10): only meaningful for safes (locks/course
  // have no shippingPrice at all, so "fulfillment" is a no-op for them).
  const isSafe = item.shippingPrice !== undefined;
  const isPickup = isSafe && raw.fulfillment === "pickup";

  if (!phone || !PHONE_PATTERN.test(phone)) {
    return NextResponse.json({ error: "invalid phone" }, { status: 400 });
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }
  if (item.category !== "course" && !isPickup && !address) {
    return NextResponse.json({ error: "address required" }, { status: 400 });
  }

  // Server-side price computation — never trust a client-supplied amount.
  // Installation requires our technician to visit the customer's address —
  // not offered on self-pickup orders, regardless of what the client sends.
  const installationSelected =
    !isPickup && raw.includeInstallation === true && Boolean(item.installationPrice);

  let amount = item.price;
  // Shipping is bundled into the installation fee — a technician bringing
  // the safe to install it is already delivering it, so don't double-charge.
  if (item.shippingPrice && !isPickup && !installationSelected) {
    amount += item.shippingPrice;
  }
  if (installationSelected && item.installationPrice) {
    amount += item.installationPrice;
  }

  let crossSellSlug: string | undefined;
  if (typeof raw.crossSellSlug === "string" && raw.crossSellSlug) {
    // Reject a client-supplied bundle pairing that isn't two real, distinct
    // catalog products — prevents a tampered request from adding an
    // arbitrary/fake product at the 5% discount price. Any real pair is
    // valid today (not just the fixed organic default from crossSellMap) —
    // see lib/crossSell.ts header comment for why this was generalized.
    if (!isValidBundlePair(slug, raw.crossSellSlug)) {
      return NextResponse.json(
        { error: "invalid cross-sell pairing" },
        { status: 400 },
      );
    }
    const crossSellItem = getCheckoutItem(raw.crossSellSlug);
    if (!crossSellItem) {
      return NextResponse.json({ error: "unknown cross-sell product" }, { status: 400 });
    }
    crossSellSlug = crossSellItem.slug;
    amount += Math.round(
      crossSellItem.price * (1 - CROSS_SELL_DISCOUNT_PERCENT / 100),
    );
    // The addon can now be any catalog product (2026-07-17 bundle
    // generalization), not just ALFA (a lock, no shipping) — if it has its
    // own shippingPrice, charge it too, or a safe added as a bundle addon
    // ships for free by mistake. No installation toggle exists for the
    // addon (single order-bump checkbox, not a full second item config) —
    // always treated as shipped, matching CheckoutFlow.tsx's client-side
    // total (must stay in sync — this is the server-side source of truth).
    if (crossSellItem.shippingPrice) {
      amount += crossSellItem.shippingPrice;
    }
  }

  const orderId = crypto.randomUUID();
  pendingOrders.set(orderId, {
    slug,
    crossSellSlug,
    amount,
    fulfillment: isPickup ? "pickup" : "shipping",
    customer: { name, phone, email, address },
    createdAt: new Date().toISOString(),
  });

  console.log("[checkout:created]", {
    orderId,
    slug,
    crossSellSlug,
    amount,
    fulfillment: isPickup ? "pickup" : "shipping",
    customer: { name, phone, email, address },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const result = await createLowProfileSession({
    amount,
    description: crossSellSlug ? `${item.name} + ${crossSellSlug}` : item.name,
    customerName: name ?? "",
    customerEmail: email,
    customerPhone: phone,
    returnValue: orderId,
    successRedirectUrl: `${siteUrl}/checkout/${slug}/success?order=${orderId}`,
    failedRedirectUrl: `${siteUrl}/checkout/${slug}?error=payment_failed`,
    webHookUrl: `${siteUrl}/api/checkout/callback`,
  });

  if (!result.ok) {
    console.error("[checkout:cardcom-error]", { orderId, error: result.error });
    return NextResponse.json({ error: "payment_session_failed" }, { status: 502 });
  }

  const mode = process.env.CARDCOM_EMBED_MODE === "iframe" ? "iframe" : "redirect";
  return NextResponse.json({ url: result.url, mode });
}
