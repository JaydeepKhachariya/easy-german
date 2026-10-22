import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Optional sub-path hosting, e.g. NEXT_PUBLIC_BASE_PATH=/easy-german for GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // Fully static: `next build` writes HTML/JS/CSS to out/. No server features.
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
