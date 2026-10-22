import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "telling-time",
  slug: "telling-time",
  order: 40,
  unit: "Basics",
  titleDe: "Die Uhrzeit",
  titleEn: "Telling the time",
  category: "vocabulary",
  minutes: 25,
  summary: "Official 24-hour time and everyday time. Watch out: halb drei is 2:30, not 3:30.",
  englishExplanation:
    'English has two ways to tell the time. Official: "It\'s 14:30." Everyday: "It\'s half past two." Everyday time counts from the full hour: quarter past, half past, quarter to.',
  englishExamples: [
    "It's three o'clock.",
    "It's quarter past six.",
    "It's half past two.",
    "The train leaves at 14:45.",
  ],
  germanExplanation:
    'German also has two systems.\n\nOfficial time uses 24 hours and the word Uhr: Es ist vierzehn Uhr dreißig (14:30). You hear it on trains, on the radio and in offices.\n\nEveryday time uses 12 hours with nach (past), vor (to), Viertel (quarter) and halb (half). The trap is halb: it points to the next hour. halb drei means 2:30, "half on the way to three". It never means half past three.\n\nTo ask the time: Wie spät ist es? or Wie viel Uhr ist es? For "at" a time, use um: um acht Uhr.',
  comparisonRows: [
    {
      english: "It's two o'clock.",
      german: "Es ist zwei Uhr.",
      note: "Uhr after the number.",
    },
    {
      english: "half past two (2:30)",
      german: "halb drei",
      note: "halb looks ahead to the next hour.",
    },
    {
      english: "quarter past six",
      german: "Viertel nach sechs",
      note: "nach = past",
    },
    {
      english: "quarter to six",
      german: "Viertel vor sechs",
      note: "vor = to",
    },
    {
      english: "at eight",
      german: "um acht",
      note: "at = um",
    },
  ],
  helps: [
    'nach and vor match "past" and "to".',
    "Official time works like reading the digits: 14:30 = vierzehn Uhr dreißig.",
  ],
  misleads: [
    "halb drei is 2:30, not 3:30.",
    'Wie spät ist es? asks the time. Um wie viel Uhr? asks "at what time?".',
  ],
  hindiHint:
    "Hindi पौने तीन (paune teen) means 2:45: a quarter less than three. German halb drei thinks the same way, counting towards the next hour: half (on the way) to three.",
  tables: [
    {
      kind: "generic",
      title: "Everyday and official time",
      headers: ["Time", "Everyday", "Official"],
      rows: [
        ["7:00", "sieben Uhr", "sieben Uhr"],
        ["7:15", "Viertel nach sieben", "sieben Uhr fünfzehn"],
        ["7:30", "halb acht", "sieben Uhr dreißig"],
        ["7:45", "Viertel vor acht", "sieben Uhr fünfundvierzig"],
        ["7:10", "zehn nach sieben", "sieben Uhr zehn"],
        ["7:50", "zehn vor acht", "sieben Uhr fünfzig"],
        ["19:30", "halb acht", "neunzehn Uhr dreißig"],
      ],
    },
  ],
  examples: [
    {
      de: "Wie spät ist es?",
      en: "What time is it?",
      gloss: "How late is it?",
    },
    {
      de: "Es ist halb drei.",
      en: "It's half past two.",
      gloss: "It is half three",
    },
    {
      de: "Der Kurs beginnt um neun Uhr.",
      en: "The course starts at nine.",
    },
    {
      de: "Der Zug fährt um vierzehn Uhr fünfundvierzig.",
      en: "The train leaves at 14:45.",
    },
    {
      de: "Wir treffen uns um Viertel nach sieben.",
      en: "We're meeting at quarter past seven.",
    },
  ],
  mistakes: [
    {
      wrong: "Es ist halb drei. (meaning 3:30)",
      right: "Es ist halb vier.",
      why: "3:30 is halb vier: half on the way to four.",
    },
    {
      wrong: "Es ist zwei Uhren.",
      right: "Es ist zwei Uhr.",
      why: "Uhr stays singular in times.",
    },
    {
      wrong: "Der Kurs beginnt an neun Uhr.",
      right: "Der Kurs beginnt um neun Uhr.",
      why: "At + clock time = um.",
    },
  ],
  exercises: [
    {
      id: "time-mc-halb",
      type: "multipleChoice",
      skill: "vocabulary",
      prompt: "What time is halb sieben?",
      question: "halb sieben",
      options: ["7:30", "6:30", "6:00"],
      answer: 1,
    },
    {
      id: "time-fill-um",
      type: "fillBlank",
      skill: "general",
      prompt: "Fill in the missing word.",
      sentence: "Der Film beginnt ___ acht Uhr.",
      answers: [["um"]],
      en: "The film starts at eight.",
    },
    {
      id: "time-tr-845",
      type: "translate",
      skill: "vocabulary",
      prompt: "Translate.",
      en: "It's quarter to nine.",
      answers: ["Es ist Viertel vor neun.", "Es ist acht Uhr fünfundvierzig."],
    },
    {
      id: "time-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the times.",
      pairs: [
        {
          left: "10:15",
          right: "Viertel nach zehn",
        },
        {
          left: "10:30",
          right: "halb elf",
        },
        {
          left: "10:45",
          right: "Viertel vor elf",
        },
        {
          left: "10:50",
          right: "zehn vor elf",
        },
      ],
    },
  ],
  vocab: [
    {
      de: "Uhr",
      en: "clock; o'clock",
      article: "die",
      plural: "Uhren",
    },
    {
      de: "Stunde",
      en: "hour",
      article: "die",
      plural: "Stunden",
    },
    {
      de: "Minute",
      en: "minute",
      article: "die",
      plural: "Minuten",
    },
    {
      de: "halb",
      en: "half",
    },
    {
      de: "Viertel",
      en: "quarter",
      article: "das",
      plural: "Viertel",
    },
    {
      de: "spät",
      en: "late",
    },
    {
      de: "früh",
      en: "early",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
