/**
 * AI settings: the learner's Groq API key and chosen model. Kept in localStorage, not in the
 * Dexie database, so the key is never written into a backup file.
 */
import { useSyncExternalStore } from "react";

export type AiConfig = { apiKey: string; model: string };

const STORAGE_KEY = "deutsch-bridge:ai";
const EVENT = "deutsch-bridge:ai-change";
const EMPTY: AiConfig = { apiKey: "", model: "" };

let cachedRaw: string | null = null;
let cached: AiConfig = EMPTY;
/** Used when localStorage is blocked (some private modes): lasts until the page reloads. */
let memory: AiConfig | null = null;

export function readAiConfig(): AiConfig {
  if (memory) return memory;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const v = JSON.parse(raw ?? "{}") as Partial<AiConfig>;
    cached = {
      apiKey: typeof v.apiKey === "string" ? v.apiKey : "",
      model: typeof v.model === "string" ? v.model : "",
    };
  } catch {
    cached = EMPTY;
  }
  return cached;
}

export function saveAiConfig(patch: Partial<AiConfig>) {
  const next = { ...readAiConfig(), ...patch };
  try {
    if (!next.apiKey && !next.model) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    memory = next;
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The current AI settings. Empty during server render and hydration. */
export function useAiConfig(): AiConfig {
  return useSyncExternalStore(subscribe, readAiConfig, () => EMPTY);
}

/** Groq keys start with gsk_. */
export function looksLikeGroqKey(key: string) {
  return /^gsk_[A-Za-z0-9]{20,}$/.test(key.trim());
}
