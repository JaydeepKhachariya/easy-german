import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "dativ-prepositions",
  slug: "dativ-prepositions",
  order: 280,
  unit: "Grammar",
  titleDe: "Präpositionen mit Dativ",
  titleEn: "Prepositions with Dativ",
  category: "grammar",
  minutes: 20,
  summary: "aus, bei, mit, nach, seit, von, zu always take the Dativ: mit dem Bus, zum Arzt.",
  englishExplanation:
    "English prepositions don't change the noun after them: with the car, from the station, after the film.",
  englishExamples: ["I go to work by bus.", "I'm from India.", "After the course I go home."],
  germanExplanation:
    "Some German prepositions always take the Dativ: aus, bei, mit, nach, seit, von, zu. Say them as a chant: aus-bei-mit-nach-seit-von-zu.\n\n- aus: from (origin), out of: Ich komme aus Indien.\n- bei: at someone's place, at a company: Ich wohne bei meinen Eltern.\n- mit: with, by (transport): Ich fahre mit dem Bus.\n- nach: to (cities, countries), after: nach Berlin, nach dem Kurs.\n- seit: since, for (up to now): seit zwei Jahren.\n- von: from, of: ein Geschenk von meiner Mutter.\n- zu: to (people, places in town): Ich gehe zum Arzt.\n\nShort forms: zu dem = zum, zu der = zur, von dem = vom, bei dem = beim.",
  comparisonRows: [
    {
      english: "by bus",
      german: "mit dem Bus",
      note: "mit + Dativ: dem",
    },
    {
      english: "to the doctor",
      german: "zum Arzt",
      note: "zu + dem = zum",
    },
    {
      english: "to work",
      german: "zur Arbeit",
      note: "zu + der = zur",
    },
    {
      english: "for two years",
      german: "seit zwei Jahren",
      note: "Plural Dativ adds -n.",
    },
    {
      english: "to Berlin",
      german: "nach Berlin",
      note: "nach for cities and countries",
    },
  ],
  helps: [
    'mit is close to "with" in meaning.',
    "The list is fixed. Learn the seven words and you know the case.",
  ],
  misleads: [
    'English "to" can be nach or zu: nach Hamburg, zum Bahnhof.',
    "seit goes with the present tense: Ich wohne seit zwei Jahren hier. (I have lived here for two years.)",
  ],
  tables: [
    {
      kind: "generic",
      title: "aus, bei, mit, nach, seit, von, zu",
      headers: ["Preposition", "Meaning", "Example"],
      rows: [
        ["aus", "from, out of", "Ich komme aus Indien."],
        ["bei", "at (someone's place)", "Ich wohne bei meiner Tante."],
        ["mit", "with, by", "Ich fahre mit dem Zug."],
        ["nach", "to (city/country), after", "nach Berlin, nach dem Essen"],
        ["seit", "since, for", "seit einem Jahr"],
        ["von", "from, of", "von meinem Bruder"],
        ["zu", "to", "zum Arzt, zur Schule"],
      ],
    },
  ],
  examples: [
    {
      de: "Ich fahre mit dem Zug nach München.",
      en: "I'm going to Munich by train.",
    },
    {
      de: "Nach dem Kurs gehe ich nach Hause.",
      en: "After the course I go home.",
    },
    {
      de: "Ich lerne seit einem Jahr Deutsch.",
      en: "I've been learning German for a year.",
    },
    {
      de: "Sie wohnt bei ihrer Tante.",
      en: "She lives at her aunt's.",
    },
    {
      de: "Ich gehe heute zum Arzt.",
      en: "I'm going to the doctor today.",
    },
    {
      de: "Das ist ein Brief von meiner Mutter.",
      en: "This is a letter from my mother.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich fahre mit der Bus.",
      right: "Ich fahre mit dem Bus.",
      why: "mit + Dativ: der Bus → dem Bus.",
    },
    {
      wrong: "Ich gehe nach dem Arzt.",
      right: "Ich gehe zum Arzt.",
      why: "To a person or a place in town: zu. nach is for cities, countries and nach Hause.",
    },
    {
      wrong: "Ich wohne hier seit zwei Jahre.",
      right: "Ich wohne seit zwei Jahren hier.",
      why: "Plural Dativ adds -n: Jahren.",
    },
  ],
  exercises: [
    {
      id: "dprep-fill-mit",
      type: "fillBlank",
      skill: "cases",
      prompt: "Fill in the preposition.",
      sentence: "Ich fahre ___ dem Fahrrad zur Arbeit.",
      answers: [["mit"]],
      en: "I cycle to work.",
    },
    {
      id: "dprep-mc-zur",
      type: "multipleChoice",
      skill: "cases",
      prompt: "Pick the right form. die Bäckerei = the bakery.",
      question: "Ich gehe ___ Bäckerei.",
      options: ["zum", "zur", "zu die"],
      answer: 1,
    },
    {
      id: "dprep-fill-aus",
      type: "fillBlank",
      skill: "cases",
      prompt: "Fill in the preposition.",
      sentence: "Ich komme ___ der Türkei.",
      answers: [["aus"]],
      en: "I come from Turkey.",
    },
    {
      id: "dprep-tr-doctor",
      type: "translate",
      skill: "cases",
      prompt: "Translate.",
      en: "I'm going to the doctor.",
      answers: ["Ich gehe zum Arzt.", "Ich gehe zur Ärztin."],
    },
  ],
  vocab: [
    {
      de: "mit",
      en: "with, by",
    },
    {
      de: "nach",
      en: "to, after",
    },
    {
      de: "seit",
      en: "since, for",
    },
    {
      de: "Bahnhof",
      en: "station",
      article: "der",
      plural: "Bahnhöfe",
    },
    {
      de: "Bäckerei",
      en: "bakery",
      article: "die",
      plural: "Bäckereien",
    },
    {
      de: "Fahrrad",
      en: "bicycle",
      article: "das",
      plural: "Fahrräder",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
