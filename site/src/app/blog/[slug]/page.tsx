import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllBlogPosts, getBlogPost, blogCategoryLabel } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Unknown or draft slugs 404 immediately — matches this site's "static
// rebuild to publish" model, there's no live preview infrastructure.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | המוקד`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: [post.frontmatter.heroImage],
    },
    // Unlike lp/[slug], blog posts are original content and should be
    // indexed — no robots override here.
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const { Component, frontmatter } = post;
  const formattedDate = new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(frontmatter.publishDate));

  return (
    <>
      <Header />
      <main>
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
            <p className="mb-5 text-[0.8rem] text-gray">
              <Link href="/" className="text-navy-deep">
                בית
              </Link>{" "}
              &gt;{" "}
              <Link href="/blog" className="text-navy-deep">
                בלוג
              </Link>{" "}
              &gt; <b className="text-navy-deep">{frontmatter.title}</b>
            </p>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-l)] shadow-[var(--shadow-card)]">
              <Image
                src={frontmatter.heroImage}
                alt={frontmatter.heroImageAlt}
                fill
                sizes="(min-width: 1024px) 1180px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-8 max-w-[70ch]">
              <span className="inline-flex rounded-full bg-gold px-3 py-1 font-num text-[0.7rem] font-semibold text-navy-deep">
                {blogCategoryLabel[frontmatter.category]}
              </span>
              <h1 className="mt-3 text-[1.85rem] leading-[1.25] sm:text-[2.2rem]">
                {frontmatter.title}
              </h1>
              <p className="mt-2 font-num text-[0.85rem] text-gray">
                <time dateTime={frontmatter.publishDate}>{formattedDate}</time>
                {" · "}
                {frontmatter.author}
              </p>

              <div className="prose prose-brand mt-8 max-w-none">
                <Component />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
