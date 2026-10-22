import type { Concept, Skill, VocabItem } from "@/content/schema";

import {
  conceptKey,
  db,
  type AttemptRecord,
  type LessonSource,
  type ProgressRecord,
  type VocabCard,
} from "./db";
import { newCardState } from "./srs";

/* ---------- pure helpers (unit-tested) ---------- */

export function nextProgress(
  prev: ProgressRecord | undefined,
  input: {
    source: LessonSource;
    conceptId: string;
    exerciseId: string;
    correct: boolean;
    total: number;
  },
  now: number,
): ProgressRecord {
  const key = conceptKey(input.source, input.conceptId);
  const solved = new Set(prev?.solved ?? []);
  if (input.correct) solved.add(input.exerciseId);
  const done = solved.size >= input.total && input.total > 0;
  const alreadyDone = prev?.status === "completed";
  return {
    key,
    source: input.source,
    conceptId: input.conceptId,
    solved: [...solved],
    total: input.total,
    status: done || alreadyDone ? "completed" : "in_progress",
    startedAt: prev?.startedAt ?? now,
    updatedAt: now,
    completedAt: prev?.completedAt ?? (done ? now : undefined),
  };
}

export function vocabCardId(v: Pick<VocabItem, "de" | "article">) {
  return `${v.article ?? ""} ${v.de}`.trim().toLowerCase();
}

export function toVocabCard(v: VocabItem, key: string, now: number): VocabCard {
  return {
    id: vocabCardId(v),
    de: v.de,
    en: v.en,
    article: v.article,
    plural: v.plural,
    conceptKey: key,
    addedAt: now,
    ...newCardState(now),
  };
}

export type WeakArea = { skill: Skill; attempts: number; wrong: number; errorRate: number };
export type WeakConcept = {
  conceptKey: string;
  attempts: number;
  wrong: number;
  errorRate: number;
};

/**
 * Weak areas from recent attempts: skills and lessons where the learner gets a large share
 * of answers wrong. Only the latest `window` attempts count, so old mistakes fade out.
 */
export function computeWeakAreas(
  attempts: Pick<AttemptRecord, "skill" | "correct" | "conceptKey" | "at">[],
  { window = 300, minAttempts = 3, threshold = 0.3 } = {},
): { skills: WeakArea[]; concepts: WeakConcept[] } {
  const recent = [...attempts].sort((a, b) => b.at - a.at).slice(0, window);

  const tally = <K extends string>(keyOf: (a: (typeof recent)[number]) => K) => {
    const m = new Map<K, { attempts: number; wrong: number }>();
    for (const a of recent) {
      const k = keyOf(a);
      const t = m.get(k) ?? { attempts: 0, wrong: 0 };
      t.attempts++;
      if (!a.correct) t.wrong++;
      m.set(k, t);
    }
    return [...m.entries()]
      .map(([k, t]) => ({ k, ...t, errorRate: t.wrong / t.attempts }))
      .filter((x) => x.attempts >= minAttempts && x.errorRate >= threshold)
      .sort((a, b) => b.errorRate - a.errorRate || b.wrong - a.wrong);
  };

  return {
    skills: tally((a) => a.skill)
      .filter((x) => x.k !== "general")
      .map(({ k, ...rest }) => ({ skill: k, ...rest })),
    concepts: tally((a) => a.conceptKey).map(({ k, ...rest }) => ({ conceptKey: k, ...rest })),
  };
}

export const SKILL_LABELS: Record<Skill, string> = {
  "verb-position": "Verb in position 2",
  conjugation: "Verb endings",
  "modal-infinitive": "Modal + infinitive at the end",
  "perfekt-auxiliary": "haben or sein in the Perfekt",
  participle: "Past participles",
  negation: "nicht vs kein",
  articles: "der, die, das",
  capitalization: "Capitalizing nouns",
  vocabulary: "Vocabulary",
  "word-order": "Word order (time, manner, place)",
  cases: "Cases (Akkusativ, Dativ)",
  "formal-address": "du and Sie",
  spelling: "Spelling",
  listening: "Listening",
  writing: "Writing",
  general: "General",
};

/* ---------- database actions ---------- */

/** Records one answer check. Returns true when this answer completed the lesson. */
export async function recordAttempt(input: {
  concept: Pick<Concept, "id" | "exercises" | "vocab">;
  source: LessonSource;
  exerciseId: string;
  skill: Skill;
  correct: boolean;
  given: string;
}): Promise<{ completedNow: boolean; cardsAdded: number }> {
  const now = Date.now();
  const key = conceptKey(input.source, input.concept.id);
  return db.transaction("rw", db.progress, db.attempts, db.vocab, async () => {
    await db.attempts.add({
      conceptKey: key,
      exerciseId: input.exerciseId,
      skill: input.skill,
      correct: input.correct,
      given: input.given.slice(0, 500),
      at: now,
    });
    const prev = await db.progress.get(key);
    const next = nextProgress(
      prev,
      {
        source: input.source,
        conceptId: input.concept.id,
        exerciseId: input.exerciseId,
        correct: input.correct,
        total: input.concept.exercises.length,
      },
      now,
    );
    await db.progress.put(next);
    const completedNow = next.status === "completed" && prev?.status !== "completed";
    const cardsAdded = completedNow ? await addVocabCards(input.concept.vocab, key, now) : 0;
    return { completedNow, cardsAdded };
  });
}

/** Adds cards that aren't in the deck yet. Returns how many were new. */
export async function addVocabCards(vocab: VocabItem[], key: string, now = Date.now()) {
  const cards = vocab.map((v) => toVocabCard(v, key, now));
  const existing = new Set(
    (await db.vocab.bulkGet(cards.map((c) => c.id))).filter(Boolean).map((c) => c!.id),
  );
  const fresh = cards.filter(
    (c, i) => !existing.has(c.id) && cards.findIndex((x) => x.id === c.id) === i,
  );
  if (fresh.length) await db.vocab.bulkAdd(fresh);
  return fresh.length;
}

export async function markLessonOpened(source: LessonSource, conceptId: string, total: number) {
  const key = conceptKey(source, conceptId);
  const now = Date.now();
  const prev = await db.progress.get(key);
  if (prev) return;
  await db.progress.put({
    key,
    source,
    conceptId,
    solved: [],
    total,
    status: "in_progress",
    startedAt: now,
    updatedAt: now,
  });
}

export async function resetLessonProgress(key: string) {
  await db.transaction("rw", db.progress, db.attempts, async () => {
    await db.progress.delete(key);
    await db.attempts.where("conceptKey").equals(key).delete();
  });
}
