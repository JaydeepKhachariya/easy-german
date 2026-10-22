import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "personal-pronouns",
  slug: "personal-pronouns",
  order: 100,
  unit: "Grammar",
  titleDe: "Personalpronomen",
  titleEn: "Personal pronouns: I, you, he...",
  category: "grammar",
  minutes: 15,
  summary: 'ich, du, er, sie, es, wir, ihr, sie, Sie. German has three words for "you".',
  englishExplanation:
    'English has I, you, he, she, it, we, they. One "you" covers one person or many, friend or stranger.',
  englishExamples: ["I am here.", "You are late.", "She works in Berlin.", "They live in Delhi."],
  germanExplanation:
    'The subject pronouns (Nominativ) are: ich, du, er, sie, es, wir, ihr, sie, Sie.\n\n"You" has three forms. du is one person you know well. ihr is several people you know well. Sie is formal, for one or more people, and always has a capital S.\n\nsie has three meanings: she, they, and (with a capital) formal you. The verb ending tells you which: sie wohnt (she lives), sie wohnen (they live), Sie wohnen (you live, formal).\n\ner, sie and es follow the grammatical gender of the noun, even for things. Der Tisch is masculine, so a table is er: Der Tisch ist neu. Er ist schön.',
  comparisonRows: [
    {
      english: "I",
      german: "ich",
      note: "Lowercase, unlike English I.",
    },
    {
      english: "you (one friend)",
      german: "du",
      note: "",
    },
    {
      english: "you (friends)",
      german: "ihr",
      note: "",
    },
    {
      english: "you (formal)",
      german: "Sie",
      note: "Capital S, for one or many people.",
    },
    {
      english: "it (the table)",
      german: "er (der Tisch)",
      note: "The pronoun follows the noun's gender.",
    },
  ],
  helps: [
    "The system is the same as English: one pronoun per person.",
    'es works like "it" for weather and time: Es regnet. Es ist acht Uhr.',
  ],
  misleads: [
    "ich is lowercase in the middle of a sentence.",
    "A thing can be er or sie: Die Lampe ist neu. Sie ist schön. (It is nice.)",
  ],
  hindiHint:
    'Hindi has a similar set of "you" words: तू, तुम, आप. Roughly: du ≈ तुम, ihr ≈ तुम लोग, Sie ≈ आप.',
  tables: [
    {
      kind: "generic",
      title: "Subject pronouns",
      headers: ["English", "German", "Note"],
      rows: [
        ["I", "ich", ""],
        ["you (one friend)", "du", "informal"],
        ["he / she / it", "er / sie / es", "by grammatical gender"],
        ["we", "wir", ""],
        ["you (friends)", "ihr", "informal plural"],
        ["they / you (formal)", "sie / Sie", "Sie with a capital S"],
      ],
    },
  ],
  examples: [
    {
      de: "Ich komme aus Indien.",
      en: "I'm from India.",
    },
    {
      de: "Kommst du auch?",
      en: "Are you coming too?",
    },
    {
      de: "Wir lernen Deutsch.",
      en: "We are learning German.",
    },
    {
      de: "Woher kommt ihr?",
      en: "Where are you all from?",
    },
    {
      de: "Der Tisch ist neu. Er ist sehr schön.",
      en: "The table is new. It is very nice.",
      gloss: "The table is new. He is very nice",
    },
  ],
  mistakes: [
    {
      wrong: "Morgen komme Ich.",
      right: "Morgen komme ich.",
      why: "ich only has a capital at the start of a sentence.",
    },
    {
      wrong: "Der Tisch ist groß. Es ist schön.",
      right: "Der Tisch ist groß. Er ist schön.",
      why: "der Tisch is masculine, so the pronoun is er.",
    },
  ],
  exercises: [
    {
      id: "pron-fill-wir",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Fill in the pronoun.",
      sentence: "___ lernen Deutsch.",
      answers: [["wir"]],
      en: "We are learning German.",
    },
    {
      id: "pron-mc-lampe",
      type: "multipleChoice",
      skill: "articles",
      prompt: "Pick the right pronoun.",
      question: "Die Lampe ist neu. ___ ist sehr schön.",
      options: ["Er", "Sie", "Es"],
      answer: 1,
    },
    {
      id: "pron-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match English and German.",
      pairs: [
        {
          left: "I",
          right: "ich",
        },
        {
          left: "we",
          right: "wir",
        },
        {
          left: "you (friends)",
          right: "ihr",
        },
        {
          left: "you (formal)",
          right: "Sie",
        },
        {
          left: "he",
          right: "er",
        },
      ],
    },
  ],
  vocab: [
    {
      de: "Tisch",
      en: "table",
      article: "der",
      plural: "Tische",
    },
    {
      de: "Lampe",
      en: "lamp",
      article: "die",
      plural: "Lampen",
    },
    {
      de: "neu",
      en: "new",
    },
    {
      de: "schön",
      en: "nice, beautiful",
    },
    {
      de: "lernen",
      en: "to learn, study",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
