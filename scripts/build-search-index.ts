/**
 * Writes the client-side search files into public/. Runs before dev and build.
 * - search-index.json: lessons + vocab for the Ctrl+K dialog
 * - dictionary-index.<hash>.json: dictionary entries and every inflected form
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { CONCEPTS, conceptHref } from "../src/content";
import { DICTIONARY, entryHref } from "../src/content/dictionary";
import {
  DICTIONARY_INDEX as dict,
  DICTIONARY_INDEX_FILE,
  DICTIONARY_INDEX_JSON,
} from "../src/lib/dictionary-file";
import { headwordOf } from "../src/lib/dictionary-index";
import { buildCoreDocs, dedupe, type SearchDoc } from "../src/lib/search";

const pub = path.join(import.meta.dirname, "..", "public");
mkdirSync(pub, { recursive: true });

// Dictionary words come first so they win over the same word in a lesson's vocab list.
const words: SearchDoc[] = DICTIONARY.map((e) => ({
  kind: "vocab",
  id: `vocab:${headwordOf(e).toLowerCase()}`,
  title: headwordOf(e),
  subtitle: `${e.en.join(", ")} · dictionary`,
  href: entryHref(e),
  text: "",
}));
const docs = dedupe([
  ...buildCoreDocs(CONCEPTS, conceptHref).filter((d) => d.kind === "concept"),
  ...words,
  ...buildCoreDocs(CONCEPTS, conceptHref).filter((d) => d.kind !== "concept"),
]);
writeFileSync(path.join(pub, "search-index.json"), JSON.stringify(docs));

// Remove files from earlier builds, then write the current one.
for (const f of readdirSync(pub)) {
  if (/^dictionary-index(\.[0-9a-f]+)?\.json$/.test(f)) rmSync(path.join(pub, f));
}
writeFileSync(path.join(pub, DICTIONARY_INDEX_FILE), DICTIONARY_INDEX_JSON);

console.log(
  `search index: ${docs.length} entries; ${DICTIONARY_INDEX_FILE}: ${dict.entries.length} words, ${Object.keys(dict.forms).length} forms`,
);
