/**
 * Generates German verb tables from an infinitive plus the irregular parts stored in the
 * dictionary (see VerbInfo in src/content/dictionary/schema.ts).
 *
 * Covered: Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I, Konjunktiv II and the
 * imperative, including separable prefixes and "sich" verbs. Tested in conjugate.test.ts.
 */
import type { VerbInfo } from "@/content/dictionary/schema";

export const PERSONS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"] as const;
export type Six = [string, string, string, string, string, string];

export type TenseKey = "present" | "past" | "perfect" | "pluperfect" | "future" | "subjunctive";

export const TENSE_LABELS: Record<TenseKey, { de: string; en: string }> = {
  present: { de: "Präsens", en: "Present" },
  past: { de: "Präteritum", en: "Simple past" },
  perfect: { de: "Perfekt", en: "Present perfect (spoken past)" },
  pluperfect: { de: "Plusquamperfekt", en: "Past perfect" },
  future: { de: "Futur I", en: "Future" },
  subjunctive: { de: "Konjunktiv II", en: "Would / could" },
};

export type VerbKind = "weak" | "strong" | "mixed" | "irregular";

export type Conjugation = {
  infinitive: string;
  kind: VerbKind;
  aux: "haben" | "sein";
  participle: string;
  /** e.g. "geht · ging · ist gegangen" */
  principalParts: string;
  tenses: { key: TenseKey; forms: Six }[];
  /** du, ihr, Sie. null = no imperative (modals). */
  imperative: [string, string, string] | null;
};

const REFLEXIVE: Six = ["mich", "dich", "sich", "uns", "euch", "sich"];
const HABEN_PRESENT: Six = ["habe", "hast", "hat", "haben", "habt", "haben"];
const HABEN_PAST: Six = ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"];
const SEIN_PRESENT: Six = ["bin", "bist", "ist", "sind", "seid", "sind"];
const SEIN_PAST: Six = ["war", "warst", "war", "waren", "wart", "waren"];
const WERDEN_PRESENT: Six = ["werde", "wirst", "wird", "werden", "werdet", "werden"];
const WUERDE: Six = ["würde", "würdest", "würde", "würden", "würdet", "würden"];

/** Prefixes that never split and block ge- in the participle. */
const INSEPARABLE = /^(be|ge|er|ver|zer|ent|emp|miss)/;

const SIBILANT = /(s|ß|z|x)$/;

/** Stems that need an extra e before -st/-t: arbeit-est, öffn-est, rechn-est. */
export function needsLinkingE(stem: string): boolean {
  return /[dt]$/.test(stem) || /([bdfgkpstvwxzß]|ch)[mn]$/.test(stem);
}

type Stem = { stem: string; type: "en" | "n" };

export function stemOf(base: string): Stem {
  if (base.endsWith("en")) return { stem: base.slice(0, -2), type: "en" };
  if (base.endsWith("n")) return { stem: base.slice(0, -1), type: "n" };
  return { stem: base, type: "en" };
}

/** Builds the six forms of a "-te" pattern from the ich form: machte, brachte, konnte. */
function tePattern(x: string): Six {
  return [x, `${x}st`, x, `${x}n`, `${x}t`, `${x}n`];
}

function regularPresent(base: string): Six {
  const { stem, type } = stemOf(base);
  if (type === "n") {
    const ich = stem.endsWith("el") ? `${stem.slice(0, -2)}le` : `${stem}e`;
    return [ich, `${stem}st`, `${stem}t`, base, `${stem}t`, base];
  }
  const e = needsLinkingE(stem) ? "e" : "";
  const du = SIBILANT.test(stem) ? `${stem}t` : `${stem}${e}st`;
  return [`${stem}e`, du, `${stem}${e}t`, base, `${stem}${e}t`, base];
}

function presentWithChangedStem(base: string, changed: string): Six {
  const forms = regularPresent(base);
  forms[1] = changed.endsWith("t")
    ? `${changed}st`
    : SIBILANT.test(changed)
      ? `${changed}t`
      : `${changed}st`;
  forms[2] = changed.endsWith("t") ? changed : `${changed}t`;
  return forms;
}

function strongPast(p: string): Six {
  const du = /[sßztd]$/.test(p) ? `${p}est` : `${p}st`;
  const wir = p.endsWith("ie") ? `${p}n` : `${p}en`;
  const ihr = /[td]$/.test(p) ? `${p}et` : `${p}t`;
  return [p, du, p, wir, ihr, wir];
}

export function weakParticiple(base: string, prefix = ""): string {
  const { stem } = stemOf(base);
  const ending = needsLinkingE(stem) ? "et" : "t";
  const noGe = INSEPARABLE.test(base) || base.endsWith("ieren");
  return `${prefix}${noGe ? "" : "ge"}${stem}${ending}`;
}

function regularImperative(base: string): string {
  const { stem, type } = stemOf(base);
  if (type === "n")
    return stem.endsWith("el") ? `${stem.slice(0, -2)}le` : stem.endsWith("er") ? `${stem}e` : stem;
  return needsLinkingE(stem) ? `${stem}e` : stem;
}

/** Adds the reflexive pronoun and separable prefix around a finite form. */
function finite(form: string, i: number, refl: boolean, prefix?: string) {
  return [form, refl ? REFLEXIVE[i] : "", prefix ?? ""].filter(Boolean).join(" ");
}

/** Helper verb + (sich) + non-finite part: "bin aufgestanden", "habe mich angezogen". */
function compound(helper: Six, rest: string, refl: boolean): Six {
  return helper.map((h, i) => [h, refl ? REFLEXIVE[i] : "", rest].filter(Boolean).join(" ")) as Six;
}

export function conjugate(infinitive: string, info: VerbInfo): Conjugation {
  const prefix = info.separable;
  const base = prefix ? infinitive.slice(prefix.length) : infinitive;
  const refl = info.reflexive;

  // Präsens
  const presentCore: Six =
    info.presentForms ??
    (info.presentStem ? presentWithChangedStem(base, info.presentStem) : regularPresent(base));
  const present = presentCore.map((f, i) => finite(f, i, refl, prefix)) as Six;

  // Präteritum
  let pastCore: Six;
  let kind: VerbKind;
  if (info.pastForms) {
    pastCore = info.pastForms;
    kind = "irregular";
  } else if (info.past) {
    pastCore = info.past.endsWith("te") ? tePattern(info.past) : strongPast(info.past);
    kind = info.past.endsWith("te") ? "mixed" : "strong";
  } else {
    const { stem } = stemOf(base);
    pastCore = tePattern(`${stem}${needsLinkingE(stem) ? "ete" : "te"}`);
    kind = "weak";
  }
  if (info.presentForms) kind = "irregular";
  const past = pastCore.map((f, i) => finite(f, i, refl, prefix)) as Six;

  // Partizip II and compound tenses
  const participle = info.participle ?? weakParticiple(base, prefix ?? "");
  const helperPresent = info.aux === "sein" ? SEIN_PRESENT : HABEN_PRESENT;
  const helperPast = info.aux === "sein" ? SEIN_PAST : HABEN_PAST;
  const perfect = compound(helperPresent, participle, refl);
  const pluperfect = compound(helperPast, participle, refl);
  const future = compound(WERDEN_PRESENT, infinitive, refl);
  const subjunctive = info.subjunctiveForms
    ? (info.subjunctiveForms.map((f, i) => finite(f, i, refl, prefix)) as Six)
    : compound(WUERDE, infinitive, refl);

  // Imperativ
  let imperative: Conjugation["imperative"];
  if (info.imperative === null) {
    imperative = null;
  } else if (info.imperativeForms) {
    imperative = info.imperativeForms;
  } else {
    const du = info.imperative ?? regularImperative(base);
    const ihr = presentCore[4];
    const sie = presentCore[5];
    const tail = (pron: string) => [refl ? pron : "", prefix ?? ""].filter(Boolean).join(" ");
    const join = (...parts: string[]) => parts.filter(Boolean).join(" ");
    imperative = [join(du, tail("dich")), join(ihr, tail("euch")), join(sie, "Sie", tail("sich"))];
  }

  const auxThird = info.aux === "sein" ? "ist" : "hat";
  const principalParts = [
    present[2],
    past[2],
    `${auxThird}${refl ? " sich" : ""} ${participle}`,
  ].join(" · ");

  return {
    infinitive,
    kind,
    aux: info.aux,
    participle,
    principalParts,
    tenses: [
      { key: "present", forms: present },
      { key: "past", forms: past },
      { key: "perfect", forms: perfect },
      { key: "pluperfect", forms: pluperfect },
      { key: "future", forms: future },
      { key: "subjunctive", forms: subjunctive },
    ],
    imperative,
  };
}

/** Every distinct finite and non-finite form, for the "type any form" lookup. */
export function allVerbForms(c: Conjugation): string[] {
  const out = new Set<string>([c.infinitive, c.participle]);
  for (const t of c.tenses) {
    if (t.key !== "present" && t.key !== "past" && t.key !== "subjunctive") continue;
    for (const f of t.forms) {
      out.add(f);
      // "stehe auf" → also "stehe", "ziehe mich an" → "ziehe"
      out.add(f.split(" ")[0]!);
    }
  }
  c.imperative?.forEach((f) => out.add(f.split(" ")[0]!.replace(/!$/, "")));
  return [...out];
}
