"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "./ImageLightbox";

// Gun safes have no color variants (single gray finish) and no door-mounted
// "installation photo" concept (they're freestanding units) — unlike
// ProductHeroGallery for locks, this is just a hero image + a click-to-
// enlarge thumbnail strip of the remaining studio angles, all backed by one
// ordered images[] array (images[0] is the hero).
export function SafeImageGallery({
  images,
  productName,
  fallbackGradient = "linear-gradient(135deg, #6b4a2c, #4a3220)",
}: {
  images?: string[];
  productName: string;
  fallbackGradient?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hero = images?.[0];
  const rest = images?.slice(1) ?? [];

  return (
    <div>
      {hero ? (
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          aria-label="הגדלת תמונה"
          className="group relative block aspect-square w-full overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white"
        >
          <Image
            src={hero}
            alt={productName}
            fill
            priority
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-[1.4rem] text-transparent transition group-hover:bg-black/20 group-hover:text-white">
            ⤢
          </span>
        </button>
      ) : (
        <div
          className="aspect-square w-full rounded-[var(--radius-l)]"
          style={{ background: fallbackGradient }}
        />
      )}

      {rest.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {rest.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(i + 1)}
              aria-label="הגדלת תמונה"
              className="group relative aspect-square w-full overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white"
            >
              <Image
                src={src}
                alt={`${productName} — תמונה נוספת`}
                fill
                sizes="(min-width: 640px) 15vw, 25vw"
                className="object-contain p-2 transition group-hover:brightness-90"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-[1.2rem] text-transparent transition group-hover:bg-black/20 group-hover:text-white">
                ⤢
              </span>
            </button>
          ))}
        </div>
      )}
      {rest.length > 0 && (
        <p className="mt-2 text-[0.8rem] text-gray">לחצו על תמונה להגדלה</p>
      )}

      {lightboxIndex !== null && images && (
        <ImageLightbox
          photos={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
