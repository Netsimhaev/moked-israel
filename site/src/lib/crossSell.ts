// Order-bump cross-sell mapping. Updated 2026-07-10 (second round, before
// Cardcom credentials were added) per explicit user decision:
// - Safes (gun + home) -> always offer ALFA specifically ("המנעול המתקדם
//   ביותר בישראל"), not tiered by price like the first version of this map.
// - Locks -> no cross-sell offer at all (removed entirely).
// - Course -> no cross-sell offer (unchanged from the original decision).
// alfa itself has no entry here (a lock, and locks get no cross-sell), so a
// safe buyer offered ALFA never sees ALFA offered back to itself.
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
