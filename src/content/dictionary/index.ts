import { z } from "zod";

import { conjugate, type Conjugation } from "@/lib/conjugate";
import { compare, decline } from "@/lib/decline";
import { headwordOf } from "@/lib/dictionary-index";

import { DictEntrySchema, type DictEntry, type DictEntryInput } from "./schema";
import adjectives from "./words/adjectives";
import functionWords from "./words/function-words";
import irregularVerbs from "./words/irregular-verbs";
import nounsCityTravel from "./words/nouns-city-travel";
import nounsFood from "./words/nouns-food";
import nounsHealth from "./words/nouns-health";
import nounsHome from "./words/nouns-home";
import nounsLeisure from "./words/nouns-leisure";
import nounsPeople from "./words/nouns-people";
import nounsShopping from "./words/nouns-shopping";
import nounsTimeNature from "./words/nouns-time-nature";
import nounsWorkSchool from "./words/nouns-work-school";
import verbsRegular from "./words/verbs-regular";
import verbsStrong from "./words/verbs-strong";

/** Every word file. Add new files here. */
const RAW: DictEntryInput[] = [
  ...adjectives,
  ...functionWords,
  ...irregularVerbs,
  ...nounsCityTravel,
  ...nounsFood,
  ...nounsHealth,
  ...nounsHome,
  ...nounsLeisure,
  ...nounsPeople,
  ...nounsShopping,
  ...nounsTimeNature,
  ...nounsWorkSchool,
  ...verbsRegular,
  ...verbsStrong,
];

function parse(input: DictEntryInput): DictEntry {
  const r = DictEntrySchema.safeParse(input);
  if (!r.success)
    throw new Error(`Invalid dictionary entry "${input.id}":\n${z.prettifyError(r.error)}`);
  return r.data;
}

/** All entries, validated at import, sorted A–Z. */
export const DICTIONARY: DictEntry[] = RAW.map(parse).sort((a, b) =>
  a.word.localeCompare(b.word, "de", { sensitivity: "base" }),
);

const byId = new Map(DICTIONARY.map((e) => [e.id, e]));

export function getEntry(id: string): DictEntry | undefined {
  return byId.get(id);
}

export function entryHref(e: Pick<DictEntry, "id">) {
  return `/dictionary/${e.id}/`;
}

/** Headword as shown: "der Tisch", "sich anziehen", "gehen". */
export const headword = headwordOf;

export function conjugationOf(e: DictEntry): Conjugation | null {
  return e.verb ? conjugate(e.word, e.verb) : null;
}

export function declensionOf(e: DictEntry) {
  return e.noun ? decline(e.word, e.noun) : null;
}

export function comparisonOf(e: DictEntry) {
  return e.pos === "adjective" ? compare(e.word, e.adjective) : null;
}
