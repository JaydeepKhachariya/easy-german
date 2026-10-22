import { BLANK, type Concept } from "./schema";

export type GermanLine = { where: string; text: string; intentionallyWrong?: boolean };

/** Every piece of German in a concept, labelled by where it appears. */
export function collectGerman(c: Concept): GermanLine[] {
  const out: GermanLine[] = [];
  const add = (where: string, text: string, intentionallyWrong = false) =>
    out.push({ where, text, intentionallyWrong });

  c.comparisonRows.forEach((r, i) => add(`comparison ${i + 1}`, r.german));
  c.diagrams.forEach((d, i) => add(`word order ${i + 1}`, d.german.map((t) => t.text).join(" ")));
  c.tables.forEach((t, i) => {
    if (t.kind === "generic" || t.kind === "endings") {
      t.rows.forEach((r, j) => add(`table ${i + 1} row ${j + 1}`, r.filter(Boolean).join(" | ")));
    }
  });
  c.examples.forEach((e, i) => add(`example ${i + 1}`, e.de));
  c.mistakes.forEach((m, i) => {
    add(`mistake ${i + 1} (wrong on purpose)`, m.wrong, true);
    add(`mistake ${i + 1} (right)`, m.right);
  });
  c.exercises.forEach((e) => {
    const w = `exercise ${e.id}`;
    switch (e.type) {
      case "multipleChoice":
        add(`${w} question`, e.question);
        e.options.forEach((o, i) =>
          add(`${w} option ${i + 1}${i === e.answer ? " (answer)" : ""}`, o, i !== e.answer),
        );
        break;
      case "fillBlank": {
        let filled = e.sentence;
        for (const a of e.answers) filled = filled.replace(BLANK, a[0]!);
        add(`${w} filled in`, filled);
        break;
      }
      case "reorderWords":
        [e.words, ...e.alsoAccept].forEach((ws, i) => add(`${w} answer ${i + 1}`, ws.join(" ")));
        break;
      case "translate":
        e.answers.forEach((a, i) => add(`${w} answer ${i + 1}`, a));
        break;
      case "conjugationTable":
        add(`${w} forms`, e.pronouns.map((p, i) => `${p} ${e.answers[i]}`).join(", "));
        break;
      case "matchPairs":
        add(`${w} pairs`, e.pairs.map((p) => `${p.left} = ${p.right}`).join("; "));
        break;
      case "articlePick":
        add(`${w} nouns`, e.nouns.map((n) => `${n.article} ${n.noun}`).join(", "));
        break;
    }
  });
  c.vocab.forEach((v) =>
    add(
      "vocab",
      [v.article, v.de].filter(Boolean).join(" ") + (v.plural ? ` (pl. ${v.plural})` : ""),
    ),
  );
  return out;
}
