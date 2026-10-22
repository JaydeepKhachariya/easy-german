import { checkAnswer } from "@/lib/check-answer";

import { CONCEPTS, getConcept, parseConcept } from ".";
import { RAW_CONCEPTS } from "./concepts";
import { collectGerman } from "./german-sentences";
import { PROSE } from "./prose";
import { BLANK } from "./schema";

describe("core content", () => {
  it("parses every concept", () => {
    expect(CONCEPTS.length).toBe(RAW_CONCEPTS.length);
  });

  it("has unique ids, slugs and order numbers", () => {
    const unique = (xs: unknown[]) => new Set(xs).size === xs.length;
    expect(unique(CONCEPTS.map((c) => c.id))).toBe(true);
    expect(unique(CONCEPTS.map((c) => c.slug))).toBe(true);
    expect(unique(CONCEPTS.map((c) => c.order))).toBe(true);
  });

  it("only lists prerequisites that exist and come earlier in the track", () => {
    const order = new Map(CONCEPTS.map((c) => [c.id, c.order]));
    for (const c of CONCEPTS) {
      for (const p of c.prerequisites) {
        expect(order.has(p), `${c.slug} needs missing "${p}"`).toBe(true);
        expect(order.get(p)!, `${c.slug} needs later "${p}"`).toBeLessThan(c.order);
      }
    }
  });

  it("covers the required common mistakes", () => {
    const all = (slug: string) =>
      getConcept(slug)!
        .mistakes.map((m) => `${m.wrong} ${m.right}`)
        .join(" | ");
    expect(all("modal-verbs")).toMatch(/schwimme\b/); // conjugated main verb after a modal
    expect(all("modal-verbs")).toMatch(/wolle/);
    expect(all("perfekt")).toMatch(/habe nach Berlin gefahren/); // haben with a movement verb
    expect(all("perfekt")).toMatch(/geschreibet|geschlafet/); // -et on strong verbs
    expect(all("strong-verbs")).toMatch(/Ich fähre|Wir sprichen/); // vowel change on ich/wir
    expect(all("nouns-and-articles")).toMatch(/ein auto/); // lowercase noun
    expect(all("exam-letters")).toMatch(/dir/); // du/dir mixed into a Sie letter
  });

  it("maps every MDX file to a real concept", () => {
    for (const slug of Object.keys(PROSE)) {
      expect(
        CONCEPTS.some((c) => c.slug === slug),
        slug,
      ).toBe(true);
    }
  });

  it("gives complete lessons the full shape", () => {
    for (const c of CONCEPTS.filter((c) => c.status === "complete")) {
      expect(c.englishExamples.length, c.slug).toBeGreaterThanOrEqual(2);
      expect(c.comparisonRows.length, c.slug).toBeGreaterThanOrEqual(3);
      expect(c.helps.length, c.slug).toBeGreaterThan(0);
      expect(c.misleads.length, c.slug).toBeGreaterThan(0);
      expect(c.examples.length, c.slug).toBeGreaterThanOrEqual(6);
      expect(c.mistakes.length, c.slug).toBeGreaterThanOrEqual(4);
      expect(c.exercises.length, c.slug).toBeGreaterThanOrEqual(6);
      expect(c.vocab.length, c.slug).toBeGreaterThan(0);
    }
  });

  it("gives every concept at least 3 examples and 3 exercises", () => {
    for (const c of CONCEPTS) {
      expect(c.examples.length, c.slug).toBeGreaterThanOrEqual(3);
      expect(c.exercises.length, c.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("accepts its own answers in the checker", () => {
    for (const c of CONCEPTS) {
      for (const e of c.exercises) {
        if (e.type === "translate") {
          for (const a of e.answers) expect(checkAnswer(a, e.answers).correct, e.id).toBe(true);
        }
        if (e.type === "fillBlank") {
          const starts = e.sentence.trimStart().startsWith(BLANK);
          e.answers.forEach((acc, i) =>
            acc.forEach((a) =>
              expect(
                checkAnswer(a, acc, { lenientFirstLetter: i === 0 && starts }).correct,
                e.id,
              ).toBe(true),
            ),
          );
        }
      }
    }
  });

  it("starts German sentences with a capital and has no stray whitespace", () => {
    for (const c of CONCEPTS) {
      for (const e of c.examples) {
        expect(e.de, `${c.slug}: ${e.de}`).toMatch(/^[A-ZÄÖÜ„]/);
        expect(e.de, `${c.slug}: ${e.de}`).not.toMatch(/\s{2,}|\s$/);
      }
    }
  });

  it("collects German for review", () => {
    const lines = CONCEPTS.flatMap(collectGerman);
    expect(lines.length).toBeGreaterThan(100);
  });

  it("rejects an invalid concept with a readable error", () => {
    expect(() => parseConcept({ id: "x" }, "test")).toThrow(/Invalid test/);
  });
});
