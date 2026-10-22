import { CONCEPTS } from "@/content";

import { conjugationOf, DICTIONARY, getEntry, headword } from ".";

const forms = (id: string, key: string) =>
  conjugationOf(getEntry(id)!)!.tenses.find((t) => t.key === key)!.forms;

describe("dictionary data", () => {
  it("has unique ids", () => {
    const ids = DICTIONARY.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("links only to lessons that exist", () => {
    const slugs = new Set(CONCEPTS.map((c) => c.slug));
    for (const e of DICTIONARY)
      for (const l of e.lessons) expect(slugs.has(l), `${e.id} → ${l}`).toBe(true);
  });

  it("conjugates every verb without errors", () => {
    for (const e of DICTIONARY.filter((x) => x.verb)) expect(() => conjugationOf(e)).not.toThrow();
  });

  it("modal and irregular tables are right", () => {
    expect(forms("koennen", "past")).toEqual([
      "konnte",
      "konntest",
      "konnte",
      "konnten",
      "konntet",
      "konnten",
    ]);
    expect(forms("koennen", "perfect")[0]).toBe("habe gekonnt");
    expect(forms("sein", "subjunctive")[0]).toBe("wäre");
    expect(forms("werden", "perfect")[2]).toBe("ist geworden");
    expect(forms("wissen", "present")[2]).toBe("weiß");
    expect(conjugationOf(getEntry("muessen")!)!.imperative).toBeNull();
  });

  it("shows headwords with article or sich", () => {
    expect(headword(getEntry("sein")!)).toBe("sein");
  });
});
