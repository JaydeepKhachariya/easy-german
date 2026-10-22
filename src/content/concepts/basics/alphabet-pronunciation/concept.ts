import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "alphabet-pronunciation",
  slug: "alphabet-pronunciation",
  order: 10,
  unit: "Basics",
  titleDe: "Das Alphabet und die Aussprache",
  titleEn: "Alphabet and pronunciation",
  category: "speaking",
  minutes: 20,
  summary:
    "German spelling is regular. Learn a handful of letter sounds and you can read most words aloud.",
  englishExplanation:
    'English spelling and sound often don\'t match. "Though", "through" and "tough" all end in -ough and sound different. So English speakers learn many words by heart.',
  englishExamples: [
    "Read and red can sound the same.",
    "The letter a sounds different in cat, car and cake.",
  ],
  germanExplanation:
    'German spelling is far more regular. Once you know the rules, you can read almost any word aloud.\n\nA few letters sound different from English: w sounds like English v (Wasser), v usually sounds like f (Vater), z sounds like ts (Zeit), j sounds like English y (ja).\n\nThe umlauts change the vowel. ä sounds close to the e in "bed". For ö, say "e" with rounded lips. For ü, say "ee" with rounded lips.\n\nß is a sharp s. It comes after long vowels and after ei, au, eu: Straße, heißen.\n\nLetter groups to learn: sch sounds like English sh (Schule). ch after a, o, u is a throat sound (Buch). After other letters ch is softer, like the h in "huge" (ich). ei sounds like "eye" (mein). ie sounds like "ee" (Liebe). eu and äu sound like "oy" (heute, Häuser).',
  comparisonRows: [
    {
      english: "w in water",
      german: "w in Wasser",
      note: "German w sounds like English v.",
    },
    {
      english: "z in zoo",
      german: "z in Zoo",
      note: "German z sounds like ts.",
    },
    {
      english: "ee in see",
      german: "ie in Sie",
      note: "ie is a long ee sound.",
    },
    {
      english: "eye",
      german: "ei in mein",
      note: 'ei sounds like "eye".',
    },
  ],
  helps: [
    "Many letters sound the same as in English: b, d, f, h, k, l, m, n, p, t.",
    "sch is just English sh with one letter more.",
  ],
  misleads: [
    'ie and ei are opposites. Liebe sounds like "lee-be", mein sounds like "mine".',
    'w is never like English w. Wein sounds like "vine".',
  ],
  hindiHint:
    "German ch after a, o, u (Buch, acht) sounds like the ख़ in ख़ान (Khan) or ख़ुश (khush).",
  tables: [
    {
      kind: "generic",
      title: "Letters that sound different",
      headers: ["Letter", "Sounds like", "Example"],
      rows: [
        ["w", "English v", "Wasser, Wein"],
        ["v", "English f (usually)", "Vater, viel"],
        ["z", "ts", "Zeit, zehn"],
        ["j", "English y", "ja, Jahr"],
        ["s before a vowel", "English z", "Sonne, sie"],
        ["ß", "ss", "Straße, heißen"],
        ["sch", "sh", "Schule, schön"],
        ["sp, st at the start", "shp, sht", "Sport, Straße"],
        ["ei", "eye", "mein, drei"],
        ["ie", "ee", "Liebe, sie"],
        ["eu, äu", "oy", "heute, Häuser"],
      ],
    },
  ],
  examples: [
    {
      de: "Wie heißen Sie?",
      en: "What is your name?",
      gloss: "How are-called you?",
    },
    {
      de: "Ich wohne in der Schweiz.",
      en: "I live in Switzerland.",
    },
    {
      de: "Das Wetter ist heute schön.",
      en: "The weather is nice today.",
    },
    {
      de: "Buchstabieren Sie bitte!",
      en: "Please spell that.",
    },
    {
      de: "Mein Name ist Müller: M, Ü, L, L, E, R.",
      en: "My name is Müller: M, Ü, L, L, E, R.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich heise Anna.",
      right: "Ich heiße Anna.",
      why: "After ei, the sharp s sound is written ß.",
    },
    {
      wrong: "Ich leibe dich.",
      right: "Ich liebe dich.",
      why: 'ie is a long ee sound. ei would be "eye".',
    },
  ],
  exercises: [
    {
      id: "abc-mc-eye",
      type: "multipleChoice",
      skill: "spelling",
      prompt: 'Which word has the "eye" sound?',
      question: "ei or ie?",
      options: ["Liebe", "mein", "Biene"],
      answer: 1,
    },
    {
      id: "abc-pairs",
      type: "matchPairs",
      skill: "spelling",
      prompt: "Match each letter to its sound.",
      pairs: [
        {
          left: "w",
          right: "English v",
        },
        {
          left: "z",
          right: "ts",
        },
        {
          left: "j",
          right: "English y",
        },
        {
          left: "ie",
          right: "ee",
        },
        {
          left: "ei",
          right: "eye",
        },
      ],
    },
    {
      id: "abc-fill-sz",
      type: "fillBlank",
      skill: "spelling",
      prompt: "Fill in the missing letter.",
      sentence: "Ich hei___e Ravi.",
      answers: [["ß"]],
      en: "My name is Ravi.",
    },
    {
      id: "abc-mc-wasser",
      type: "multipleChoice",
      skill: "spelling",
      prompt: "How do you say Wasser?",
      question: "Wasser",
      options: ['With an English w, like "water"', 'With a v sound: "vasser"'],
      answer: 1,
    },
  ],
  vocab: [
    {
      de: "Buchstabe",
      en: "letter (of the alphabet)",
      article: "der",
      plural: "Buchstaben",
    },
    {
      de: "buchstabieren",
      en: "to spell",
    },
    {
      de: "Aussprache",
      en: "pronunciation",
      article: "die",
    },
    {
      de: "Wort",
      en: "word",
      article: "das",
      plural: "Wörter",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
