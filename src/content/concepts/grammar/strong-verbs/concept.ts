import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "strong-verbs",
  slug: "strong-verbs",
  order: 190,
  unit: "Grammar",
  titleDe: "Verben mit Vokalwechsel",
  titleEn: "Verbs with a vowel change",
  category: "grammar",
  minutes: 20,
  summary:
    "fahren → du fährst, sprechen → er spricht, sehen → du siehst. Only du and er/sie/es change.",
  englishExplanation:
    "Some English verbs change their vowel in the past: sing, sang; drive, drove. In the present they stay the same.",
  englishExamples: ["I drive, he drives.", "I see, she sees.", "I sing, I sang."],
  germanExplanation:
    "Some German verbs change their stem vowel in the present tense, but only for du and er/sie/es. ich, wir, ihr and sie/Sie keep the normal vowel.\n\nThere are three patterns:\n\n- a → ä: fahren → du fährst, er fährt; schlafen → du schläfst, er schläft\n- e → i: essen → du isst, er isst; sprechen → du sprichst, er spricht; also helfen, geben, nehmen (du nimmst, er nimmt)\n- e → ie: sehen → du siehst, er sieht; lesen → du liest, er liest\n\nDictionaries list these verbs with the er-form: fahren (fährt). Learn them that way.",
  comparisonRows: [
    {
      english: "I drive / he drives",
      german: "ich fahre / er fährt",
      note: "Only du and er/sie/es change.",
    },
    {
      english: "we eat / he eats",
      german: "wir essen / er isst",
      note: "e → i",
    },
    {
      english: "I see / you see",
      german: "ich sehe / du siehst",
      note: "e → ie",
    },
  ],
  helps: [
    "English has vowel changes too (drive, drove), so the idea isn't new.",
    "The endings stay regular: -st for du, -t for er.",
  ],
  misleads: [
    "The change never happens with ich or wir: ich fahre, wir essen.",
    "er isst (eats) and er ist (is) sound almost the same but are different words.",
  ],
  tables: [
    {
      kind: "conjugation",
      title: "Three patterns",
      verbs: [
        {
          infinitive: "fahren",
          forms: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
          english: "a → ä",
          highlight: [1, 2],
        },
        {
          infinitive: "sprechen",
          forms: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
          english: "e → i",
          highlight: [1, 2],
        },
        {
          infinitive: "sehen",
          forms: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
          english: "e → ie",
          highlight: [1, 2],
        },
      ],
    },
  ],
  examples: [
    {
      de: "Er fährt jeden Tag mit dem Fahrrad.",
      en: "He cycles every day.",
      gloss: "He goes every day with the bike",
    },
    {
      de: "Sprichst du Deutsch?",
      en: "Do you speak German?",
    },
    {
      de: "Sie liest gern Bücher.",
      en: "She likes reading books.",
    },
    {
      de: "Das Baby schläft.",
      en: "The baby is sleeping.",
    },
    {
      de: "Was isst du zum Frühstück?",
      en: "What do you eat for breakfast?",
    },
    {
      de: "Nimmst du den Bus?",
      en: "Are you taking the bus?",
    },
  ],
  mistakes: [
    {
      wrong: "Ich fähre nach Berlin.",
      right: "Ich fahre nach Berlin.",
      why: "ich never takes the vowel change.",
    },
    {
      wrong: "Wir sprichen Deutsch.",
      right: "Wir sprechen Deutsch.",
      why: "wir keeps the normal vowel.",
    },
    {
      wrong: "Er fahrt nach Hause.",
      right: "Er fährt nach Hause.",
      why: "er/sie/es takes the umlaut: fährt.",
    },
    {
      wrong: "Du lest viel.",
      right: "Du liest viel.",
      why: "lesen changes e → ie: du liest.",
    },
  ],
  exercises: [
    {
      id: "strong-conj-fahren",
      type: "conjugationTable",
      skill: "conjugation",
      prompt: "Fill in the forms of fahren.",
      verb: "fahren",
      answers: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
      given: [0, 3],
      english: "to drive, to go",
    },
    {
      id: "strong-fill-spricht",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Write the right form of sprechen.",
      sentence: "Er ___ gut Englisch.",
      answers: [["spricht"]],
      en: "He speaks English well.",
    },
    {
      id: "strong-fill-essen",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Write the right form of essen.",
      sentence: "Wir ___ heute Pizza.",
      answers: [["essen"]],
      en: "We're eating pizza today.",
    },
    {
      id: "strong-mc-liest",
      type: "multipleChoice",
      skill: "conjugation",
      prompt: "Pick the right form of lesen.",
      question: "Was ___ du?",
      options: ["lest", "liest", "lesst"],
      answer: 1,
    },
  ],
  vocab: [
    {
      de: "fahren",
      en: "to drive, to go (er fährt)",
    },
    {
      de: "essen",
      en: "to eat (er isst)",
    },
    {
      de: "sprechen",
      en: "to speak (er spricht)",
    },
    {
      de: "sehen",
      en: "to see (er sieht)",
    },
    {
      de: "lesen",
      en: "to read (er liest)",
    },
    {
      de: "schlafen",
      en: "to sleep (er schläft)",
    },
    {
      de: "nehmen",
      en: "to take (er nimmt)",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
