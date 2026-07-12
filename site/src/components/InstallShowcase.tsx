"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "./ImageLightbox";

// Real on-site installation photos, curated across the lock catalog
// (lib/locks.ts installPhotos — the same verified assets already used on
// product pages), surfaced here as homepage-level social proof. No stock
// photography, no fabricated captions — see CLAUDE.md "אמינות".
const photos = [
  { src: "/images/locks/alfa/install-1.jpeg", alt: "התקנת מנעול חכם ALFA בבית לקוח" },
  { src: "/images/locks/model-t/install-2.jpg", alt: "התקנת מנעול חכם Model T בבית לקוח" },
  { src: "/images/locks/smart-plus/install-1.jpg", alt: "התקנת מנעול חכם Smart Plus בבית לקוח" },
  { src: "/images/locks/alfa/install-3.jpeg", alt: "התקנת מנעול חכם ALFA בבית לקוח" },
  { src: "/images/locks/model-t/install-4.jpg", alt: "התקנת מנעול חכם Model T בבית לקוח" },
  { src: "/images/locks/smart/install-1.jpg", alt: "התקנת מנעול חכם Smart בבית לקוח" },
];

export function InstallShowcase() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="border-b border-[var(--color-line)] py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <h2 className="text-[1.9rem]">מהתקנות אמיתיות שלנו, ברחבי הארץ</h2>
        <p className="mt-2 max-w-[60ch] text-[0.95rem] text-gray">
          לא הדמיות שיווקיות — תמונות מהתקנות בפועל, אצל לקוחות אמיתיים, על
          ידי הטכנאים שלנו.
        </p>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label="הגדלת תמונה מהתקנה אמיתית"
              className="group relative aspect-square w-full overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-90"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-[1.2rem] text-transparent transition group-hover:bg-black/20 group-hover:text-white">
                ⤢
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          photos={photos.map((p) => p.src)}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
