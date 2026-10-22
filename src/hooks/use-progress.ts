"use client";

import { useLiveQuery } from "dexie-react-hooks";

import { db, type ProgressRecord } from "@/lib/db";

/** All progress rows keyed by "source:id". Undefined until loaded. */
export function useProgressMap(): Map<string, ProgressRecord> | undefined {
  return useLiveQuery(async () => {
    const rows = await db.progress.toArray();
    return new Map(rows.map((r) => [r.key, r]));
  }, []);
}
