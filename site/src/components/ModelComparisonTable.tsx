import Link from "next/link";
import { lockProducts, discountPercent, type LockFeatures } from "@/lib/locks";

// Exported so lib/landingPage.ts can reuse the exact same labels when
// deriving a single-product spec row from these boolean flags — keeps
// wording consistent between this cross-model table and the richer
// per-product /lp/[slug] landing page.
export const featureRows: { key: keyof LockFeatures; label: string }[] = [
  { key: "faceId", label: "זיהוי פנים" },
  { key: "palmId", label: "זיהוי כף יד" },
  { key: "heightAdjustableScanner", label: "סורק מתכוונן לגובה המשתמש" },
  { key: "fingerprint", label: "טביעת אצבע" },
  { key: "camera", label: "מצלמה בדלת" },
  { key: "card", label: "פתיחה בכרטיס/צ'יפ" },
  { key: "app", label: "ניהול מהאפליקציה" },
  { key: "mechanicalBackup", label: "גיבוי מכני / מפתח פיזי (מוצהר)" },
  { key: "alarm", label: "אזעקה מובנית בניסיון פריצה" },
  { key: "shabbatMode", label: "כפתור נטרול לשבת" },
];

// Every ✓/— cell reflects the `features` flags in lib/locks.ts, which in turn
// only mark true what's explicitly stated in that product's own highlights —
// see product-page-agent briefs. Do not add rows without a verified source.
export function ModelComparisonTable({
  currentSlug,
}: {
  currentSlug: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-[0.85rem]">
        <thead>
          <tr>
            <th className="border-b border-[var(--color-line)] py-3 text-start text-gray"></th>
            {lockProducts.map((p) => (
              <th
                key={p.slug}
                className={`border-b border-[var(--color-line)] py-3 text-center font-num ${
                  p.slug === currentSlug
                    ? "text-navy-deep"
                    : "text-gray"
                }`}
              >
                {p.slug === currentSlug ? (
                  <span className="rounded-full bg-navy/[0.08] px-2.5 py-1">
                    {p.name}
                  </span>
                ) : (
                  <Link href={`/product/${p.slug}`}>{p.name}</Link>
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
              {lockProducts.map((p) => (
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
            <td className="py-2.5 text-gray">מחיר המוקד</td>
            {lockProducts.map((p) => (
              <td
                key={p.slug}
                className="num py-2.5 text-center font-semibold text-navy-deep"
              >
                ₪<bdi>{p.ourPrice.toLocaleString("he-IL")}</bdi>
                <span className="mr-1 text-[0.72rem] font-normal text-gray">
                  (-<bdi>{discountPercent(p)}%</bdi>)
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
