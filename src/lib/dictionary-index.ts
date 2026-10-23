/**
 * The client-side dictionary index: a short summary per entry plus every inflected form,
 * so typing "ging", "Häusern" or "stehe auf" finds the headword. Built at build time into
 * public/dictionary-index.<hash>.json by scripts/build-search-index.ts.
 */
import type { DictEntry, Pos } from "@/content/dictionary/schema";

import { foldUmlauts } from "./check-answer";
import { conjugate, PERSONS, TENSE_LABELS } from "./conjugate";
import { allAdjectiveForms, CASES, compare, pluralForms, singularForms } from "./decline";

export type IndexEntry = {
  id: string;
  /** Headword as shown, e.g. "der Tisch". */
  h: string;
  pos: Pos;
  en: string[];
  level: "A1" | "A2";
  article?: "der" | "die" | "das";
};

export type FormHit = { e: number; why: string };

export type DictionaryIndex = {
  entries: IndexEntry[];
  /** folded form → entries it belongs to, with a short label ("Präteritum: ich, er/sie/es"). */
  forms: Record<string, FormHit[]>;
};

export const foldKey = (s: string) =>
  foldUmlauts(s.normalize("NFC").trim()).toLowerCase().replace(/\s+/g, " ");

export function headwordOf(e: DictEntry): string {
  if (e.noun) return e.noun.pluralOnly ? `die ${e.word}` : `${e.noun.article} ${e.word}`;
  if (e.verb?.reflexive) return `sich ${e.word}`;
  return e.word;
}

const DEFINITE_FORMS: Record<string, [string, string][]> = {
  der: [
    ["den", "Akkusativ (der-word), Dativ plural"],
    ["dem", "Dativ (der/das-word)"],
    ["des", "Genitiv (der/das-word)"],
  ],
  die: [["der", "Dativ and Genitiv (die-word), Genitiv plural"]],
  das: [
    ["dem", "Dativ (der/das-word)"],
    ["des", "Genitiv (der/das-word)"],
  ],
};

const EIN_ENDINGS: [string, string][] = [
  ["e", "die-word or plural (Nominativ, Akkusativ)"],
  ["en", "Akkusativ (der-word), Dativ plural"],
  ["em", "Dativ (der/das-word)"],
  ["er", "Dativ and Genitiv (die-word), Genitiv plural"],
  ["es", "Genitiv (der/das-word)"],
];

const DER_WORD_ENDINGS: [string, string][] = [
  ["e", "die-word or plural (Nominativ, Akkusativ)"],
  ["es", "das-word (Nominativ, Akkusativ), Genitiv"],
  ["en", "Akkusativ (der-word), Dativ plural"],
  ["em", "Dativ (der/das-word)"],
];

/** Article endings: den, einen, meinem, diese, jeden. */
function articleForms(word: string): [string, string][] {
  if (DEFINITE_FORMS[word]) return DEFINITE_FORMS[word];
  // dieser, jeder, welcher
  if (word.endsWith("er") && word !== "unser" && word !== "euer") {
    const stem = word.slice(0, -2);
    return DER_WORD_ENDINGS.map(([end, label]) => [`${stem}${end}`, label]);
  }
  // ein, kein, mein, unser; euer drops its e: eure, euren
  const stem = word === "euer" ? "eur" : word;
  return EIN_ENDINGS.map(([end, label]) => [`${stem}${end}`, label]);
}

/** form → label, per entry. Persons sharing a form are merged into one label. */
export function labelledForms(e: DictEntry): Map<string, string> {
  const labels = new Map<string, string[]>();
  const add = (form: string, label: string) => {
    if (!form) return;
    const list = labels.get(form) ?? [];
    if (!list.includes(label)) list.push(label);
    labels.set(form, list);
  };

  if (e.verb) {
    const c = conjugate(e.word, e.verb);
    add(e.word, "infinitive");
    add(c.participle, "Partizip II");
    for (const t of c.tenses) {
      if (t.key !== "present" && t.key !== "past" && t.key !== "subjunctive") continue;
      if (t.key === "subjunctive" && !e.verb.subjunctiveForms) continue;
      const byForm = new Map<string, string[]>();
      t.forms.forEach((f, i) => byForm.set(f, [...(byForm.get(f) ?? []), PERSONS[i]!]));
      for (const [f, persons] of byForm) {
        const label = `${TENSE_LABELS[t.key].de}: ${persons.join(", ")}`;
        add(f, label);
        const [first, ...rest] = f.split(" ");
        if (rest.length) add(first!, `${label}, with "${rest.join(" ")}"`);
      }
    }
    c.imperative?.forEach((f, i) => {
      const label = `Imperativ (${["du", "ihr", "Sie"][i]})`;
      add(f, label);
      const [first, ...rest] = f.split(" ");
      if (rest.length && i === 0) add(first!, `${label}, with "${rest.join(" ")}"`);
    });
  } else if (e.noun) {
    const n = e.noun;
    add(e.word, n.pluralOnly ? "plural" : "singular");
    if (!n.pluralOnly) {
      singularForms(e.word, n).forEach((f, i) => f !== e.word && add(f, `${CASES[i]} singular`));
    }
    const pl = n.pluralOnly ? e.word : n.plural;
    if (pl) {
      add(pl, "plural");
      const dat = pluralForms(pl)[2];
      if (dat !== pl) add(dat, "Dativ plural");
    }
    if (n.feminine) add(n.feminine, "female form");
  } else if (e.pos === "adjective") {
    add(e.word, "adjective");
    const c = compare(e.word, e.adjective);
    if (c) {
      add(c.comparative, "comparative");
      add(c.superlative.replace(/^am /, ""), "superlative");
    }
    for (const f of allAdjectiveForms(e.word, e.adjective)) add(f, "with an ending");
  } else if (e.pos === "article" || e.id === "welcher") {
    add(e.word, e.pos === "article" ? "article" : e.pos);
    for (const [f, label] of articleForms(e.word)) add(f, label);
  } else {
    add(e.word, e.pos);
  }

  return new Map([...labels].map(([f, l]) => [f, l.join(" · ")]));
}

export function buildDictionaryIndex(entries: DictEntry[]): DictionaryIndex {
  const forms: Record<string, FormHit[]> = {};
  entries.forEach((e, idx) => {
    for (const [form, why] of labelledForms(e)) {
      const key = foldKey(form);
      (forms[key] ??= []).push({ e: idx, why });
    }
  });
  return {
    entries: entries.map((e) => ({
      id: e.id,
      h: headwordOf(e),
      pos: e.pos,
      en: e.en,
      level: e.level,
      article: e.noun && !e.noun.pluralOnly ? e.noun.article : undefined,
    })),
    forms,
  };
}
