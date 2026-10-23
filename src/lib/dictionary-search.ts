import Fuse from "fuse.js";

import { foldKey, type DictionaryIndex, type IndexEntry } from "./dictionary-index";

/** Rows shown at first and added each time the list scrolls to its end. */
export const DICTIONARY_PAGE_SIZE = 40;

export type DictHit = {
  entry: IndexEntry;
  /** Why it matched: "ging → Präteritum: ich, er/sie/es", "English: to go". */
  reason: string;
  kind: "form" | "german" | "english";
};

/**
 * Lookup in three steps: an exact inflected form ("ging"), then the German headword
 * (fuzzy, umlauts optional), then the English meaning.
 */
export function createDictionarySearch(index: DictionaryIndex) {
  const items = index.entries.map((e, i) => ({
    i,
    de: foldKey(e.h.replace(/^(der|die|das|sich) /, "")),
    en: e.en.map((m) => m.toLowerCase()),
  }));
  const de = new Fuse(items, { keys: ["de"], threshold: 0.3, ignoreLocation: true });
  const en = new Fuse(items, {
    keys: ["en"],
    threshold: 0.3,
    ignoreLocation: true,
    includeMatches: true,
  });

  return (query: string, limit = 30): DictHit[] => {
    const q = query.trim().replace(/[.!?,;:]+$/, "");
    if (!q) return [];
    const key = foldKey(q.replace(/^(der|die|das|sich|to) /i, ""));
    const out: DictHit[] = [];
    const seen = new Set<number>();
    const push = (i: number, reason: string, kind: DictHit["kind"]) => {
      if (seen.has(i)) return;
      seen.add(i);
      out.push({ entry: index.entries[i]!, reason, kind });
    };

    // Exact headwords first (weiß → the adjective), then inflected forms (weiß → wissen).
    // Then full forms before split ones (nimm → nehmen before "nimm ... mit").
    const rank = (h: { isHeadword: boolean; partial: boolean }) =>
      h.isHeadword ? 0 : h.partial ? 2 : 1;
    const formHits = (index.forms[foldKey(q)] ?? index.forms[key] ?? []).map((hit) => ({
      hit,
      isHeadword: items[hit.e]!.de === key,
      partial: hit.why.split(" · ").every((label) => label.includes(', with "')),
    }));
    formHits.sort((a, b) => rank(a) - rank(b));
    for (const { hit, isHeadword } of formHits) {
      push(hit.e, isHeadword ? "" : `${q} → ${hit.why}`, "form");
    }
    if (key.length >= 2) {
      for (const r of de.search(key, { limit })) push(r.item.i, "", "german");
      for (const r of en.search(q.toLowerCase(), { limit })) {
        const m = r.matches?.[0]?.value;
        push(r.item.i, m ? `English: ${m}` : "", "english");
      }
    }
    return out.slice(0, limit);
  };
}
