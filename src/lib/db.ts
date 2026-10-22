import { Dexie, type EntityTable } from "dexie";

import type { Concept, Skill } from "@/content/schema";

import { applyVersions, DB_VERSIONS, type DbVersion } from "./db-migrations";

export type LessonSource = "core" | "user";

export const conceptKey = (source: LessonSource, id: string) => `${source}:${id}`;

export function parseConceptKey(key: string): { source: LessonSource; id: string } {
  const i = key.indexOf(":");
  return { source: key.slice(0, i) as LessonSource, id: key.slice(i + 1) };
}

export type ProgressStatus = "in_progress" | "completed";

export interface ProgressRecord {
  key: string;
  source: LessonSource;
  conceptId: string;
  status: ProgressStatus;
  /** Exercise ids answered correctly at least once. */
  solved: string[];
  total: number;
  startedAt: number;
  updatedAt: number;
  completedAt?: number;
}

export interface AttemptRecord {
  id?: number;
  conceptKey: string;
  exerciseId: string;
  skill: Skill;
  correct: boolean;
  given: string;
  at: number;
}

export interface VocabCard {
  id: string;
  de: string;
  en: string;
  article?: "der" | "die" | "das";
  plural?: string;
  /** Lesson the card came from. */
  conceptKey: string;
  addedAt: number;
  // SM-2 state
  ease: number;
  interval: number;
  repetitions: number;
  lapses: number;
  due: number;
  lastReviewed?: number;
}

export type UserLesson = Concept & { createdAt: number; updatedAt: number };

export interface SettingRecord {
  key: string;
  value: unknown;
}

export const DB_NAME = "deutsch-bridge";

export class DeutschBridgeDB extends Dexie {
  progress!: EntityTable<ProgressRecord, "key">;
  attempts!: EntityTable<AttemptRecord, "id">;
  vocab!: EntityTable<VocabCard, "id">;
  lessons!: EntityTable<UserLesson, "id">;
  settings!: EntityTable<SettingRecord, "key">;

  constructor(name = DB_NAME, versions: DbVersion[] = DB_VERSIONS) {
    super(name);
    applyVersions(this, versions);
  }
}

/** The app's database. Dexie opens lazily on first query, which only happens in the browser. */
export const db = new DeutschBridgeDB();
