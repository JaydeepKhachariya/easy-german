import { DICTIONARY } from "@/content/dictionary";

import { buildDictionaryIndex } from "./dictionary-index";
import { analyzeSentence, analyzeText, shortGloss, splitSentences } from "./sentence-helper";

const index = buildDictionaryIndex(DICTIONARY);
const tokenOf = (sentence: string, word: string) =>
  analyzeSentence(index, sentence).tokens.find((t) => t.text === word)!;

describe("sentence helper", () => {
  it("splits text into sentences", () => {
    expect(splitSentences("Hallo! Wie geht's? Gut.")).toEqual(["Hallo!", "Wie geht's?", "Gut."]);
  });

  it("shortens glosses", () => {
    const mir = index.entries.find((e) => e.id === "mir")!;
    expect(shortGloss(mir)).toBe("me");
  });

  it("joins a separable prefix at the end to its verb", () => {
    const s = "Ich stehe jeden Tag um sieben Uhr auf.";
    expect(tokenOf(s, "stehe")).toMatchObject({ role: "verb", entry: { id: "aufstehen" } });
    expect(tokenOf(s, "auf").role).toBe("prefix");
    expect(tokenOf(s, "jeden").entry?.id).toBe("jeder");
    expect(analyzeSentence(index, s).notes[1]).toContain("aufstehen");
  });

  it("handles reflexive separable verbs", () => {
    expect(tokenOf("Ich ziehe mich an.", "ziehe").entry?.id).toBe("sich-anziehen");
  });

  it("finds the Perfekt participle", () => {
    const s = "Gestern bin ich nach Hause gegangen.";
    expect(tokenOf(s, "bin")).toMatchObject({ role: "verb", entry: { id: "sein" } });
    expect(tokenOf(s, "gegangen")).toMatchObject({ role: "participle", entry: { id: "gehen" } });
    expect(tokenOf(s, "Hause").entry?.id).toBe("haus");
  });

  it("notes verb-first questions and infinitives after modals", () => {
    const r = analyzeSentence(index, "Kannst du mir helfen?");
    expect(r.notes[0]).toContain("comes first");
    expect(r.tokens.find((t) => t.text === "helfen")?.role).toBe("infinitive");
    expect(r.gloss).toBe("can you me help");
  });

  it("explains contractions and article endings", () => {
    expect(tokenOf("Am Montag gehe ich ins Kino.", "Am")).toMatchObject({
      entry: { id: "an" },
      note: "an + dem",
    });
    expect(tokenOf("Ich möchte einen Kaffee.", "einen").entry?.id).toBe("ein");
  });

  it("prefers the possessive over a rare imperative", () => {
    const s = "Mein Bruder wohnt in Berlin.";
    expect(tokenOf(s, "Mein").entry?.id).toBe("mein");
    expect(tokenOf(s, "wohnt")).toMatchObject({ role: "verb", form: "Präsens: er/sie/es, ihr" });
    expect(analyzeSentence(index, s).notes.at(-1)).toBe("Not in the dictionary yet: Berlin.");
  });

  it("analyses every sentence in a text", () => {
    expect(analyzeText(index, "Ich heiße Anna. Ich komme aus Indien.")).toHaveLength(2);
  });
});
