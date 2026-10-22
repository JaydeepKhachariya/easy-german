import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "nouns-and-articles",
  slug: "nouns-and-articles",
  order: 150,
  unit: "Grammar",
  titleDe: "Nomen, Artikel und Plural",
  titleEn: "Nouns, articles and plurals",
  category: "grammar",
  minutes: 25,
  summary:
    "Every noun has der, die or das and starts with a capital letter. The plural article is always die.",
  englishExplanation:
    'English has one word for "the" and two for "a/an". Nouns have no gender. Most plurals just add -s: book, books.',
  englishExamples: [
    "The table is new.",
    "A girl is reading a book.",
    "The books are on the table.",
  ],
  germanExplanation:
    "Every German noun has a gender: masculine (der), feminine (die) or neuter (das). The gender often has nothing to do with meaning: der Tisch (table), die Lampe (lamp), das Mädchen (girl).\n\nLearn every noun with its article. That's the only reliable way. Some endings help: -ung, -heit, -keit and -ion are always die. -chen and -lein are always das.\n\nThe indefinite article is ein for der and das words, eine for die words.\n\nAll nouns start with a capital letter, wherever they are in the sentence.\n\nPlurals: the article is always die. The noun changes in one of several ways: -e (Tische), -er often with an umlaut (Kinder, Bücher), -n or -en (Lampen, Frauen), -s (Autos), or no change (Zimmer). Learn the plural with the noun.",
  comparisonRows: [
    {
      english: "the table",
      german: "der Tisch",
      note: "masculine",
    },
    {
      english: "the lamp",
      german: "die Lampe",
      note: "feminine",
    },
    {
      english: "the girl",
      german: "das Mädchen",
      note: "-chen is always neuter.",
    },
    {
      english: "a book",
      german: "ein Buch",
      note: "ein for der and das words",
    },
    {
      english: "the books",
      german: "die Bücher",
      note: "The plural article is always die.",
    },
  ],
  helps: [
    "Some plurals add -s like English: Autos, Handys, Hotels.",
    "Many nouns look like English: das Haus (house), das Buch (book), der Apfel (apple).",
  ],
  misleads: [
    "German nouns are always capitalized, not just names.",
    "Gender is grammatical: das Mädchen (girl) is neuter.",
    "Plural die is not feminine die: die Tische is plural.",
  ],
  hindiHint:
    "Hindi also gives every noun a gender (लड़का is masculine, किताब is feminine), but only two. German has three, and they rarely match the Hindi gender. Learn der/die/das fresh with each word.",
  tables: [
    {
      kind: "articles",
      title: "Articles",
      rows: [
        {
          label: "definite (the)",
          cells: ["der", "die", "das", "die"],
        },
        {
          label: "indefinite (a)",
          cells: ["ein", "eine", "ein", "–"],
        },
      ],
    },
    {
      kind: "generic",
      title: "Plural patterns",
      headers: ["Plural ending", "Singular", "Plural"],
      rows: [
        ["-e", "der Tisch", "die Tische"],
        ["-er (often + umlaut)", "das Kind / das Buch", "die Kinder / die Bücher"],
        ["-n / -en", "die Lampe / die Frau", "die Lampen / die Frauen"],
        ["-s", "das Auto", "die Autos"],
        ["no change", "das Zimmer", "die Zimmer"],
      ],
    },
  ],
  examples: [
    {
      de: "Das ist ein Tisch.",
      en: "That's a table.",
    },
    {
      de: "Die Lampe ist neu.",
      en: "The lamp is new.",
    },
    {
      de: "Das Mädchen heißt Mia.",
      en: "The girl is called Mia.",
    },
    {
      de: "Die Kinder spielen im Garten.",
      en: "The children are playing in the garden.",
    },
    {
      de: "Ich brauche eine Tasche.",
      en: "I need a bag.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich habe ein auto.",
      right: "Ich habe ein Auto.",
      why: "All German nouns start with a capital letter.",
    },
    {
      wrong: "Der Mädchen ist nett.",
      right: "Das Mädchen ist nett.",
      why: "Words ending in -chen are always das.",
    },
    {
      wrong: "Ich kaufe zwei Tischs.",
      right: "Ich kaufe zwei Tische.",
      why: "Most der-words add -e in the plural, not -s.",
    },
    {
      wrong: "Das ist eine Buch.",
      right: "Das ist ein Buch.",
      why: "das-words take ein.",
    },
  ],
  exercises: [
    {
      id: "noun-pick",
      type: "articlePick",
      skill: "articles",
      prompt: "Pick der, die or das.",
      nouns: [
        {
          noun: "Tisch",
          article: "der",
          en: "table",
        },
        {
          noun: "Lampe",
          article: "die",
          en: "lamp",
        },
        {
          noun: "Mädchen",
          article: "das",
          en: "girl",
        },
        {
          noun: "Zeitung",
          article: "die",
          en: "newspaper",
        },
        {
          noun: "Buch",
          article: "das",
          en: "book",
        },
        {
          noun: "Stuhl",
          article: "der",
          en: "chair",
        },
      ],
    },
    {
      id: "noun-fill-eine",
      type: "fillBlank",
      skill: "articles",
      prompt: "Fill in ein or eine.",
      sentence: "Das ist ___ Lampe.",
      answers: [["eine"]],
      en: "That's a lamp.",
    },
    {
      id: "noun-tr-kinder",
      type: "translate",
      skill: "capitalization",
      prompt: "Translate.",
      en: "The children are playing.",
      answers: ["Die Kinder spielen."],
    },
    {
      id: "noun-mc-plural",
      type: "multipleChoice",
      skill: "articles",
      prompt: "What is the plural of das Buch?",
      question: "das Buch",
      options: ["die Buchs", "die Bücher", "die Buche"],
      answer: 1,
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
      de: "Mädchen",
      en: "girl",
      article: "das",
      plural: "Mädchen",
    },
    {
      de: "Buch",
      en: "book",
      article: "das",
      plural: "Bücher",
    },
    {
      de: "Stuhl",
      en: "chair",
      article: "der",
      plural: "Stühle",
    },
    {
      de: "Zeitung",
      en: "newspaper",
      article: "die",
      plural: "Zeitungen",
    },
    {
      de: "Frau",
      en: "woman",
      article: "die",
      plural: "Frauen",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
