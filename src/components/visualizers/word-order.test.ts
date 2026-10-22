import { germanPositions } from "./word-order";

describe("germanPositions", () => {
  it("numbers position 1 and 2 and marks end roles", () => {
    expect(
      germanPositions([
        { text: "Heute", role: "time" },
        { text: "kann", role: "verb" },
        { text: "ich", role: "subject" },
        { text: "nicht", role: "negation" },
        { text: "kommen", role: "infinitive" },
      ]),
    ).toEqual(["1", "2", "", "", "end"]);
  });

  it("puts und/aber in position 0", () => {
    expect(
      germanPositions([
        { text: "aber", role: "conjunction" },
        { text: "ich", role: "subject" },
        { text: "komme", role: "verb" },
      ]),
    ).toEqual(["0", "1", "2"]);
  });
});
