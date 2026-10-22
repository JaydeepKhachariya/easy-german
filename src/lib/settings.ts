import { z } from "zod";

import { db } from "./db";

export const SettingsSchema = z.object({
  /** SpeechSynthesis rate. 1 is normal speed. */
  speechRate: z.number().min(0.5).max(1.5).default(0.9),
  /** Which side of a review card is shown first. */
  reviewDirection: z.enum(["de-en", "en-de"]).default("de-en"),
  /** Max new cards introduced per review session. */
  newCardsPerSession: z.number().int().min(1).max(100).default(20),
  /** Whether we already asked the browser for persistent storage. */
  persistRequested: z.boolean().default(false),
  /** When the learner last downloaded a full backup (ms). 0 = never. */
  lastBackupAt: z.number().default(0),
});
export type Settings = z.infer<typeof SettingsSchema>;
export type SettingKey = keyof Settings;

export const DEFAULT_SETTINGS: Settings = SettingsSchema.parse({});

/** Read one setting, falling back to the default when missing or invalid. */
export function readSetting<K extends SettingKey>(key: K, raw: unknown): Settings[K] {
  const r = SettingsSchema.shape[key].safeParse(raw);
  return (r.success ? r.data : DEFAULT_SETTINGS[key]) as Settings[K];
}

export async function getSetting<K extends SettingKey>(key: K): Promise<Settings[K]> {
  const row = await db.settings.get(key);
  return readSetting(key, row?.value);
}

export async function setSetting<K extends SettingKey>(key: K, value: Settings[K]) {
  await db.settings.put({ key, value });
}

export async function getAllSettings(): Promise<Settings> {
  const rows = await db.settings.toArray();
  const obj = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const out = { ...DEFAULT_SETTINGS };
  for (const key of Object.keys(DEFAULT_SETTINGS) as SettingKey[]) {
    (out as Record<SettingKey, unknown>)[key] = readSetting(key, obj[key]);
  }
  return out;
}
