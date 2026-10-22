import { NounInfoSchema, type NounInfo } from "@/content/dictionary/schema";

import { allAdjectiveForms, allNounForms, compare, decline } from "./decline";

const noun = (n: Partial<NounInfo> & Pick<NounInfo, "article" | "plural">) =>
  NounInfoSchema.parse(n);

describe("decline", () => {
  it("masculine nouns", () => {
    const rows = decline("Tisch", noun({ article: "der", plural: "Tische", genitive: "es" }));
    expect(rows.map((r) => r.singular!.definite)).toEqual([
      "der Tisch",
      "den Tisch",
      "dem Tisch",
      "des Tisches",
    ]);
    expect(rows.map((r) => r.singular!.indefinite)).toEqual([
      "ein Tisch",
      "einen Tisch",
      "einem Tisch",
      "eines Tisches",
    ]);
    expect(rows.map((r) => r.plural!.definite)).toEqual([
      "die Tische",
      "die Tische",
      "den Tischen",
      "der Tische",
    ]);
  });

  it("feminine nouns don't change in the singular", () => {
    const rows = decline("Lampe", noun({ article: "die", plural: "Lampen" }));
    expect(rows.map((r) => r.singular!.definite)).toEqual([
      "die Lampe",
      "die Lampe",
      "der Lampe",
      "der Lampe",
    ]);
    expect(rows[2]!.plural!.definite).toBe("den Lampen");
  });

  it("neuter nouns and default genitive", () => {
    expect(decline("Auto", noun({ article: "das", plural: "Autos" }))[3]!.singular!.definite).toBe(
      "des Autos",
    );
    expect(decline("Haus", noun({ article: "das", plural: "Häuser" }))[3]!.singular!.definite).toBe(
      "des Hauses",
    );
    expect(decline("Haus", noun({ article: "das", plural: "Häuser" }))[2]!.plural!.definite).toBe(
      "den Häusern",
    );
    expect(decline("Auto", noun({ article: "das", plural: "Autos" }))[2]!.plural!.definite).toBe(
      "den Autos",
    );
  });

  it("n-declension", () => {
    const student = decline(
      "Student",
      noun({ article: "der", plural: "Studenten", nDeclension: "en" }),
    );
    expect(student.map((r) => r.singular!.definite)).toEqual([
      "der Student",
      "den Studenten",
      "dem Studenten",
      "des Studenten",
    ]);
    const name = decline(
      "Name",
      noun({ article: "der", plural: "Namen", nDeclension: "n", genitive: "ns" }),
    );
    expect(name.map((r) => r.singular!.definite)).toEqual([
      "der Name",
      "den Namen",
      "dem Namen",
      "des Namens",
    ]);
  });

  it("no plural and plural only", () => {
    expect(decline("Milch", noun({ article: "die", plural: null }))[0]!.plural).toBeNull();
    const eltern = decline("Eltern", noun({ article: "die", plural: null, pluralOnly: true }));
    expect(eltern[0]!.singular).toBeNull();
    expect(eltern.map((r) => r.plural!.definite)).toEqual([
      "die Eltern",
      "die Eltern",
      "den Eltern",
      "der Eltern",
    ]);
  });

  it("lists forms for lookup", () => {
    expect(allNounForms("Haus", noun({ article: "das", plural: "Häuser" }))).toEqual(
      expect.arrayContaining(["Haus", "Hauses", "Häuser", "Häusern"]),
    );
  });
});

describe("compare", () => {
  it("regular adjectives", () => {
    expect(compare("schnell")).toEqual({
      positive: "schnell",
      comparative: "schneller",
      superlative: "am schnellsten",
    });
    expect(compare("billig")!.superlative).toBe("am billigsten");
  });

  it("-esten after d, t, s, ß, z and vowels", () => {
    expect(compare("laut")!.superlative).toBe("am lautesten");
    expect(compare("heiß")!.superlative).toBe("am heißesten");
    expect(compare("neu")!.superlative).toBe("am neuesten");
    expect(compare("praktisch")!.superlative).toBe("am praktischsten");
  });

  it("drops the e in -el and -euer", () => {
    expect(compare("dunkel")!.comparative).toBe("dunkler");
    expect(compare("teuer")!.comparative).toBe("teurer");
    expect(compare("teuer")!.superlative).toBe("am teuersten");
  });

  it("uses stored irregular forms", () => {
    expect(
      compare("gut", { comparative: "besser", superlative: "besten", noComparison: false }),
    ).toEqual({
      positive: "gut",
      comparative: "besser",
      superlative: "am besten",
    });
    expect(compare("tot", { noComparison: true })).toBeNull();
  });

  it("lists attributive forms", () => {
    expect(
      allAdjectiveForms("groß", {
        comparative: "größer",
        superlative: "größten",
        noComparison: false,
      }),
    ).toEqual(
      expect.arrayContaining(["große", "großen", "größer", "größere", "größte", "größten"]),
    );
    expect(allAdjectiveForms("teuer")).toEqual(
      expect.arrayContaining(["teure", "teuren", "teurer"]),
    );
  });
});
