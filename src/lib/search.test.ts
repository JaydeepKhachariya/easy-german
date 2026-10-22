import { CONCEPTS, conceptHref } from "@/content";

import { buildCoreDocs, createSearcher, dedupe, vocabToDoc } from "./search";

const search = createSearcher(buildCoreDocs(CONCEPTS, conceptHref));

describe("search", () => {
  it("finds concepts by English and German title", () => {
    expect(search("modal")[0]?.href).toBe("/learn/modal-verbs/");
    expect(search("Modalverben")[0]?.href).toBe("/learn/modal-verbs/");
    expect(search("Perfekt")[0]?.href).toBe("/learn/perfekt/");
  });

  it("matches with or without umlauts", () => {
    const hits = (q: string) => search(q).map((d) => d.title);
    expect(hits("möchten")).toContain("möchten");
    expect(hits("moechten")).toContain("möchten");
    expect(hits("mochte")).toContain("möchten");
  });

  it("finds vocab and links to the lesson", () => {
    const hit = search("Zeit").find((d) => d.kind === "vocab" && d.title === "die Zeit");
    expect(hit?.title).toBe("die Zeit");
    expect(hit?.href).toBe("/learn/nicht-kein/#vocab");
  });

  it("returns nothing for very short queries", () => {
    expect(search("a")).toEqual([]);
  });

  it("dedupes vocab that appears in several lessons", () => {
    const a = vocabToDoc({ de: "Zug", article: "der", en: "train" }, "/a", "A");
    const b = vocabToDoc({ de: "Zug", article: "der", en: "train" }, "/b", "B");
    expect(dedupe([a, b])).toEqual([a]);
  });
});
