"use client";

import { useEffect } from "react";
import Image from "next/image";

// Fullscreen click-to-enlarge viewer, shared across product categories —
// closes on Escape, backdrop click, or the × button.
export function ImageLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + photos.length) % photos.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, photos.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute top-5 left-5 rounded-full bg-white/10 px-3.5 py-2 font-num text-[1.1rem] text-cream hover:bg-white/20"
      >
        ✕
      </button>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + photos.length) % photos.length);
            }}
            aria-label="התמונה הקודמת"
            className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-[1.4rem] text-cream hover:bg-white/20"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % photos.length);
            }}
            aria-label="התמונה הבאה"
            className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-[1.4rem] text-cream hover:bg-white/20"
          >
            ›
          </button>
        </>
      )}
      <div
        className="relative h-[88vh] w-[88vw] max-w-[1100px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt=""
          fill
          sizes="88vw"
          className="rounded-[var(--radius-m)] object-contain"
        />
      </div>
    </div>
  );
}
