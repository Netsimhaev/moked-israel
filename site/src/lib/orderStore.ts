// In-memory order store correlating an order id (Cardcom's ReturnValue) to
// what was actually purchased and its server-computed amount, so
// /api/checkout/callback can verify a payment against what we expected
// instead of trusting the webhook payload. Same per-instance/cold-start
// caveat as the rate limiter — replace with a real store (KV/DB) before
// relying on this at production scale. Kept in its own module (not exported
// from a route.ts file) so both /api/checkout and /api/checkout/callback can
// import it as a plain shared module.
export type PendingOrder = {
  slug: string;
  crossSellSlug?: string;
  amount: number;
  fulfillment?: "shipping" | "pickup"; // safes only; undefined for locks/course
  customer: { name?: string; phone: string; email: string; address?: string };
  createdAt: string;
};

export const pendingOrders = new Map<string, PendingOrder>();

// Idempotency guard for webhook retries — Cardcom (or any gateway) may
// redeliver the same callback more than once; this prevents double-fulfilling.
export const processedLowProfileIds = new Set<string>();
