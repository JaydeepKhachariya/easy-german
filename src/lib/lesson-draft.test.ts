import { CONCEPTS } from "@/content";

import {
  conceptToDraft,
  describePath,
  draftToConcept,
  draftToPreview,
  emptyExercise,
  exerciseFromDraft,
  sentenceToTiles,
} from "./lesson-draft";
import { lessonTemplate } from "./lessons";
import { ConceptSchema } from "@/content/schema";

describe("lesson draft conversion", () => {
  it.each(CONCEPTS.map((c) => [c.slug, c] as const))("round-trips %s unchanged", (_slug, c) => {
    const back = draftToConcept(conceptToDraft(c));
    expect(back.ok).toBe(true);
    if (back.ok) expect(back.concept).toEqual(c);
  });

  it("splits sentences into reorder tiles and lowercases small first words", () => {
    expect(sentenceToTiles("Ich kann heute nicht kommen.")).toEqual([
      "ich",
      "kann",
      "heute",
      "nicht",
      "kommen",
    ]);
    expect(sentenceToTiles("Am Sonntag schlafe ich lange")).toEqual([
      "am",
      "Sonntag",
      "schlafe",
      "ich",
      "lange",
    ]);
    expect(sentenceToTiles("Anna wohnt in Köln.")).toEqual(["Anna", "wohnt", "in", "Köln"]);
  });

  it("reads one-per-line fields", () => {
    const fill = {
      ...emptyExercise("fillBlank", "f"),
      sentence: "Ich ___ müde und ___.",
      blanksText: "bin\nhungrig | satt",
    };
    expect(exerciseFromDraft(fill)).toMatchObject({ answers: [["bin"], ["hungrig", "satt"]] });

    const pick = { ...emptyExercise("articlePick", "a"), nounsText: "der Hund = dog\nDie Katze\n" };
    expect(exerciseFromDraft(pick)).toMatchObject({
      nouns: [
        { article: "der", noun: "Hund", en: "dog" },
        { article: "die", noun: "Katze" },
      ],
    });

    const pairs = {
      ...emptyExercise("matchPairs", "m"),
      pairsText: "gehen = to go\nessen = to eat",
    };
    expect(exerciseFromDraft(pairs)).toMatchObject({
      pairs: [
        { left: "gehen", right: "to go" },
        { left: "essen", right: "to eat" },
      ],
    });
  });

  it("reports errors with readable paths", () => {
    const d = conceptToDraft(
      ConceptSchema.parse({
        ...lessonTemplate(),
        titleEn: "x",
        titleDe: "y",
        englishExplanation: "e",
        germanExplanation: "g",
      }),
    );
    d.exercises.push({
      ...emptyExercise("fillBlank", "f1"),
      sentence: "no blank here",
      blanksText: "a",
    });
    d.titleDe = "";
    const r = draftToConcept(d);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.map((e) => e.path)).toContain("German title");
      expect(r.errors.map((e) => e.path)).toContain("Exercise 1 › answers");
    }
    expect(describePath(["examples", 0, "de"])).toBe("Example 1 › de");
  });

  it("builds a preview from an unfinished draft", () => {
    const d = conceptToDraft(CONCEPTS[0]!);
    d.titleEn = "";
    d.examples.push({ de: "", en: "", gloss: "" });
    d.exercises.push({ ...emptyExercise("translate", "half"), en: "", answersText: "" });
    const { concept, hidden } = draftToPreview(d);
    expect(concept.titleEn).toBe("Untitled lesson");
    expect(concept.examples).toHaveLength(CONCEPTS[0]!.examples.length);
    expect(hidden).toBe(1);
  });
});
