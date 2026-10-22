/**
 * Word-by-word analysis of German sentences using the dictionary index (no translation API).
 * For each word: the dictionary entry, what form it is, and a rough English gloss.
 * For each clause: the conjugated verb (position 2, or first in questions and commands) and
 * the parts German sends to the end (separable prefix, participle, infinitive).
 */
import { foldKey, type DictionaryIndex, type FormHit, type IndexEntry } from "./dictionary-index";

export type TokenRole = "verb" | "prefix" | "participle" | "infinitive";

export type AnalyzedToken = {
  text: string;
  /** Punctuation is kept so the sentence can be shown as written. */
  punct: boolean;
  entry?: IndexEntry;
  /** What form this is, e.g. "Präteritum: ich, er/sie/es". Empty for the headword itself. */
  form?: string;
  /** Short English meaning for the gloss line. */
  gloss?: string;
  role?: TokenRole;
  /** e.g. "an + dem" for am. */
  note?: string;
};

export type AnalyzedSentence = {
  tokens: AnalyzedToken[];
  /** Plain-English notes about the structure. */
  notes: string[];
  gloss: string;
};

const CONTRACTIONS: Record<string, [string, string]> = {
  am: ["an", "an + dem"],
  im: ["in", "in + dem"],
  ins: ["in", "in + das"],
  zum: ["zu", "zu + dem"],
  zur: ["zu", "zu + der"],
  vom: ["von", "von + dem"],
  beim: ["bei", "bei + dem"],
};

const FINITE = /^(Präsens|Präteritum|Konjunktiv II|Imperativ)/;
const MODAL_LIKE = new Set([
  "koennen",
  "muessen",
  "duerfen",
  "sollen",
  "wollen",
  "moechten",
  "werden",
  "moegen",
]);

/** First meaning, shortened: "to go, to walk" → "go", "(to) me" → "me". */
export function shortGloss(e: IndexEntry): string {
  const first = e.en[0]!.replace(/\([^)]*\)/g, "")
    .split(/[;,]/)[0]!
    .trim();
  return first.replace(/^to /, "").replace(/\s+/g, " ");
}

const labelsOf = (c: Candidate) => c.hit.why.split(" · ");
const isFinite = (c: Candidate) =>
  c.entry.pos === "verb" && labelsOf(c).some((l) => FINITE.test(l));
const finiteLabels = (c: Candidate) =>
  labelsOf(c)
    .filter((l) => FINITE.test(l))
    .join(" · ");

function splitTokens(sentence: string): { text: string; punct: boolean }[] {
  return (sentence.match(/[\p{L}\p{N}'’-]+|[^\s\p{L}\p{N}]+/gu) ?? []).map((t) => ({
    text: t,
    punct: !/[\p{L}\p{N}]/u.test(t),
  }));
}

export function splitSentences(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]*/g) ?? []).map((s) => s.trim()).filter(Boolean);
}

type Candidate = { hit: FormHit; entry: IndexEntry };

function candidates(index: DictionaryIndex, word: string): Candidate[] {
  return (index.forms[foldKey(word)] ?? []).map((hit) => ({ hit, entry: index.entries[hit.e]! }));
}

/** Pick the most likely entry for a word in context. */
function choose(cands: Candidate[], word: string, sentenceStart: boolean): Candidate | undefined {
  if (!cands.length) return undefined;
  const capital = /^\p{Lu}/u.test(word);
  const isNoun = (c: Candidate) => c.entry.pos === "noun";
  const isPartial = (c: Candidate) => labelsOf(c).every((l) => l.includes(', with "'));
  // "Mein" is far more often my than the command "mein!" (from meinen).
  const onlyImperative = (c: Candidate) => labelsOf(c).every((l) => l.startsWith("Imperativ"));
  const exactCase = (c: Candidate) => c.entry.h.split(" ").pop() === word;
  const score = (c: Candidate) => {
    let s = 0;
    if (capital && !sentenceStart && isNoun(c)) s += 4;
    if ((!capital || sentenceStart) && !isNoun(c)) s += 2;
    if (exactCase(c)) s += 1;
    if (isPartial(c)) s -= 3;
    if (onlyImperative(c)) s -= 1;
    return s;
  };
  return [...cands].sort((a, b) => score(b) - score(a))[0];
}

export function analyzeSentence(index: DictionaryIndex, sentence: string): AnalyzedSentence {
  const raw = splitTokens(sentence);
  const tokens: AnalyzedToken[] = raw.map((t) => ({ ...t }));
  const words = tokens.map((t, i) => ({ t, i })).filter(({ t }) => !t.punct);

  // 1. Look up each word.
  const cands = new Map<number, Candidate[]>();
  const chosen = new Map<number, Candidate>();
  words.forEach(({ t, i }, wi) => {
    const lower = t.text.toLowerCase();
    if (CONTRACTIONS[lower]) {
      const [prep, note] = CONTRACTIONS[lower];
      const c = candidates(index, prep);
      cands.set(i, c);
      t.note = note;
    } else {
      let c = candidates(index, t.text);
      // Old dative -e: nach Hause, zu Hause.
      if (!c.length && /e$/i.test(t.text)) {
        c = candidates(index, t.text.slice(0, -1)).filter((x) => x.entry.pos === "noun");
        if (c.length) t.note = "old Dativ form with -e";
      }
      cands.set(i, c);
    }
    const best = choose(cands.get(i)!, t.text, wi === 0);
    if (best) {
      chosen.set(i, best);
      t.entry = best.entry;
      const isHeadword =
        !!CONTRACTIONS[lower] ||
        foldKey(best.entry.h.replace(/^(der|die|das|sich) /, "")) === foldKey(t.text);
      t.form = isHeadword || t.note ? "" : best.hit.why;
      t.gloss = shortGloss(best.entry);
    }
  });

  // 2. The conjugated verb: the first word read as a finite verb, else the first that could be one.
  const notes: string[] = [];
  const canBeFinite = ({ i }: { i: number }) => (cands.get(i) ?? []).some(isFinite);
  const finite =
    words.find(({ i }) => {
      const c = chosen.get(i);
      return c !== undefined && isFinite(c);
    }) ?? words.find(canBeFinite);
  let finiteEntryId: string | undefined;
  // Only the first word can be a command.
  const dropImperative = () => {
    if (!finite || words.indexOf(finite) === 0) return;
    finite.t.form = (finite.t.form ?? "")
      .split(" · ")
      .filter((l) => !l.startsWith("Imperativ"))
      .join(" · ");
  };
  if (finite) {
    finite.t.role = "verb";
    const picked = chosen.get(finite.i);
    const verbCand = picked && isFinite(picked) ? picked : cands.get(finite.i)!.find(isFinite)!;
    finiteEntryId = verbCand.entry.id;
    finite.t.entry = verbCand.entry;
    finite.t.form = finiteLabels(verbCand);
    finite.t.gloss = shortGloss(verbCand.entry);
    dropImperative();
    const position = words.indexOf(finite);
    notes.push(
      position === 0
        ? `"${finite.t.text}" comes first: a yes/no question or a command.`
        : `"${finite.t.text}" is the conjugated verb, in position 2.`,
    );
  }

  // 3. Parts at the end of the clause.
  const last = [...words].reverse()[0];
  if (finite && last && last !== finite) {
    const lastCands = cands.get(last.i) ?? [];
    // Separable prefix: "stehe ... auf" → aufstehen.
    // "ziehe ... mich an" → sich anziehen: the label ends with the last word.
    const tail = foldKey(last.t.text);
    const sep = cands.get(finite.i)!.find(
      (c) =>
        c.entry.pos === "verb" &&
        labelsOf(c).some((l) => {
          const m = /with "([^"]+)"$/.exec(l);
          return m !== null && foldKey(m[1]!).split(" ").pop() === tail;
        }),
    );
    const participle = lastCands.find(
      (c) => c.entry.pos === "verb" && c.hit.why.includes("Partizip II"),
    );
    const infinitive = lastCands.find(
      (c) => c.entry.pos === "verb" && c.hit.why.includes("infinitive"),
    );
    if (sep) {
      last.t.role = "prefix";
      finite.t.entry = sep.entry;
      finite.t.form = finiteLabels(sep);
      finite.t.gloss = shortGloss(sep.entry);
      dropImperative();
      last.t.gloss = "";
      notes.push(`"${last.t.text}" at the end belongs to the verb: ${sep.entry.h}.`);
    } else if (participle) {
      last.t.role = "participle";
      last.t.entry = participle.entry;
      last.t.form = "Partizip II";
      last.t.gloss = `${shortGloss(participle.entry)} (past)`;
      notes.push(
        `"${last.t.text}" is a past participle at the end: Perfekt with ${finite.t.text}.`,
      );
    } else if (
      infinitive &&
      finiteEntryId &&
      (MODAL_LIKE.has(finiteEntryId) || finite.t.entry?.pos === "verb")
    ) {
      last.t.role = "infinitive";
      last.t.entry = infinitive.entry;
      last.t.form = "infinitive";
      last.t.gloss = shortGloss(infinitive.entry);
      notes.push(`"${last.t.text}" is an infinitive at the end, after "${finite.t.text}".`);
    }
  }

  const unknown = words.filter(({ t }) => !t.entry).map(({ t }) => t.text);
  if (unknown.length) notes.push(`Not in the dictionary yet: ${unknown.join(", ")}.`);

  const gloss = words
    .map(({ t }) => t.gloss ?? t.text)
    .filter(Boolean)
    .join(" ");
  return { tokens, notes, gloss };
}

export function analyzeText(index: DictionaryIndex, text: string): AnalyzedSentence[] {
  return splitSentences(text).map((s) => analyzeSentence(index, s));
}
