import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "akkusativ-prepositions",
  slug: "akkusativ-prepositions",
  order: 290,
  unit: "Grammar",
  titleDe: "Präpositionen mit Akkusativ",
  titleEn: "Prepositions with Akkusativ",
  category: "grammar",
  minutes: 20,
  summary: "durch, für, gegen, ohne, um take the Akkusativ: für mich, ohne den Hund.",
  englishExplanation:
    "English: for you, through the park, without sugar. The words after a preposition don't change, except pronouns (for him, without me).",
  englishExamples: [
    "This is for you.",
    "We walk through the park.",
    "Coffee without sugar, please.",
  ],
  germanExplanation:
    "These prepositions always take the Akkusativ: durch (through), für (for), gegen (against, around a time), ohne (without), um (around, at a clock time).\n\nOnly masculine nouns show it: für den Vater, ohne einen Schirm. Pronouns too: für mich, ohne dich, für ihn.\n\nEveryday uses: für mich (for me), ohne Zucker (without sugar), um acht Uhr (at eight), durch die Stadt (through the city), gegen zehn Uhr (around ten).",
  comparisonRows: [
    {
      english: "for my brother",
      german: "für meinen Bruder",
      note: "masculine: -en",
    },
    {
      english: "without milk",
      german: "ohne Milch",
      note: "No article needed.",
    },
    {
      english: "for me",
      german: "für mich",
      note: "Pronoun in the Akkusativ.",
    },
    {
      english: "at eight o'clock",
      german: "um acht Uhr",
      note: "um for clock times",
    },
    {
      english: "through the park",
      german: "durch den Park",
      note: "der → den",
    },
  ],
  helps: [
    'für looks and works like "for".',
    '"for me" and für mich: English also uses the object pronoun here.',
  ],
  misleads: [
    "um has two jobs: um acht Uhr (at eight) and um den Tisch (around the table).",
    "Don't use the Dativ after these: für mich, not für mir.",
  ],
  examples: [
    {
      de: "Das Geschenk ist für dich.",
      en: "The present is for you.",
    },
    {
      de: "Ich trinke Kaffee ohne Zucker.",
      en: "I drink coffee without sugar.",
    },
    {
      de: "Wir gehen durch den Park.",
      en: "We walk through the park.",
    },
    {
      de: "Der Kurs beginnt um neun Uhr.",
      en: "The course starts at nine.",
    },
    {
      de: "Ich komme gegen sieben.",
      en: "I'll come around seven.",
    },
  ],
  mistakes: [
    {
      wrong: "Das ist für mir.",
      right: "Das ist für mich.",
      why: "für takes the Akkusativ: mich.",
    },
    {
      wrong: "Ich gehe ohne der Hund.",
      right: "Ich gehe ohne den Hund.",
      why: "ohne + Akkusativ: den Hund.",
    },
    {
      wrong: "Wir gehen durch dem Park.",
      right: "Wir gehen durch den Park.",
      why: "durch + Akkusativ.",
    },
  ],
  exercises: [
    {
      id: "aprep-fill-dich",
      type: "fillBlank",
      skill: "cases",
      prompt: "Use the right form of du.",
      sentence: "Das Geschenk ist für ___.",
      answers: [["dich"]],
      en: "The present is for you.",
    },
    {
      id: "aprep-mc-meinen",
      type: "multipleChoice",
      skill: "cases",
      prompt: "Pick the right form. der Freund = the friend.",
      question: "Ich kaufe Blumen für ___ Freund.",
      options: ["mein", "meinen", "meinem"],
      answer: 1,
    },
    {
      id: "aprep-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the prepositions.",
      pairs: [
        {
          left: "für",
          right: "for",
        },
        {
          left: "ohne",
          right: "without",
        },
        {
          left: "durch",
          right: "through",
        },
        {
          left: "gegen",
          right: "against",
        },
        {
          left: "um",
          right: "around, at",
        },
      ],
    },
    {
      id: "aprep-tr-milk",
      type: "translate",
      skill: "cases",
      prompt: "Translate.",
      en: "Coffee without milk, please.",
      answers: [
        "Kaffee ohne Milch, bitte.",
        "Einen Kaffee ohne Milch, bitte.",
        "Bitte einen Kaffee ohne Milch.",
      ],
    },
  ],
  vocab: [
    {
      de: "Geschenk",
      en: "present, gift",
      article: "das",
      plural: "Geschenke",
    },
    {
      de: "Zucker",
      en: "sugar",
      article: "der",
    },
    {
      de: "Milch",
      en: "milk",
      article: "die",
    },
    {
      de: "Park",
      en: "park",
      article: "der",
      plural: "Parks",
    },
    {
      de: "Blume",
      en: "flower",
      article: "die",
      plural: "Blumen",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
