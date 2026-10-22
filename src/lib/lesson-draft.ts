/**
 * Form model for the lesson editor. List-like fields are edited as one item per line,
 * which is quicker to type (also on a phone) than add/remove buttons for every option.
 * draftToConcept() turns a draft into a validated Concept; conceptToDraft() goes back.
 */
import { z } from "zod";

import {
  ConceptSchema,
  DEFAULT_PRONOUNS,
  EXERCISE_TYPES,
  ExerciseSchema,
  TableSchema,
  type Article,
  type Category,
  type Concept,
  type Exercise,
  type ExerciseType,
  type Skill,
  type Table,
} from "@/content/schema";

export type ExerciseDraft = {
  id: string;
  type: ExerciseType;
  prompt: string;
  skill: Skill;
  hint: string;
  explanation: string;
  // multipleChoice
  question: string;
  optionsText: string;
  answerIndex: string;
  // fillBlank / translate / reorderWords
  sentence: string;
  blanksText: string;
  en: string;
  answersText: string;
  wordsText: string;
  alsoAcceptText: string;
  // conjugationTable
  verb: string;
  english: string;
  forms: string[];
  given: boolean[];
  // matchPairs / articlePick
  pairsText: string;
  nounsText: string;
};

export type GenericTableDraft = { title: string; headersText: string; rowsText: string };

export type LessonDraft = {
  id: string;
  titleDe: string;
  titleEn: string;
  category: Category;
  minutes: string;
  status: "draft" | "complete";
  summary: string;
  englishExplanation: string;
  englishExamplesText: string;
  germanExplanation: string;
  comparisonRows: { english: string; german: string; note: string }[];
  helpsText: string;
  misleadsText: string;
  hindiHint: string;
  genericTables: GenericTableDraft[];
  examples: { de: string; en: string; gloss: string }[];
  mistakes: { wrong: string; right: string; why: string }[];
  vocab: { de: string; en: string; article: "" | Article; plural: string }[];
  exercises: ExerciseDraft[];
  /** Fields the form doesn't edit, kept as they are (e.g. from an imported lesson). */
  keep: Pick<Concept, "slug" | "order" | "level" | "prerequisites" | "diagrams" | "unit"> & {
    otherTables: Table[];
  };
};

export const lines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const opt = (s: string) => (s.trim() ? s.trim() : undefined);

/** Small words that start sentences but are lowercase mid-sentence. */
const LOWER_STARTERS = new Set(
  "ich du er sie es wir ihr man am im um in an auf mit nach von zu heute morgen gestern jetzt dann hier dort der die das den dem des ein eine einen einem einer mein meine dein deine kein keine wo was wer wie wann warum woher wohin und aber oder denn ja nein nicht".split(
    " ",
  ),
);

/** Splits an answer sentence into reorder tiles. "Ich kann." -> ["ich", "kann"]. */
export function sentenceToTiles(s: string): string[] {
  const words = s
    .trim()
    .replace(/[.!?]+$/, "")
    .split(/\s+/)
    .filter(Boolean);
  if (words[0] && LOWER_STARTERS.has(words[0].toLowerCase())) {
    words[0] = words[0].charAt(0).toLowerCase() + words[0].slice(1);
  }
  return words;
}

export function emptyExercise(type: ExerciseType, id: string): ExerciseDraft {
  return {
    id,
    type,
    prompt: EXERCISE_TYPES.find((t) => t.type === type)?.label ?? "",
    skill: "general",
    hint: "",
    explanation: "",
    question: "",
    optionsText: "",
    answerIndex: "0",
    sentence: "",
    blanksText: "",
    en: "",
    answersText: "",
    wordsText: "",
    alsoAcceptText: "",
    verb: "",
    english: "",
    forms: DEFAULT_PRONOUNS.map(() => ""),
    given: DEFAULT_PRONOUNS.map(() => false),
    pairsText: "",
    nounsText: "",
  };
}

function splitPair(line: string): [string, string] {
  const i = line.indexOf("=");
  return i === -1 ? [line.trim(), ""] : [line.slice(0, i).trim(), line.slice(i + 1).trim()];
}

export function exerciseFromDraft(d: ExerciseDraft): Record<string, unknown> {
  const base = {
    id: d.id,
    type: d.type,
    prompt: d.prompt,
    skill: d.skill,
    hint: opt(d.hint),
    explanation: opt(d.explanation),
  };
  switch (d.type) {
    case "multipleChoice":
      return {
        ...base,
        question: d.question,
        options: lines(d.optionsText),
        answer: Number(d.answerIndex) || 0,
      };
    case "fillBlank":
      return {
        ...base,
        sentence: d.sentence,
        en: opt(d.en),
        answers: lines(d.blanksText).map((l) =>
          l
            .split("|")
            .map((a) => a.trim())
            .filter(Boolean),
        ),
      };
    case "reorderWords":
      return {
        ...base,
        en: d.en,
        words: sentenceToTiles(d.wordsText),
        alsoAccept: lines(d.alsoAcceptText).map(sentenceToTiles),
      };
    case "conjugationTable":
      return {
        ...base,
        verb: d.verb,
        english: opt(d.english),
        pronouns: DEFAULT_PRONOUNS,
        answers: d.forms.map((f) => f.trim()),
        given: d.given.flatMap((g, i) => (g ? [i] : [])),
      };
    case "translate":
      return { ...base, en: d.en, answers: lines(d.answersText) };
    case "matchPairs":
      return {
        ...base,
        pairs: lines(d.pairsText).map((l) => ({ left: splitPair(l)[0], right: splitPair(l)[1] })),
      };
    case "articlePick":
      return {
        ...base,
        nouns: lines(d.nounsText).map((l) => {
          const [left, en] = splitPair(l);
          const [article = "", ...rest] = left.split(/\s+/);
          return { article: article.toLowerCase(), noun: rest.join(" "), en: opt(en) };
        }),
      };
  }
}

export function exerciseToDraft(e: Exercise): ExerciseDraft {
  const d = emptyExercise(e.type, e.id);
  Object.assign(d, {
    prompt: e.prompt,
    skill: e.skill,
    hint: e.hint ?? "",
    explanation: e.explanation ?? "",
  });
  // Tiles are kept exactly as stored, so a lesson survives editing unchanged.
  const join = (ws: string[]) => ws.join(" ");
  switch (e.type) {
    case "multipleChoice":
      return {
        ...d,
        question: e.question,
        optionsText: e.options.join("\n"),
        answerIndex: String(e.answer),
      };
    case "fillBlank":
      return {
        ...d,
        sentence: e.sentence,
        en: e.en ?? "",
        blanksText: e.answers.map((a) => a.join(" | ")).join("\n"),
      };
    case "reorderWords":
      return {
        ...d,
        en: e.en,
        wordsText: join(e.words),
        alsoAcceptText: e.alsoAccept.map(join).join("\n"),
      };
    case "conjugationTable": {
      // The form edits the standard six pronouns.
      const forms = DEFAULT_PRONOUNS.map((_, i) => e.answers[i] ?? "");
      const given = DEFAULT_PRONOUNS.map((_, i) => e.given.includes(i));
      return { ...d, verb: e.verb, english: e.english ?? "", forms, given };
    }
    case "translate":
      return { ...d, en: e.en, answersText: e.answers.join("\n") };
    case "matchPairs":
      return { ...d, pairsText: e.pairs.map((p) => `${p.left} = ${p.right}`).join("\n") };
    case "articlePick":
      return {
        ...d,
        nounsText: e.nouns
          .map((n) => `${n.article} ${n.noun}${n.en ? ` = ${n.en}` : ""}`)
          .join("\n"),
      };
  }
}

export function draftToInput(d: LessonDraft): Record<string, unknown> {
  const generic: Table[] = d.genericTables
    .filter((t) => t.headersText.trim() || t.rowsText.trim())
    .map((t) => {
      const headers = t.headersText.split("|").map((h) => h.trim());
      return {
        kind: "generic" as const,
        title: opt(t.title),
        headers,
        rows: lines(t.rowsText).map((r) => {
          const cells = r.split("|").map((c) => c.trim());
          // Pad short rows so the table stays rectangular.
          return headers.map((_, i) => cells[i] ?? "");
        }),
      };
    });

  // JSON round trip drops undefined keys, so stored lessons only hold real values.
  return JSON.parse(
    JSON.stringify({
      id: d.id,
      unit: d.keep.unit,
      slug: d.keep.slug,
      order: d.keep.order,
      level: d.keep.level,
      prerequisites: d.keep.prerequisites,
      diagrams: d.keep.diagrams,
      titleDe: d.titleDe,
      titleEn: d.titleEn,
      category: d.category,
      minutes: Number(d.minutes),
      status: d.status,
      summary: d.summary.trim(),
      englishExplanation: d.englishExplanation,
      englishExamples: lines(d.englishExamplesText),
      germanExplanation: d.germanExplanation,
      comparisonRows: d.comparisonRows,
      helps: lines(d.helpsText),
      misleads: lines(d.misleadsText),
      hindiHint: opt(d.hindiHint),
      tables: [...d.keep.otherTables, ...generic],
      examples: d.examples.map((e) => ({ de: e.de, en: e.en, gloss: opt(e.gloss) })),
      mistakes: d.mistakes,
      exercises: d.exercises.map(exerciseFromDraft),
      vocab: d.vocab.map((v) => ({
        de: v.de,
        en: v.en,
        article: v.article || undefined,
        plural: opt(v.plural),
      })),
    }),
  );
}

export function conceptToDraft(c: Concept): LessonDraft {
  return {
    id: c.id,
    titleDe: c.titleDe,
    titleEn: c.titleEn,
    category: c.category,
    minutes: String(c.minutes),
    status: c.status,
    summary: c.summary,
    englishExplanation: c.englishExplanation,
    englishExamplesText: c.englishExamples.join("\n"),
    germanExplanation: c.germanExplanation,
    comparisonRows: c.comparisonRows.map((r) => ({ ...r })),
    helpsText: c.helps.join("\n"),
    misleadsText: c.misleads.join("\n"),
    hindiHint: c.hindiHint ?? "",
    genericTables: c.tables.flatMap((t) =>
      t.kind === "generic"
        ? [
            {
              title: t.title ?? "",
              headersText: t.headers.join(" | "),
              rowsText: t.rows.map((r) => r.join(" | ")).join("\n"),
            },
          ]
        : [],
    ),
    examples: c.examples.map((e) => ({ de: e.de, en: e.en, gloss: e.gloss ?? "" })),
    mistakes: c.mistakes.map((m) => ({ ...m })),
    vocab: c.vocab.map((v) => ({
      de: v.de,
      en: v.en,
      article: v.article ?? "",
      plural: v.plural ?? "",
    })),
    exercises: c.exercises.map(exerciseToDraft),
    keep: {
      slug: c.slug,
      unit: c.unit,
      order: c.order,
      level: c.level,
      prerequisites: c.prerequisites,
      diagrams: c.diagrams,
      otherTables: c.tables.filter((t) => t.kind !== "generic"),
    },
  };
}

const SECTION_LABELS: Record<string, string> = {
  titleDe: "German title",
  titleEn: "English title",
  minutes: "Minutes",
  englishExplanation: "In English",
  germanExplanation: "In German",
  comparisonRows: "Comparison row",
  examples: "Example",
  mistakes: "Mistake",
  exercises: "Exercise",
  vocab: "Word",
  tables: "Table",
  englishExamples: "English example",
  helps: "Where English helps",
  misleads: "Where English misleads",
};

/** "exercises.2.answers" -> "Exercise 3 › answers". */
export function describePath(path: PropertyKey[]): string {
  const [head, index, ...rest] = path.map(String);
  const label = SECTION_LABELS[head ?? ""] ?? head ?? "Lesson";
  const n =
    index !== undefined && /^\d+$/.test(index)
      ? ` ${Number(index) + 1}`
      : index
        ? ` › ${index}`
        : "";
  return `${label}${n}${rest.length ? ` › ${rest.join(" › ")}` : ""}`;
}

export type DraftResult =
  { ok: true; concept: Concept } | { ok: false; errors: { path: string; message: string }[] };

export function draftToConcept(d: LessonDraft): DraftResult {
  const r = ConceptSchema.safeParse(draftToInput(d));
  if (r.success) return { ok: true, concept: r.data };
  return {
    ok: false,
    errors: r.error.issues.map((i: z.core.$ZodIssue) => ({
      path: describePath(i.path),
      message: i.message,
    })),
  };
}

/**
 * Best-effort concept for the live preview: invalid exercises and rows are left out and
 * empty required text gets a placeholder, so the preview renders while the author types.
 */
export function draftToPreview(d: LessonDraft): { concept: Concept; hidden: number } {
  const input = draftToInput(d);
  const exercisesIn = input.exercises as unknown[];
  const seen = new Set<string>();
  const exercises = exercisesIn.flatMap((e) => {
    const r = ExerciseSchema.safeParse(e);
    if (!r.success || seen.has(r.data.id)) return [];
    seen.add(r.data.id);
    return [r.data];
  });

  const keepValid = <T>(schema: z.ZodType<T>, items: unknown) =>
    (items as unknown[]).flatMap((x) => {
      const r = schema.safeParse(x);
      return r.success ? [r.data] : [];
    });

  const filled = {
    ...input,
    titleDe: d.titleDe.trim() || "Titel",
    titleEn: d.titleEn.trim() || "Untitled lesson",
    minutes:
      Number(d.minutes) >= 1 && Number(d.minutes) <= 120 ? Math.round(Number(d.minutes)) : 10,
    englishExplanation: d.englishExplanation.trim() || "…",
    germanExplanation: d.germanExplanation.trim() || "…",
    comparisonRows: keepValid(
      ConceptSchema.shape.comparisonRows.unwrap().element,
      input.comparisonRows,
    ),
    examples: keepValid(ConceptSchema.shape.examples.unwrap().element, input.examples),
    mistakes: keepValid(ConceptSchema.shape.mistakes.unwrap().element, input.mistakes),
    vocab: keepValid(ConceptSchema.shape.vocab.unwrap().element, input.vocab),
    tables: keepValid(TableSchema, input.tables),
    exercises,
  };
  const r = ConceptSchema.safeParse(filled);
  const concept = r.success
    ? r.data
    : ConceptSchema.parse({
        ...lessonFallback(),
        id: d.id,
        titleDe: filled.titleDe,
        titleEn: filled.titleEn,
        exercises,
      });
  return { concept, hidden: exercisesIn.length - exercises.length };
}

function lessonFallback() {
  return {
    id: "preview",
    slug: "preview",
    order: 0,
    titleDe: "Titel",
    titleEn: "Untitled lesson",
    category: "grammar" as const,
    minutes: 10,
    englishExplanation: "…",
    germanExplanation: "…",
  };
}
