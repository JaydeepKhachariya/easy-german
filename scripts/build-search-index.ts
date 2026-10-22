/**
 * Writes the client-side search files into public/. Runs before dev and build.
 * - search-index.json: lessons + vocab for the Ctrl+K dialog
 * - dictionary-index.json: dictionary entries and every inflected form
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { CONCEPTS, conceptHref } from "../src/content";
import { DICTIONARY, entryHref } from "../src/content/dictionary";
import { buildDictionaryIndex, headwordOf } from "../src/lib/dictionary-index";
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

const dict = buildDictionaryIndex(DICTIONARY);
writeFileSync(path.join(pub, "dictionary-index.json"), JSON.stringify(dict));

console.log(
  `search index: ${docs.length} entries; dictionary: ${dict.entries.length} words, ${Object.keys(dict.forms).length} forms`,
);
