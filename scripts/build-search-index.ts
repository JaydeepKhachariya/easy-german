/** Writes public/search-index.json for the client-side search dialog. Runs before dev and build. */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { CONCEPTS, conceptHref } from "../src/content";
import { buildCoreDocs } from "../src/lib/search";

const docs = buildCoreDocs(CONCEPTS, conceptHref);
const out = path.join(import.meta.dirname, "..", "public", "search-index.json");
mkdirSync(path.dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(docs));
console.log(`search index: ${docs.length} entries -> public/search-index.json`);
