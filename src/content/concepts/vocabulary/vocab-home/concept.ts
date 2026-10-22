import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-home",
  slug: "vocab-home",
  order: 420,
  titleDe: "Wohnen und Möbel",
  titleEn: "Home and furniture",
  minutes: 15,
  summary: "Rooms, furniture and how to describe a flat. Zimmer is any room, and Möbel is plural.",
  englishExplanation:
    'English: flat or apartment, room, kitchen, bathroom, table, chair, bed. "Furniture" can\'t be counted.',
  englishExamples: ["My flat has two rooms.", "The kitchen is small.", "I need a new bed."],
  germanExplanation:
    "Rooms: die Küche, das Bad, das Schlafzimmer, das Wohnzimmer, der Flur. Furniture: der Tisch, der Stuhl, das Bett, der Schrank, das Sofa, die Lampe, das Regal.\n\ndie Wohnung is a flat, das Haus a house. die Möbel (furniture) is plural.\n\nDescribing a flat, as in ads and in the exam: Die Wohnung hat drei Zimmer. Die Küche ist klein, aber hell. Die Miete ist 800 Euro warm (warm = heating included).\n\nWhere things are: Das Sofa steht im Wohnzimmer. Learn these as phrases for now.",
  comparisonRows: [
    {
      english: "a three-room flat",
      german: "eine Dreizimmerwohnung",
      note: "One long word.",
    },
    {
      english: "The kitchen is small.",
      german: "Die Küche ist klein.",
      note: "",
    },
    {
      english: "The rent is 800 euros.",
      german: "Die Miete ist 800 Euro.",
      note: "Miete = rent",
    },
    {
      english: "furniture",
      german: "die Möbel",
      note: "Plural in German.",
    },
  ],
  helps: [
    "Sofa, Lampe, Bett/bed and Haus/house are easy.",
    "Compound words are built from parts: Schlaf (sleep) + Zimmer (room) = bedroom.",
  ],
  misleads: [
    "das Zimmer is any room. das Bad is the bathroom.",
    "Möbel is plural: Die Möbel sind neu.",
  ],
  examples: [
    {
      de: "Meine Wohnung hat zwei Zimmer.",
      en: "My flat has two rooms.",
    },
    {
      de: "Das Bad ist klein, aber modern.",
      en: "The bathroom is small but modern.",
    },
    {
      de: "Im Wohnzimmer steht ein Sofa.",
      en: "There's a sofa in the living room.",
    },
    {
      de: "Ich brauche einen Schrank.",
      en: "I need a wardrobe.",
    },
    {
      de: "Die Miete ist 650 Euro warm.",
      en: "The rent is 650 euros including heating.",
    },
  ],
  mistakes: [
    {
      wrong: "Die Möbel ist neu.",
      right: "Die Möbel sind neu.",
      why: "Möbel is plural.",
    },
    {
      wrong: "Ich brauche ein Schrank.",
      right: "Ich brauche einen Schrank.",
      why: "der Schrank becomes einen Schrank as an object.",
    },
    {
      wrong: "Die Wohnung hat drei Raum.",
      right: "Die Wohnung hat drei Zimmer.",
      why: "Use Zimmer for the rooms of a flat. The plural is also Zimmer.",
    },
  ],
  exercises: [
    {
      id: "home-pick",
      type: "articlePick",
      skill: "articles",
      prompt: "Pick der, die or das.",
      nouns: [
        {
          noun: "Küche",
          article: "die",
          en: "kitchen",
        },
        {
          noun: "Bad",
          article: "das",
          en: "bathroom",
        },
        {
          noun: "Schrank",
          article: "der",
          en: "wardrobe",
        },
        {
          noun: "Bett",
          article: "das",
          en: "bed",
        },
        {
          noun: "Sofa",
          article: "das",
          en: "sofa",
        },
        {
          noun: "Stuhl",
          article: "der",
          en: "chair",
        },
      ],
    },
    {
      id: "home-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the words.",
      pairs: [
        {
          left: "Küche",
          right: "kitchen",
        },
        {
          left: "Schlafzimmer",
          right: "bedroom",
        },
        {
          left: "Wohnzimmer",
          right: "living room",
        },
        {
          left: "Miete",
          right: "rent",
        },
        {
          left: "Flur",
          right: "hallway",
        },
      ],
    },
    {
      id: "home-fill-wohnzimmer",
      type: "fillBlank",
      skill: "vocabulary",
      prompt: "Fill in the room.",
      sentence: "Das Sofa steht im ___.",
      answers: [["Wohnzimmer"]],
      en: "The sofa is in the living room.",
    },
  ],
  vocab: [
    {
      de: "Wohnung",
      en: "flat, apartment",
      article: "die",
      plural: "Wohnungen",
    },
    {
      de: "Küche",
      en: "kitchen",
      article: "die",
      plural: "Küchen",
    },
    {
      de: "Bad",
      en: "bathroom",
      article: "das",
      plural: "Bäder",
    },
    {
      de: "Schlafzimmer",
      en: "bedroom",
      article: "das",
      plural: "Schlafzimmer",
    },
    {
      de: "Wohnzimmer",
      en: "living room",
      article: "das",
      plural: "Wohnzimmer",
    },
    {
      de: "Schrank",
      en: "wardrobe, cupboard",
      article: "der",
      plural: "Schränke",
    },
    {
      de: "Bett",
      en: "bed",
      article: "das",
      plural: "Betten",
    },
    {
      de: "Miete",
      en: "rent",
      article: "die",
      plural: "Mieten",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
