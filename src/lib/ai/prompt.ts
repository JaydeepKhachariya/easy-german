/**
 * What the tutor is told: a fixed system prompt, plus the lesson, word or sentence the
 * learner is looking at. Contexts are plain text and kept short, because Groq's free tier
 * allows only a few thousand tokens per minute.
 */
import type { DictEntry } from "@/content/dictionary/schema";
import type { Concept } from "@/content/schema";

import type { ChatMessage } from "./groq";

export type TutorContext = {
  /** Keeps a separate conversation per lesson, word or page. */
  id: string;
  /** Shown above the chat, e.g. "Lesson: Modal verbs". */
  label: string;
  /** Plain text given to the model. Empty for general questions. */
  text: string;
  /** Suggested first questions. */
  starters: string[];
  /** Pre-filled question, e.g. from the sentence helper. */
  draft?: string;
};

export const SYSTEM_PROMPT = `You are the tutor in Deutsch Bridge, an app that teaches German at A1 level (Goethe Start Deutsch 1) to English speakers, many of them from India.

How to answer:
- Start from English: say what English does, then what German keeps or changes.
- Be short and plain: a few sentences or a short list. Explain as you would to a beginner.
- Keep German examples at A1 level and give the English for every German sentence.
- Always give nouns with der, die or das.
- When the learner writes German, correct it kindly: show the right sentence, then one line per change.
- If the learner asks you to quiz them, ask one question at a time and wait for the answer.
- If you are not sure about something, say so. Never invent a grammar rule.
- Stay on learning German. For anything else, say briefly that you can only help with German.
- Format with short paragraphs, **bold** for key words, lists, and small tables when they help. No headings bigger than ###.`;

const MAX_CONTEXT = 3500;
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export const GENERAL_CONTEXT: TutorContext = {
  id: "general",
  label: "Any German question",
  text: "",
  starters: [
    "When do I use der, die or das?",
    "Explain the Akkusativ simply",
    "Correct my sentence: Ich habe gestern nach Berlin gefahren.",
    "How should I prepare for Start Deutsch 1?",
  ],
};

export function conceptContext(c: Concept): TutorContext {
  const parts = [
    `Lesson: ${c.titleDe} (${c.titleEn})`,
    c.summary,
    `In English: ${c.englishExplanation}`,
    c.englishExamples.length ? `English examples: ${c.englishExamples.join(" / ")}` : "",
    `In German: ${c.germanExplanation}`,
    c.examples.length
      ? `Examples:\n${c.examples
          .slice(0, 6)
          .map((e) => `- ${e.de} = ${e.en}`)
          .join("\n")}`
      : "",
    c.mistakes.length
      ? `Common mistakes:\n${c.mistakes
          .slice(0, 4)
          .map((m) => `- ${m.wrong} → ${m.right} (${m.why})`)
          .join("\n")}`
      : "",
  ];
  return {
    id: `lesson:${c.id}`,
    label: `Lesson: ${c.titleEn}`,
    text: clip(parts.filter(Boolean).join("\n\n"), MAX_CONTEXT),
    starters: [
      "Explain this more simply",
      "Give me 5 more examples",
      "Quiz me on this lesson",
      "What mistakes do English speakers make here?",
    ],
  };
}

export function entryContext(e: DictEntry, headword: string, forms: string): TutorContext {
  const parts = [
    `Dictionary word: ${headword} (${e.pos}) = ${e.en.join("; ")}`,
    forms,
    e.note ?? "",
    e.examples.length
      ? `Examples:\n${e.examples.map((x) => `- ${x.de} = ${x.en}`).join("\n")}`
      : "",
  ];
  const starters = [
    "Use it in 3 simple sentences",
    "Are there words that are easy to mix up with it?",
  ];
  if (e.verb) starters.unshift("How do I conjugate it in the present and Perfekt?");
  if (e.noun) starters.unshift("Show me how the article changes in each case");
  return {
    id: `word:${e.id}`,
    label: `Word: ${headword}`,
    text: clip(parts.filter(Boolean).join("\n\n"), MAX_CONTEXT),
    starters,
  };
}

export function sentenceContext(sentence: string): TutorContext {
  return {
    id: `sentence:${sentence}`,
    label: "Sentence helper",
    text: "",
    starters: [],
    draft: `Translate this sentence and explain its grammar word by word:\n${sentence}`,
  };
}

/** Recent turns only, newest kept, so a long chat stays under the free-tier token limit. */
const MAX_HISTORY_CHARS = 6000;
const MAX_TURNS = 12;

export function buildMessages(ctx: TutorContext, history: ChatMessage[]): ChatMessage[] {
  const system = ctx.text
    ? `${SYSTEM_PROMPT}\n\nThe learner is looking at this in the app. Use it and stay consistent with it:\n"""\n${ctx.text}\n"""`
    : SYSTEM_PROMPT;
  const kept: ChatMessage[] = [];
  let chars = 0;
  for (const m of [...history].reverse()) {
    if (
      kept.length >= MAX_TURNS ||
      (kept.length > 0 && chars + m.content.length > MAX_HISTORY_CHARS)
    ) {
      break;
    }
    kept.unshift(m);
    chars += m.content.length;
  }
  // Start with a learner turn.
  while (kept[0]?.role === "assistant") kept.shift();
  return [{ role: "system", content: system }, ...kept];
}
