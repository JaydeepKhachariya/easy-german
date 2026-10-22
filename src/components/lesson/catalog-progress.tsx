"use client";

import { createContext, useContext } from "react";

import { useProgressMap } from "@/hooks/use-progress";
import type { ProgressRecord } from "@/lib/db";

import { ProgressBadge } from "./lesson-status";

const Ctx = createContext<Map<string, ProgressRecord> | undefined>(undefined);

/** One IndexedDB query for a whole list of lesson cards. */
export function CatalogProgressProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={useProgressMap()}>{children}</Ctx.Provider>;
}

export function CatalogProgressBadge({ progressKey }: { progressKey: string }) {
  return <ProgressBadge record={useContext(Ctx)?.get(progressKey)} />;
}
