import Fuse from "fuse.js";

import type { Concept } from "@/content/schema";

import { foldUmlauts } from "./check-answer";

export type SearchKind = "concept" | "user-lesson" | "vocab";

export type SearchDoc = {
  kind: SearchKind;
  id: string;
  title: string;
  subtitle: string;
  href: string;
  /** Extra searchable text (examples, explanation snippets). Not shown. */
  text: string;
};

/** Lowercase and fold umlauts so "moechte", "mochte" and "möchte" all match. */
export function foldForSearch(s: string) {
  return foldUmlauts(s.normalize("NFC")).toLowerCase();
}

export function conceptToDoc(c: Concept, kind: "concept" | "user-lesson", href: string): SearchDoc {
  return {
    kind,
    id: `${kind}:${c.id}`,
    title: c.titleEn,
    subtitle: c.titleDe,
    href,
    text: [
      c.summary,
      ...c.comparisonRows.map((r) => `${r.english} ${r.german}`),
      ...c.examples.map((e) => `${e.de} ${e.en}`),
    ]
      .join(" ")
      .slice(0, 2000),
  };
}

export function vocabToDoc(
  v: { de: string; en: string; article?: string },
  href: string,
  source: string,
): SearchDoc {
  const de = v.article ? `${v.article} ${v.de}` : v.de;
  return {
    kind: "vocab",
    id: `vocab:${de.toLowerCase()}`,
    title: de,
    subtitle: `${v.en} · ${source}`,
    href,
    text: "",
  };
}

/** Core concepts and their vocab. Written to public/search-index.json at build time. */
export function buildCoreDocs(concepts: Concept[], href: (c: Concept) => string): SearchDoc[] {
  const docs = concepts.map((c) => conceptToDoc(c, "concept", href(c)));
  const vocab = concepts.flatMap((c) =>
    c.vocab.map((v) => vocabToDoc(v, `${href(c)}#vocab`, c.titleEn)),
  );
  return [...docs, ...dedupe(vocab)];
}

export function dedupe(docs: SearchDoc[]): SearchDoc[] {
  const seen = new Set<string>();
  return docs.filter((d) => (seen.has(d.id) ? false : (seen.add(d.id), true)));
}

type Indexed = SearchDoc & { _title: string; _subtitle: string; _text: string };

export function createSearcher(docs: SearchDoc[]) {
  const indexed: Indexed[] = docs.map((d) => ({
    ...d,
    _title: foldForSearch(d.title),
    _subtitle: foldForSearch(d.subtitle),
    _text: foldForSearch(d.text),
  }));
  const fuse = new Fuse(indexed, {
    keys: [
      { name: "_title", weight: 3 },
      { name: "_subtitle", weight: 2 },
      { name: "_text", weight: 0.5 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
  return (query: string, limit = 20): SearchDoc[] => {
    const q = foldForSearch(query.trim());
    if (q.length < 2) return [];
    return fuse.search(q, { limit }).map(({ item: { _title, _subtitle, _text, ...doc } }) => doc);
  };
}
