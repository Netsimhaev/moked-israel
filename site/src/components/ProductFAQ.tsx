export function ProductFAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white px-5 py-4 open:pb-4"
        >
          <summary className="cursor-pointer list-none font-num text-[0.95rem] font-semibold text-navy-deep marker:content-none">
            <span className="flex items-center justify-between gap-3">
              {item.question}
              <span
                aria-hidden
                className="flex-none text-gray transition-transform group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="mt-2.5 text-[0.9rem] text-gray">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
