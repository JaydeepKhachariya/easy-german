import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-travel",
  slug: "vocab-travel",
  order: 450,
  titleDe: "Reisen und Verkehr",
  titleEn: "Travel and transport",
  minutes: 20,
  summary: "mit dem Zug, zu Fuß, Gleis 7, Verspätung. With a vehicle the verb is fahren.",
  englishExplanation:
    "English: by train, by bus, by car, on foot. At the station: ticket, platform, departure, arrival, delay.",
  englishExamples: [
    "I go to work by bus.",
    "The train leaves from platform 7.",
    "My flight is late.",
  ],
  germanExplanation:
    "Transport uses mit + Dativ: mit dem Zug, mit dem Bus, mit dem Auto, mit der U-Bahn, mit dem Fahrrad. On foot is zu Fuß.\n\nVerbs: fahren (by vehicle), fliegen (by plane), gehen (on foot). In the Perfekt all three take sein.\n\nAt the station: die Fahrkarte (ticket), der Bahnhof, das Gleis (platform), die Abfahrt (departure), die Ankunft (arrival), umsteigen (change trains). Der Zug hat Verspätung means the train is late.\n\nAsking: Wann fährt der nächste Zug nach Köln? Von welchem Gleis? Einmal nach Hamburg, bitte (one ticket to Hamburg, please).",
  comparisonRows: [
    {
      english: "by train",
      german: "mit dem Zug",
      note: "mit + Dativ",
    },
    {
      english: "on foot",
      german: "zu Fuß",
      note: "Fixed phrase",
    },
    {
      english: "The train is late.",
      german: "Der Zug hat Verspätung.",
      note: "Word for word: has delay",
    },
    {
      english: "platform 5",
      german: "Gleis 5",
      note: "Number after the noun",
    },
    {
      english: "I change in Frankfurt.",
      german: "Ich steige in Frankfurt um.",
      note: "umsteigen is separable.",
    },
  ],
  helps: ["Ticket, Bus, Taxi and Hotel are the same words.", "fliegen looks like fly."],
  misleads: [
    "English \"go\" can be gehen or fahren. If there's a vehicle, it's fahren.",
    'bekommen means "to get", not "to become": Ich bekomme ein Ticket.',
  ],
  examples: [
    {
      de: "Ich fahre mit dem Bus zur Arbeit.",
      en: "I go to work by bus.",
    },
    {
      de: "Wann fährt der Zug nach Berlin ab?",
      en: "When does the train to Berlin leave?",
    },
    {
      de: "Der Zug fährt von Gleis 7.",
      en: "The train leaves from platform 7.",
    },
    {
      de: "Einmal nach München, bitte.",
      en: "One ticket to Munich, please.",
    },
    {
      de: "Mein Flug hat zwei Stunden Verspätung.",
      en: "My flight is two hours late.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich gehe mit dem Auto nach Köln.",
      right: "Ich fahre mit dem Auto nach Köln.",
      why: "With a vehicle, use fahren.",
    },
    {
      wrong: "Ich fahre mit Zug.",
      right: "Ich fahre mit dem Zug.",
      why: "mit needs the article: mit dem Zug.",
    },
    {
      wrong: "Der Zug ist Verspätung.",
      right: "Der Zug hat Verspätung.",
      why: "Verspätung haben = to be late.",
    },
  ],
  exercises: [
    {
      id: "trav-mc-fahre",
      type: "multipleChoice",
      skill: "vocabulary",
      prompt: "Pick the verb.",
      question: "Ich ___ mit dem Fahrrad zur Uni.",
      options: ["gehe", "fahre", "fliege"],
      answer: 1,
    },
    {
      id: "trav-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the words.",
      pairs: [
        {
          left: "Gleis",
          right: "platform",
        },
        {
          left: "Abfahrt",
          right: "departure",
        },
        {
          left: "Ankunft",
          right: "arrival",
        },
        {
          left: "Fahrkarte",
          right: "ticket",
        },
        {
          left: "Flughafen",
          right: "airport",
        },
      ],
    },
    {
      id: "trav-fill-mit",
      type: "fillBlank",
      skill: "cases",
      prompt: "Fill in the preposition.",
      sentence: "Ich fahre ___ dem Zug.",
      answers: [["mit"]],
      en: "I'm going by train.",
    },
    {
      id: "trav-tr-late",
      type: "translate",
      skill: "vocabulary",
      prompt: "Translate.",
      en: "The train is late.",
      answers: ["Der Zug hat Verspätung.", "Der Zug kommt zu spät."],
    },
  ],
  vocab: [
    {
      de: "Bahnhof",
      en: "station",
      article: "der",
      plural: "Bahnhöfe",
    },
    {
      de: "Gleis",
      en: "platform, track",
      article: "das",
      plural: "Gleise",
    },
    {
      de: "Fahrkarte",
      en: "ticket",
      article: "die",
      plural: "Fahrkarten",
    },
    {
      de: "Flughafen",
      en: "airport",
      article: "der",
      plural: "Flughäfen",
    },
    {
      de: "Abfahrt",
      en: "departure",
      article: "die",
    },
    {
      de: "Ankunft",
      en: "arrival",
      article: "die",
    },
    {
      de: "umsteigen",
      en: "to change (trains)",
    },
    {
      de: "Verspätung",
      en: "delay",
      article: "die",
      plural: "Verspätungen",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
