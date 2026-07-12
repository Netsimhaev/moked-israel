export function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/[0.08] px-4 py-2 text-[0.82rem] text-cream/90">
      <span className="h-1.5 w-1.5 flex-none rounded-full bg-sage" />
      {label}
    </span>
  );
}
