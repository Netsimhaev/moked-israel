// Course "product" data, added 2026-07-10 for checkout wiring. No price
// field existed anywhere for the course before this — ₪790 confirmed
// explicitly by the user, flat price, no manufacturer/list comparison price
// (there's no honest external reference price to show, unlike locks/safes
// which compare against Techom's published list price — do not invent one).
export type CourseProduct = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  highlights: string[];
};

export const courseProducts: CourseProduct[] = [
  {
    slug: "lock-installation",
    name: "קורס התקנה ותכנות מנעולים חכמים",
    tagline: "לומדים היום, מתקינים מחר",
    price: 790,
    highlights: [
      "7 פרקים · 24 שיעורים",
      "מפגשים פרונטליים עם נציג מקצועי",
      "מבחן אמריקאי + תעודת מתקין מוסמך",
      "ליווי אישי בבית לקוחות אמיתיים",
    ],
  },
];

export function getCourseBySlug(slug: string): CourseProduct | undefined {
  return courseProducts.find((c) => c.slug === slug);
}
