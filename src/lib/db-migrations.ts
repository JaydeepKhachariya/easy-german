import type { Dexie, Transaction } from "dexie";

/**
 * IndexedDB schema history. Rules:
 * - Never edit or remove an entry once it has shipped. Add a new version instead.
 * - A new version repeats every table (Dexie diffs them); set a table to null to drop it.
 * - Put data reshaping in `upgrade`. It runs once, inside the version-change transaction,
 *   for browsers that still have the older version. Existing rows are kept.
 *
 * Example for a future change:
 *   {
 *     version: 2,
 *     stores: { ...V1_STORES, vocab: "id, due, conceptKey, addedAt, tag" },
 *     upgrade: (tx) => tx.table("vocab").toCollection().modify((c) => { c.tag ??= "lesson"; }),
 *   }
 */
export type DbVersion = {
  version: number;
  stores: Record<string, string | null>;
  upgrade?: (tx: Transaction) => void | PromiseLike<unknown>;
};

export const V1_STORES = {
  // One row per lesson the learner has opened. key = "core:modal-verbs" / "user:<id>"
  progress: "key, status, updatedAt",
  // Every answer check. Used for weak areas.
  attempts: "++id, conceptKey, exerciseId, skill, at, correct",
  // Spaced-repetition cards. id = normalised "article de".
  vocab: "id, due, conceptKey, addedAt",
  // User-created lessons, same shape as core concepts.
  lessons: "id, updatedAt, titleEn",
  // Key/value settings.
  settings: "key",
};

export const DB_VERSIONS: DbVersion[] = [{ version: 1, stores: V1_STORES }];

export function applyVersions(db: Dexie, versions: DbVersion[] = DB_VERSIONS) {
  for (const v of versions) {
    const def = db.version(v.version).stores(v.stores);
    if (v.upgrade) def.upgrade(v.upgrade);
  }
}

export const CURRENT_DB_VERSION = Math.max(...DB_VERSIONS.map((v) => v.version));
