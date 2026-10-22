import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "adjectives-after-sein",
  slug: "adjectives-after-sein",
  order: 180,
  unit: "Grammar",
  titleDe: "Adjektive nach sein",
  titleEn: "Adjectives after sein",
  category: "grammar",
  minutes: 15,
  summary: "After sein, adjectives never change: Das Haus ist groß. Die Häuser sind groß.",
  englishExplanation:
    "English adjectives never change: a big house, the house is big, the houses are big.",
  englishExamples: ["The house is big.", "The rooms are bright.", "The coffee is too hot."],
  germanExplanation:
    "After sein (and bleiben, werden), German adjectives don't change either: Das Haus ist groß. Die Häuser sind groß. Die Lampe ist neu. This is the easy case, and you can say a lot with it.\n\nOnly when an adjective stands before a noun does it take an ending (ein großes Haus). That comes at A2. For now, use the pattern: noun + sein + adjective.\n\nMake it negative with nicht: Das Zimmer ist nicht groß. Make it stronger with sehr (very) or zu (too): Das ist zu teuer.",
  comparisonRows: [
    {
      english: "The house is big.",
      german: "Das Haus ist groß.",
      note: "No ending after sein.",
    },
    {
      english: "The houses are big.",
      german: "Die Häuser sind groß.",
      note: "Still no ending in the plural.",
    },
    {
      english: "It's too expensive.",
      german: "Das ist zu teuer.",
      note: "zu = too",
    },
    {
      english: "The room isn't big.",
      german: "Das Zimmer ist nicht groß.",
      note: "nicht before the adjective.",
    },
  ],
  helps: [
    "After sein, German works exactly like English: the adjective doesn't change.",
    "Many adjectives look alike: alt/old, jung/young, warm/warm, kalt/cold, neu/new.",
  ],
  misleads: [
    'groß doesn\'t mean "gross". It means big or tall.',
    "Don't add endings after sein: Das Auto ist neu, not neues.",
  ],
  examples: [
    {
      de: "Die Wohnung ist hell und ruhig.",
      en: "The flat is bright and quiet.",
    },
    {
      de: "Der Kaffee ist zu heiß.",
      en: "The coffee is too hot.",
    },
    {
      de: "Mein Bruder ist sehr groß.",
      en: "My brother is very tall.",
    },
    {
      de: "Die Schuhe sind nicht teuer.",
      en: "The shoes aren't expensive.",
    },
    {
      de: "Das Wetter ist heute schön.",
      en: "The weather is nice today.",
    },
  ],
  mistakes: [
    {
      wrong: "Das Auto ist neues.",
      right: "Das Auto ist neu.",
      why: "After sein, adjectives take no ending.",
    },
    {
      wrong: "Das Essen ist kein gut.",
      right: "Das Essen ist nicht gut.",
      why: "Adjectives are negated with nicht.",
    },
  ],
  exercises: [
    {
      id: "adj-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the opposites.",
      pairs: [
        {
          left: "groß",
          right: "klein",
        },
        {
          left: "teuer",
          right: "billig",
        },
        {
          left: "warm",
          right: "kalt",
        },
        {
          left: "hell",
          right: "dunkel",
        },
        {
          left: "laut",
          right: "leise",
        },
      ],
    },
    {
      id: "adj-fill-zu",
      type: "fillBlank",
      skill: "general",
      prompt: "Fill in the missing word.",
      sentence: "Die Wohnung ist ___ teuer.",
      answers: [["zu"]],
      en: "The flat is too expensive.",
    },
    {
      id: "adj-tr-cold",
      type: "translate",
      skill: "general",
      prompt: "Translate.",
      en: "The coffee is cold.",
      answers: ["Der Kaffee ist kalt."],
    },
    {
      id: "adj-mc-neu",
      type: "multipleChoice",
      skill: "general",
      prompt: "Pick the correct form.",
      question: "Das Auto ist ___.",
      options: ["neu", "neues", "neue"],
      answer: 0,
    },
  ],
  vocab: [
    {
      de: "groß",
      en: "big, tall",
    },
    {
      de: "klein",
      en: "small",
    },
    {
      de: "teuer",
      en: "expensive",
    },
    {
      de: "billig",
      en: "cheap",
    },
    {
      de: "hell",
      en: "bright",
    },
    {
      de: "ruhig",
      en: "quiet, calm",
    },
    {
      de: "laut",
      en: "loud",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
