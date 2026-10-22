import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "regular-verbs",
  slug: "regular-verbs",
  order: 110,
  unit: "Grammar",
  titleDe: "Regelmäßige Verben im Präsens",
  titleEn: "Regular verbs in the present",
  category: "grammar",
  minutes: 20,
  summary:
    'Stem + ending: ich wohne, du wohnst, er wohnt. One present tense covers "I live" and "I am living".',
  englishExplanation:
    "English verbs barely change in the present. Only he, she and it add -s: I work, she works.",
  englishExamples: [
    "I work in an office.",
    "She works from home.",
    "We live in Mumbai.",
    "They play cricket.",
  ],
  germanExplanation:
    'German verbs change for every person. Take the infinitive (wohnen), remove -en to get the stem (wohn-), then add the ending:\n\n- ich wohne\n- du wohnst\n- er/sie/es wohnt\n- wir wohnen\n- ihr wohnt\n- sie/Sie wohnen\n\nwir, sie and Sie look like the infinitive.\n\nIf the stem ends in -t or -d, add an extra e so you can say it: du arbeitest, er arbeitet. If the stem ends in -s, -ß or -z, du only adds -t: du heißt, du tanzt.\n\nGerman has no -ing form. Ich arbeite means both "I work" and "I am working".',
  comparisonRows: [
    {
      english: "I live",
      german: "ich wohne",
      note: "-e for ich",
    },
    {
      english: "she lives",
      german: "sie wohnt",
      note: "-t for er/sie/es, like English -s",
    },
    {
      english: "we live",
      german: "wir wohnen",
      note: "Same as the infinitive",
    },
    {
      english: "I am working",
      german: "ich arbeite",
      note: "No -ing form.",
    },
  ],
  helps: [
    "English adds -s for he/she/it. German adds -t in the same place.",
    "Many verbs look related: lernen/learn, kommen/come, trinken/drink, singen/sing.",
  ],
  misleads: [
    'There\'s no "am working" in German: Ich arbeite jetzt.',
    "Don't use the infinitive for every person: ich wohne, not ich wohnen.",
  ],
  tables: [
    {
      kind: "conjugation",
      title: "Three regular verbs",
      verbs: [
        {
          infinitive: "wohnen",
          forms: ["wohne", "wohnst", "wohnt", "wohnen", "wohnt", "wohnen"],
          english: "to live",
        },
        {
          infinitive: "arbeiten",
          forms: ["arbeite", "arbeitest", "arbeitet", "arbeiten", "arbeitet", "arbeiten"],
          english: "to work",
          highlight: [1, 2, 4],
        },
        {
          infinitive: "heißen",
          forms: ["heiße", "heißt", "heißt", "heißen", "heißt", "heißen"],
          english: "to be called",
          highlight: [1],
        },
      ],
    },
  ],
  examples: [
    {
      de: "Ich wohne in Hamburg.",
      en: "I live in Hamburg.",
    },
    {
      de: "Wo arbeitest du?",
      en: "Where do you work?",
    },
    {
      de: "Sie lernt jeden Tag Deutsch.",
      en: "She studies German every day.",
    },
    {
      de: "Wir spielen am Sonntag Cricket.",
      en: "We play cricket on Sunday.",
    },
    {
      de: "Was macht ihr heute?",
      en: "What are you doing today?",
    },
  ],
  mistakes: [
    {
      wrong: "Ich wohnen in Köln.",
      right: "Ich wohne in Köln.",
      why: "ich takes -e.",
    },
    {
      wrong: "Du arbeitst viel.",
      right: "Du arbeitest viel.",
      why: "Stems ending in -t add an extra e: du arbeitest.",
    },
    {
      wrong: "Ich bin arbeite jetzt.",
      right: "Ich arbeite jetzt.",
      why: 'No "am + -ing" in German. The present covers both.',
    },
  ],
  exercises: [
    {
      id: "reg-conj-machen",
      type: "conjugationTable",
      skill: "conjugation",
      prompt: "Fill in the forms of machen.",
      verb: "machen",
      answers: ["mache", "machst", "macht", "machen", "macht", "machen"],
      given: [0],
      english: "to do, make",
    },
    {
      id: "reg-fill-wohnst",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Write the right form of wohnen.",
      sentence: "Du ___ in Berlin.",
      answers: [["wohnst"]],
      en: "You live in Berlin.",
    },
    {
      id: "reg-fill-arbeitet",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Write the right form of arbeiten.",
      sentence: "Er ___ bei Siemens.",
      answers: [["arbeitet"]],
      en: "He works at Siemens.",
    },
    {
      id: "reg-tr-learn",
      type: "translate",
      skill: "conjugation",
      prompt: "Translate.",
      en: "We are learning German.",
      answers: ["Wir lernen Deutsch."],
    },
  ],
  vocab: [
    {
      de: "wohnen",
      en: "to live",
    },
    {
      de: "arbeiten",
      en: "to work",
    },
    {
      de: "machen",
      en: "to do, make",
    },
    {
      de: "spielen",
      en: "to play",
    },
    {
      de: "heißen",
      en: "to be called",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
