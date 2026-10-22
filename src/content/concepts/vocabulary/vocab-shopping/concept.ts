import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-shopping",
  slug: "vocab-shopping",
  order: 460,
  titleDe: "Einkaufen",
  titleEn: "Shopping",
  minutes: 15,
  summary: "Was kostet das? Ein Kilo Äpfel. Kann ich mit Karte zahlen?",
  englishExplanation:
    "English: How much is it? Do you have this in size M? I'll take it. Can I pay by card?",
  englishExamples: ["How much is it?", "A kilo of apples, please.", "Can I pay by card?"],
  germanExplanation:
    'Prices: Was kostet das? or Wie viel kostet der Pullover? Answer: Er kostet 30 Euro. Plural: Die Schuhe kosten 80 Euro.\n\nQuantities at the market: ein Kilo Tomaten, 200 Gramm Käse, eine Flasche Wasser, eine Packung Milch. There\'s no "of": ein Kilo Äpfel.\n\nIn shops: Kann ich Ihnen helfen? – Ich suche eine Jacke. Haben Sie die Hose auch in Größe M? Ich nehme sie. Kann ich mit Karte zahlen?\n\nOpening times: Der Laden ist von 9 bis 20 Uhr geöffnet. On Sundays most shops are closed (geschlossen).',
  comparisonRows: [
    {
      english: "How much is it?",
      german: "Was kostet das?",
      note: "Word for word: What costs that?",
    },
    {
      english: "a kilo of apples",
      german: "ein Kilo Äpfel",
      note: 'No "of".',
    },
    {
      english: "I'll take it.",
      german: "Ich nehme ihn / sie / es.",
      note: '"It" matches the noun\'s gender.',
    },
    {
      english: "Can I pay by card?",
      german: "Kann ich mit Karte zahlen?",
      note: "bar = in cash",
    },
  ],
  helps: ["Kilo, Gramm, Liter, Euro and Supermarkt are the same.", "kosten looks like cost."],
  misleads: [
    'No "of" after quantities: eine Flasche Wasser.',
    'Ich nehme ihn: "it" for der Pullover is ihn, not es.',
  ],
  examples: [
    {
      de: "Was kostet ein Kilo Tomaten?",
      en: "How much is a kilo of tomatoes?",
    },
    {
      de: "Ich suche eine Jacke in Größe M.",
      en: "I'm looking for a jacket in size M.",
    },
    {
      de: "Die Schuhe sind zu teuer.",
      en: "The shoes are too expensive.",
    },
    {
      de: "Ich nehme zwei Flaschen Wasser.",
      en: "I'll take two bottles of water.",
    },
    {
      de: "Kann ich bar zahlen?",
      en: "Can I pay in cash?",
    },
  ],
  mistakes: [
    {
      wrong: "Ein Kilo von Äpfeln, bitte.",
      right: "Ein Kilo Äpfel, bitte.",
      why: "No von after quantities.",
    },
    {
      wrong: "Was kosten das?",
      right: "Was kostet das?",
      why: "das is singular: kostet.",
    },
    {
      wrong: "Der Pullover ist schön. Ich nehme es.",
      right: "Der Pullover ist schön. Ich nehme ihn.",
      why: "der Pullover → ihn.",
    },
  ],
  exercises: [
    {
      id: "shop-fill-kosten",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Write the right form of kosten.",
      sentence: "Die Schuhe ___ 50 Euro.",
      answers: [["kosten"]],
      en: "The shoes cost 50 euros.",
    },
    {
      id: "shop-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the words.",
      pairs: [
        {
          left: "Flasche",
          right: "bottle",
        },
        {
          left: "Packung",
          right: "packet",
        },
        {
          left: "Größe",
          right: "size",
        },
        {
          left: "bar",
          right: "in cash",
        },
        {
          left: "geschlossen",
          right: "closed",
        },
      ],
    },
    {
      id: "shop-tr-cost",
      type: "translate",
      skill: "vocabulary",
      prompt: "Translate.",
      en: "How much does it cost?",
      answers: ["Was kostet das?", "Wie viel kostet das?"],
    },
  ],
  vocab: [
    {
      de: "kosten",
      en: "to cost",
    },
    {
      de: "zahlen",
      en: "to pay",
    },
    {
      de: "Flasche",
      en: "bottle",
      article: "die",
      plural: "Flaschen",
    },
    {
      de: "Größe",
      en: "size",
      article: "die",
      plural: "Größen",
    },
    {
      de: "Jacke",
      en: "jacket",
      article: "die",
      plural: "Jacken",
    },
    {
      de: "Schuh",
      en: "shoe",
      article: "der",
      plural: "Schuhe",
    },
    {
      de: "geöffnet",
      en: "open",
    },
    {
      de: "geschlossen",
      en: "closed",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
