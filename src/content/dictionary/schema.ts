import { z } from "zod";

import { ArticleSchema } from "@/content/schema";

/**
 * Dictionary entries. Inflected forms (conjugation, declension, comparison) are not stored:
 * src/lib/conjugate.ts and src/lib/decline.ts generate them from the few irregular parts
 * kept here. Only truly irregular verbs store full tables.
 */

const text = z.string().trim().min(1);
const six = z.tuple([text, text, text, text, text, text]);

export const POS = [
  "verb",
  "noun",
  "adjective",
  "adverb",
  "preposition",
  "pronoun",
  "conjunction",
  "article",
  "number",
  "question",
  "phrase",
  "other",
] as const;
export const PosSchema = z.enum(POS);
export type Pos = z.infer<typeof PosSchema>;

export const POS_LABELS: Record<Pos, string> = {
  verb: "verb",
  noun: "noun",
  adjective: "adjective",
  adverb: "adverb",
  preposition: "preposition",
  pronoun: "pronoun",
  conjunction: "conjunction",
  article: "article",
  number: "number",
  question: "question word",
  phrase: "phrase",
  other: "word",
};

export const TOPICS = [
  "basics",
  "people",
  "family",
  "food",
  "home",
  "routine",
  "leisure",
  "travel",
  "city",
  "shopping",
  "health",
  "work",
  "school",
  "time",
  "weather",
  "communication",
  "grammar",
] as const;
export const TopicSchema = z.enum(TOPICS);
export type Topic = z.infer<typeof TopicSchema>;

export const TOPIC_LABELS: Record<Topic, string> = {
  basics: "Basics",
  people: "People",
  family: "Family",
  food: "Food and drink",
  home: "Home",
  routine: "Daily routine",
  leisure: "Free time",
  travel: "Travel and transport",
  city: "Town and places",
  shopping: "Shopping",
  health: "Health and body",
  work: "Work",
  school: "Learning",
  time: "Time and dates",
  weather: "Weather and nature",
  communication: "Talking and writing",
  grammar: "Grammar words",
};

export const VerbInfoSchema = z.object({
  /** Perfekt helper. */
  aux: z.enum(["haben", "sein"]).default("haben"),
  /** Separable prefix, e.g. "auf" for aufstehen. The infinitive in `word` includes it. */
  separable: z.string().trim().optional(),
  /** "sich" verbs, e.g. sich anziehen → ich ziehe mich an. */
  reflexive: z.boolean().default(false),
  /** Object case the verb takes, shown as a label. */
  case: z.enum(["akk", "dat", "akk+dat", "none"]).optional(),
  /** Stem used for du and er/sie/es when it changes: fahren → "fähr", nehmen → "nimm". */
  presentStem: z.string().trim().optional(),
  /** du-imperative when it isn't the regular stem (e.g. "nimm", "lies"). Null = no imperative. */
  imperative: z.string().trim().nullable().optional(),
  /** ich/er form of the Präteritum for strong and mixed verbs: "ging", "brachte". */
  past: z.string().trim().optional(),
  /** Partizip II for strong and mixed verbs, including any separable prefix: "aufgestanden". */
  participle: z.string().trim().optional(),
  /** Full tables for verbs that fit no pattern (sein, haben, werden, wissen, modals). */
  presentForms: six.optional(),
  pastForms: six.optional(),
  subjunctiveForms: six.optional(),
  /** du / ihr / Sie forms when fully irregular (sein: Sei! Seid! Seien Sie!). */
  imperativeForms: z.tuple([text, text, text]).optional(),
});
export type VerbInfo = z.infer<typeof VerbInfoSchema>;

export const NounInfoSchema = z.object({
  article: ArticleSchema,
  /** Full plural without article. null = no plural (uncountable). */
  plural: z.string().trim().nullable(),
  /** Genitive singular ending for der/das nouns: "s", "es", "n", "en", "ns". Default chosen by the word ending. */
  genitive: z.string().trim().optional(),
  /** Weak masculine nouns: der Student, den Studenten. Value is the ending added ("n" or "en"). */
  nDeclension: z.enum(["n", "en"]).optional(),
  /** Only used in the plural (die Eltern). */
  pluralOnly: z.boolean().default(false),
  /** Female form, e.g. Lehrer → "Lehrerin". */
  feminine: z.string().trim().optional(),
});
export type NounInfo = z.infer<typeof NounInfoSchema>;

export const AdjectiveInfoSchema = z.object({
  comparative: z.string().trim().optional(),
  /** Superlative without "am", e.g. "größten". */
  superlative: z.string().trim().optional(),
  /** true for words that don't compare (e.g. tot, verheiratet). */
  noComparison: z.boolean().default(false),
});
export type AdjectiveInfo = z.infer<typeof AdjectiveInfoSchema>;

export const DictExampleSchema = z.object({ de: text, en: text });

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase ASCII letters, numbers and dashes");

export const DictEntrySchema = z
  .object({
    id: slug,
    /** Headword. Nouns without article, verbs as infinitive (with separable prefix, with "sich" omitted). */
    word: text,
    pos: PosSchema,
    en: z.array(text).min(1),
    level: z.enum(["A1", "A2"]).default("A1"),
    topics: z.array(TopicSchema).min(1),
    examples: z.array(DictExampleSchema).max(4).default([]),
    note: z.string().trim().optional(),
    /** Lesson slugs where the word is taught. */
    lessons: z.array(z.string()).default([]),
    verb: VerbInfoSchema.optional(),
    noun: NounInfoSchema.optional(),
    adjective: AdjectiveInfoSchema.optional(),
  })
  .superRefine((e, ctx) => {
    if (e.pos === "verb" && !e.verb)
      ctx.addIssue({ code: "custom", path: ["verb"], message: "Verbs need verb info" });
    if (e.pos === "noun" && !e.noun)
      ctx.addIssue({ code: "custom", path: ["noun"], message: "Nouns need noun info" });
    if (e.verb?.separable && !e.word.startsWith(e.verb.separable)) {
      ctx.addIssue({
        code: "custom",
        path: ["verb", "separable"],
        message: "Prefix must start the infinitive",
      });
    }
  });

export type DictEntryInput = z.input<typeof DictEntrySchema>;
export type DictEntry = z.output<typeof DictEntrySchema>;
