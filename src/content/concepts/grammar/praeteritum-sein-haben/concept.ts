import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "praeteritum-sein-haben",
  slug: "praeteritum-sein-haben",
  order: 230,
  unit: "Grammar",
  titleDe: "Präteritum: war und hatte",
  titleEn: "Past of sein and haben: war, hatte",
  category: "grammar",
  minutes: 15,
  summary:
    "Ich war krank. Wir hatten keine Zeit. For these two verbs, everyday German uses the simple past.",
  englishExplanation: 'English says "I was" and "I had" for the past of be and have.',
  englishExamples: ["I was ill yesterday.", "We had no time.", "Where were you?"],
  germanExplanation:
    'For sein and haben, everyday German uses the simple past (Präteritum), not the Perfekt.\n\nwar: ich war, du warst, er/sie/es war, wir waren, ihr wart, sie/Sie waren.\n\nhatte: ich hatte, du hattest, er/sie/es hatte, wir hatten, ihr hattet, sie/Sie hatten.\n\nich and er/sie/es have the same form, with no ending.\n\nSo: Ich war gestern krank. Wir hatten keine Zeit. Wo warst du? This sounds more natural than "Ich bin krank gewesen".',
  comparisonRows: [
    {
      english: "I was ill.",
      german: "Ich war krank.",
      note: "war = was",
    },
    {
      english: "We had no time.",
      german: "Wir hatten keine Zeit.",
      note: "hatten = had",
    },
    {
      english: "Where were you?",
      german: "Wo warst du?",
      note: "du adds -st",
    },
    {
      english: "She had a cold.",
      german: "Sie hatte eine Erkältung.",
      note: "No ending for er/sie/es.",
    },
  ],
  helps: [
    "war sounds like was. hatte sounds like had.",
    "As in English, the past of these verbs is one word.",
  ],
  misleads: [
    "In conversation, say Ich war, not usually Ich bin gewesen.",
    "ihr wart (you were) has no -e.",
  ],
  tables: [
    {
      kind: "conjugation",
      title: "Simple past",
      verbs: [
        {
          infinitive: "sein → war",
          forms: ["war", "warst", "war", "waren", "wart", "waren"],
          english: "was, were",
        },
        {
          infinitive: "haben → hatte",
          forms: ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"],
          english: "had",
        },
      ],
    },
  ],
  examples: [
    {
      de: "Gestern war ich müde.",
      en: "Yesterday I was tired.",
    },
    {
      de: "Wir waren letzte Woche in München.",
      en: "We were in Munich last week.",
    },
    {
      de: "Hattest du Zeit?",
      en: "Did you have time?",
    },
    {
      de: "Das Wetter war schön.",
      en: "The weather was nice.",
    },
    {
      de: "Ich hatte keinen Hunger.",
      en: "I wasn't hungry.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich warte krank.",
      right: "Ich war krank.",
      why: "warten means to wait. The past of sein is war.",
    },
    {
      wrong: "Er hattet keine Zeit.",
      right: "Er hatte keine Zeit.",
      why: "er/sie/es: hatte, with no ending.",
    },
    {
      wrong: "Wir war in Berlin.",
      right: "Wir waren in Berlin.",
      why: "wir: waren.",
    },
  ],
  exercises: [
    {
      id: "praet-conj-war",
      type: "conjugationTable",
      skill: "conjugation",
      prompt: "Fill in the past of sein.",
      verb: "sein (Präteritum)",
      answers: ["war", "warst", "war", "waren", "wart", "waren"],
      given: [0],
      english: "was, were",
    },
    {
      id: "praet-fill-hatte",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Fill in the past of haben.",
      sentence: "Gestern ___ ich keine Zeit.",
      answers: [["hatte"]],
      en: "Yesterday I had no time.",
    },
    {
      id: "praet-tr-where",
      type: "translate",
      skill: "conjugation",
      prompt: "Translate.",
      en: "Where were you?",
      answers: ["Wo warst du?", "Wo waren Sie?", "Wo wart ihr?"],
    },
  ],
  vocab: [
    {
      de: "gestern",
      en: "yesterday",
    },
    {
      de: "letzte Woche",
      en: "last week",
    },
    {
      de: "Erkältung",
      en: "cold (illness)",
      article: "die",
      plural: "Erkältungen",
    },
    {
      de: "Wetter",
      en: "weather",
      article: "das",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
