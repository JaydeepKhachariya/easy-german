import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "akkusativ",
  slug: "akkusativ",
  order: 210,
  unit: "Grammar",
  titleDe: "Der Akkusativ",
  titleEn: "Akkusativ: the direct object",
  category: "grammar",
  minutes: 25,
  summary: "Only der changes: den, einen, keinen. Pronouns: mich, dich, ihn, uns, euch.",
  englishExplanation:
    'English shows the object by word order: "The dog sees the man" or "The man sees the dog". Only pronouns change: he → him, she → her, I → me.',
  englishExamples: ["I see the man.", "The man sees me.", "Do you know him?"],
  germanExplanation:
    "German marks the direct object (the person or thing the action is done to) with the Akkusativ.\n\nThe good news: only masculine (der) words change. der → den, ein → einen, kein → keinen. die, das and the plural stay the same. Ich sehe den Mann. Ich habe einen Bruder. Ich trinke keinen Kaffee.\n\nPronouns change too: ich → mich, du → dich, er → ihn, wir → uns, ihr → euch. sie, es and Sie stay the same.\n\nMany common verbs take an Akkusativ object: haben, sehen, kaufen, brauchen, besuchen, essen, trinken, möchten, es gibt.\n\nBecause the article shows who does what, German word order can be freer: Den Mann sieht der Hund. (The dog sees the man.)",
  comparisonRows: [
    {
      english: "I see the man.",
      german: "Ich sehe den Mann.",
      note: "der → den",
    },
    {
      english: "I have a brother.",
      german: "Ich habe einen Bruder.",
      note: "ein → einen",
    },
    {
      english: "I need a lamp.",
      german: "Ich brauche eine Lampe.",
      note: "die-words don't change.",
    },
    {
      english: "I see him.",
      german: "Ich sehe ihn.",
      note: "er → ihn, like he → him.",
    },
    {
      english: "Do you know me?",
      german: "Kennst du mich?",
      note: "ich → mich",
    },
  ],
  helps: [
    "English pronouns already do this: he → him, I → me. German does it with der → den as well.",
    "Only one gender changes. die and das look the same as in the Nominativ.",
  ],
  misleads: [
    "Word order doesn't tell you the object. Look at the article: den Hund is always the object.",
    "sein never takes the Akkusativ: Das ist der Mann, not den Mann.",
  ],
  hindiHint:
    "Hindi marks objects with को: मैं उस आदमी को देखता हूँ (main us aadmi ko dekhta hoon). German marks them with the article instead: Ich sehe den Mann.",
  tables: [
    {
      kind: "articles",
      title: "Articles in the Akkusativ",
      rows: [
        {
          label: "Nominativ: the",
          cells: ["der", "die", "das", "die"],
        },
        {
          label: "Akkusativ: the",
          cells: ["den", "die", "das", "die"],
        },
        {
          label: "Akkusativ: a",
          cells: ["einen", "eine", "ein", "–"],
        },
        {
          label: "Akkusativ: no",
          cells: ["keinen", "keine", "kein", "keine"],
        },
      ],
    },
    {
      kind: "generic",
      title: "Pronouns",
      headers: ["Nominativ", "Akkusativ", "English"],
      rows: [
        ["ich", "mich", "me"],
        ["du", "dich", "you"],
        ["er", "ihn", "him"],
        ["sie", "sie", "her"],
        ["es", "es", "it"],
        ["wir", "uns", "us"],
        ["ihr", "euch", "you (all)"],
        ["sie / Sie", "sie / Sie", "them / you"],
      ],
    },
  ],
  examples: [
    {
      de: "Ich kaufe einen Tisch.",
      en: "I'm buying a table.",
    },
    {
      de: "Hast du einen Bruder?",
      en: "Do you have a brother?",
    },
    {
      de: "Ich sehe den Bus.",
      en: "I can see the bus.",
    },
    {
      de: "Ich brauche keinen Computer.",
      en: "I don't need a computer.",
    },
    {
      de: "Kennst du ihn?",
      en: "Do you know him?",
    },
    {
      de: "Ich liebe dich.",
      en: "I love you.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich habe ein Bruder.",
      right: "Ich habe einen Bruder.",
      why: "Bruder is a der-word. As an object, ein becomes einen.",
    },
    {
      wrong: "Ich sehe der Mann.",
      right: "Ich sehe den Mann.",
      why: "Direct object: der → den.",
    },
    {
      wrong: "Kennst du er?",
      right: "Kennst du ihn?",
      why: "er becomes ihn as an object.",
    },
  ],
  exercises: [
    {
      id: "akk-fill-einen",
      type: "fillBlank",
      skill: "cases",
      prompt: 'Fill in the article for "a".',
      sentence: "Ich kaufe ___ Computer.",
      answers: [["einen"]],
      en: "I'm buying a computer.",
    },
    {
      id: "akk-mc-frau",
      type: "multipleChoice",
      skill: "cases",
      prompt: "Pick the article.",
      question: "Ich sehe ___ Frau.",
      options: ["den", "die", "der"],
      answer: 1,
    },
    {
      id: "akk-fill-ihn",
      type: "fillBlank",
      skill: "cases",
      prompt: "Use the object form of er.",
      sentence: "Kennst du ___?",
      answers: [["ihn"]],
      en: "Do you know him?",
    },
    {
      id: "akk-tr-pen",
      type: "translate",
      skill: "cases",
      prompt: "Translate. der Stift = the pen.",
      en: "I need a pen.",
      answers: ["Ich brauche einen Stift."],
    },
  ],
  vocab: [
    {
      de: "Bruder",
      en: "brother",
      article: "der",
      plural: "Brüder",
    },
    {
      de: "Computer",
      en: "computer",
      article: "der",
      plural: "Computer",
    },
    {
      de: "Stift",
      en: "pen",
      article: "der",
      plural: "Stifte",
    },
    {
      de: "brauchen",
      en: "to need",
    },
    {
      de: "kaufen",
      en: "to buy",
    },
    {
      de: "kennen",
      en: "to know (a person, a place)",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
