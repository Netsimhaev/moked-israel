import Link from "next/link";
import Image from "next/image";
import { blogCategoryLabel, type BlogFrontmatter } from "@/lib/blog";

// Visual language mirrors ProductListCard/CategoryCard (same card shell,
// image treatment, hover-scale) — but blog posts have no price/color
// fields, so this is its own component rather than force-fitting
// ProductListCard's price-shaped props.
export function BlogPostCard({ post }: { post: BlogFrontmatter }) {
  const formattedDate = new Intl.DateTimeFormat("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishDate));

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-l)] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)] transition-shadow duration-200 hover:shadow-[0_4px_10px_rgba(18,40,61,0.1),0_16px_36px_rgba(18,40,61,0.14)]"
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 rounded-full bg-gold px-3 py-1 font-num text-[0.7rem] font-semibold text-navy-deep shadow-[var(--shadow-card)]">
          {blogCategoryLabel[post.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <time
          dateTime={post.publishDate}
          className="font-num text-[0.78rem] text-gray"
        >
          {formattedDate}
        </time>
        <h3 className="font-num text-[1.05rem] font-semibold text-navy-deep">
          {post.title}
        </h3>
        <p className="flex-1 text-[0.85rem] text-gray">{post.excerpt}</p>
        <span className="mt-1 inline-flex items-center gap-1.5 font-num text-[0.85rem] font-semibold text-navy">
          לקריאת המאמר ←
        </span>
      </div>
    </Link>
  );
}
