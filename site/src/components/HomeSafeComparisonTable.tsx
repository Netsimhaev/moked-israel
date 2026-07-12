import Link from "next/link";
import {
  homeSafeProducts,
  homeSafeDiscountPercent,
  type HomeSafeFeatures,
} from "@/lib/homeSafes";

const featureRows: { key: keyof HomeSafeFeatures; label: string }[] = [
  { key: "fingerprint", label: "טביעת אצבע" },
  { key: "digitalCode", label: "קוד דיגיטלי" },
  { key: "mechanicalKey", label: "מפתח מכני" },
  { key: "lcdScreen", label: "מסך LCD" },
  { key: "batteryPowered", label: "פועלת על סוללות" },
];

// Every ✓/— cell reflects the `features` flags in lib/homeSafes.ts, which in
// turn only mark true what's explicitly stated on that model's own Techom
// product page. Do not add rows without a verified source.
export function HomeSafeComparisonTable({
  currentSlug,
}: {
  currentSlug: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-[0.85rem]">
        <thead>
          <tr>
            <th className="border-b border-[var(--color-line)] py-3 text-start text-gray"></th>
            {homeSafeProducts.map((p) => (
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
                  <Link href={`/safes/home/${p.slug}`}>{p.name}</Link>
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
              {homeSafeProducts.map((p) => (
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
            {homeSafeProducts.map((p) => (
              <td
                key={p.slug}
                className="num py-2.5 text-center font-semibold text-navy-deep"
              >
                ₪<bdi>{p.ourPrice.toLocaleString("he-IL")}</bdi>
                <span className="mr-1 text-[0.72rem] font-normal text-gray">
                  (-<bdi>{homeSafeDiscountPercent(p)}%</bdi>)
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
