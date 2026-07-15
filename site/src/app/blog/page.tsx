import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPostCard } from "@/components/BlogPostCard";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "בלוג המוקד — חדשות, מוצרים חדשים ומתקינים | המוקד",
  description:
    "עדכונים ישירות מהמוקד: חדשות מהתעשייה, מוצרים חדשים בדרך, וסיפורים מהשטח עם המתקינים שלנו.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Header />
      <main>
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <p className="font-num text-[0.78rem] font-semibold tracking-[0.06em] text-navy uppercase">
              בלוג
            </p>
            <h1 className="mt-3 max-w-[26ch] text-[1.9rem]">
              חדשות, מוצרים חדשים, וסיפורים מהשטח
            </h1>
            <p className="mt-3 max-w-[60ch] text-gray">
              עדכונים ישירות מהמוקד — מה חדש אצלנו, מה בדרך, ומי מתקין את זה
              בפועל.
            </p>

            {posts.length > 0 ? (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="mt-10 text-gray">
                בקרוב יעלו כאן מאמרים חדשים.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
