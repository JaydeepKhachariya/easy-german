import { z } from "zod";

import { conjugate, type Conjugation } from "@/lib/conjugate";
import { compare, decline } from "@/lib/decline";

import { DictEntrySchema, type DictEntry, type DictEntryInput } from "./schema";
import irregularVerbs from "./words/irregular-verbs";

/** Every word file. Add new files here. */
const RAW: DictEntryInput[] = [...irregularVerbs];

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
export function headword(e: DictEntry): string {
  if (e.noun) return e.noun.pluralOnly ? `die ${e.word}` : `${e.noun.article} ${e.word}`;
  if (e.verb?.reflexive) return `sich ${e.word}`;
  return e.word;
}

export function conjugationOf(e: DictEntry): Conjugation | null {
  return e.verb ? conjugate(e.word, e.verb) : null;
}

export function declensionOf(e: DictEntry) {
  return e.noun ? decline(e.word, e.noun) : null;
}

export function comparisonOf(e: DictEntry) {
  return e.pos === "adjective" ? compare(e.word, e.adjective) : null;
}
