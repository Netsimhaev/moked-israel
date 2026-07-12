// Shared in-memory sliding-window rate limiter. Only holds per-instance,
// resets on cold start/redeploy — acceptable stopgap, NOT a real defense
// against distributed abuse. Replace with a shared store (e.g. Upstash
// Redis) before relying on this at scale. Originally lived duplicated inside
// /api/lead/route.ts; extracted here 2026-07-10 so /api/checkout and
// /api/checkout/callback can reuse the same logic instead of copy-pasting it
// a third and fourth time. Each call site should create its own limiter
// instance (own Map) via createRateLimiter — don't share one instance across
// unrelated endpoints, or a burst on one route would lock out another.
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    timestamps.push(now);
    hits.set(ip, timestamps);
    return timestamps.length > limit;
  };
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}
