/** Persistent storage: asks the browser not to evict our IndexedDB under storage pressure. */

export type PersistState = "persisted" | "not-persisted" | "unsupported";

export async function getPersistState(): Promise<PersistState> {
  if (typeof navigator === "undefined" || !navigator.storage?.persisted) return "unsupported";
  return (await navigator.storage.persisted()) ? "persisted" : "not-persisted";
}

export async function requestPersist(): Promise<PersistState> {
  if (typeof navigator === "undefined" || !navigator.storage?.persist) return "unsupported";
  try {
    return (await navigator.storage.persist()) ? "persisted" : "not-persisted";
  } catch {
    return "not-persisted";
  }
}

export async function getUsage(): Promise<{ usage: number; quota: number } | null> {
  if (typeof navigator === "undefined" || !navigator.storage?.estimate) return null;
  const e = await navigator.storage.estimate();
  return { usage: e.usage ?? 0, quota: e.quota ?? 0 };
}
