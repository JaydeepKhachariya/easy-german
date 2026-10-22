import { DICTIONARY } from "@/content/dictionary";

import { buildDictionaryIndex, foldKey, labelledForms } from "./dictionary-index";
import { createDictionarySearch } from "./dictionary-search";

const index = buildDictionaryIndex(DICTIONARY);
const search = createDictionarySearch(index);
const top = (q: string) => search(q)[0];

describe("dictionary index", () => {
  it("folds keys like the answer checker", () => {
    expect(foldKey("  Häuser ")).toBe("haeuser");
    expect(foldKey("Stehe   AUF")).toBe("stehe auf");
  });

  it("labels forms and merges persons that share a form", () => {
    const labels = labelledForms(DICTIONARY.find((e) => e.id === "koennen")!);
    expect(labels.get("kann")).toBe("Präsens: ich, er/sie/es");
    expect(labels.get("konnte")).toBe("Präteritum: ich, er/sie/es");
    expect(labels.get("gekonnt")).toBe("Partizip II");
  });
});

describe("dictionary search", () => {
  it("finds the headword, with or without umlauts", () => {
    expect(top("können")!.entry.id).toBe("koennen");
    expect(top("koennen")!.entry.id).toBe("koennen");
    expect(top("können")!.reason).toBe("");
  });

  it("finds inflected forms and says what they are", () => {
    expect(top("konnte")).toMatchObject({
      entry: { id: "koennen" },
      reason: "konnte → Präteritum: ich, er/sie/es",
    });
    // weiß is a headword (white) and a form of wissen: the headword comes first.
    expect(
      search("weiß")
        .map((h) => h.entry.id)
        .slice(0, 2),
    ).toEqual(["weiss", "wissen"]);
    expect(search("weiss")[1]).toMatchObject({
      entry: { id: "wissen" },
      reason: "weiss → Präsens: ich, er/sie/es",
    });
    expect(top("bin")!.entry.id).toBe("sein");
  });

  it("finds strong verb, separable and noun forms", () => {
    expect(top("ging")).toMatchObject({
      entry: { id: "gehen" },
      reason: "ging → Präteritum: ich, er/sie/es",
    });
    expect(top("gegangen")!.entry.id).toBe("gehen");
    expect(top("stehe auf")).toMatchObject({
      entry: { id: "aufstehen" },
      reason: "stehe auf → Präsens: ich",
    });
    expect(top("Häusern")).toMatchObject({
      entry: { id: "haus" },
      reason: "Häusern → Dativ plural",
    });
    expect(top("haeuser")!.entry.id).toBe("haus");
    expect(top("Studenten")!.entry.id).toBe("student");
    expect(top("isst")!.entry.id).toBe("essen");
    expect(top("größer")).toMatchObject({
      entry: { id: "gross" },
      reason: "größer → comparative · with an ending",
    });
    expect(top("nimm")!.entry.id).toBe("nehmen");
    expect(search("ziehe").map((h) => h.entry.id)).toContain("sich-anziehen");
  });

  it("searches English meanings", () => {
    const hit = search("to want").find((h) => h.entry.id === "wollen");
    expect(hit?.kind).toBe("english");
  });

  it("returns nothing for empty input", () => {
    expect(search("  ")).toEqual([]);
  });
});
