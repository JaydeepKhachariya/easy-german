import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "gern-lieber",
  slug: "gern-lieber",
  order: 340,
  unit: "Grammar",
  titleDe: "gern, lieber, am liebsten",
  titleEn: "Likes and preferences: gern, lieber, am liebsten",
  category: "grammar",
  minutes: 15,
  summary: "Verb + gern means you like doing it. lieber = prefer, am liebsten = like best.",
  englishExplanation:
    'English says "I like swimming", "I prefer tea", "I like football best". Each one uses a different verb or phrase.',
  englishExamples: ["I like swimming.", "I prefer tea.", "I like football best."],
  germanExplanation:
    "German adds gern to any verb to say you like doing it: Ich schwimme gern (I like swimming). Ich trinke gern Tee.\n\nTo compare, use lieber (rather, prefer) and am liebsten (most of all): Ich trinke gern Kaffee, aber ich trinke lieber Tee. Am liebsten trinke ich Wasser.\n\ngern goes after the verb, like other adverbs. The negative is nicht gern: Ich koche nicht gern.\n\nFor things rather than activities, you can also use mögen: Ich mag Tee.",
  comparisonRows: [
    {
      english: "I like swimming.",
      german: "Ich schwimme gern.",
      note: "verb + gern",
    },
    {
      english: "I prefer tea.",
      german: "Ich trinke lieber Tee.",
      note: "lieber = rather",
    },
    {
      english: "I like football best.",
      german: "Am liebsten spiele ich Fußball.",
      note: "am liebsten = most of all",
    },
    {
      english: "I don't like cooking.",
      german: "Ich koche nicht gern.",
      note: "nicht gern",
    },
  ],
  helps: [
    "The three steps work like good, better, best: gern, lieber, am liebsten.",
    "gern never changes its form.",
  ],
  misleads: [
    'Don\'t say "Ich mag schwimmen" for activities. Say "Ich schwimme gern".',
    "gern isn't a verb. The real verb still takes position 2: Ich lese gern.",
  ],
  tables: [
    {
      kind: "generic",
      title: "Three steps",
      headers: ["", "German", "English"],
      rows: [
        ["like", "gern", "I like ...-ing"],
        ["prefer", "lieber", "I prefer, I'd rather"],
        ["like best", "am liebsten", "I like ... best"],
      ],
    },
  ],
  examples: [
    {
      de: "Ich spiele gern Cricket.",
      en: "I like playing cricket.",
    },
    {
      de: "Isst du gern scharf?",
      en: "Do you like spicy food?",
      gloss: "Eat you gladly spicy?",
    },
    {
      de: "Ich fahre lieber mit dem Zug.",
      en: "I'd rather go by train.",
    },
    {
      de: "Am liebsten koche ich indisch.",
      en: "Most of all I like cooking Indian food.",
    },
    {
      de: "Sie tanzt nicht gern.",
      en: "She doesn't like dancing.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich gern schwimme.",
      right: "Ich schwimme gern.",
      why: "gern comes after the verb.",
    },
    {
      wrong: "Ich mag lesen.",
      right: "Ich lese gern.",
      why: "For activities, use verb + gern.",
    },
    {
      wrong: "Ich trinke mehr gern Tee.",
      right: "Ich trinke lieber Tee.",
      why: "The comparison of gern is lieber.",
    },
  ],
  exercises: [
    {
      id: "gern-order-romane",
      type: "reorderWords",
      skill: "word-order",
      prompt: "Put the words in order.",
      words: ["ich", "lese", "gern", "Romane"],
      alsoAccept: [],
      en: "I like reading novels.",
    },
    {
      id: "gern-fill-lieber",
      type: "fillBlank",
      skill: "general",
      prompt: "Fill in the missing word.",
      sentence: "Ich trinke gern Kaffee, aber ich trinke ___ Tee.",
      answers: [["lieber"]],
      en: "I like coffee, but I prefer tea.",
    },
    {
      id: "gern-mc-liebsten",
      type: "multipleChoice",
      skill: "verb-position",
      prompt: "Most of all I like swimming.",
      question: "Pick the correct sentence.",
      options: ["Am liebsten schwimme ich.", "Am liebsten ich schwimme.", "Ich schwimme lieber."],
      answer: 0,
    },
    {
      id: "gern-tr-cook",
      type: "translate",
      skill: "negation",
      prompt: "Translate.",
      en: "I don't like cooking.",
      answers: ["Ich koche nicht gern."],
    },
  ],
  vocab: [
    {
      de: "gern",
      en: "gladly (verb + gern = like doing)",
    },
    {
      de: "lieber",
      en: "rather, prefer",
    },
    {
      de: "am liebsten",
      en: "most of all",
    },
    {
      de: "schwimmen",
      en: "to swim",
    },
    {
      de: "tanzen",
      en: "to dance",
    },
    {
      de: "kochen",
      en: "to cook",
    },
    {
      de: "Roman",
      en: "novel",
      article: "der",
      plural: "Romane",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
