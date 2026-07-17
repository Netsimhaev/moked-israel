import type { Metadata } from "next";
import { headers } from "next/headers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { lockProducts } from "@/lib/locks";
import { homeSafeProducts } from "@/lib/homeSafes";
import { gunSafeProducts } from "@/lib/safes";
import { courseProducts } from "@/lib/courses";
import { getAllBlogPosts } from "@/lib/blog";
import { landingPageProducts, categoryLabel } from "@/lib/landingPage";

// Internal reference page — not a customer-facing route (not in Header nav,
// not indexed). Lists every real page/product/article/landing-page on the
// site as a full URL. The base URL is read from the incoming request's own
// host header, not a hardcoded/env value, so it's always correct for
// whatever domain is actually serving the request (localhost, a Vercel
// preview URL, or a future custom domain) with zero manual upkeep.
export const metadata: Metadata = {
  title: "מפת קישורים | המוקד",
  robots: { index: false, follow: false },
};

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("host") ?? "";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

type LinkItem = { label: string; path: string };
type LinkSection = { title: string; items: LinkItem[] };

export default async function LinksPage() {
  const baseUrl = await getBaseUrl();
  const blogPosts = await getAllBlogPosts();

  const sections: LinkSection[] = [
    {
      title: "עמודים ראשיים",
      items: [
        { label: "עמוד הבית", path: "/" },
        { label: "מנעולים חכמים — קטלוג", path: "/locks" },
        { label: "כספות ביתיות — קטלוג", path: "/safes/home" },
        { label: "כספות נשק — קטלוג", path: "/safes/guns" },
        { label: "קורסים והכשרות — קטלוג", path: "/courses" },
        { label: "רובוטיקה", path: "/robotics" },
        { label: "בלוג — רשימה", path: "/blog" },
      ],
    },
    {
      title: "מנעולים חכמים — דפי מוצר",
      items: lockProducts.map((p) => ({ label: p.name, path: `/product/${p.slug}` })),
    },
    {
      title: "כספות ביתיות — דפי מוצר",
      items: homeSafeProducts.map((p) => ({ label: p.name, path: `/safes/home/${p.slug}` })),
    },
    {
      title: "כספות נשק — דפי מוצר",
      items: gunSafeProducts.map((p) => ({ label: p.name, path: `/safes/guns/${p.slug}` })),
    },
    {
      title: "קורסים — דפי קורס",
      items: courseProducts.map((c) => ({ label: c.name, path: `/courses/${c.slug}` })),
    },
    {
      title: "בלוג — מאמרים שפורסמו",
      items: blogPosts.map((p) => ({ label: p.title, path: `/blog/${p.slug}` })),
    },
    {
      title: "דפי נחיתה (לפרסום/וואטסאפ — לא מקושרים מהקטלוג הראשי)",
      items: landingPageProducts.map((p) => ({
        label: `${p.name} — ${categoryLabel[p.category]}`,
        path: `/lp/${p.slug}`,
      })),
    },
    {
      title: "דפי קמפיין",
      items: [{ label: "קמפיין מיכל", path: "/campaign/michal" }],
    },
    {
      title: "עמודי מדיניות",
      items: [
        { label: "מדיניות פרטיות", path: "/privacy" },
        { label: "מידע רגולטורי — כספות נשק", path: "/regulation" },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[900px] px-6 sm:px-8">
            <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-navy uppercase">
              כלי פנימי
            </p>
            <h1 className="mt-3 text-[1.7rem]">מפת קישורים — כל דפי האתר</h1>
            <p className="mt-3 max-w-[65ch] text-gray">
              הקישורים מחושבים אוטומטית לפי הכתובת שהשרת רץ עליה כרגע (
              <bdi className="font-num">{baseUrl}</bdi>) — אם כתובת האתר
              תשתנה (למשל דומיין מותאם אישית), הדף הזה יציג את הכתובות
              המעודכנות אוטומטית, בלי עדכון ידני. הדף לא מקושר מהניווט הראשי
              ולא מאונדקס בגוגל — מיועד לשימוש פנימי בלבד.
            </p>

            {sections.map((section) => (
              <div key={section.title} className="mt-8">
                <h2 className="text-[1.1rem] font-semibold text-navy-deep">
                  {section.title}
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {section.items.map((item) => {
                    const full = `${baseUrl}${item.path}`;
                    return (
                      <li
                        key={item.path}
                        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[var(--color-line)] pb-2 text-[0.9rem]"
                      >
                        <span className="min-w-[160px] font-semibold text-charcoal">
                          {item.label}
                        </span>
                        <a
                          href={full}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-navy underline"
                        >
                          {full}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
