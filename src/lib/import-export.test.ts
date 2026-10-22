import "fake-indexeddb/auto";

import { ConceptSchema, type Concept } from "@/content/schema";

import { db } from "./db";
import {
  ImportError,
  makeBackup,
  makeLessonsFile,
  parseBackupFile,
  parseLessonsFile,
  planLessonImport,
  readJson,
  resolveImport,
  restoreBackup,
} from "./import-export";
import { lessonTemplate, saveLesson } from "./lessons";

function lesson(id: string, title = id): Concept {
  return ConceptSchema.parse({
    ...lessonTemplate(),
    id,
    slug: id,
    titleEn: title,
    titleDe: `${title} DE`,
    englishExplanation: "English does this.",
    germanExplanation: "German does that.",
    examples: [{ de: "Ich bin hier.", en: "I am here." }],
    exercises: [
      {
        id: "e1",
        type: "translate",
        prompt: "Translate.",
        en: "I am here.",
        answers: ["Ich bin hier."],
      },
    ],
  });
}

describe("readJson", () => {
  it("rejects broken JSON with a clear message", () => {
    expect(() => readJson("{nope")).toThrow(ImportError);
    expect(() => readJson("{nope")).toThrow("not valid JSON");
  });
});

describe("parseLessonsFile", () => {
  it("reads an export file", () => {
    const r = parseLessonsFile(
      JSON.parse(JSON.stringify(makeLessonsFile([lesson("a"), lesson("b")]))),
    );
    expect(r.valid.map((l) => l.id)).toEqual(["a", "b"]);
    expect(r.invalid).toEqual([]);
  });

  it("reads a bare lesson and a bare array", () => {
    expect(parseLessonsFile(lesson("x")).valid).toHaveLength(1);
    expect(parseLessonsFile([lesson("x"), lesson("y")]).valid).toHaveLength(2);
  });

  it("keeps valid lessons and reports invalid ones with paths", () => {
    const bad = {
      ...lesson("bad", "Broken"),
      exercises: [
        { id: "e", type: "fillBlank", prompt: "p", sentence: "no blanks", answers: [["x"]] },
      ],
    };
    const r = parseLessonsFile([lesson("ok"), bad]);
    expect(r.valid.map((l) => l.id)).toEqual(["ok"]);
    expect(r.invalid[0]!.title).toBe("Broken");
    expect(r.invalid[0]!.messages.join(" ")).toMatch(/exercises\.0\.answers/);
  });

  it("strips unknown fields", () => {
    const r = parseLessonsFile({ ...lesson("x"), evil: "<script>" });
    expect(r.valid[0]).not.toHaveProperty("evil");
  });

  it("rejects files from other apps and newer formats", () => {
    expect(() => parseLessonsFile({ app: "other", kind: "lessons", formatVersion: 1 })).toThrow(
      /not a Deutsch Bridge file/,
    );
    expect(() => parseLessonsFile({ ...makeLessonsFile([]), formatVersion: 99 })).toThrow(
      /newer version/,
    );
    expect(() => parseLessonsFile(makeLessonsFile([]))).toThrow(/doesn't contain any lessons/);
    expect(() => parseLessonsFile("text")).toThrow(ImportError);
  });
});

describe("resolveImport", () => {
  const existing = [{ id: "a", titleEn: "A" }];
  const plan = planLessonImport([lesson("a", "A"), lesson("b", "B")], existing);

  it("marks id conflicts", () => {
    expect(plan.map((p) => p.conflict?.id ?? null)).toEqual(["a", null]);
  });

  it("skips conflicts by default", () => {
    const r = resolveImport(plan, {}, new Set(["A"]));
    expect(r).toMatchObject({ skipped: 1, replaced: 0, added: 1 });
    expect(r.write.map((l) => l.id)).toEqual(["b"]);
  });

  it("replaces when asked", () => {
    const r = resolveImport(plan, { a: "replace" }, new Set(["A"]));
    expect(r).toMatchObject({ skipped: 0, replaced: 1, added: 1 });
    expect(r.write.map((l) => l.id)).toEqual(["a", "b"]);
  });

  it("keeps both with a new id and a (copy) title", () => {
    const r = resolveImport(plan, { a: "keepBoth" }, new Set(["A"]));
    const copy = r.write[0]!;
    expect(copy.id).not.toBe("a");
    expect(copy.titleEn).toBe("A (copy)");
    expect(r.added).toBe(2);
  });

  it("keeps both when one file has the same id twice", () => {
    const r = resolveImport(planLessonImport([lesson("z"), lesson("z")], []), {}, new Set());
    expect(r.write).toHaveLength(2);
    expect(new Set(r.write.map((l) => l.id)).size).toBe(2);
  });
});

describe("backup", () => {
  beforeEach(async () => {
    await Promise.all(db.tables.map((t) => t.clear()));
  });

  it("round-trips through JSON and replace", async () => {
    await saveLesson(lesson("mine", "Mine"));
    await db.settings.put({ key: "speechRate", value: 1.1 });
    await db.attempts.add({
      conceptKey: "core:x",
      exerciseId: "e",
      skill: "negation",
      correct: false,
      given: "x",
      at: 5,
    });
    const file = JSON.parse(JSON.stringify(await makeBackup()));

    await Promise.all(db.tables.map((t) => t.clear()));
    const parsed = parseBackupFile(file);
    expect(parsed.skipped).toEqual({ progress: 0, attempts: 0, vocab: 0, lessons: 0, settings: 0 });
    await restoreBackup(parsed, "replace");

    expect((await db.lessons.get("mine"))?.titleEn).toBe("Mine");
    expect((await db.lessons.get("mine"))?.createdAt).toBeTypeOf("number");
    expect((await db.settings.get("speechRate"))?.value).toBe(1.1);
    expect(await db.attempts.count()).toBe(1);
  });

  it("merge keeps the newer lesson and doesn't duplicate attempts", async () => {
    await saveLesson(lesson("mine", "Old title"));
    await db.attempts.add({
      conceptKey: "core:x",
      exerciseId: "e",
      skill: "negation",
      correct: true,
      given: "",
      at: 1,
    });
    const backup = parseBackupFile(JSON.parse(JSON.stringify(await makeBackup())));
    backup.rows.lessons[0] = {
      ...backup.rows.lessons[0]!,
      titleEn: "New title",
      updatedAt: Date.now() + 1000,
    };

    await restoreBackup(backup, "merge");
    expect((await db.lessons.get("mine"))?.titleEn).toBe("New title");
    expect(await db.attempts.count()).toBe(1);
  });

  it("skips invalid rows and counts them", () => {
    const parsed = parseBackupFile({
      app: "deutsch-bridge",
      kind: "backup",
      formatVersion: 1,
      dbVersion: 1,
      exportedAt: "",
      data: {
        progress: [{ nope: 1 }],
        attempts: [],
        vocab: [],
        lessons: [],
        settings: [{ key: "a", value: 1 }],
      },
    });
    expect(parsed.skipped.progress).toBe(1);
    expect(parsed.rows.settings).toHaveLength(1);
  });

  it("refuses a lessons file as a backup", () => {
    expect(() => parseBackupFile(makeLessonsFile([lesson("a")]))).toThrow(/not a full backup/);
  });
});
