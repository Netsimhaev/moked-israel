import Link from "next/link";
import { gunSafeProducts, safeDiscountPercent, type SafeFeatures } from "@/lib/safes";

const featureRows: { key: keyof SafeFeatures; label: string }[] = [
  { key: "fingerprint", label: "טביעת אצבע" },
  { key: "digitalCode", label: "קודן דיגיטלי" },
  { key: "mechanicalKey", label: "מפתח מכני" },
  { key: "batteryPowered", label: "פועלת על סוללות" },
];

// Every ✓/— cell reflects the `features` flags in lib/safes.ts, which in
// turn only mark true what's explicitly stated in that model's own Techom
// product page. Do not add rows without a verified source.
export function SafeComparisonTable({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-[0.85rem]">
        <thead>
          <tr>
            <th className="border-b border-[var(--color-line)] py-3 text-start text-gray"></th>
            {gunSafeProducts.map((p) => (
              <th
                key={p.slug}
                className={`border-b border-[var(--color-line)] py-3 text-center font-num ${
                  p.slug === currentSlug ? "text-navy-deep" : "text-gray"
                }`}
              >
                {p.slug === currentSlug ? (
                  <span className="rounded-full bg-navy/[0.08] px-2.5 py-1">
                    {p.name}
                  </span>
                ) : (
                  <Link href={`/safes/guns/${p.slug}`}>{p.name}</Link>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row) => (
            <tr key={row.key}>
              <td className="border-b border-[var(--color-line)] py-2.5 text-gray">
                {row.label}
              </td>
              {gunSafeProducts.map((p) => (
                <td
                  key={p.slug}
                  className={`border-b border-[var(--color-line)] py-2.5 text-center ${
                    p.features[row.key] ? "text-sage" : "text-gray/50"
                  }`}
                >
                  {p.features[row.key] ? "✓" : "—"}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="py-2.5 text-gray">מחיר המוקד (הכספת בלבד)</td>
            {gunSafeProducts.map((p) => (
              <td
                key={p.slug}
                className="num py-2.5 text-center font-semibold text-navy-deep"
              >
                ₪<bdi>{p.ourPrice.toLocaleString("he-IL")}</bdi>
                <span className="mr-1 text-[0.72rem] font-normal text-gray">
                  (-<bdi>{safeDiscountPercent(p)}%</bdi>)
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
