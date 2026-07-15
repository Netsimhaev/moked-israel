import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Plugin names passed as strings (not imported function refs) — required for
// Turbopack compatibility per Next.js docs (JS functions can't cross the
// Rust boundary). remark-frontmatter must run before remark-mdx-frontmatter
// so the YAML block is parsed into a node before being turned into an export.
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
      "remark-gfm",
    ],
  },
});

export default withMDX(nextConfig);
