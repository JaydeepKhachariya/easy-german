import "fake-indexeddb/auto";

import { db } from "./db";
import {
  addVocabCards,
  computeWeakAreas,
  nextProgress,
  recordAttempt,
  vocabCardId,
} from "./progress";

describe("nextProgress", () => {
  const base = { source: "core" as const, conceptId: "modal-verbs", total: 2 };

  it("starts a lesson as in progress", () => {
    const p = nextProgress(undefined, { ...base, exerciseId: "a", correct: false }, 10);
    expect(p).toMatchObject({
      key: "core:modal-verbs",
      status: "in_progress",
      solved: [],
      startedAt: 10,
    });
  });

  it("completes when every exercise has been solved once", () => {
    let p = nextProgress(undefined, { ...base, exerciseId: "a", correct: true }, 10);
    p = nextProgress(p, { ...base, exerciseId: "a", correct: true }, 11);
    expect(p.status).toBe("in_progress");
    p = nextProgress(p, { ...base, exerciseId: "b", correct: true }, 12);
    expect(p.status).toBe("completed");
    expect(p.completedAt).toBe(12);
  });

  it("stays completed after a later wrong answer", () => {
    let p = nextProgress(undefined, { ...base, total: 1, exerciseId: "a", correct: true }, 10);
    p = nextProgress(p, { ...base, total: 1, exerciseId: "a", correct: false }, 20);
    expect(p.status).toBe("completed");
    expect(p.completedAt).toBe(10);
  });
});

describe("computeWeakAreas", () => {
  const a = (skill: string, correct: boolean, at: number, conceptKey = "core:perfekt") =>
    ({ skill, correct, at, conceptKey }) as Parameters<typeof computeWeakAreas>[0][number];

  it("flags skills with a high error rate", () => {
    const attempts = [
      a("perfekt-auxiliary", false, 1),
      a("perfekt-auxiliary", false, 2),
      a("perfekt-auxiliary", true, 3),
      a("participle", true, 4),
      a("participle", true, 5),
      a("participle", true, 6),
    ];
    const { skills } = computeWeakAreas(attempts);
    expect(skills.map((s) => s.skill)).toEqual(["perfekt-auxiliary"]);
    expect(skills[0]!.errorRate).toBeCloseTo(2 / 3);
  });

  it("ignores skills with too few attempts and the general bucket", () => {
    const { skills } = computeWeakAreas([
      a("negation", false, 1),
      a("general", false, 2),
      a("general", false, 3),
      a("general", false, 4),
    ]);
    expect(skills).toEqual([]);
  });

  it("only counts the most recent attempts", () => {
    const old = Array.from({ length: 5 }, (_, i) => a("articles", false, i));
    const recent = Array.from({ length: 5 }, (_, i) => a("articles", true, 100 + i));
    expect(computeWeakAreas([...old, ...recent], { window: 5 }).skills).toEqual([]);
  });

  it("ranks weak lessons too", () => {
    const attempts = [
      ...Array.from({ length: 3 }, (_, i) => a("negation", false, i, "core:nicht-kein")),
      ...Array.from({ length: 3 }, (_, i) => a("negation", true, 10 + i, "core:modal-verbs")),
    ];
    expect(computeWeakAreas(attempts).concepts.map((c) => c.conceptKey)).toEqual([
      "core:nicht-kein",
    ]);
  });
});

describe("database actions", () => {
  beforeEach(async () => {
    await Promise.all([db.progress.clear(), db.attempts.clear(), db.vocab.clear()]);
  });

  const concept = {
    id: "nicht-kein",
    exercises: [{ id: "x" }, { id: "y" }] as never,
    vocab: [
      { de: "Zeit", en: "time", article: "die" as const },
      { de: "müde", en: "tired" },
    ],
  };

  it("records attempts and adds vocab cards when the lesson is completed", async () => {
    const first = await recordAttempt({
      concept,
      source: "core",
      exerciseId: "x",
      skill: "negation",
      correct: true,
      given: "kein",
    });
    expect(first).toEqual({ completedNow: false, cardsAdded: 0 });
    const second = await recordAttempt({
      concept,
      source: "core",
      exerciseId: "y",
      skill: "negation",
      correct: true,
      given: "nicht",
    });
    expect(second).toEqual({ completedNow: true, cardsAdded: 2 });
    expect(await db.attempts.count()).toBe(2);
    expect((await db.progress.get("core:nicht-kein"))?.status).toBe("completed");
    expect(await db.vocab.get(vocabCardId({ de: "Zeit", article: "die" }))).toMatchObject({
      en: "time",
    });
  });

  it("does not duplicate cards", async () => {
    expect(await addVocabCards(concept.vocab, "core:a")).toBe(2);
    expect(await addVocabCards([...concept.vocab, concept.vocab[0]!], "core:b")).toBe(0);
    expect(await db.vocab.count()).toBe(2);
  });
});
