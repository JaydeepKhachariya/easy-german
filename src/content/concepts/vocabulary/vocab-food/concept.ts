import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-food",
  slug: "vocab-food",
  order: 410,
  titleDe: "Essen und Trinken",
  titleEn: "Food and drink",
  minutes: 15,
  summary: "Ordering, meals and the words you need in a supermarket or café.",
  englishExplanation:
    'English food words: bread, cheese, milk, apple, rice, vegetables. In a café you say "I\'d like..." or "Can I have...".',
  englishExamples: ["I'd like a coffee, please.", "Can I have the bill?", "I don't eat meat."],
  germanExplanation:
    "Many food words are close to English or borrowed: der Tee, der Kaffee, die Milch, das Brot, die Butter, der Reis, die Banane, die Tomate.\n\nOrdering: Ich möchte einen Tee, bitte. Ich nehme die Suppe. Die Rechnung, bitte (the bill). The waiter may ask: Zusammen oder getrennt? (together or separately?)\n\nMeals: das Frühstück (breakfast), das Mittagessen (lunch), das Abendessen (dinner). Verbs: essen (er isst), trinken, frühstücken, kochen.\n\nThings you can't count often have no article: Ich trinke Milch. Ich esse kein Fleisch.",
  comparisonRows: [
    {
      english: "I'd like a coffee.",
      german: "Ich möchte einen Kaffee.",
      note: "der Kaffee → einen",
    },
    {
      english: "The bill, please.",
      german: "Die Rechnung, bitte.",
      note: "",
    },
    {
      english: "I don't eat meat.",
      german: "Ich esse kein Fleisch.",
      note: "kein when there's no article",
    },
    {
      english: "breakfast",
      german: "das Frühstück",
      note: "frühstücken = to have breakfast",
    },
  ],
  helps: [
    "Brot/bread, Butter, Milch/milk, Apfel/apple, Salz/salt, Wasser/water are easy to guess.",
    "Café phrases are short and fixed. Learn them as blocks.",
  ],
  misleads: [
    'Essen is both "to eat" and "food": Das Essen ist gut.',
    "Chips are crisps. Fries are Pommes.",
  ],
  examples: [
    {
      de: "Ich möchte einen Kaffee mit Milch, bitte.",
      en: "I'd like a coffee with milk, please.",
    },
    {
      de: "Zum Frühstück esse ich Brot mit Käse.",
      en: "For breakfast I eat bread with cheese.",
    },
    {
      de: "Ich esse kein Fleisch. Ich bin Vegetarier.",
      en: "I don't eat meat. I'm vegetarian.",
    },
    {
      de: "Die Rechnung, bitte!",
      en: "The bill, please!",
    },
    {
      de: "Wir kochen heute Reis mit Gemüse.",
      en: "We're cooking rice with vegetables today.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich möchte ein Kaffee.",
      right: "Ich möchte einen Kaffee.",
      why: "der Kaffee as an object: einen.",
    },
    {
      wrong: "Ich esse nicht Fleisch.",
      right: "Ich esse kein Fleisch.",
      why: "Noun without an article: kein.",
    },
    {
      wrong: "Das essen ist lecker.",
      right: "Das Essen ist lecker.",
      why: "das Essen (food) is a noun, so it has a capital E.",
    },
  ],
  exercises: [
    {
      id: "food-pick",
      type: "articlePick",
      skill: "articles",
      prompt: "Pick der, die or das.",
      nouns: [
        {
          noun: "Kaffee",
          article: "der",
          en: "coffee",
        },
        {
          noun: "Milch",
          article: "die",
          en: "milk",
        },
        {
          noun: "Brot",
          article: "das",
          en: "bread",
        },
        {
          noun: "Apfel",
          article: "der",
          en: "apple",
        },
        {
          noun: "Suppe",
          article: "die",
          en: "soup",
        },
        {
          noun: "Wasser",
          article: "das",
          en: "water",
        },
      ],
    },
    {
      id: "food-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the words.",
      pairs: [
        {
          left: "Frühstück",
          right: "breakfast",
        },
        {
          left: "Mittagessen",
          right: "lunch",
        },
        {
          left: "Abendessen",
          right: "dinner",
        },
        {
          left: "Rechnung",
          right: "bill",
        },
        {
          left: "Gemüse",
          right: "vegetables",
        },
      ],
    },
    {
      id: "food-tr-tea",
      type: "translate",
      skill: "cases",
      prompt: "Translate.",
      en: "I'd like a tea, please.",
      answers: [
        "Ich möchte einen Tee, bitte.",
        "Einen Tee, bitte.",
        "Ich hätte gern einen Tee, bitte.",
        "Ich hätte gern einen Tee.",
      ],
    },
  ],
  vocab: [
    {
      de: "Kaffee",
      en: "coffee",
      article: "der",
    },
    {
      de: "Tee",
      en: "tea",
      article: "der",
    },
    {
      de: "Milch",
      en: "milk",
      article: "die",
    },
    {
      de: "Brot",
      en: "bread",
      article: "das",
      plural: "Brote",
    },
    {
      de: "Käse",
      en: "cheese",
      article: "der",
    },
    {
      de: "Fleisch",
      en: "meat",
      article: "das",
    },
    {
      de: "Gemüse",
      en: "vegetables",
      article: "das",
    },
    {
      de: "Reis",
      en: "rice",
      article: "der",
    },
    {
      de: "Rechnung",
      en: "bill",
      article: "die",
      plural: "Rechnungen",
    },
    {
      de: "Frühstück",
      en: "breakfast",
      article: "das",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
