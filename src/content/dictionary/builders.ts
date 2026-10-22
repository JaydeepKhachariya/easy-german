/**
 * Short helpers for writing dictionary entries. Each word file is a list of calls like
 *
 *   v("gehen", "to go, to walk", { aux: "sein", past: "ging", participle: "gegangen" }, ["routine"], [
 *     ["Ich gehe nach Hause.", "I'm going home."],
 *   ])
 *
 * Inflected forms are generated, so only irregular parts are written down.
 */
import type { Article } from "@/content/schema";

import type { AdjectiveInfo, DictEntryInput, NounInfo, Pos, Topic, VerbInfo } from "./schema";

type Ex = [de: string, en: string][];
type Extra = { id?: string; level?: "A1" | "A2"; note?: string; lessons?: string[] };

export function dictSlug(word: string): string {
  return word
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const meanings = (en: string | string[]) => (Array.isArray(en) ? en : en.split(/\s*;\s*/));
const examples = (ex: Ex = []) => ex.map(([de, en]) => ({ de, en }));

/** Verb. `word` is the infinitive including any separable prefix, without "sich". */
export function v(
  word: string,
  en: string | string[],
  verb: Partial<VerbInfo>,
  topics: Topic[],
  ex?: Ex,
  extra: Extra = {},
): DictEntryInput {
  return {
    id: extra.id ?? dictSlug(verb.reflexive ? `sich ${word}` : word),
    word,
    pos: "verb",
    en: meanings(en),
    topics,
    examples: examples(ex),
    level: extra.level,
    note: extra.note,
    lessons: extra.lessons,
    verb,
  };
}

/** Noun. `plural` is the full plural word, or null for no plural. */
export function n(
  article: Article,
  word: string,
  plural: string | null,
  en: string | string[],
  topics: Topic[],
  ex?: Ex,
  extra: Extra & Partial<Omit<NounInfo, "article" | "plural">> = {},
): DictEntryInput {
  const { id, level, note, lessons, ...nounExtra } = extra;
  return {
    id: id ?? dictSlug(word),
    word,
    pos: "noun",
    en: meanings(en),
    topics,
    examples: examples(ex),
    level,
    note,
    lessons,
    noun: { article, plural, ...nounExtra },
  };
}

/** Adjective. Pass comparative/superlative only when irregular (größer, größten). */
export function a(
  word: string,
  en: string | string[],
  topics: Topic[],
  ex?: Ex,
  extra: Extra & Partial<AdjectiveInfo> = {},
): DictEntryInput {
  const { id, level, note, lessons, ...adjective } = extra;
  return {
    id: id ?? dictSlug(word),
    word,
    pos: "adjective",
    en: meanings(en),
    topics,
    examples: examples(ex),
    level,
    note,
    lessons,
    adjective,
  };
}

/** Any other word type: adverb, preposition, pronoun, conjunction, phrase... */
export function w(
  pos: Exclude<Pos, "verb" | "noun" | "adjective">,
  word: string,
  en: string | string[],
  topics: Topic[],
  ex?: Ex,
  extra: Extra = {},
): DictEntryInput {
  return {
    id: extra.id ?? dictSlug(word),
    word,
    pos,
    en: meanings(en),
    topics,
    examples: examples(ex),
    level: extra.level,
    note: extra.note,
    lessons: extra.lessons,
  };
}
