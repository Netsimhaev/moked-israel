import { getLockBySlug, type LockColor } from "@/lib/locks";
import { getGunSafeBySlug } from "@/lib/safes";
import { getHomeSafeBySlug } from "@/lib/homeSafes";
import { getCourseBySlug } from "@/lib/courses";

export type CheckoutCategory = "lock" | "gun-safe" | "home-safe" | "course";

// Self-pickup option for safes, added 2026-07-10 per explicit user request —
// some customers prefer to collect the safe themselves instead of paying for
// shipping. Only relevant for categories with a shippingPrice (gun-safe /
// home-safe); locks and the course have no fulfillment choice at all.
export const PICKUP_LOCATION = "אולם התצוגה, רחוב האורגים 34, אשדוד";

export type FulfillmentMethod = "shipping" | "pickup";

export type CheckoutItem = {
  slug: string;
  category: CheckoutCategory;
  name: string;
  tagline: string;
  price: number; // base item price: locks = all-in; safes = item only; course = flat
  manufacturerPrice?: number; // absent for course
  shippingPrice?: number; // safes only
  installationPrice?: number; // safes only
  image?: string;
  colors?: LockColor[]; // locks, and any future home safe with color variants
};

// Single normalization point across the 4 differently-shaped product data
// files — checkout/API code should never import getLockBySlug/getGunSafeBySlug/
// getHomeSafeBySlug/getCourseBySlug directly, always go through this.
export function getCheckoutItem(slug: string): CheckoutItem | undefined {
  const lock = getLockBySlug(slug);
  if (lock) {
    return {
      slug,
      category: "lock",
      name: lock.name,
      tagline: lock.tagline,
      price: lock.ourPrice,
      manufacturerPrice: lock.manufacturerPrice,
      image: lock.images?.[lock.colors[0]?.id ?? ""],
      colors: lock.colors,
    };
  }

  const gunSafe = getGunSafeBySlug(slug);
  if (gunSafe) {
    return {
      slug,
      category: "gun-safe",
      name: gunSafe.name,
      tagline: gunSafe.tagline,
      price: gunSafe.ourPrice,
      manufacturerPrice: gunSafe.manufacturerPrice,
      shippingPrice: gunSafe.shippingPrice,
      installationPrice: gunSafe.installationPrice,
      image: gunSafe.images?.[0],
    };
  }

  const homeSafe = getHomeSafeBySlug(slug);
  if (homeSafe) {
    return {
      slug,
      category: "home-safe",
      name: homeSafe.name,
      tagline: homeSafe.tagline,
      price: homeSafe.ourPrice,
      manufacturerPrice: homeSafe.manufacturerPrice,
      shippingPrice: homeSafe.shippingPrice,
      installationPrice: homeSafe.installationPrice,
      image: homeSafe.images?.[0],
      colors: homeSafe.colors,
    };
  }

  const course = getCourseBySlug(slug);
  if (course) {
    return {
      slug,
      category: "course",
      name: course.name,
      tagline: course.tagline,
      price: course.price,
    };
  }

  return undefined;
}
