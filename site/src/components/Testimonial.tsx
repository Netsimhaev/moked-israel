export function Testimonial({
  quote,
  name,
  place,
}: {
  quote: string;
  name: string;
  place: string;
}) {
  return (
    <div className="rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-6">
      <p className="text-[0.95rem] text-charcoal">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 font-num text-[0.82rem] text-gray">
        <b className="text-navy-deep">{name}</b>, {place}
      </p>
    </div>
  );
}
