import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

/** Tests never render MDX prose, so each .mdx import becomes an empty component. */
const mdxStub: Plugin = {
  name: "mdx-stub",
  enforce: "pre",
  transform(_code: string, id: string) {
    if (id.endsWith(".mdx")) return { code: "export default function MDXStub() { return null; }" };
  },
};

export default defineConfig({
  plugins: [mdxStub, react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.ts"],
  },
});
