import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "separable-verbs",
  slug: "separable-verbs",
  order: 200,
  unit: "Grammar",
  titleDe: "Trennbare und untrennbare Verben",
  titleEn: "Separable and inseparable verbs",
  category: "grammar",
  minutes: 25,
  summary:
    "aufstehen → Ich stehe um sieben auf. The prefix goes to the end. be-, ver-, er- never split.",
  englishExplanation:
    'English has phrasal verbs: get up, call back, go out. The small word can move: "Call me back."',
  englishExamples: ["I get up at seven.", "Please call me back.", "We go out on Fridays."],
  germanExplanation:
    "Many German verbs have a prefix: aufstehen (get up), anrufen (call), einkaufen (shop), mitkommen (come along), fernsehen (watch TV).\n\nSeparable prefixes split off in a main clause. The verb takes position 2 as usual, and the prefix goes to the very end: Ich stehe um sieben auf. Ich rufe dich morgen an.\n\nWith a modal verb, the infinitive stays in one piece at the end: Ich muss früh aufstehen.\n\nCommon separable prefixes: an, auf, aus, ein, mit, zu, fern, zurück. The prefix is stressed: AUFstehen.\n\nInseparable prefixes never split: be-, ver-, er-, ent-, emp-, zer-. They are not stressed: Ich besuche meine Oma. Ich verstehe das nicht.",
  comparisonRows: [
    {
      english: "I get up at seven.",
      german: "Ich stehe um sieben auf.",
      note: "Prefix at the end.",
    },
    {
      english: "Call me tomorrow.",
      german: "Ruf mich morgen an!",
      note: "Also at the end in commands.",
    },
    {
      english: "I have to get up early.",
      german: "Ich muss früh aufstehen.",
      note: "With a modal, it stays together.",
    },
    {
      english: "I visit my grandma.",
      german: "Ich besuche meine Oma.",
      note: "be- never splits.",
    },
  ],
  helps: [
    'English phrasal verbs split too: "get me up". The idea is familiar.',
    "Many prefixes match: aus/out, mit/with, zurück/back.",
  ],
  misleads: [
    'English keeps "get up" close together. German sends auf to the end, even after a long middle: Ich stehe am Sonntag um zehn Uhr auf.',
    "Don't split be-, ver-, er-: Ich verstehe, not Ich stehe ver.",
  ],
  diagrams: [
    {
      kind: "wordOrder",
      caption: "Separable verb: the prefix goes to the end.",
      english: [
        {
          text: "I",
          role: "subject",
        },
        {
          text: "get up",
          role: "verb",
        },
        {
          text: "at seven",
          role: "time",
        },
      ],
      german: [
        {
          text: "Ich",
          role: "subject",
        },
        {
          text: "stehe",
          role: "verb",
        },
        {
          text: "um sieben",
          role: "time",
        },
        {
          text: "auf",
          role: "prefix",
        },
      ],
    },
  ],
  examples: [
    {
      de: "Ich stehe jeden Tag um sechs Uhr auf.",
      en: "I get up at six every day.",
    },
    {
      de: "Kommst du heute Abend mit?",
      en: "Are you coming along this evening?",
    },
    {
      de: "Wir kaufen am Samstag ein.",
      en: "We do the shopping on Saturday.",
    },
    {
      de: "Der Zug kommt um acht Uhr an.",
      en: "The train arrives at eight.",
    },
    {
      de: "Ich verstehe die Frage nicht.",
      en: "I don't understand the question.",
    },
    {
      de: "Am Abend sehe ich fern.",
      en: "In the evening I watch TV.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich aufstehe um sieben.",
      right: "Ich stehe um sieben auf.",
      why: "The prefix goes to the end.",
    },
    {
      wrong: "Ich stehe auf um sieben.",
      right: "Ich stehe um sieben auf.",
      why: "The prefix goes to the very end, after the time.",
    },
    {
      wrong: "Ich stehe das nicht ver.",
      right: "Ich verstehe das nicht.",
      why: "ver- is inseparable.",
    },
  ],
  exercises: [
    {
      id: "sep-order-anrufen",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order.",
      words: ["ich", "rufe", "dich", "morgen", "an"],
      alsoAccept: [["morgen", "rufe", "ich", "dich", "an"]],
      en: "I'll call you tomorrow.",
    },
    {
      id: "sep-fill-zurueck",
      type: "fillBlank",
      skill: "verb-position",
      prompt: "Fill in the prefix.",
      sentence: "Wann kommst du ___?",
      answers: [["zurück"]],
      en: "When are you coming back?",
    },
    {
      id: "sep-mc-insep",
      type: "multipleChoice",
      skill: "verb-position",
      prompt: "Which verb is NOT separable?",
      question: "Pick one.",
      options: ["einkaufen", "besuchen", "aufstehen", "mitkommen"],
      answer: 1,
    },
    {
      id: "sep-tr-aufstehen",
      type: "translate",
      skill: "verb-position",
      prompt: "Translate.",
      en: "I get up at seven.",
      answers: [
        "Ich stehe um sieben auf.",
        "Ich stehe um sieben Uhr auf.",
        "Um sieben stehe ich auf.",
        "Um sieben Uhr stehe ich auf.",
      ],
    },
  ],
  vocab: [
    {
      de: "aufstehen",
      en: "to get up",
    },
    {
      de: "anrufen",
      en: "to call (on the phone)",
    },
    {
      de: "einkaufen",
      en: "to do the shopping",
    },
    {
      de: "mitkommen",
      en: "to come along",
    },
    {
      de: "ankommen",
      en: "to arrive",
    },
    {
      de: "fernsehen",
      en: "to watch TV",
    },
    {
      de: "besuchen",
      en: "to visit",
    },
    {
      de: "verstehen",
      en: "to understand",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
