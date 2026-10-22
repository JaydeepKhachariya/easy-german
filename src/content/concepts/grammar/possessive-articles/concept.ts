import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "possessive-articles",
  slug: "possessive-articles",
  order: 220,
  unit: "Grammar",
  titleDe: "Possessivartikel",
  titleEn: "My, your, his: possessive articles",
  category: "grammar",
  minutes: 20,
  summary: "mein, dein, sein, ihr, unser, euer, ihr, Ihr. They take the same endings as ein.",
  englishExplanation: "English possessives never change: my brother, my sister, my books.",
  englishExamples: ["This is my brother.", "Is that your bag?", "Their flat is small."],
  germanExplanation:
    'The German possessives are: mein (my), dein (your, for du), sein (his, its), ihr (her), unser (our), euer (your, for ihr), ihr (their), Ihr (your, formal).\n\nThey take the same endings as ein: mein Bruder, meine Schwester, mein Kind, and in the plural meine Kinder.\n\nIn the Akkusativ, masculine adds -en, like einen: Ich besuche meinen Bruder.\n\nihr has two meanings: her and their. With a capital, Ihr is the formal "your".',
  comparisonRows: [
    {
      english: "my brother",
      german: "mein Bruder",
      note: "der-word: no ending",
    },
    {
      english: "my sister",
      german: "meine Schwester",
      note: "die-word: -e",
    },
    {
      english: "my children",
      german: "meine Kinder",
      note: "plural: -e",
    },
    {
      english: "I visit my brother.",
      german: "Ich besuche meinen Bruder.",
      note: "Akkusativ: -en",
    },
    {
      english: "her car / their car",
      german: "ihr Auto",
      note: "Same word for her and their.",
    },
  ],
  helps: [
    "mein/my, dein/thy, sein/his: the words are related.",
    "The endings are the ones you know from ein and eine.",
  ],
  misleads: [
    'sein means his, and it\'s also the verb "to be". The context makes it clear.',
    'ihr can mean her, their or "you all". With a capital, Ihr is formal your.',
  ],
  tables: [
    {
      kind: "articles",
      title: "mein and dein",
      rows: [
        {
          label: "mein (subject)",
          cells: ["mein", "meine", "mein", "meine"],
        },
        {
          label: "mein (object)",
          cells: ["meinen", "meine", "mein", "meine"],
        },
        {
          label: "dein (subject)",
          cells: ["dein", "deine", "dein", "deine"],
        },
      ],
    },
    {
      kind: "generic",
      title: "Who owns it?",
      headers: ["Person", "Possessive"],
      rows: [
        ["ich", "mein"],
        ["du", "dein"],
        ["er / es", "sein"],
        ["sie (she)", "ihr"],
        ["wir", "unser"],
        ["ihr", "euer"],
        ["sie (they)", "ihr"],
        ["Sie", "Ihr"],
      ],
    },
  ],
  examples: [
    {
      de: "Das ist meine Mutter.",
      en: "This is my mother.",
    },
    {
      de: "Wie heißt dein Vater?",
      en: "What's your father's name?",
    },
    {
      de: "Sein Auto ist neu.",
      en: "His car is new.",
    },
    {
      de: "Unsere Wohnung ist klein.",
      en: "Our flat is small.",
    },
    {
      de: "Ich besuche morgen meinen Onkel.",
      en: "I'm visiting my uncle tomorrow.",
    },
    {
      de: "Ist das Ihr Koffer?",
      en: "Is that your suitcase?",
    },
  ],
  mistakes: [
    {
      wrong: "Das ist mein Schwester.",
      right: "Das ist meine Schwester.",
      why: "Schwester is a die-word: meine.",
    },
    {
      wrong: "Ich besuche mein Bruder.",
      right: "Ich besuche meinen Bruder.",
      why: "Masculine object: meinen.",
    },
    {
      wrong: "Frau Schmidt, ist das dein Koffer?",
      right: "Frau Schmidt, ist das Ihr Koffer?",
      why: "With Sie, use Ihr.",
    },
  ],
  exercises: [
    {
      id: "poss-fill-meine",
      type: "fillBlank",
      skill: "articles",
      prompt: 'Fill in "my".',
      sentence: "Das ist ___ Schwester.",
      answers: [["meine"]],
      en: "This is my sister.",
    },
    {
      id: "poss-mc-ihr",
      type: "multipleChoice",
      skill: "articles",
      prompt: "Anna and her brother. Pick the word.",
      question: "Anna und ___ Bruder wohnen in Wien.",
      options: ["sein", "ihr", "ihre"],
      answer: 1,
    },
    {
      id: "poss-fill-meinen",
      type: "fillBlank",
      skill: "cases",
      prompt: 'Fill in "my".',
      sentence: "Ich rufe ___ Vater an.",
      answers: [["meinen"]],
      en: "I'm calling my father.",
    },
    {
      id: "poss-tr-flat",
      type: "translate",
      skill: "articles",
      prompt: "Translate.",
      en: "Our flat is small.",
      answers: ["Unsere Wohnung ist klein."],
    },
  ],
  vocab: [
    {
      de: "Mutter",
      en: "mother",
      article: "die",
      plural: "Mütter",
    },
    {
      de: "Vater",
      en: "father",
      article: "der",
      plural: "Väter",
    },
    {
      de: "Schwester",
      en: "sister",
      article: "die",
      plural: "Schwestern",
    },
    {
      de: "Onkel",
      en: "uncle",
      article: "der",
      plural: "Onkel",
    },
    {
      de: "Wohnung",
      en: "flat, apartment",
      article: "die",
      plural: "Wohnungen",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
