import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "yes-no-questions",
  slug: "yes-no-questions",
  order: 140,
  unit: "Grammar",
  titleDe: "Ja/Nein-Fragen",
  titleEn: "Yes/no questions",
  category: "grammar",
  minutes: 15,
  summary: "Put the verb first. Answer a negative question with doch to say yes.",
  englishExplanation:
    'English yes/no questions start with a helper verb: "Do you speak German?", "Are you tired?", "Can you help me?"',
  englishExamples: ["Do you speak German?", "Are you tired?", "Can you help me?"],
  germanExplanation:
    "German just moves the conjugated verb to position 1. No helper is needed: Sprichst du Deutsch? Word for word: Speak you German?\n\nAnswers: ja (yes), nein (no). To say yes to a negative question, use doch: Kommst du nicht? – Doch! (Yes, I am.)\n\nWith a modal verb or the Perfekt, only the conjugated part moves to the front. The rest stays at the end: Kannst du mir helfen? Hast du gut geschlafen?",
  comparisonRows: [
    {
      english: "Do you speak German?",
      german: "Sprichst du Deutsch?",
      note: 'Verb first, no "do".',
    },
    {
      english: "Are you tired?",
      german: "Bist du müde?",
      note: "Same as English: verb first.",
    },
    {
      english: "Can you help me?",
      german: "Kannst du mir helfen?",
      note: "Modal first, infinitive at the end.",
    },
    {
      english: "Don't you have time? – Yes, I do.",
      german: "Hast du keine Zeit? – Doch.",
      note: "doch = yes, against a negative question.",
    },
  ],
  helps: ["With be and can, English already puts the verb first: Are you...? Can you...?"],
  misleads: [
    'Don\'t translate "do": Wohnst du hier? not Tust du hier wohnen?',
    "Answering ja to a negative question is confusing. Use doch.",
  ],
  examples: [
    {
      de: "Sprichst du Englisch?",
      en: "Do you speak English?",
    },
    {
      de: "Wohnen Sie in Berlin?",
      en: "Do you live in Berlin?",
    },
    {
      de: "Hast du heute Zeit?",
      en: "Do you have time today?",
    },
    {
      de: "Ist das dein Handy?",
      en: "Is that your phone?",
    },
    {
      de: "Kommst du nicht mit? – Doch, ich komme mit.",
      en: "Aren't you coming along? – Yes, I am.",
    },
  ],
  mistakes: [
    {
      wrong: "Du sprichst Deutsch?",
      right: "Sprichst du Deutsch?",
      why: "In a standard yes/no question the verb goes first.",
    },
    {
      wrong: "Tust du hier wohnen?",
      right: "Wohnst du hier?",
      why: 'German has no helper "do".',
    },
    {
      wrong: "Hast du keinen Hunger? – Ja. (meaning: yes, I'm hungry)",
      right: "Doch, ich habe Hunger.",
      why: "To contradict a negative question, answer doch.",
    },
  ],
  exercises: [
    {
      id: "yn-order-sprichst",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order.",
      words: ["sprichst", "du", "Deutsch"],
      alsoAccept: [],
      en: "Do you speak German?",
    },
    {
      id: "yn-mc-doch",
      type: "multipleChoice",
      skill: "negation",
      prompt: '"Kommst du nicht?" You are coming. What do you answer?',
      question: "Kommst du nicht?",
      options: ["Ja.", "Nein.", "Doch."],
      answer: 2,
    },
    {
      id: "yn-tr-tired",
      type: "translate",
      skill: "verb-position",
      prompt: "Translate.",
      en: "Are you tired?",
      answers: ["Bist du müde?", "Sind Sie müde?", "Seid ihr müde?"],
    },
  ],
  vocab: [
    {
      de: "ja",
      en: "yes",
    },
    {
      de: "nein",
      en: "no",
    },
    {
      de: "doch",
      en: "yes (after a negative question)",
    },
    {
      de: "sprechen",
      en: "to speak",
    },
    {
      de: "helfen",
      en: "to help",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
