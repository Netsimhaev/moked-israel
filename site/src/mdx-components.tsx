import type { MDXComponents } from "mdx/types";
import Image from "next/image";

// Required by @next/mdx under App Router. Overrides `img` so article
// content never emits a raw <img> — every other image on this site already
// goes through next/image (ProductListCard, CategoryCard, ...); MDX-sourced
// blog images follow the same rule. `span` (not `div`) because markdown's
// `![]()` renders inside a `<p>`, which cannot contain a `<div>`.
const components: MDXComponents = {
  img: ({ src, alt }) => (
    <span className="relative my-6 block aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-m)]">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        fill
        sizes="(min-width: 1024px) 700px, 100vw"
        className="object-cover"
      />
    </span>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
