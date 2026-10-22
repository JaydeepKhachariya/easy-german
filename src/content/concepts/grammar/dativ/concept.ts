import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "dativ",
  slug: "dativ",
  order: 250,
  unit: "Grammar",
  titleDe: "Der Dativ",
  titleEn: "Dativ: the indirect object",
  category: "grammar",
  minutes: 25,
  summary:
    "dem, der, dem, den. Pronouns mir, dir, ihm. helfen, danken and gefallen always take the Dativ.",
  englishExplanation:
    'English shows the receiver with "to" or with word order: "I give the book to my brother", "I give my brother the book". Pronouns change: me, him, her.',
  englishExamples: ["I give my brother the book.", "Can you help me?", "I like it."],
  germanExplanation:
    "German marks the receiver (the indirect object) with the Dativ. All genders change:\n\nder → dem, die → der, das → dem, plural die → den (and the plural noun adds -n if it can: den Kindern).\n\nein → einem, eine → einer, ein → einem.\n\nPronouns: mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen.\n\nSome verbs always take the Dativ, even though English uses a direct object: helfen (Ich helfe dir), danken (Ich danke Ihnen), gefallen (Das gefällt mir), gehören (Das gehört mir).\n\nEveryday phrases: Wie geht es dir? Mir ist kalt. Das gefällt mir.",
  comparisonRows: [
    {
      english: "I give my brother the book.",
      german: "Ich gebe meinem Bruder das Buch.",
      note: "Receiver: Dativ (meinem).",
    },
    {
      english: "I'm helping you.",
      german: "Ich helfe dir.",
      note: "helfen takes the Dativ.",
    },
    {
      english: "Thank you. (formal)",
      german: "Ich danke Ihnen.",
      note: "danken takes the Dativ.",
    },
    {
      english: "I like it.",
      german: "Das gefällt mir.",
      note: "Word for word: That pleases me.",
    },
    {
      english: "How are you?",
      german: "Wie geht es dir?",
      note: "Word for word: How goes it to you?",
    },
  ],
  helps: ['English "to me" and "to him" are the same idea as mir and ihm.', "ihm looks like him."],
  misleads: [
    "helfen takes mir/dir, not mich/dich: Kannst du mir helfen?",
    "die becomes der in the Dativ. That looks like masculine der, but it isn't.",
  ],
  hindiHint:
    'Hindi marks the receiver with को too: मैं भाई को किताब देता हूँ (main bhaai ko kitaab deta hoon). German uses the Dativ article instead: Ich gebe dem Bruder das Buch. And मुझे ठंड लग रही है (mujhe thand lag rahi hai) is like Mir ist kalt: the person is in the "to me" form.',
  tables: [
    {
      kind: "articles",
      title: "Articles in the Dativ",
      rows: [
        {
          label: "Dativ: the",
          cells: ["dem", "der", "dem", "den"],
        },
        {
          label: "Dativ: a",
          cells: ["einem", "einer", "einem", "–"],
        },
      ],
    },
    {
      kind: "generic",
      title: "Pronouns",
      headers: ["Nominativ", "Akkusativ", "Dativ"],
      rows: [
        ["ich", "mich", "mir"],
        ["du", "dich", "dir"],
        ["er", "ihn", "ihm"],
        ["sie", "sie", "ihr"],
        ["es", "es", "ihm"],
        ["wir", "uns", "uns"],
        ["ihr", "euch", "euch"],
        ["sie / Sie", "sie / Sie", "ihnen / Ihnen"],
      ],
    },
  ],
  examples: [
    {
      de: "Kannst du mir helfen?",
      en: "Can you help me?",
    },
    {
      de: "Ich gebe dem Kind einen Apfel.",
      en: "I'm giving the child an apple.",
    },
    {
      de: "Das Buch gehört meiner Schwester.",
      en: "The book belongs to my sister.",
    },
    {
      de: "Wie gefällt dir Berlin?",
      en: "How do you like Berlin?",
    },
    {
      de: "Mir ist kalt.",
      en: "I'm cold.",
      gloss: "To-me is cold",
    },
    {
      de: "Ich danke Ihnen für Ihre Hilfe.",
      en: "Thank you for your help.",
    },
  ],
  mistakes: [
    {
      wrong: "Kannst du mich helfen?",
      right: "Kannst du mir helfen?",
      why: "helfen takes the Dativ: mir.",
    },
    {
      wrong: "Ich gebe der Mann das Buch.",
      right: "Ich gebe dem Mann das Buch.",
      why: "Receiver, masculine: dem.",
    },
    {
      wrong: "Ich bin kalt.",
      right: "Mir ist kalt.",
      why: 'For feeling cold, German says "to me it is cold".',
    },
  ],
  exercises: [
    {
      id: "dat-fill-mir",
      type: "fillBlank",
      skill: "cases",
      prompt: 'Fill in "me".',
      sentence: "Kannst du ___ helfen?",
      answers: [["mir"]],
      en: "Can you help me?",
    },
    {
      id: "dat-mc-der",
      type: "multipleChoice",
      skill: "cases",
      prompt: "Pick the article.",
      question: "Ich danke ___ Lehrerin.",
      options: ["die", "der", "dem"],
      answer: 1,
    },
    {
      id: "dat-fill-meinem",
      type: "fillBlank",
      skill: "cases",
      prompt: 'Fill in "my".',
      sentence: "Das Auto gehört ___ Vater.",
      answers: [["meinem"]],
      en: "The car belongs to my father.",
    },
    {
      id: "dat-tr-howareyou",
      type: "translate",
      skill: "cases",
      prompt: "Translate. Use du.",
      en: "How are you?",
      answers: ["Wie geht es dir?", "Wie geht's dir?", "Wie geht's?"],
    },
  ],
  vocab: [
    {
      de: "helfen",
      en: "to help (+ Dativ)",
    },
    {
      de: "danken",
      en: "to thank (+ Dativ)",
    },
    {
      de: "gefallen",
      en: "to please, to be liked (+ Dativ)",
    },
    {
      de: "gehören",
      en: "to belong to (+ Dativ)",
    },
    {
      de: "geben",
      en: "to give",
    },
    {
      de: "Apfel",
      en: "apple",
      article: "der",
      plural: "Äpfel",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
