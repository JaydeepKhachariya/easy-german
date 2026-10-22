import { z } from "zod";

import { ConceptSchema, SkillSchema, type Concept } from "@/content/schema";

import { db, type UserLesson } from "./db";
import { CURRENT_DB_VERSION } from "./db-migrations";
import { duplicateConcept, toUserLesson } from "./lessons";

export const APP_ID = "deutsch-bridge";
/** Version of the JSON file formats below. Bump and add a step to FILE_MIGRATIONS on change. */
export const FILE_FORMAT_VERSION = 1;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

/* ---------- file shapes ---------- */

export type LessonsFile = {
  app: typeof APP_ID;
  kind: "lessons";
  formatVersion: number;
  exportedAt: string;
  lessons: Concept[];
};

const ProgressRowSchema = z.object({
  key: z.string().min(1),
  source: z.enum(["core", "user"]),
  conceptId: z.string().min(1),
  status: z.enum(["in_progress", "completed"]),
  solved: z.array(z.string()),
  total: z.number().int().min(0),
  startedAt: z.number(),
  updatedAt: z.number(),
  completedAt: z.number().optional(),
});

const AttemptRowSchema = z.object({
  conceptKey: z.string().min(1),
  exerciseId: z.string().min(1),
  skill: SkillSchema.catch("general"),
  correct: z.boolean(),
  given: z.string().max(2000),
  at: z.number(),
});

const VocabRowSchema = z.object({
  id: z.string().min(1),
  de: z.string().min(1),
  en: z.string().min(1),
  article: z.enum(["der", "die", "das"]).optional(),
  plural: z.string().optional(),
  conceptKey: z.string(),
  addedAt: z.number(),
  ease: z.number().min(1.3).max(5),
  interval: z.number().min(0),
  repetitions: z.number().int().min(0),
  lapses: z.number().int().min(0),
  due: z.number(),
  lastReviewed: z.number().optional(),
});

const LessonRowSchema = z.intersection(
  ConceptSchema,
  z.object({ createdAt: z.number(), updatedAt: z.number() }),
);

const SettingRowSchema = z.object({ key: z.string().min(1), value: z.unknown() });

export type BackupFile = {
  app: typeof APP_ID;
  kind: "backup";
  formatVersion: number;
  dbVersion: number;
  exportedAt: string;
  data: {
    progress: unknown[];
    attempts: unknown[];
    vocab: unknown[];
    lessons: unknown[];
    settings: unknown[];
  };
};

const EnvelopeSchema = z.object({
  app: z.literal(APP_ID, { message: "This is not a Deutsch Bridge file." }),
  kind: z.enum(["lessons", "backup"]),
  formatVersion: z.number().int().min(1),
});

/**
 * Upgrades older file versions step by step. Example for a future v2:
 *   2: (f) => ({ ...f, lessons: f.lessons.map(addNewField) })
 */
const FILE_MIGRATIONS: Record<number, (file: Record<string, unknown>) => Record<string, unknown>> =
  {};

export function migrateFile(file: Record<string, unknown>): Record<string, unknown> {
  let f = file;
  let v = Number(f.formatVersion);
  if (v > FILE_FORMAT_VERSION) {
    throw new ImportError([
      `This file was made by a newer version of the app (format ${v}). Update the app and try again.`,
    ]);
  }
  while (v < FILE_FORMAT_VERSION) {
    const step = FILE_MIGRATIONS[v + 1];
    if (!step) throw new ImportError([`Can't read file format version ${v}.`]);
    f = { ...step(f), formatVersion: v + 1 };
    v++;
  }
  return f;
}

export class ImportError extends Error {
  constructor(public readonly messages: string[]) {
    super(messages.join("\n"));
  }
}

export function readJson(text: string): unknown {
  if (text.length > MAX_FILE_BYTES) throw new ImportError(["The file is too large (over 10 MB)."]);
  try {
    return JSON.parse(text);
  } catch {
    throw new ImportError(["The file is not valid JSON."]);
  }
}

function issuesToMessages(error: z.ZodError, prefix = ""): string[] {
  return error.issues.slice(0, 8).map((i) => {
    const path = i.path.length ? i.path.join(".") : "lesson";
    return `${prefix}${path}: ${i.message}`;
  });
}

/* ---------- lessons ---------- */

export type ParsedLessons = {
  valid: Concept[];
  invalid: { index: number; title: string; messages: string[] }[];
};

/**
 * Accepts a lessons export, a full backup (its lessons), a bare lesson object
 * or an array of lessons. Each lesson is validated on its own, so one bad lesson
 * doesn't block the rest.
 */
export function parseLessonsFile(raw: unknown): ParsedLessons {
  let items: unknown[];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === "object" && "app" in raw) {
    const env = EnvelopeSchema.safeParse(raw);
    if (!env.success) throw new ImportError(issuesToMessages(env.error));
    const f = migrateFile(raw as Record<string, unknown>);
    if (f.kind === "lessons") items = Array.isArray(f.lessons) ? f.lessons : [];
    else
      items = Array.isArray((f.data as BackupFile["data"])?.lessons)
        ? (f.data as BackupFile["data"]).lessons
        : [];
  } else if (raw && typeof raw === "object") {
    items = [raw];
  } else {
    throw new ImportError(["The file doesn't contain any lessons."]);
  }
  if (items.length === 0) throw new ImportError(["The file doesn't contain any lessons."]);

  const out: ParsedLessons = { valid: [], invalid: [] };
  items.forEach((item, index) => {
    // Storage fields from backups are ignored; ConceptSchema strips unknown keys.
    const r = ConceptSchema.safeParse(item);
    const title =
      item && typeof item === "object" && "titleEn" in item
        ? String((item as { titleEn: unknown }).titleEn)
        : `Lesson ${index + 1}`;
    if (r.success) out.valid.push(r.data);
    else out.invalid.push({ index, title, messages: issuesToMessages(r.error) });
  });
  return out;
}

export type ConflictChoice = "skip" | "replace" | "keepBoth";

export type ImportPlanItem = {
  lesson: Concept;
  conflict: { id: string; existingTitle: string } | null;
};

export function planLessonImport(
  incoming: Concept[],
  existing: Pick<UserLesson, "id" | "titleEn">[],
): ImportPlanItem[] {
  const byId = new Map(existing.map((l) => [l.id, l]));
  return incoming.map((lesson) => {
    const hit = byId.get(lesson.id);
    return { lesson, conflict: hit ? { id: hit.id, existingTitle: hit.titleEn } : null };
  });
}

/** Decides what to write. Pure, so it can be tested without IndexedDB. */
export function resolveImport(
  plan: ImportPlanItem[],
  choices: Record<string, ConflictChoice>,
  existingTitles: Set<string>,
): { write: Concept[]; skipped: number; replaced: number; added: number } {
  const write: Concept[] = [];
  let skipped = 0;
  let replaced = 0;
  let added = 0;
  const seen = new Set<string>();
  for (const { lesson, conflict } of plan) {
    // Two lessons with the same id inside one file: keep both.
    const dupInFile = seen.has(lesson.id);
    seen.add(lesson.id);
    if (!conflict && !dupInFile) {
      write.push(lesson);
      added++;
      continue;
    }
    const choice = dupInFile ? "keepBoth" : (choices[lesson.id] ?? "skip");
    if (choice === "skip") skipped++;
    else if (choice === "replace") {
      write.push(lesson);
      replaced++;
    } else {
      const copy = duplicateConcept(lesson, existingTitles);
      existingTitles.add(copy.titleEn);
      write.push(copy);
      added++;
    }
  }
  return { write, skipped, replaced, added };
}

export async function applyLessonImport(
  plan: ImportPlanItem[],
  choices: Record<string, ConflictChoice>,
) {
  const existing = await db.lessons.toArray();
  const result = resolveImport(plan, choices, new Set(existing.map((l) => l.titleEn)));
  const prev = new Map(existing.map((l) => [l.id, l]));
  await db.lessons.bulkPut(result.write.map((c) => toUserLesson(c, prev.get(c.id))));
  return result;
}

export function makeLessonsFile(lessons: Concept[]): LessonsFile {
  return {
    app: APP_ID,
    kind: "lessons",
    formatVersion: FILE_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    lessons,
  };
}

/* ---------- full backup ---------- */

export async function makeBackup(): Promise<BackupFile> {
  const [progress, attempts, vocab, lessons, settings] = await Promise.all([
    db.progress.toArray(),
    db.attempts.toArray(),
    db.vocab.toArray(),
    db.lessons.toArray(),
    db.settings.toArray(),
  ]);
  return {
    app: APP_ID,
    kind: "backup",
    formatVersion: FILE_FORMAT_VERSION,
    dbVersion: CURRENT_DB_VERSION,
    exportedAt: new Date().toISOString(),
    // Attempt ids are local auto-increment keys; drop them so restores can't collide.
    data: { progress, attempts: attempts.map(({ id: _id, ...a }) => a), vocab, lessons, settings },
  };
}

type Rows = {
  progress: z.infer<typeof ProgressRowSchema>[];
  attempts: z.infer<typeof AttemptRowSchema>[];
  vocab: z.infer<typeof VocabRowSchema>[];
  lessons: UserLesson[];
  settings: z.infer<typeof SettingRowSchema>[];
};

export type ParsedBackup = {
  exportedAt: string;
  rows: Rows;
  /** Rows that failed validation and will be skipped, per table. */
  skipped: Record<keyof Rows, number>;
};

export function parseBackupFile(raw: unknown): ParsedBackup {
  const env = EnvelopeSchema.safeParse(raw);
  if (!env.success) throw new ImportError(issuesToMessages(env.error));
  if (env.data.kind !== "backup") {
    throw new ImportError([
      "This is a lessons file, not a full backup. Import it on the My Lessons page.",
    ]);
  }
  const f = migrateFile(raw as Record<string, unknown>) as unknown as BackupFile;
  if (!f.data || typeof f.data !== "object") throw new ImportError(["The backup has no data."]);

  const skipped = { progress: 0, attempts: 0, vocab: 0, lessons: 0, settings: 0 };
  const take = <T>(table: keyof Rows, schema: z.ZodType<T>): T[] => {
    const list = Array.isArray(f.data[table]) ? f.data[table] : [];
    const out: T[] = [];
    for (const row of list) {
      const r = schema.safeParse(row);
      if (r.success) out.push(r.data);
      else skipped[table]++;
    }
    return out;
  };

  return {
    exportedAt: typeof f.exportedAt === "string" ? f.exportedAt : "",
    rows: {
      progress: take("progress", ProgressRowSchema),
      attempts: take("attempts", AttemptRowSchema),
      vocab: take("vocab", VocabRowSchema),
      lessons: take("lessons", LessonRowSchema) as UserLesson[],
      settings: take("settings", SettingRowSchema),
    },
    skipped,
  };
}

/** Merge rule: take the incoming row unless this browser has a newer one. */
const keepIncoming = (incoming: number, current: number | undefined) =>
  current === undefined || incoming >= current;

/**
 * "replace" wipes this browser's data first. "merge" keeps the newer copy of each
 * lesson, progress row and card, and adds attempts that aren't there yet.
 */
export async function restoreBackup(backup: ParsedBackup, mode: "merge" | "replace") {
  const { rows } = backup;
  await db.transaction(
    "rw",
    [db.progress, db.attempts, db.vocab, db.lessons, db.settings],
    async () => {
      if (mode === "replace") {
        await Promise.all([
          db.progress.clear(),
          db.attempts.clear(),
          db.vocab.clear(),
          db.lessons.clear(),
          db.settings.clear(),
        ]);
        await db.progress.bulkPut(rows.progress);
        await db.attempts.bulkAdd(rows.attempts);
        await db.vocab.bulkPut(rows.vocab);
        await db.lessons.bulkPut(rows.lessons);
        await db.settings.bulkPut(rows.settings);
        return;
      }

      const progressNow = await db.progress.bulkGet(rows.progress.map((p) => p.key));
      await db.progress.bulkPut(
        rows.progress.filter((p, i) => keepIncoming(p.updatedAt, progressNow[i]?.updatedAt)),
      );
      const lessonsNow = await db.lessons.bulkGet(rows.lessons.map((l) => l.id));
      await db.lessons.bulkPut(
        rows.lessons.filter((l, i) => keepIncoming(l.updatedAt, lessonsNow[i]?.updatedAt)),
      );
      const vocabNow = await db.vocab.bulkGet(rows.vocab.map((v) => v.id));
      await db.vocab.bulkPut(
        rows.vocab.filter((v, i) => {
          const cur = vocabNow[i];
          return keepIncoming(
            v.lastReviewed ?? v.addedAt,
            cur && (cur.lastReviewed ?? cur.addedAt),
          );
        }),
      );
      await db.settings.bulkPut(rows.settings);

      const existing = new Set(
        (await db.attempts.toArray()).map((a) => `${a.conceptKey}|${a.exerciseId}|${a.at}`),
      );
      await db.attempts.bulkAdd(
        rows.attempts.filter((a) => !existing.has(`${a.conceptKey}|${a.exerciseId}|${a.at}`)),
      );
    },
  );
}

/* ---------- browser helpers ---------- */

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function datedFilename(stem: string) {
  return `${stem}-${new Date().toISOString().slice(0, 10)}.json`;
}
