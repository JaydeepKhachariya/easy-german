import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "days-months-dates",
  slug: "days-months-dates",
  order: 50,
  unit: "Basics",
  titleDe: "Tage, Monate und das Datum",
  titleEn: "Days, months and dates",
  category: "vocabulary",
  minutes: 20,
  summary: "am Montag, im Juni, am dritten Mai. Dates go day, month, year.",
  englishExplanation:
    'English uses "on" for days and dates and "in" for months: on Monday, on 3 May, in June. Dates use ordinal numbers: the first, the third, the twenty-first.',
  englishExamples: [
    "The course starts on Monday.",
    "My birthday is in June.",
    "Today is the third of May.",
    "I was born on 12 August 1995.",
  ],
  germanExplanation:
    "Days: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag. Months: Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember. All of them are der-words.\n\nPrepositions: am for days and dates (am Montag, am dritten Mai), im for months and seasons (im Juni, im Sommer).\n\nDates use ordinal numbers. Up to 19, add -te: der zweite, der vierte. From 20 on, add -ste: der zwanzigste. Irregular: der erste, der dritte, der siebte. In writing, a dot after the number marks the ordinal: der 3. Mai. After am, the ending is -en: am dritten Mai.\n\nDates go day, month, year: 12.08.1995.",
  comparisonRows: [
    {
      english: "on Monday",
      german: "am Montag",
      note: "am for days",
    },
    {
      english: "in June",
      german: "im Juni",
      note: "im for months",
    },
    {
      english: "the third of May",
      german: "der dritte Mai (3. Mai)",
      note: 'A dot after the number means "third".',
    },
    {
      english: "on 3 May",
      german: "am dritten Mai",
      note: "After am, the ending is -en.",
    },
    {
      english: "08/12/1995 (US style)",
      german: "12.08.1995",
      note: "Day first, then month.",
    },
  ],
  helps: [
    "Most month names look like English: April, August, September.",
    "am and im match on and in.",
  ],
  misleads: [
    "German writes the day first: 03.05. is 3 May, not 5 March.",
    "Dates need the ordinal ending: am ersten Mai, not am eins Mai.",
  ],
  examples: [
    {
      de: "Heute ist Montag.",
      en: "Today is Monday.",
    },
    {
      de: "Am Wochenende arbeite ich nicht.",
      en: "I don't work at the weekend.",
    },
    {
      de: "Mein Geburtstag ist im Juni.",
      en: "My birthday is in June.",
    },
    {
      de: "Heute ist der dritte Mai.",
      en: "Today is the third of May.",
    },
    {
      de: "Ich bin am zwölften August 1995 geboren.",
      en: "I was born on 12 August 1995.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich komme in Montag.",
      right: "Ich komme am Montag.",
      why: "Days take am.",
    },
    {
      wrong: "Am Juni habe ich Urlaub.",
      right: "Im Juni habe ich Urlaub.",
      why: "Months take im.",
    },
    {
      wrong: "Heute ist der drei Mai.",
      right: "Heute ist der dritte Mai.",
      why: "Dates use ordinal numbers: dritte.",
    },
  ],
  exercises: [
    {
      id: "date-fill-am",
      type: "fillBlank",
      skill: "general",
      prompt: "Fill in am or im.",
      sentence: "Ich habe ___ Dienstag einen Termin.",
      answers: [["am"]],
      en: "I have an appointment on Tuesday.",
    },
    {
      id: "date-fill-im",
      type: "fillBlank",
      skill: "general",
      prompt: "Fill in am or im.",
      sentence: "___ Dezember ist es kalt.",
      answers: [["im"]],
      en: "In December it's cold.",
    },
    {
      id: "date-mc-0407",
      type: "multipleChoice",
      skill: "vocabulary",
      prompt: "Which date is 04.07.?",
      question: "04.07.",
      options: ["7 April", "4 July", "4 June"],
      answer: 1,
    },
    {
      id: "date-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the days.",
      pairs: [
        {
          left: "Montag",
          right: "Monday",
        },
        {
          left: "Mittwoch",
          right: "Wednesday",
        },
        {
          left: "Donnerstag",
          right: "Thursday",
        },
        {
          left: "Samstag",
          right: "Saturday",
        },
        {
          left: "Sonntag",
          right: "Sunday",
        },
      ],
    },
  ],
  vocab: [
    {
      de: "Tag",
      en: "day",
      article: "der",
      plural: "Tage",
    },
    {
      de: "Woche",
      en: "week",
      article: "die",
      plural: "Wochen",
    },
    {
      de: "Monat",
      en: "month",
      article: "der",
      plural: "Monate",
    },
    {
      de: "Datum",
      en: "date",
      article: "das",
      plural: "Daten",
    },
    {
      de: "Geburtstag",
      en: "birthday",
      article: "der",
      plural: "Geburtstage",
    },
    {
      de: "Termin",
      en: "appointment",
      article: "der",
      plural: "Termine",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
