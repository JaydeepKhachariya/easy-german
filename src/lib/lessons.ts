import { ConceptSchema, SCHEMA_VERSION, type Concept } from "@/content/schema";

import { conceptKey, db, type UserLesson } from "./db";

export function newLessonId() {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `user-${rand}`;
}

export function slugify(s: string) {
  const out = s
    .normalize("NFKD")
    .replace(/ß/g, "ss")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return out || "lesson";
}

/** A blank lesson. Titles and explanations are empty, so it validates once those are filled in. */
export function lessonTemplate(): Concept {
  return {
    schemaVersion: SCHEMA_VERSION,
    id: newLessonId(),
    slug: "my-lesson",
    order: 1000,
    titleDe: "",
    titleEn: "",
    category: "grammar",
    level: "A1",
    minutes: 10,
    status: "draft",
    unit: "My lessons",
    summary: "",
    prerequisites: [],
    englishExplanation: "",
    englishExamples: [],
    germanExplanation: "",
    comparisonRows: [],
    helps: [],
    misleads: [],
    tables: [],
    diagrams: [],
    examples: [],
    mistakes: [],
    exercises: [],
    vocab: [],
  };
}

export function toUserLesson(
  c: Concept,
  prev?: Pick<UserLesson, "createdAt">,
  now = Date.now(),
): UserLesson {
  return {
    ...c,
    slug: slugify(c.slug || c.titleEn),
    createdAt: prev?.createdAt ?? now,
    updatedAt: now,
  };
}

/** Strip storage fields so a lesson can be exported or edited as a plain Concept. */
export function lessonToConcept(l: UserLesson): Concept {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...concept } = l;
  return ConceptSchema.parse(concept);
}

export async function saveLesson(c: Concept): Promise<UserLesson> {
  const prev = await db.lessons.get(c.id);
  const lesson = toUserLesson(c, prev);
  await db.lessons.put(lesson);
  return lesson;
}

export function duplicateConcept(c: Concept, existingTitles: Set<string> = new Set()): Concept {
  let title = `${c.titleEn} (copy)`;
  let n = 2;
  while (existingTitles.has(title)) title = `${c.titleEn} (copy ${n++})`;
  return { ...structuredClone(c), id: newLessonId(), titleEn: title };
}

export async function duplicateLesson(id: string): Promise<UserLesson | undefined> {
  const l = await db.lessons.get(id);
  if (!l) return undefined;
  const titles = new Set((await db.lessons.toArray()).map((x) => x.titleEn));
  return saveLesson(duplicateConcept(lessonToConcept(l), titles));
}

/** Deletes the lesson and its progress. Vocab cards stay in the deck. */
export async function deleteLesson(id: string) {
  const key = conceptKey("user", id);
  await db.transaction("rw", db.lessons, db.progress, db.attempts, async () => {
    await db.lessons.delete(id);
    await db.progress.delete(key);
    await db.attempts.where("conceptKey").equals(key).delete();
  });
}
