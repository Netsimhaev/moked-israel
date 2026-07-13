"use client";

import { useState } from "react";
import Image from "next/image";
import type { LandingPageProduct } from "@/lib/landingPage";
import { categoryGradient } from "@/lib/landingPage";
import { formatPrice } from "@/lib/format";
import type { LockColor } from "@/lib/locks";
import { ColorVariantSelector } from "./ColorVariantSelector";
import { ImageLightbox } from "./ImageLightbox";
import { PriceDisplay } from "./PriceDisplay";
import { BuyNowButton } from "./BuyNowButton";
import { ProductVideoPlayer } from "./ProductVideoPlayer";
import { TrustBadge } from "./TrustBadge";

// Hero for the standalone /lp/[slug] landing pages: video-or-gallery media
// (video takes priority once a product has one — see lib/landingPage.ts),
// color-synced hero image for locks (colorImages present), plain ordered
// gallery for safes/course, dual CTA (buy now + "have a rep call me"), and
// an honest price block that never fabricates a manufacturer comparison
// price for the course (it has none — see lib/courses.ts).
export function ProductLandingHero({ product }: { product: LandingPageProduct }) {
  const [color, setColor] = useState<LockColor | undefined>(product.colors?.[0]);
  const isColorSynced = Boolean(product.media.colorImages);
  const heroImage = isColorSynced
    ? color && product.media.colorImages?.[color.id]
    : product.media.images[0];
  const thumbnails = isColorSynced
    ? (product.media.installPhotos ?? [])
    : product.media.images.slice(1);
  const lightboxPhotos = [heroImage, ...thumbnails].filter(
    (p): p is string => Boolean(p),
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const priceNote =
    product.category === "lock"
      ? "מחיר מחירון היצרן מול מחיר המוקד — המחיר כולל התקנה מקצועית, הדרכת שימוש, ואחריות יבואן רשמי"
      : "מחיר מחירון היצרן מול מחיר המוקד — מחיר המוצר בלבד, משלוח והתקנה בנפרד";

  return (
    <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr]">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white">
          {product.media.video ? (
            <ProductVideoPlayer
              src={product.media.video.src}
              poster={product.media.video.poster}
            />
          ) : heroImage ? (
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label="הגדלת תמונה"
              className="group relative block h-full w-full"
            >
              <Image
                src={heroImage}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ) : (
            <div
              className="h-full w-full"
              style={{ background: categoryGradient[product.category] }}
            />
          )}
        </div>

        {thumbnails.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {thumbnails.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(i + 1)}
                aria-label="הגדלת תמונה"
                className="group relative aspect-square w-full overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line)]"
              >
                <Image
                  src={src}
                  alt={`${product.name} — תמונה נוספת`}
                  fill
                  sizes="(min-width: 640px) 15vw, 25vw"
                  className="object-cover transition group-hover:brightness-90"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        {product.catalogBadge && (
          <span className="mb-2 inline-block rounded-full bg-gold/20 px-3 py-1 font-num text-[0.74rem] font-semibold text-copper">
            {product.catalogBadge}
          </span>
        )}
        <h1 className="text-[1.6rem]">{product.name}</h1>
        <p className="mt-1.5 text-[0.95rem] text-gray">{product.tagline}</p>

        <div className="mt-4">
          {product.pricing.manufacturerPrice ? (
            <>
              <PriceDisplay
                manufacturerPrice={product.pricing.manufacturerPrice}
                ourPrice={product.pricing.ourPrice}
                discountPercent={product.pricing.discountPercent ?? 0}
                note={priceNote}
              />
              {product.pricing.shippingPrice !== undefined && (
                <div className="mt-3 flex flex-wrap gap-2 text-[0.82rem]">
                  <span className="rounded-full bg-cream px-3 py-1.5 text-charcoal">
                    משלוח: <b className="font-num">₪{product.pricing.shippingPrice}</b>
                  </span>
                  <span className="rounded-full bg-cream px-3 py-1.5 text-charcoal">
                    משלוח + התקנה: <b className="font-num">₪{product.pricing.installationPrice}</b>
                  </span>
                </div>
              )}
            </>
          ) : (
            <span className="num text-[1.7rem] font-bold text-navy-deep">
              ₪<bdi>{formatPrice(product.pricing.ourPrice)}</bdi>
            </span>
          )}
        </div>

        <p className="mt-5 text-[0.92rem] text-charcoal">{product.description}</p>

        <ul className="mt-5 flex flex-col gap-2 text-[0.9rem]">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span className="flex-none font-bold text-sage">✓</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-7">
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <ColorVariantSelector colors={product.colors} onChange={setColor} />
            </div>
          )}
          <BuyNowButton slug={product.slug} selectedColorId={color?.id} variant="hero" />
          <a
            href="#lead"
            className="mt-3 block text-center font-num text-[0.9rem] font-semibold text-navy underline"
          >
            רוצים שנציג יחזור אליכם ויסביר על {product.name}? השאירו פרטים
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <TrustBadge variant="light" label="שירות ישראלי ישיר" />
          <TrustBadge variant="light" label="אחריות שנתיים על המוצר וההתקנה" />
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          photos={lightboxPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}