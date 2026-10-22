import { parseInline, parseRichText } from "./rich-text";

describe("parseInline", () => {
  it("reads bold and italic", () => {
    expect(parseInline("a **b** c *d*")).toEqual([
      { text: "a " },
      { text: "b", bold: true },
      { text: " c " },
      { text: "d", italic: true },
    ]);
  });

  it("leaves lone asterisks alone", () => {
    expect(parseInline("2 * 3 = 6")).toEqual([{ text: "2 * 3 = 6" }]);
  });

  it("keeps angle brackets as plain text", () => {
    expect(parseInline("<script>x</script>")).toEqual([{ text: "<script>x</script>" }]);
  });
});

describe("parseRichText", () => {
  it("splits paragraphs on blank lines and joins wrapped lines", () => {
    expect(parseRichText("One\ntwo.\n\nThree.")).toEqual([
      { type: "p", content: [{ text: "One two." }] },
      { type: "p", content: [{ text: "Three." }] },
    ]);
  });

  it("reads bullet and numbered lists", () => {
    const blocks = parseRichText("Intro:\n- a\n- b\n\n1. x\n2. y");
    expect(blocks).toEqual([
      { type: "p", content: [{ text: "Intro:" }] },
      { type: "ul", items: [[{ text: "a" }], [{ text: "b" }]] },
      { type: "ol", items: [[{ text: "x" }], [{ text: "y" }]] },
    ]);
  });
});
