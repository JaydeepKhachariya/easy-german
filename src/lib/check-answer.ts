/**
 * Answer checking for typed German answers.
 *
 * Rules:
 * - ae/oe/ue/ss count as ä/ö/ü/ß (both sides are folded, so "neue" still matches "neue").
 * - Whitespace is trimmed and collapsed. Punctuation at word edges is ignored.
 * - Case matters (German capitalizes nouns), except the first letter of a sentence.
 * - When case is the only problem, the result says which words need fixing.
 * - Otherwise the answer is aligned word by word with the closest accepted answer,
 *   so the UI can show which words are wrong, missing or extra.
 */

export type CheckOptions = {
  /** Default true. Set false for answers where case does not matter. */
  caseSensitive?: boolean;
  /**
   * Default true. Accept either case for the first letter of the answer, because it
   * starts a sentence. Turn off for blanks in the middle of a sentence ("Hund" vs "hund").
   */
  lenientFirstLetter?: boolean;
};

export type WordIssue =
  | { kind: "wrong"; index: number; given: string; expected: string }
  | { kind: "case"; index: number; given: string; expected: string }
  | { kind: "missing"; index: number; expected: string }
  | { kind: "extra"; index: number; given: string };

export type CheckResult =
  | {
      correct: true;
      /** The accepted answer that matched, in its original spelling. */
      expected: string;
      /** The learner wrote a lowercase first letter. Accepted, but worth a nudge. */
      firstLetterNote: boolean;
    }
  | {
      correct: false;
      reason: "empty" | "capitalization" | "words";
      expected: string;
      /** The learner's answer split into words, for highlighting. */
      givenWords: string[];
      issues: WordIssue[];
    };

const FOLD_MAP: Record<string, string> = {
  ä: "ae",
  ö: "oe",
  ü: "ue",
  Ä: "Ae",
  Ö: "Oe",
  Ü: "Ue",
  ß: "ss",
  ẞ: "SS",
};

/** Replace umlauts and ß with their two-letter spellings. */
export function foldUmlauts(s: string): string {
  return s.replace(/[äöüÄÖÜßẞ]/g, (ch) => FOLD_MAP[ch] ?? ch);
}

const EDGE_PUNCT = /^[\s.,!?;:"'„“”‚‘’»«()…–-]+|[\s.,!?;:"'„“”‚‘’»«()…–-]+$/g;

/** Trim, collapse spaces, normalise quotes, split into words without edge punctuation. */
export function tokenize(s: string): string[] {
  return s
    .normalize("NFC")
    .replace(/[’‘]/g, "'")
    .split(/\s+/)
    .map((w) => w.replace(EDGE_PUNCT, ""))
    .filter((w) => w.length > 0);
}

const caseKey = (w: string) => foldUmlauts(w);
const looseKey = (w: string) => foldUmlauts(w).toLowerCase();

type Op =
  | { op: "equal"; a: number; b: number }
  | { op: "sub"; a: number; b: number }
  | { op: "del"; a: number }
  | { op: "ins"; b: number };

/** Word-level Levenshtein alignment of expected (a) and given (b) on loose keys. */
function align(a: string[], b: string[]): { distance: number; ops: Op[] } {
  const ak = a.map(looseKey);
  const bk = b.map(looseKey);
  const n = a.length;
  const m = b.length;
  const d: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 0; i <= n; i++) d[i]![0] = i;
  for (let j = 0; j <= m; j++) d[0]![j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = ak[i - 1] === bk[j - 1] ? 0 : 1;
      d[i]![j] = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + cost);
    }
  }

  const ops: Op[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const cost = ak[i - 1] === bk[j - 1] ? 0 : 1;
      if (d[i]![j] === d[i - 1]![j - 1]! + cost) {
        ops.push({ op: cost === 0 ? "equal" : "sub", a: i - 1, b: j - 1 });
        i--;
        j--;
        continue;
      }
    }
    if (i > 0 && d[i]![j] === d[i - 1]![j]! + 1) {
      ops.push({ op: "del", a: i - 1 });
      i--;
    } else {
      ops.push({ op: "ins", b: j - 1 });
      j--;
    }
  }
  ops.reverse();
  return { distance: d[n]![m]!, ops };
}

/** True when two words differ only in the case of their first letter. */
function onlyFirstLetterCase(expected: string, given: string): boolean {
  const e = caseKey(expected);
  const g = caseKey(given);
  return e.slice(1) === g.slice(1) && e.charAt(0).toLowerCase() === g.charAt(0).toLowerCase();
}

function compareOne(expected: string, given: string, opts: Required<CheckOptions>) {
  const a = tokenize(expected);
  const b = tokenize(given);
  const { distance, ops } = align(a, b);

  const issues: WordIssue[] = [];
  let firstLetterNote = false;

  for (const o of ops) {
    if (o.op === "equal") {
      const e = a[o.a]!;
      const g = b[o.b]!;
      if (!opts.caseSensitive || caseKey(e) === caseKey(g)) continue;
      // First word of the answer: a lowercase/uppercase first letter is fine.
      if (opts.lenientFirstLetter && o.a === 0 && o.b === 0 && onlyFirstLetterCase(e, g)) {
        firstLetterNote = g.charAt(0) !== e.charAt(0) && e.charAt(0) === e.charAt(0).toUpperCase();
        continue;
      }
      issues.push({ kind: "case", index: o.b, given: g, expected: e });
    } else if (o.op === "sub") {
      issues.push({ kind: "wrong", index: o.b, given: b[o.b]!, expected: a[o.a]! });
    } else if (o.op === "del") {
      issues.push({ kind: "missing", index: o.a, expected: a[o.a]! });
    } else {
      issues.push({ kind: "extra", index: o.b, given: b[o.b]! });
    }
  }

  return { distance, issues, firstLetterNote, givenWords: b };
}

export function checkAnswer(
  given: string,
  accepted: string | readonly string[],
  options: CheckOptions = {},
): CheckResult {
  const opts: Required<CheckOptions> = {
    caseSensitive: true,
    lenientFirstLetter: true,
    ...options,
  };
  const answers = (typeof accepted === "string" ? [accepted] : accepted).filter(
    (s) => s.trim().length > 0,
  );
  if (answers.length === 0) throw new Error("checkAnswer needs at least one accepted answer");

  const givenWords = tokenize(given);
  if (givenWords.length === 0) {
    return { correct: false, reason: "empty", expected: answers[0]!, givenWords, issues: [] };
  }

  let best: (ReturnType<typeof compareOne> & { expected: string; score: number }) | undefined;
  for (const expected of answers) {
    const r = compareOne(expected, given, opts);
    // Word errors weigh more than case errors when picking the closest answer.
    const score = r.distance * 10 + r.issues.length;
    if (r.issues.length === 0) {
      return { correct: true, expected, firstLetterNote: r.firstLetterNote };
    }
    if (!best || score < best.score) best = { ...r, expected, score };
  }

  const b = best!;
  const onlyCase = b.issues.every((i) => i.kind === "case");
  return {
    correct: false,
    reason: onlyCase ? "capitalization" : "words",
    expected: b.expected,
    givenWords: b.givenWords,
    issues: b.issues,
  };
}

const FORMAL = new Set(["Sie", "Ihnen", "Ihr", "Ihre", "Ihren", "Ihrem", "Ihrer", "Ihres"]);

/** Plain-English feedback lines for a wrong answer. The UI also highlights the words. */
export function describeIssues(result: CheckResult): string[] {
  if (result.correct) {
    return result.firstLetterNote ? ["Correct. Start sentences with a capital letter."] : [];
  }
  if (result.reason === "empty") return ["Type an answer first."];

  const lines: string[] = [];
  const caseIssues = result.issues.filter((i) => i.kind === "case");
  const toUpper = caseIssues.filter((i) => /^\p{Lu}/u.test(i.expected));
  const toLower = caseIssues.filter((i) => !/^\p{Lu}/u.test(i.expected));
  const formal = toUpper.filter((i) => FORMAL.has(i.expected));
  const nouns = toUpper.filter((i) => !FORMAL.has(i.expected));

  if (nouns.length) {
    lines.push(`Capitalize nouns: ${nouns.map((i) => i.expected).join(", ")}.`);
  }
  if (formal.length) {
    lines.push(`Formal "Sie" words take a capital: ${formal.map((i) => i.expected).join(", ")}.`);
  }
  if (toLower.length) {
    lines.push(`Write in lowercase: ${toLower.map((i) => i.expected).join(", ")}.`);
  }

  for (const i of result.issues) {
    if (i.kind === "wrong") lines.push(`"${i.given}" is not right here.`);
    if (i.kind === "extra") lines.push(`"${i.given}" does not belong.`);
  }
  const missing = result.issues.filter((i) => i.kind === "missing").length;
  if (missing === 1) lines.push("One word is missing.");
  if (missing > 1) lines.push(`${missing} words are missing.`);

  return lines;
}
