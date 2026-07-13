import type { SpecRow } from "@/lib/landingPage";

// Single-product technical spec sheet — distinct from ModelComparisonTable/
// HomeSafeComparisonTable/SafeComparisonTable, which compare ACROSS models.
// This just renders one product's own SpecRow[] as a clean label/value table.
export function ProductSpecSheet({ specs }: { specs: SpecRow[] }) {
  if (specs.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] border-collapse text-[0.9rem]">
        <tbody>
          {specs.map((s) => (
            <tr key={s.label}>
              <td className="border-b border-[var(--color-line)] py-2.5 text-gray">
                {s.label}
              </td>
              <td className="border-b border-[var(--color-line)] py-2.5 text-start font-num font-semibold text-navy-deep">
                {s.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}