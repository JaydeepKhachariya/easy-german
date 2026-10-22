import type { DictionaryIndex } from "./dictionary-index";
import { BASE_PATH } from "./base-path";

let cached: Promise<DictionaryIndex> | null = null;

/** Fetches public/dictionary-index.json once per page load. */
export function loadDictionaryIndex(): Promise<DictionaryIndex> {
  cached ??= fetch(`${BASE_PATH}/dictionary-index.json`).then((r) => {
    if (!r.ok) throw new Error(`dictionary index: ${r.status}`);
    return r.json() as Promise<DictionaryIndex>;
  });
  cached.catch(() => (cached = null));
  return cached;
}
