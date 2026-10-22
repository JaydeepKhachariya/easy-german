import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "numbers",
  slug: "numbers",
  order: 30,
  unit: "Basics",
  titleDe: "Die Zahlen",
  titleEn: "Numbers",
  category: "vocabulary",
  minutes: 20,
  summary: 'From 21 on, German says the ones before the tens: einundzwanzig is "one-and-twenty".',
  englishExplanation:
    "English numbers from 13 to 19 end in -teen. From 21 on, you say the tens first: twenty-one, thirty-five.",
  englishExamples: [
    "I am twenty-eight years old.",
    "The bus number is fourteen.",
    "It costs thirty-five euros.",
  ],
  germanExplanation:
    '1 to 12 have their own words: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf. 13 to 19 add -zehn: dreizehn, vierzehn. Watch sechzehn (no s) and siebzehn (no -en).\n\nFrom 21 on, German says the ones first, then und, then the tens, all as one word: einundzwanzig (one-and-twenty), fünfunddreißig (five-and-thirty). This is the hard part for English speakers, especially when you hear phone numbers or prices.\n\nTens: zwanzig, dreißig (with ß), vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig, hundert.\n\nPrices: 3,50 € is "drei Euro fünfzig". German uses a comma for decimals and a dot for thousands: 1.000.',
  comparisonRows: [
    {
      english: "twenty-one",
      german: "einundzwanzig",
      note: "Ones first, then tens.",
    },
    {
      english: "thirty-five",
      german: "fünfunddreißig",
      note: "Written as one word.",
    },
    {
      english: "3.50 euros",
      german: "3,50 Euro: drei Euro fünfzig",
      note: "Comma for decimals.",
    },
    {
      english: "1,000",
      german: "1.000: tausend",
      note: "Dot for thousands.",
    },
  ],
  helps: [
    "13 to 19 work like English -teen: vierzehn, fourteen.",
    "Many numbers look similar: drei/three, acht/eight, zehn/ten.",
  ],
  misleads: [
    'einundzwanzig is "one-and-twenty". If you hear "vierund...", the number ends in 4.',
    "Commas and dots swap: 2,5 means two point five.",
  ],
  hindiHint:
    "Hindi numbers also put the ones first: इक्कीस (ikkees) is one + twenty, पैंतीस (paintees) is five + thirty. German does the same: einundzwanzig, fünfunddreißig.",
  tables: [
    {
      kind: "generic",
      title: "Tricky numbers",
      headers: ["Number", "German"],
      rows: [
        ["1 / 11 / 21", "eins / elf / einundzwanzig"],
        ["2 / 12 / 20", "zwei / zwölf / zwanzig"],
        ["3 / 13 / 30", "drei / dreizehn / dreißig"],
        ["6 / 16 / 60", "sechs / sechzehn / sechzig"],
        ["7 / 17 / 70", "sieben / siebzehn / siebzig"],
        ["100 / 1.000", "hundert / tausend"],
      ],
    },
  ],
  examples: [
    {
      de: "Ich bin achtundzwanzig Jahre alt.",
      en: "I'm twenty-eight years old.",
      gloss: "I am eight-and-twenty years old",
    },
    {
      de: "Das kostet drei Euro fünfzig.",
      en: "That costs three euros fifty.",
    },
    {
      de: "Meine Hausnummer ist siebzehn.",
      en: "My house number is seventeen.",
    },
    {
      de: "Ich habe zwei Kinder.",
      en: "I have two children.",
    },
  ],
  mistakes: [
    {
      wrong: "zwanzigeins",
      right: "einundzwanzig",
      why: "Ones first, then und, then the tens.",
    },
    {
      wrong: "sechszehn",
      right: "sechzehn",
      why: "16 and 60 drop the s: sechzehn, sechzig.",
    },
    {
      wrong: "siebenzehn",
      right: "siebzehn",
      why: "17 and 70 drop -en: siebzehn, siebzig.",
    },
    {
      wrong: "dreizig",
      right: "dreißig",
      why: "30 is written with ß.",
    },
  ],
  exercises: [
    {
      id: "num-tr-21",
      type: "translate",
      skill: "vocabulary",
      prompt: "Write the number in German.",
      en: "twenty-one",
      answers: ["einundzwanzig"],
    },
    {
      id: "num-mc-47",
      type: "multipleChoice",
      skill: "listening",
      prompt: 'You hear "siebenundvierzig". Which number is it?',
      question: "siebenundvierzig",
      options: ["74", "47", "17"],
      answer: 1,
    },
    {
      id: "num-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the numbers.",
      pairs: [
        {
          left: "16",
          right: "sechzehn",
        },
        {
          left: "30",
          right: "dreißig",
        },
        {
          left: "17",
          right: "siebzehn",
        },
        {
          left: "99",
          right: "neunundneunzig",
        },
        {
          left: "12",
          right: "zwölf",
        },
      ],
    },
    {
      id: "num-fill-5",
      type: "fillBlank",
      skill: "vocabulary",
      prompt: "Write the number as a word.",
      sentence: "Das kostet ___ Euro.",
      answers: [["fünf"]],
      en: "That costs five euros.",
    },
  ],
  vocab: [
    {
      de: "Zahl",
      en: "number",
      article: "die",
      plural: "Zahlen",
    },
    {
      de: "Nummer",
      en: "number (phone, house)",
      article: "die",
      plural: "Nummern",
    },
    {
      de: "Jahr",
      en: "year",
      article: "das",
      plural: "Jahre",
    },
    {
      de: "kosten",
      en: "to cost",
    },
    {
      de: "alt",
      en: "old",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
