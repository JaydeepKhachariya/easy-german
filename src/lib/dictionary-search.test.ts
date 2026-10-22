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
    expect(top("weiß")!.entry.id).toBe("wissen");
    expect(top("weiss")!.entry.id).toBe("wissen");
    expect(top("bin")!.entry.id).toBe("sein");
  });

  it("searches English meanings", () => {
    const hit = search("to want").find((h) => h.entry.id === "wollen");
    expect(hit?.kind).toBe("english");
  });

  it("returns nothing for empty input", () => {
    expect(search("  ")).toEqual([]);
  });
});
