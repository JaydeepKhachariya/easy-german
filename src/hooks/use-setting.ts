"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/lib/db";
import {
  DEFAULT_SETTINGS,
  readSetting,
  setSetting,
  type SettingKey,
  type Settings,
} from "@/lib/settings";

/** Live setting value. Returns the default until IndexedDB has answered. */
export function useSetting<K extends SettingKey>(
  key: K,
): [Settings[K], (v: Settings[K]) => Promise<void>] {
  const value = useLiveQuery(
    async () => readSetting(key, (await db.settings.get(key))?.value),
    [key],
  );
  return [value ?? DEFAULT_SETTINGS[key], (v) => setSetting(key, v)];
}
