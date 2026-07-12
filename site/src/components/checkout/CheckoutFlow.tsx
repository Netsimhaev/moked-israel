"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import type { CheckoutItem, FulfillmentMethod } from "@/lib/checkout";
import { PICKUP_LOCATION } from "@/lib/checkout";
import { CROSS_SELL_DISCOUNT_PERCENT } from "@/lib/crossSell";
import { formatPrice } from "@/lib/format";
import { ColorVariantSelector } from "@/components/ColorVariantSelector";

const CATEGORY_GRADIENT: Record<CheckoutItem["category"], string> = {
  lock: "linear-gradient(135deg, #234a6b, #1a3552)",
  "home-safe": "linear-gradient(135deg, #2c5a4a, #1f3f36)",
  "gun-safe": "linear-gradient(135deg, #6b4a2c, #4a3220)",
  course: "linear-gradient(135deg, #b8863a, #8a5f2a)",
};

const CATEGORY_LABEL: Record<CheckoutItem["category"], string> = {
  lock: "מנעול חכם",
  "home-safe": "כספת ביתית",
  "gun-safe": "כספת נשק",
  course: "קורס",
};

const TRUST_BADGES = [
  "תשלום מאובטח ומוצפן",
  "אחריות יבואן רשמי",
  "כתובת אחת לכל שאלה — לפני ואחרי הרכישה",
];

type PaymentState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "redirecting"; url: string }
  | { status: "iframe"; url: string };

export function CheckoutFlow({
  item,
  crossSellItem,
  initialColorId,
  paymentError,
}: {
  item: CheckoutItem;
  crossSellItem?: CheckoutItem;
  initialColorId?: string;
  paymentError?: boolean;
}) {
  const isPhysical = item.category !== "course";
  const isSafe = item.shippingPrice !== undefined;
  const [colorId, setColorId] = useState(
    initialColorId ?? item.colors?.[0]?.id,
  );
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>("shipping");
  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [includeCrossSell, setIncludeCrossSell] = useState(false);
  const [payment, setPayment] = useState<PaymentState>({ status: "idle" });

  const isPickup = isSafe && fulfillment === "pickup";
  const showInstallation =
    isPhysical && item.installationPrice !== undefined && !isPickup;
  // Shipping is bundled into the installation fee — a technician bringing
  // the safe to install it is already delivering it, so a separate shipping
  // charge on top would double-charge the customer.
  const installationSelected = showInstallation && includeInstallation;
  const shippingIncludedInInstallation = installationSelected;

  const displayImage = (colorId && item.images?.[colorId]) ?? item.image;

  const crossSellPrice = crossSellItem
    ? Math.round(crossSellItem.price * (1 - CROSS_SELL_DISCOUNT_PERCENT / 100))
    : 0;

  let total = item.price;
  if (item.shippingPrice && !isPickup && !shippingIncludedInInstallation) {
    total += item.shippingPrice;
  }
  if (installationSelected && item.installationPrice) {
    total += item.installationPrice;
  }
  if (includeCrossSell && crossSellItem) total += crossSellPrice;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPayment({ status: "submitting" });
    const form = new FormData(e.currentTarget);
    const customer = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: item.slug,
          colorId,
          fulfillment: isSafe ? fulfillment : undefined,
          includeInstallation: showInstallation && includeInstallation,
          crossSellSlug: includeCrossSell ? crossSellItem?.slug : undefined,
          customer,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "checkout_failed");
      }
      if (data.mode === "iframe") {
        setPayment({ status: "iframe", url: data.url });
      } else {
        setPayment({ status: "redirecting", url: data.url });
        window.location.href = data.url;
      }
    } catch {
      setPayment({
        status: "error",
        message: "לא הצלחנו להתחיל את התשלום. נסו שוב או פנו אלינו בוואטסאפ.",
      });
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        {/* ============ הירו ============ */}
        <div
          className="grid gap-6 rounded-[var(--radius-l)] p-8 text-cream sm:grid-cols-[1fr_auto] sm:items-center sm:p-10"
          style={{ background: CATEGORY_GRADIENT[item.category] }}
        >
          <div>
            <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-cream/70 uppercase">
              {CATEGORY_LABEL[item.category]} · תשלום מאובטח
            </p>
            <h1 className="mt-2 text-[1.6rem]">{item.name}</h1>
            <p className="mt-1.5 text-[0.92rem] text-cream/80">{item.tagline}</p>
            <p className="mt-4 num text-[1.5rem] font-bold">
              ₪<bdi>{formatPrice(item.price)}</bdi>
            </p>
          </div>
          {displayImage && (
            <div className="relative h-[140px] w-[140px] flex-none overflow-hidden rounded-[var(--radius-m)] bg-white sm:h-[160px] sm:w-[160px]">
              <Image
                src={displayImage}
                alt={item.name}
                fill
                priority
                sizes="160px"
                className="object-contain p-4"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {TRUST_BADGES.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-[0.82rem] text-charcoal"
            >
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-sage" />
              {label}
            </span>
          ))}
        </div>

        {paymentError && (
          <p className="mt-6 rounded-[var(--radius-m)] bg-brick/10 px-5 py-4 text-[0.9rem] text-brick">
            התשלום הקודם לא הושלם. אפשר לנסות שוב — פרטי הכרטיס לא נשמרים
            אצלנו בכל מקרה.
          </p>
        )}

        <div className="mt-8 grid gap-8 sm:grid-cols-[1.1fr_1fr]">
          {/* ============ טופס פרטים ============ */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {item.colors && item.colors.length > 0 && (
              <div className="rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-5">
                <ColorVariantSelector
                  colors={item.colors}
                  onChange={(c) => setColorId(c.id)}
                />
              </div>
            )}

            <div className="rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-6">
              <h2 className="font-num text-[1rem] font-semibold text-navy-deep">
                פרטי הרוכש
              </h2>
              <label className="mb-1.5 mt-4 block font-num text-[0.82rem] text-gray" htmlFor="co-name">
                שם מלא
              </label>
              <input
                id="co-name"
                name="name"
                type="text"
                required
                placeholder="לדוגמה: מיכל כהן"
                className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
              />
              <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="co-phone">
                טלפון
              </label>
              <input
                id="co-phone"
                name="phone"
                type="tel"
                required
                placeholder="050-0000000"
                className="mb-4 w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
              />
              <label className="mb-1.5 block font-num text-[0.82rem] text-gray" htmlFor="co-email">
                אימייל
              </label>
              <input
                id="co-email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className={`w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy ${isPhysical ? "mb-4" : ""}`}
              />

              {isSafe && (
                <div className="mt-4" role="radiogroup" aria-label="אופן קבלת המוצר">
                  <p className="mb-2 font-num text-[0.82rem] text-gray">
                    אופן קבלת המוצר
                  </p>
                  <div className="flex flex-col gap-2">
                    <label className="flex cursor-pointer items-center gap-2.5 text-[0.9rem]">
                      <input
                        type="radio"
                        name="fulfillment-choice"
                        checked={fulfillment === "shipping"}
                        onChange={() => setFulfillment("shipping")}
                        className="h-4 w-4"
                      />
                      משלוח עד הבית
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5 text-[0.9rem]">
                      <input
                        type="radio"
                        name="fulfillment-choice"
                        checked={fulfillment === "pickup"}
                        onChange={() => setFulfillment("pickup")}
                        className="h-4 w-4"
                      />
                      איסוף עצמאי מאולם התצוגה — {PICKUP_LOCATION}
                    </label>
                  </div>
                </div>
              )}

              {isPhysical && !isPickup && (
                <>
                  <label className="mb-1.5 mt-4 block font-num text-[0.82rem] text-gray" htmlFor="co-address">
                    כתובת למשלוח והתקנה
                  </label>
                  <input
                    id="co-address"
                    name="address"
                    type="text"
                    required
                    placeholder="רחוב, מספר בית, עיר"
                    className="w-full rounded-[var(--radius-s)] border border-[var(--color-line)] bg-cream px-3.5 py-2.5 text-[0.92rem] outline-none focus:border-navy focus:outline focus:outline-2 focus:outline-navy"
                  />
                </>
              )}

              {isPickup && (
                <p className="mt-4 rounded-[var(--radius-s)] bg-sage/10 px-3.5 py-2.5 text-[0.85rem] text-navy-deep">
                  איסוף בתיאום מראש מאולם התצוגה: {PICKUP_LOCATION}
                </p>
              )}
            </div>

            {showInstallation && (
              <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-m)] border border-[var(--color-line)] bg-white p-5">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={(e) => setIncludeInstallation(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  <span className="block font-semibold text-navy-deep">
                    התקנה מקצועית על ידי טכנאי מטעם המוקד — ₪
                    <bdi>{formatPrice(item.installationPrice!)}</bdi>
                    <span className="mr-1.5 rounded-full bg-sage/15 px-2 py-0.5 font-num text-[0.7rem] font-semibold text-sage">
                      מומלץ
                    </span>
                  </span>
                  <span className="mt-1 block text-[0.85rem] text-gray">
                    כולל את המשלוח — לא משולם בנפרד. אפשר לבטל ולתאם משלוח
                    בלבד, אבל רוב הלקוחות מעדיפים שנעגן את זה בעצמנו.
                  </span>
                </span>
              </label>
            )}

            {crossSellItem && (
              <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-m)] border border-gold/40 bg-gold/[0.06] p-5">
                <input
                  type="checkbox"
                  checked={includeCrossSell}
                  onChange={(e) => setIncludeCrossSell(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  <span className="block font-semibold text-navy-deep">
                    הוסיפו גם {crossSellItem.name} — {CROSS_SELL_DISCOUNT_PERCENT}
                    % הנחה לרוכשי {item.name}
                  </span>
                  <span className="mt-1 block text-[0.85rem] text-gray">
                    <span className="line-through">
                      ₪{formatPrice(crossSellItem.price)}
                    </span>{" "}
                    <span className="font-semibold text-navy-deep">
                      ₪{formatPrice(crossSellPrice)}
                    </span>{" "}
                    — מצטרף להזמנה הזו, בלי תשלום נפרד.
                  </span>
                </span>
              </label>
            )}

            {payment.status === "error" && (
              <p className="rounded-[var(--radius-m)] bg-brick/10 px-5 py-4 text-[0.85rem] text-brick">
                {payment.message}
              </p>
            )}

            {payment.status === "iframe" ? (
              <iframe
                src={payment.url}
                title="תשלום מאובטח"
                className="h-[640px] w-full rounded-[var(--radius-m)] border border-[var(--color-line)]"
              />
            ) : (
              <button
                type="submit"
                disabled={payment.status === "submitting" || payment.status === "redirecting"}
                className="w-full rounded-[var(--radius-s)] bg-gold px-6 py-4 font-num text-[1.05rem] font-semibold text-navy-deep shadow-[var(--shadow-card)] transition hover:brightness-105 disabled:opacity-60"
              >
                {payment.status === "submitting" || payment.status === "redirecting"
                  ? "מעבירים אתכם לתשלום מאובטח…"
                  : `המשך לתשלום מאובטח — ₪${formatPrice(total)}`}
              </button>
            )}
          </form>

          {/* ============ סיכום הזמנה ============ */}
          <div className="h-fit rounded-[var(--radius-m)] border border-[var(--color-line)] bg-cream/60 p-6">
            <h2 className="font-num text-[1rem] font-semibold text-navy-deep">
              סיכום הזמנה
            </h2>
            <dl className="mt-4 flex flex-col gap-2.5 text-[0.9rem]">
              <div className="flex items-baseline justify-between">
                <dt className="text-gray">{item.name}</dt>
                <dd className="num font-semibold text-navy-deep">
                  ₪{formatPrice(item.price)}
                </dd>
              </div>
              {isSafe && (
                <div className="flex items-baseline justify-between">
                  <dt className="text-gray">
                    {isPickup
                      ? "איסוף עצמאי"
                      : shippingIncludedInInstallation
                        ? "משלוח (כלול בהתקנה)"
                        : "משלוח"}
                  </dt>
                  <dd className="num text-navy-deep">
                    {isPickup || shippingIncludedInInstallation
                      ? "ללא עלות נפרדת"
                      : `₪${formatPrice(item.shippingPrice!)}`}
                  </dd>
                </div>
              )}
              {installationSelected && item.installationPrice !== undefined && (
                <div className="flex items-baseline justify-between">
                  <dt className="text-gray">התקנה מקצועית (כולל משלוח)</dt>
                  <dd className="num text-navy-deep">
                    ₪{formatPrice(item.installationPrice)}
                  </dd>
                </div>
              )}
              {includeCrossSell && crossSellItem && (
                <div className="flex items-baseline justify-between">
                  <dt className="text-gray">
                    {crossSellItem.name} ({CROSS_SELL_DISCOUNT_PERCENT}% הנחה)
                  </dt>
                  <dd className="num text-navy-deep">
                    ₪{formatPrice(crossSellPrice)}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-[var(--color-line)] pt-4">
              <dt className="font-num text-[0.95rem] font-semibold text-navy-deep">
                סה&quot;כ לתשלום
              </dt>
              <dd className="num text-[1.3rem] font-bold text-navy-deep">
                ₪{formatPrice(total)}
              </dd>
            </div>
            <p className="mt-4 text-[0.8rem] text-gray">
              פרטי האשראי מוזנים ישירות במסך המאובטח של ספק הסליקה — לא
              נשמרים אצלנו בשום שלב.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
