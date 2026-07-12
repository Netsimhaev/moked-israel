"use client";

import { useState } from "react";
import Image from "next/image";
import type { LockColor, LockProduct } from "@/lib/locks";
import { BuyNowButton } from "./BuyNowButton";
import { ColorVariantSelector } from "./ColorVariantSelector";
import { ImageLightbox } from "./ImageLightbox";
import { PriceDisplay } from "./PriceDisplay";
import { ProductOrderForm } from "./ProductOrderForm";

// Owns the selected-color state so the hero image and the order form's color
// field stay in sync — both live in the same client component because the
// grid splits them into separate columns (image left, buy box right) and a
// server component page can't share client state across them otherwise.
export function ProductHeroGallery({
  product,
  discountPercent,
}: {
  product: LockProduct;
  discountPercent: number;
}) {
  const [color, setColor] = useState<LockColor | undefined>(product.colors[0]);
  const image = color ? product.images?.[color.id] : undefined;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const installPhotos = product.installPhotos ?? [];

  return (
    <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr]">
      <div>
        {image ? (
          <div className="group relative aspect-square w-full overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white">
            <Image
              src={image}
              alt={`${product.name} — ${color?.label}`}
              fill
              priority
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className="aspect-square w-full rounded-[var(--radius-l)]"
            style={{ background: "linear-gradient(135deg, #234a6b, #16334d)" }}
          />
        )}

        {installPhotos.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {installPhotos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label="הגדלת תמונה מהתקנה אמיתית"
                className="group relative aspect-square w-full overflow-hidden rounded-[var(--radius-m)] border border-[var(--color-line)]"
              >
                <Image
                  src={src}
                  alt={`התקנת ${product.name} בבית לקוח`}
                  fill
                  sizes="(min-width: 640px) 15vw, 25vw"
                  className="object-cover transition group-hover:brightness-90"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-[1.2rem] text-transparent transition group-hover:bg-black/20 group-hover:text-white">
                  ⤢
                </span>
              </button>
            ))}
          </div>
        )}
        {installPhotos.length > 0 && (
          <p className="mt-2 text-[0.8rem] text-gray">
            תמונות מהתקנות אמיתיות בבתי לקוחות — לחצו להגדלה
          </p>
        )}

        <div className="mt-8 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-5">
          <h3 className="font-num text-[1rem] font-semibold text-navy-deep">
            מי מייצר, מי מתקין
          </h3>
          <p className="mt-2 text-[0.88rem] text-gray">
            {product.name} מיוצר על ידי Techom — יצרן מנעולים חכמים ישראלי,
            פיתוח ישראלי. המוקד היא חברה חיצונית שבחרה את הדגם לאחר בדיקה
            מעמיקה של השוק, מתקינה אותו בעצמה בבית שלכם, ונותנת עליו אחריות
            ושירות ישירים — כתובת אחת לכל שאלה, גם אחרי הרכישה.
          </p>
        </div>
      </div>

      <div>
        {product.catalogBadge && (
          <span className="mb-2 inline-block rounded-full bg-gold/20 px-3 py-1 font-num text-[0.74rem] font-semibold text-copper">
            {product.catalogBadge}
          </span>
        )}
        <h1 className="text-[1.5rem]">{product.name}</h1>
        <p className="mt-1.5 text-[0.92rem] text-gray">{product.tagline}</p>

        <div className="mt-4">
          <PriceDisplay
            manufacturerPrice={product.manufacturerPrice}
            ourPrice={product.ourPrice}
            discountPercent={discountPercent}
            note="מחיר מחירון היצרן (Techom) מול מחיר המוקד — המחיר כולל התקנה מקצועית, הדרכת שימוש, ואחריות יבואן רשמי"
          />
        </div>

        <p className="mt-5 text-[0.92rem] text-charcoal">
          {product.description}
        </p>

        <ul className="mt-5 flex flex-col gap-2 text-[0.9rem]">
          {product.highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span className="flex-none font-bold text-sage">✓</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-7">
          {product.colors.length > 0 && (
            <div className="mb-5">
              <ColorVariantSelector colors={product.colors} onChange={setColor} />
            </div>
          )}
          <BuyNowButton slug={product.slug} selectedColorId={color?.id} variant="hero" />
          <ProductOrderForm
            productSlug={product.slug}
            productName={product.name}
            selectedColor={color}
            submitLabel="יש לי שאלה לפני שרוכשים — השאירו פרטים"
          />
          <p className="mt-3 text-center text-[0.85rem]">
            <a
              href={`https://wa.me/972500000000?text=${encodeURIComponent(
                `היי, יש לי שאלה לגבי מנעול ${product.name}`,
              )}`}
              className="text-navy underline"
            >
              עדיין שוקלים? דברו איתנו בוואטסאפ לפני ההזמנה
            </a>
          </p>
        </div>
      </div>

      {lightboxIndex !== null && product.installPhotos && (
        <ImageLightbox
          photos={product.installPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
