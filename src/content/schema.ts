import { z } from "zod";

/**
 * Content schema shared by core concepts (typed files in src/content/concepts)
 * and user-created lessons (IndexedDB, JSON import). Bump SCHEMA_VERSION and add a
 * migration in src/lib/import-export.ts when the shape changes.
 */
export const SCHEMA_VERSION = 1;

const text = z.string().trim().min(1, "Required");

export const CATEGORIES = ["grammar", "vocabulary", "writing", "speaking", "exam"] as const;
export const CategorySchema = z.enum(CATEGORIES);
export type Category = z.infer<typeof CategorySchema>;

export const LevelSchema = z.enum(["A1"]);
export const StatusSchema = z.enum(["draft", "complete"]);

export const ArticleSchema = z.enum(["der", "die", "das"]);
export type Article = z.infer<typeof ArticleSchema>;

/** Article plus plural, for colour coding. */
export type Gender = Article | "plural";

export const SKILLS = [
  "verb-position",
  "conjugation",
  "modal-infinitive",
  "perfekt-auxiliary",
  "participle",
  "negation",
  "articles",
  "capitalization",
  "vocabulary",
  "word-order",
  "cases",
  "formal-address",
  "spelling",
  "listening",
  "writing",
  "general",
] as const;
export const SkillSchema = z.enum(SKILLS);
export type Skill = z.infer<typeof SkillSchema>;

/* ---------- small parts ---------- */

export const ComparisonRowSchema = z.object({
  english: text,
  german: text,
  note: z.string().trim().default(""),
});

export const ExampleSchema = z.object({
  de: text,
  en: text,
  /** Word-by-word English gloss in German order, e.g. "I can tomorrow not come". */
  gloss: z.string().trim().optional(),
});
export type Example = z.infer<typeof ExampleSchema>;

export const MistakeSchema = z.object({
  wrong: text,
  right: text,
  why: text,
});

export const VocabItemSchema = z.object({
  de: text,
  en: text,
  article: ArticleSchema.optional(),
  /** Full plural form without article, e.g. "Hunde". Use "-" for no plural. */
  plural: z.string().trim().optional(),
});
export type VocabItem = z.infer<typeof VocabItemSchema>;

/* ---------- tables ---------- */

export const DEFAULT_PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

const ConjugationTableSchema = z
  .object({
    kind: z.literal("conjugation"),
    title: z.string().trim().optional(),
    pronouns: z.array(text).min(1).default(DEFAULT_PRONOUNS),
    verbs: z
      .array(
        z.object({
          infinitive: text,
          english: z.string().trim().optional(),
          forms: z.array(text),
          /** Row indexes to highlight, e.g. the forms with a vowel change. */
          highlight: z.array(z.number().int().min(0)).default([]),
        }),
      )
      .min(1),
  })
  .superRefine((t, ctx) => {
    t.verbs.forEach((v, i) => {
      if (v.forms.length !== t.pronouns.length) {
        ctx.addIssue({
          code: "custom",
          path: ["verbs", i, "forms"],
          message: `Needs ${t.pronouns.length} forms, one per pronoun`,
        });
      }
    });
  });

/** Four fixed, colour-coded columns: der / die / das / plural. */
const ArticlesTableSchema = z.object({
  kind: z.literal("articles"),
  title: z.string().trim().optional(),
  rows: z
    .array(
      z.object({
        label: text,
        cells: z.tuple([text, text, text, text]),
      }),
    )
    .min(1),
});

const GenericTableSchema = z
  .object({
    kind: z.enum(["endings", "generic"]),
    title: z.string().trim().optional(),
    headers: z.array(text).min(1),
    rows: z.array(z.array(z.string().trim())).min(1),
  })
  .superRefine((t, ctx) => {
    t.rows.forEach((r, i) => {
      if (r.length !== t.headers.length) {
        ctx.addIssue({
          code: "custom",
          path: ["rows", i],
          message: `Needs ${t.headers.length} cells`,
        });
      }
    });
  });

export const TableSchema = z.union([
  ConjugationTableSchema,
  ArticlesTableSchema,
  GenericTableSchema,
]);
export type Table = z.infer<typeof TableSchema>;

/* ---------- word order diagrams ---------- */

export const TOKEN_ROLES = [
  "subject",
  "verb",
  "infinitive",
  "participle",
  "prefix",
  "object",
  "time",
  "manner",
  "place",
  "negation",
  "question",
  "conjunction",
  "other",
] as const;
export const TokenRoleSchema = z.enum(TOKEN_ROLES);
export type TokenRole = z.infer<typeof TokenRoleSchema>;

/** Roles that German sends to the end of the clause. */
export const END_ROLES: readonly TokenRole[] = ["infinitive", "participle", "prefix"];

const TokenSchema = z.object({ text, role: TokenRoleSchema.default("other") });

export const WordOrderDiagramSchema = z.object({
  kind: z.literal("wordOrder"),
  caption: z.string().trim().optional(),
  english: z.array(TokenSchema).min(1),
  german: z.array(TokenSchema).min(1),
});
export const DiagramSchema = WordOrderDiagramSchema;
export type Diagram = z.infer<typeof DiagramSchema>;
export type Token = z.infer<typeof TokenSchema>;

/* ---------- exercises ---------- */

const exerciseBase = {
  id: text,
  prompt: text,
  skill: SkillSchema.default("general"),
  hint: z.string().trim().optional(),
  /** Shown after the learner answers. */
  explanation: z.string().trim().optional(),
};

/** Blank marker used in fill-in sentences. */
export const BLANK = "___";

const MultipleChoiceSchema = z
  .object({
    ...exerciseBase,
    type: z.literal("multipleChoice"),
    question: text,
    options: z.array(text).min(2).max(6),
    answer: z.number().int().min(0),
  })
  .refine((e) => e.answer < e.options.length, {
    message: "Answer must point to an option",
    path: ["answer"],
  });

const FillBlankSchema = z
  .object({
    ...exerciseBase,
    type: z.literal("fillBlank"),
    /** Sentence with one or more ___ markers. */
    sentence: text,
    /** Accepted answers per blank. */
    answers: z.array(z.array(text).min(1)).min(1),
    en: z.string().trim().optional(),
  })
  .refine((e) => e.sentence.split(BLANK).length - 1 === e.answers.length, {
    message: `Number of ${BLANK} blanks must match the number of answer lists`,
    path: ["answers"],
  });

const tileKey = (words: string[]) =>
  words
    .map((w) => w.toLowerCase())
    .sort()
    .join("|");

const ReorderWordsSchema = z
  .object({
    ...exerciseBase,
    type: z.literal("reorderWords"),
    /**
     * Words (tiles) in the correct order. Shuffled on screen. Write the first word in the
     * case it has mid-sentence ("am", not "Am"); the UI capitalizes whichever tile comes first.
     */
    words: z.array(text).min(2),
    /** Other correct orders. Must use exactly the same tiles. */
    alsoAccept: z.array(z.array(text)).default([]),
    en: text,
  })
  .superRefine((e, ctx) => {
    const key = tileKey(e.words);
    e.alsoAccept.forEach((alt, i) => {
      if (tileKey(alt) !== key) {
        ctx.addIssue({
          code: "custom",
          path: ["alsoAccept", i],
          message: "Must use exactly the same words as the main answer",
        });
      }
    });
  });

const ConjugationExerciseSchema = z
  .object({
    ...exerciseBase,
    type: z.literal("conjugationTable"),
    verb: text,
    english: z.string().trim().optional(),
    pronouns: z.array(text).min(1).default(DEFAULT_PRONOUNS),
    answers: z.array(text),
    /** Row indexes shown already filled in. */
    given: z.array(z.number().int().min(0)).default([]),
  })
  .refine((e) => e.answers.length === e.pronouns.length, {
    message: "One answer per pronoun",
    path: ["answers"],
  });

const TranslateSchema = z.object({
  ...exerciseBase,
  type: z.literal("translate"),
  en: text,
  answers: z.array(text).min(1),
});

const MatchPairsSchema = z.object({
  ...exerciseBase,
  type: z.literal("matchPairs"),
  pairs: z
    .array(z.object({ left: text, right: text }))
    .min(2)
    .max(8),
});

const ArticlePickSchema = z.object({
  ...exerciseBase,
  type: z.literal("articlePick"),
  nouns: z
    .array(z.object({ noun: text, article: ArticleSchema, en: z.string().trim().optional() }))
    .min(1)
    .max(10),
});

export const ExerciseSchema = z.discriminatedUnion("type", [
  MultipleChoiceSchema,
  FillBlankSchema,
  ReorderWordsSchema,
  ConjugationExerciseSchema,
  TranslateSchema,
  MatchPairsSchema,
  ArticlePickSchema,
]);
export type Exercise = z.infer<typeof ExerciseSchema>;
export type ExerciseType = Exercise["type"];
export type ExerciseOf<T extends ExerciseType> = Extract<Exercise, { type: T }>;

export const EXERCISE_TYPES: { type: ExerciseType; label: string }[] = [
  { type: "multipleChoice", label: "Multiple choice" },
  { type: "fillBlank", label: "Fill the blank" },
  { type: "reorderWords", label: "Put words in order" },
  { type: "conjugationTable", label: "Conjugation table" },
  { type: "translate", label: "Translate to German" },
  { type: "matchPairs", label: "Match pairs" },
  { type: "articlePick", label: "der, die or das" },
];

/* ---------- concept ---------- */

const slug = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes");

export const ConceptSchema = z
  .object({
    schemaVersion: z.literal(SCHEMA_VERSION).default(SCHEMA_VERSION),
    id: text,
    slug,
    order: z.number().int().min(0),
    titleDe: text,
    titleEn: text,
    category: CategorySchema,
    level: LevelSchema.default("A1"),
    minutes: z.number().int().min(1).max(120),
    status: StatusSchema.default("draft"),
    /** Display group on the Learn page, e.g. "Basics". Falls back to the category label. */
    unit: z.string().trim().optional(),
    /** One line for lists and search results. */
    summary: z.string().trim().default(""),
    prerequisites: z.array(z.string().trim()).default([]),
    englishExplanation: text,
    /** 2-4 English sentences that show the English pattern. */
    englishExamples: z.array(text).max(6).default([]),
    germanExplanation: text,
    comparisonRows: z.array(ComparisonRowSchema).default([]),
    helps: z.array(text).default([]),
    misleads: z.array(text).default([]),
    hindiHint: z.string().trim().optional(),
    tables: z.array(TableSchema).default([]),
    diagrams: z.array(DiagramSchema).default([]),
    examples: z.array(ExampleSchema).default([]),
    mistakes: z.array(MistakeSchema).default([]),
    exercises: z.array(ExerciseSchema).default([]),
    vocab: z.array(VocabItemSchema).default([]),
  })
  .superRefine((c, ctx) => {
    const seen = new Set<string>();
    c.exercises.forEach((e, i) => {
      if (seen.has(e.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["exercises", i, "id"],
          message: `Duplicate exercise id "${e.id}"`,
        });
      }
      seen.add(e.id);
    });
  });

/** What authors write. Defaults are filled in by parsing. */
export type ConceptInput = z.input<typeof ConceptSchema>;
export type Concept = z.output<typeof ConceptSchema>;

export const CATEGORY_LABELS: Record<Category, string> = {
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  writing: "Writing",
  speaking: "Speaking",
  exam: "Exam",
};
