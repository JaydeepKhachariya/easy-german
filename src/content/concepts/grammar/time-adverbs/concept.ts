import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "time-adverbs",
  slug: "time-adverbs",
  order: 240,
  unit: "Grammar",
  titleDe: "Zeitangaben",
  titleEn: "Time words: today, often, always",
  category: "grammar",
  minutes: 15,
  summary:
    "immer, oft, manchmal, nie go after the verb. A time word in position 1 pushes the subject behind the verb.",
  englishExplanation:
    'English time words go at the start or the end: "Tomorrow I\'m working", "I\'m working tomorrow". Frequency words usually go before the verb: "I always drink tea".',
  englishExamples: [
    "I always drink tea.",
    "Tomorrow I'm working.",
    "We sometimes go to the cinema.",
  ],
  germanExplanation:
    'Time words: heute, morgen, gestern, jetzt, bald, später, dann, zuerst.\n\nHow often: immer (always), oft (often), manchmal (sometimes), selten (rarely), nie (never).\n\nParts of the day with -s mean "every": morgens (in the mornings), mittags, abends, nachts.\n\nPosition: after the verb, never between the subject and the verb: Ich trinke immer Tee. If a time word comes first, the verb follows it and the subject moves behind: Morgen arbeite ich.\n\nIn the middle of a sentence, time comes before place: Ich gehe heute ins Kino.',
  comparisonRows: [
    {
      english: "I always drink tea.",
      german: "Ich trinke immer Tee.",
      note: "immer after the verb",
    },
    {
      english: "Tomorrow I'm working.",
      german: "Morgen arbeite ich.",
      note: "Verb stays in position 2.",
    },
    {
      english: "in the evenings",
      german: "abends",
      note: "-s = regularly",
    },
    {
      english: "I never eat meat.",
      german: "Ich esse nie Fleisch.",
      note: "nie after the verb",
    },
  ],
  helps: [
    "Some words look alike: oft/often.",
    "Starting with a time word is normal in both languages.",
  ],
  misleads: [
    "English: I often cook. German: Ich koche oft. The adverb follows the verb.",
    "morgen means tomorrow. der Morgen means the morning. morgens means in the mornings.",
  ],
  examples: [
    {
      de: "Ich trinke morgens Kaffee.",
      en: "I drink coffee in the mornings.",
    },
    {
      de: "Wir gehen manchmal ins Kino.",
      en: "We sometimes go to the cinema.",
    },
    {
      de: "Er kommt nie pünktlich.",
      en: "He's never on time.",
    },
    {
      de: "Zuerst frühstücke ich, dann gehe ich zur Arbeit.",
      en: "First I have breakfast, then I go to work.",
    },
    {
      de: "Bis später!",
      en: "See you later!",
    },
  ],
  mistakes: [
    {
      wrong: "Ich oft koche.",
      right: "Ich koche oft.",
      why: "The adverb comes after the verb.",
    },
    {
      wrong: "Morgen ich habe frei.",
      right: "Morgen habe ich frei.",
      why: "Time word first, then the verb.",
    },
    {
      wrong: "Ich gehe ins Kino heute.",
      right: "Ich gehe heute ins Kino.",
      why: "Time comes before place.",
    },
  ],
  exercises: [
    {
      id: "tadv-order-immer",
      type: "reorderWords",
      skill: "word-order",
      prompt: "Put the words in order.",
      words: ["ich", "trinke", "immer", "Tee"],
      alsoAccept: [],
      en: "I always drink tea.",
    },
    {
      id: "tadv-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the words.",
      pairs: [
        {
          left: "immer",
          right: "always",
        },
        {
          left: "oft",
          right: "often",
        },
        {
          left: "manchmal",
          right: "sometimes",
        },
        {
          left: "selten",
          right: "rarely",
        },
        {
          left: "nie",
          right: "never",
        },
      ],
    },
    {
      id: "tadv-tr-tomorrow",
      type: "translate",
      skill: "verb-position",
      prompt: "Translate.",
      en: "Tomorrow I am working.",
      answers: ["Morgen arbeite ich.", "Ich arbeite morgen."],
    },
    {
      id: "tadv-mc-manchmal",
      type: "multipleChoice",
      skill: "verb-position",
      prompt: "Pick the correct sentence.",
      question: "I sometimes cook.",
      options: ["Ich manchmal koche.", "Ich koche manchmal.", "Manchmal ich koche."],
      answer: 1,
    },
  ],
  vocab: [
    {
      de: "immer",
      en: "always",
    },
    {
      de: "oft",
      en: "often",
    },
    {
      de: "manchmal",
      en: "sometimes",
    },
    {
      de: "selten",
      en: "rarely",
    },
    {
      de: "nie",
      en: "never",
    },
    {
      de: "morgens",
      en: "in the mornings",
    },
    {
      de: "abends",
      en: "in the evenings",
    },
    {
      de: "zuerst",
      en: "first",
    },
    {
      de: "dann",
      en: "then",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
