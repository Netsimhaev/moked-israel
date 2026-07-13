// Honest discount display: the crossed-out price is Techom's own published
// manufacturer list price (verified on techom.co.il, see lib/locks.ts), not a
// fabricated "was" price — per security-compliance-agent guidance on Israeli
// consumer-protection rules against fictitious reference pricing.
export function PriceDisplay({
  manufacturerPrice,
  ourPrice,
  discountPercent,
  note = "מחיר מחירון היצרן מול מחיר המוקד — כולל התקנה",
}: {
  manufacturerPrice: number;
  ourPrice: number;
  discountPercent: number;
  note?: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="num text-[1.7rem] font-bold text-navy-deep">
          ₪<bdi>{ourPrice.toLocaleString("he-IL")}</bdi>
        </span>
        <span className="num text-[1.05rem] text-gray line-through decoration-brick/60">
          ₪<bdi>{manufacturerPrice.toLocaleString("he-IL")}</bdi>
        </span>
        <span className="rounded-full bg-brick/10 px-3 py-1 font-num text-[0.78rem] font-semibold text-brick">
          <bdi>{discountPercent}%</bdi> הנחה
        </span>
      </div>
      <p className="mt-1.5 text-[0.78rem] text-gray">{note}</p>
    </div>
  );
}
