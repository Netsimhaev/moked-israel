import fs from "fs";
import path from "path";
import type { ComponentType } from "react";

// Articles live as one .mdx file per post under src/content/blog/, not a
// shared TS array like locks.ts/homeSafes.ts — long-form prose is a poor
// fit for the block-array shape those catalogs use. This module exposes
// the same *calling contract* (getAllX / getXBySlug-style) so page.tsx
// files don't need to know the source is MDX rather than a static array.

export type BlogCategory = "news" | "new-products" | "installers";

export const blogCategoryLabel: Record<BlogCategory, string> = {
  news: "חדשות",
  "new-products": "מוצרים חדשים",
  installers: "מתקינים",
};

export type BlogFrontmatter = {
  title: string;
  slug: string;
  publishDate: string; // ISO date, e.g. "2026-07-13"
  category: BlogCategory;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  author: string;
  draft?: boolean;
};

type BlogModule = {
  default: ComponentType;
  frontmatter: BlogFrontmatter;
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

async function importBlogModule(slug: string): Promise<BlogModule> {
  return (await import(`@/content/blog/${slug}.mdx`)) as BlogModule;
}

export async function getAllBlogPosts(): Promise<BlogFrontmatter[]> {
  const modules = await Promise.all(
    getAllBlogSlugs().map((slug) => importBlogModule(slug)),
  );
  return modules
    .map((mod) => mod.frontmatter)
    .filter((frontmatter) => !frontmatter.draft)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

export async function getBlogPost(
  slug: string,
): Promise<{ Component: ComponentType; frontmatter: BlogFrontmatter } | undefined> {
  if (!getAllBlogSlugs().includes(slug)) return undefined;
  const mod = await importBlogModule(slug);
  if (mod.frontmatter.draft) return undefined;
  return { Component: mod.default, frontmatter: mod.frontmatter };
}
