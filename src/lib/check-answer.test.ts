import { checkAnswer, describeIssues, foldUmlauts, tokenize } from "./check-answer";

describe("foldUmlauts", () => {
  it("maps umlauts and ß to two letters", () => {
    expect(foldUmlauts("Grüße aus Köln, schön")).toBe("Gruesse aus Koeln, schoen");
    expect(foldUmlauts("Ärger Übung Öl")).toBe("Aerger Uebung Oel");
  });
});

describe("tokenize", () => {
  it("trims, collapses spaces and drops edge punctuation", () => {
    expect(tokenize("  Ich   komme  morgen.  ")).toEqual(["Ich", "komme", "morgen"]);
    expect(tokenize("Kommst du?!")).toEqual(["Kommst", "du"]);
    expect(tokenize("Ja, ich komme.")).toEqual(["Ja", "ich", "komme"]);
    expect(tokenize("„Hallo“")).toEqual(["Hallo"]);
  });

  it("returns nothing for blank input", () => {
    expect(tokenize("   ")).toEqual([]);
  });
});

describe("checkAnswer: accepted spellings", () => {
  it("accepts an exact answer", () => {
    expect(
      checkAnswer("Ich kann heute nicht kommen.", "Ich kann heute nicht kommen.").correct,
    ).toBe(true);
  });

  it("accepts ae/oe/ue/ss for ä/ö/ü/ß", () => {
    expect(checkAnswer("Ich moechte Kaese", "Ich möchte Käse").correct).toBe(true);
    expect(checkAnswer("Er isst gruenes Gemuese", "Er isst grünes Gemüse").correct).toBe(true);
    expect(checkAnswer("die Strasse", "die Straße").correct).toBe(true);
    expect(checkAnswer("Uebung", "Übung").correct).toBe(true);
  });

  it("accepts ä when the stored answer uses ae, and leaves real ue words alone", () => {
    expect(checkAnswer("Mädchen", "Maedchen").correct).toBe(true);
    expect(checkAnswer("neue", "neue").correct).toBe(true);
    expect(checkAnswer("Feuer", "Feuer").correct).toBe(true);
  });

  it("ignores extra whitespace and trailing punctuation", () => {
    expect(checkAnswer("  Ich   bin  müde  ", "Ich bin müde.").correct).toBe(true);
    expect(checkAnswer("Wie heißt du", "Wie heißt du?").correct).toBe(true);
    expect(checkAnswer("Wie heißt du???", "Wie heißt du?").correct).toBe(true);
  });

  it("matches any of several accepted answers", () => {
    const r = checkAnswer("Morgen fahre ich nach Berlin", [
      "Ich fahre morgen nach Berlin.",
      "Morgen fahre ich nach Berlin.",
    ]);
    expect(r.correct).toBe(true);
    if (r.correct) expect(r.expected).toBe("Morgen fahre ich nach Berlin.");
  });
});

describe("checkAnswer: capitalization", () => {
  it("is case-sensitive for nouns and says which noun", () => {
    const r = checkAnswer("Ich habe einen hund", "Ich habe einen Hund.");
    expect(r.correct).toBe(false);
    if (!r.correct) {
      expect(r.reason).toBe("capitalization");
      expect(r.issues).toEqual([{ kind: "case", index: 3, given: "hund", expected: "Hund" }]);
    }
    expect(describeIssues(r)).toEqual(["Capitalize nouns: Hund."]);
  });

  it("lists every noun that needs a capital", () => {
    const r = checkAnswer("der mann trinkt kaffee", "Der Mann trinkt Kaffee.");
    expect(describeIssues(r)).toEqual(["Capitalize nouns: Mann, Kaffee."]);
  });

  it("accepts a lowercase first word but notes it", () => {
    const r = checkAnswer("ich wohne in Köln", "Ich wohne in Köln.");
    expect(r.correct).toBe(true);
    if (r.correct) expect(r.firstLetterNote).toBe(true);
  });

  it("is strict on the first letter when lenientFirstLetter is off (mid-sentence blank)", () => {
    const r = checkAnswer("hund", "Hund", { lenientFirstLetter: false });
    expect(r.correct).toBe(false);
    expect(describeIssues(r)).toEqual(["Capitalize nouns: Hund."]);
  });

  it("flags formal Sie separately", () => {
    const r = checkAnswer("Können sie mir helfen?", "Können Sie mir helfen?");
    expect(describeIssues(r)).toEqual(['Formal "Sie" words take a capital: Sie.']);
  });

  it("flags words that should be lowercase", () => {
    const r = checkAnswer("Ich Gehe nach Hause", "Ich gehe nach Hause.");
    expect(describeIssues(r)).toEqual(["Write in lowercase: gehe."]);
  });

  it("ignores case when caseSensitive is false", () => {
    expect(checkAnswer("HUND", "Hund", { caseSensitive: false }).correct).toBe(true);
  });
});

describe("checkAnswer: word-level feedback", () => {
  it("points to the wrong word", () => {
    const r = checkAnswer("Ich kann morgen nicht komme", "Ich kann morgen nicht kommen.");
    expect(r.correct).toBe(false);
    if (!r.correct) {
      expect(r.reason).toBe("words");
      expect(r.issues).toEqual([{ kind: "wrong", index: 4, given: "komme", expected: "kommen" }]);
    }
    expect(describeIssues(r)).toEqual(['"komme" is not right here.']);
  });

  it("reports missing and extra words", () => {
    const missing = checkAnswer(
      "Ich habe gestern gearbeitet",
      "Ich habe gestern lange gearbeitet.",
    );
    expect(!missing.correct && missing.issues).toEqual([
      { kind: "missing", index: 3, expected: "lange" },
    ]);
    expect(describeIssues(missing)).toEqual(["One word is missing."]);

    const extra = checkAnswer(
      "Ich bin nach Hause gegangen gegangen",
      "Ich bin nach Hause gegangen.",
    );
    // Either copy of the repeated word can be the extra one.
    expect(!extra.correct && extra.issues).toEqual([
      expect.objectContaining({ kind: "extra", given: "gegangen" }),
    ]);
  });

  it("catches word order mistakes as wrong words", () => {
    const r = checkAnswer("Morgen ich fahre nach Berlin", "Morgen fahre ich nach Berlin.");
    expect(r.correct).toBe(false);
    if (!r.correct) expect(r.issues.length).toBeGreaterThan(0);
  });

  it("compares against the closest accepted answer", () => {
    const r = checkAnswer("Ich bin gestern nach Hause gegangen", [
      "Gestern bin ich nach Hause gegangen.",
      "Ich bin gestern nach Hause gegangen.",
      "Ich bin gestern nach Hause gelaufen.",
    ]);
    expect(r.correct).toBe(true);

    const wrong = checkAnswer("Ich habe gestern nach Hause gegangen", [
      "Gestern bin ich nach Hause gegangen.",
      "Ich bin gestern nach Hause gegangen.",
    ]);
    expect(!wrong.correct && wrong.expected).toBe("Ich bin gestern nach Hause gegangen.");
    expect(!wrong.correct && wrong.issues).toEqual([
      { kind: "wrong", index: 1, given: "habe", expected: "bin" },
    ]);
  });

  it("reports case problems alongside word problems", () => {
    const r = checkAnswer("Ich habe kein auto", "Ich habe kein Auto");
    expect(r.correct).toBe(false);
    const wrong = checkAnswer("Ich habe keine auto", "Ich habe kein Auto");
    expect(!wrong.correct && wrong.reason).toBe("words");
    expect(describeIssues(wrong)).toEqual([
      "Capitalize nouns: Auto.",
      '"keine" is not right here.',
    ]);
  });

  it("handles empty input", () => {
    const r = checkAnswer("   ", "Hallo");
    expect(!r.correct && r.reason).toBe("empty");
    expect(describeIssues(r)).toEqual(["Type an answer first."]);
  });

  it("throws without an accepted answer", () => {
    expect(() => checkAnswer("x", [])).toThrow();
  });
});
