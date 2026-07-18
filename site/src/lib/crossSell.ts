import { getCheckoutItem } from "@/lib/checkout";

// Order-bump cross-sell mapping. Updated 2026-07-10 (second round, before
// Cardcom credentials were added) per explicit user decision:
// - Safes (gun + home) -> always offer ALFA specifically ("המנעול המתקדם
//   ביותר בישראל"), not tiered by price like the first version of this map.
// - Locks -> no cross-sell offer at all (removed entirely).
// - Course -> no cross-sell offer (unchanged from the original decision).
// alfa itself has no entry here (a lock, and locks get no cross-sell), so a
// safe buyer offered ALFA never sees ALFA offered back to itself.
//
// This remains the ORGANIC default shown on a checkout page a visitor reaches
// without going through the AI sales agent — unchanged behavior, unchanged
// UX. It is no longer the only valid pairing, though (see isValidBundlePair
// below, added 2026-07-17): the sales agent can recommend ANY second product
// as a bundle addon, still at the same flat 5%, and /api/checkout validates
// against isValidBundlePair rather than this fixed map.
export const crossSellMap: Record<string, string> = {
  "model-f": "alfa",
  "model-e": "alfa",
  ib250: "alfa",
  sc250: "alfa",
  bsa250: "alfa",
  b600: "alfa",
};

export const CROSS_SELL_DISCOUNT_PERCENT = 5;

export function getCrossSellSlug(slug: string): string | undefined {
  return crossSellMap[slug];
}

// General bundle validation (2026-07-17): any two distinct real products in
// the catalog qualify — no category restriction. This intentionally reverses
// the earlier "locks and courses never get cross-sell" decision, per an
// explicit user request to support combos like lock+safe or course+safe
// through the AI sales agent. Both slugs are checked against getCheckoutItem
// (the real catalog), never trusted as-is from client input.
export function isValidBundlePair(slugA: string, slugB: string): boolean {
  if (slugA === slugB) return false;
  return Boolean(getCheckoutItem(slugA)) && Boolean(getCheckoutItem(slugB));
}
