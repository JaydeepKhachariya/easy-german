import type { DictionaryIndex } from "./dictionary-index";

const cache = new Map<string, Promise<DictionaryIndex>>();

/**
 * Fetches the dictionary index once per page load. The URL comes from the server page
 * (DICTIONARY_INDEX_URL) and changes whenever the words change, so the browser's HTTP cache
 * can keep it: a repeat visit reads it from disk without asking the server.
 */
export function loadDictionaryIndex(url: string): Promise<DictionaryIndex> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`dictionary index: ${r.status}`);
      return r.json() as Promise<DictionaryIndex>;
    });
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}
