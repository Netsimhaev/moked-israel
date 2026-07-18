import { lockProducts, getLockBySlug, discountPercent, type LockColor } from "@/lib/locks";
import {
  homeSafeProducts,
  getHomeSafeBySlug,
  homeSafeDiscountPercent,
} from "@/lib/homeSafes";
import { gunSafeProducts, getGunSafeBySlug, safeDiscountPercent } from "@/lib/safes";
import { courseProducts, getCourseBySlug } from "@/lib/courses";
import { featureRows } from "@/components/ModelComparisonTable";

export type LandingPageCategory = "lock" | "home-safe" | "gun-safe" | "course";

export type SpecRow = { label: string; value: string };

export type LandingPageMedia = {
  images: string[]; // ordered gallery, images[0] = hero when no color-synced image applies
  colorImages?: Record<string, string>; // locks only — feeds ColorVariantSelector-synced hero
  installPhotos?: string[]; // real on-site install photos — locks only today
  video?: { src: string; poster: string }; // absent for all 11 products today, added later
};

// Unified, richer projection over the 4 differently-shaped catalog sources —
// sibling to lib/checkout.ts's CheckoutItem, not an extension of it (that
// type is intentionally lean for checkout/API code; bolting FAQ/highlights/
// specs onto it would bloat every checkout call site for no reason). Powers
// the standalone /lp/[slug] landing pages only.
export type LandingPageProduct = {
  slug: string;
  category: LandingPageCategory;
  name: string;
  tagline: string;
  description: string;
  catalogBadge?: string;
  bestFor?: string;
  colors?: LockColor[];
  pricing: {
    ourPrice: number;
    manufacturerPrice?: number; // absent for course — no honest reference price exists
    shippingPrice?: number; // safes only
    installationPrice?: number; // safes only
    discountPercent?: number;
  };
  media: LandingPageMedia;
  highlights: string[];
  problemStatement?: { title: string; body: string };
  benefitTranslations: { feature: string; benefit: string }[]; // locks only today; [] otherwise
  specs: SpecRow[];
  standardNote?: string; // gun safes only — verbatim compliance text, never paraphrase
  disclaimer?: string; // course only
  faq: { question: string; answer: string }[];
  demoVideo?: { src: string; poster: string; title: string }; // real on-site demo, own section — model-e only today
};

export const categoryGradient: Record<LandingPageCategory, string> = {
  lock: "linear-gradient(135deg, #234a6b, #1a3552)",
  "home-safe": "linear-gradient(135deg, #2c5a4a, #1f3f36)",
  "gun-safe": "linear-gradient(135deg, #6b4a2c, #4a3220)",
  course: "linear-gradient(135deg, #b8863a, #8a5f2a)",
};

export const categoryLabel: Record<LandingPageCategory, string> = {
  lock: "מנעול חכם",
  "home-safe": "כספת ביתית",
  "gun-safe": "כספת נשק",
  course: "קורס",
};

// Locks have no honest structured spec source today (only boolean feature
// flags, used by ModelComparisonTable's cross-model grid) — derive one
// summary row from whichever flags are true, reusing that table's exact
// labels so wording never drifts between the two surfaces. Prefers a real
// lock.specs[] array once product-page-agent/copywriting-agent backfill one.
function deriveLockSpecs(lock: ReturnType<typeof getLockBySlug>): SpecRow[] {
  if (!lock) return [];
  if (lock.specs && lock.specs.length > 0) return lock.specs;
  const accessMethods = featureRows
    .filter((row) => lock.features[row.key])
    .map((row) => row.label);
  return accessMethods.length > 0
    ? [{ label: "אמצעי גישה נתמכים", value: accessMethods.join(" + ") }]
    : [];
}

export function getLandingPageProduct(slug: string): LandingPageProduct | undefined {
  const lock = getLockBySlug(slug);
  if (lock) {
    return {
      slug,
      category: "lock",
      name: lock.name,
      tagline: lock.tagline,
      description: lock.description,
      catalogBadge: lock.catalogBadge,
      bestFor: lock.bestFor,
      colors: lock.colors,
      pricing: {
        ourPrice: lock.ourPrice,
        manufacturerPrice: lock.manufacturerPrice,
        discountPercent: discountPercent(lock),
      },
      media: {
        images:
          lock.installPhotos && lock.installPhotos.length > 0
            ? lock.installPhotos
            : Object.values(lock.images ?? {}),
        colorImages: lock.images,
        installPhotos: lock.installPhotos,
        video: lock.video,
      },
      highlights: lock.highlights,
      problemStatement: lock.problemStatement,
      benefitTranslations: lock.benefitTranslations,
      specs: deriveLockSpecs(lock),
      faq: lock.faq,
    };
  }

  const gunSafe = getGunSafeBySlug(slug);
  if (gunSafe) {
    return {
      slug,
      category: "gun-safe",
      name: gunSafe.name,
      tagline: gunSafe.tagline,
      description: gunSafe.description,
      bestFor: gunSafe.bestFor,
      pricing: {
        ourPrice: gunSafe.ourPrice,
        manufacturerPrice: gunSafe.manufacturerPrice,
        shippingPrice: gunSafe.shippingPrice,
        installationPrice: gunSafe.installationPrice,
        discountPercent: safeDiscountPercent(gunSafe),
      },
      media: {
        images: gunSafe.images ?? [],
        video: gunSafe.video,
      },
      highlights: gunSafe.highlights,
      problemStatement: gunSafe.problemStatement,
      benefitTranslations: [],
      specs: gunSafe.specs,
      standardNote: gunSafe.standardNote,
      faq: gunSafe.faq,
      demoVideo: gunSafe.demoVideo,
    };
  }

  const homeSafe = getHomeSafeBySlug(slug);
  if (homeSafe) {
    return {
      slug,
      category: "home-safe",
      name: homeSafe.name,
      tagline: homeSafe.tagline,
      description: homeSafe.description,
      bestFor: homeSafe.bestFor,
      colors: homeSafe.colors,
      pricing: {
        ourPrice: homeSafe.ourPrice,
        manufacturerPrice: homeSafe.manufacturerPrice,
        shippingPrice: homeSafe.shippingPrice,
        installationPrice: homeSafe.installationPrice,
        discountPercent: homeSafeDiscountPercent(homeSafe),
      },
      media: {
        images: homeSafe.images ?? [],
        video: homeSafe.video,
      },
      highlights: homeSafe.highlights,
      problemStatement: homeSafe.problemStatement,
      benefitTranslations: [],
      specs: homeSafe.specs,
      faq: homeSafe.faq,
    };
  }

  const course = getCourseBySlug(slug);
  if (course) {
    return {
      slug,
      category: "course",
      name: course.name,
      tagline: course.tagline,
      description: course.description ?? "",
      pricing: { ourPrice: course.price },
      media: { images: course.images ?? [], video: course.video },
      highlights: course.highlights,
      benefitTranslations: [],
      specs: [],
      disclaimer: course.disclaimer,
      faq: course.faq ?? [],
    };
  }

  return undefined;
}

export const landingPageProducts: LandingPageProduct[] = [
  ...lockProducts.map((p) => getLandingPageProduct(p.slug)!),
  ...homeSafeProducts.map((p) => getLandingPageProduct(p.slug)!),
  ...gunSafeProducts.map((p) => getLandingPageProduct(p.slug)!),
  ...courseProducts.map((p) => getLandingPageProduct(p.slug)!),
];

export type CatalogSummaryItem = {
  slug: string;
  name: string;
  category: LandingPageCategory;
  tagline: string;
  ourPrice: number;
};

// Deliberately thin — no specs/faq/standardNote/disclaimer. Safe to inject
// into every chat system prompt for cross-product comparison without
// leaking gun-safe compliance text or a full spec sheet for a product the
// visitor isn't even looking at. Full detail on a specific other product is
// fetched on demand via the getProductDetails tool (lib/claude.ts), which
// goes through getLandingPageProduct itself — never invented by the model.
export function getCatalogSummary(): CatalogSummaryItem[] {
  return landingPageProducts.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    tagline: p.tagline,
    ourPrice: p.pricing.ourPrice,
  }));
}