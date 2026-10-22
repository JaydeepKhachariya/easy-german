import { seededShuffle } from "./shuffle";

describe("seededShuffle", () => {
  it("is stable for the same seed", () => {
    const a = seededShuffle([1, 2, 3, 4, 5], "x");
    expect(seededShuffle([1, 2, 3, 4, 5], "x")).toEqual(a);
  });

  it("keeps all items", () => {
    expect(seededShuffle(["a", "b", "c", "d"], "seed").sort()).toEqual(["a", "b", "c", "d"]);
  });

  it("never returns the original order", () => {
    for (let i = 0; i < 200; i++) {
      const items = ["ich", "kann", "heute", "nicht", "kommen"];
      expect(seededShuffle(items, `s${i}`)).not.toEqual(items);
    }
    expect(seededShuffle(["a", "b"], "z")).toEqual(["b", "a"]);
  });
});
