/**
 * Noun declension tables and adjective comparison, generated from dictionary data.
 * Tested in decline.test.ts.
 */
import type { AdjectiveInfo, NounInfo } from "@/content/dictionary/schema";

export const CASES = ["Nominativ", "Akkusativ", "Dativ", "Genitiv"] as const;
export type CaseName = (typeof CASES)[number];

const DEFINITE = {
  der: ["der", "den", "dem", "des"],
  die: ["die", "die", "der", "der"],
  das: ["das", "das", "dem", "des"],
} as const;
const INDEFINITE = {
  der: ["ein", "einen", "einem", "eines"],
  die: ["eine", "eine", "einer", "einer"],
  das: ["ein", "ein", "einem", "eines"],
} as const;
const PLURAL_DEFINITE = ["die", "die", "den", "der"] as const;

export type DeclensionRow = {
  case: CaseName;
  singular: { definite: string; indefinite: string } | null;
  plural: { definite: string } | null;
};

export function defaultGenitive(word: string): string {
  return /(s|ß|x|z|sch)$/.test(word) ? "es" : "s";
}

export function singularForms(word: string, n: NounInfo): [string, string, string, string] {
  if (n.nDeclension) {
    const oblique = `${word}${n.nDeclension}`;
    const gen = n.genitive ? `${word}${n.genitive}` : oblique;
    return [word, oblique, oblique, gen];
  }
  if (n.article === "die") return [word, word, word, word];
  return [word, word, word, `${word}${n.genitive ?? defaultGenitive(word)}`];
}

export function pluralForms(plural: string): [string, string, string, string] {
  const dat = /[ns]$/.test(plural) ? plural : `${plural}n`;
  return [plural, plural, dat, plural];
}

export function decline(word: string, n: NounInfo): DeclensionRow[] {
  const sg = n.pluralOnly ? null : singularForms(word, n);
  const plWord = n.pluralOnly ? word : n.plural;
  const pl = plWord ? pluralForms(plWord) : null;
  return CASES.map((c, i) => ({
    case: c,
    singular: sg
      ? {
          definite: `${DEFINITE[n.article][i]} ${sg[i]}`,
          indefinite: `${INDEFINITE[n.article][i]} ${sg[i]}`,
        }
      : null,
    plural: pl ? { definite: `${PLURAL_DEFINITE[i]} ${pl[i]}` } : null,
  }));
}

export function allNounForms(word: string, n: NounInfo): string[] {
  const out = new Set<string>([word]);
  if (!n.pluralOnly) singularForms(word, n).forEach((f) => out.add(f));
  const pl = n.pluralOnly ? word : n.plural;
  if (pl) pluralForms(pl).forEach((f) => out.add(f));
  if (n.feminine) out.add(n.feminine);
  return [...out];
}

/* ---------- adjectives ---------- */

function comparisonBase(word: string): string {
  if (word.endsWith("el")) return `${word.slice(0, -2)}l`; // dunkel → dunkl-er
  if (/(au|eu)er$/.test(word)) return `${word.slice(0, -2)}r`; // teuer → teur-er
  return word;
}

export function compare(word: string, a: AdjectiveInfo = { noComparison: false }) {
  if (a.noComparison) return null;
  const comparative = a.comparative ?? `${comparisonBase(word)}er`;
  const needsE = /([dtsßxz]|sch|[aeiouäöü]h?)$/.test(word) && !word.endsWith("isch");
  const superlative = a.superlative ?? `${word}${needsE ? "esten" : "sten"}`;
  return { positive: word, comparative, superlative: `am ${superlative}` };
}

/** Base and endings used before nouns (ein großes Haus), for form lookup only. */
export function allAdjectiveForms(word: string, a?: AdjectiveInfo): string[] {
  const c = compare(word, a);
  const bases = c
    ? [word, c.comparative, c.superlative.replace(/^am /, "").replace(/en$/, "")]
    : [word];
  const out = new Set<string>();
  for (const b of bases) {
    out.add(b);
    const stem = b === word ? comparisonBase(word) : b;
    for (const end of ["e", "en", "er", "es", "em"]) out.add(`${stem}${end}`);
  }
  if (c) out.add(c.superlative.replace(/^am /, ""));
  return [...out];
}
