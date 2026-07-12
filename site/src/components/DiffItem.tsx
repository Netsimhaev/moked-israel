import type { ReactNode } from "react";

// Small inline flag mark — emoji flags (🇮🇱) silently fail to render on
// Windows/some Chromium builds, so the "Israeli development" pillar uses this
// instead of an emoji icon.
export function IsraelFlagIcon() {
  return (
    <svg viewBox="0 0 24 16" className="h-4 w-6" aria-hidden>
      <rect width="24" height="16" fill="#fff" />
      <rect y="1.4" width="24" height="2.1" fill="#1e3a56" />
      <rect y="12.5" width="24" height="2.1" fill="#1e3a56" />
      <polygon
        points="12,4.8 14.77,6.4 9.23,6.4"
        fill="none"
        stroke="#1e3a56"
        strokeWidth="0.6"
      />
      <polygon
        points="12,11.2 9.23,9.6 14.77,9.6"
        fill="none"
        stroke="#1e3a56"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export function DiffItem({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy/[0.07] text-xl">
        {icon}
      </div>
      <h3 className="font-num text-[1rem] font-semibold text-navy-deep">
        {title}
      </h3>
      <p className="mt-2 text-[0.88rem] text-gray">{description}</p>
    </div>
  );
}
