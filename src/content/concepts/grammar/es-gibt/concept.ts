import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "es-gibt",
  slug: "es-gibt",
  order: 330,
  unit: "Grammar",
  titleDe: "es gibt",
  titleEn: "There is, there are: es gibt",
  category: "grammar",
  minutes: 15,
  summary: "es gibt + Akkusativ, for one thing or many: Es gibt einen Park. Es gibt zwei Cafés.",
  englishExplanation:
    'English uses "there is" and "there are" to say that something exists: "There is a bank near here", "There are two supermarkets."',
  englishExamples: [
    "There is a bank near here.",
    "There are two supermarkets.",
    "Is there a pharmacy here?",
  ],
  germanExplanation:
    'German uses es gibt for both singular and plural. It never becomes "es geben".\n\nThe thing that exists is in the Akkusativ: Es gibt einen Park (der Park → einen Park). Hier gibt es keinen Supermarkt.\n\nQuestions: Gibt es hier eine Apotheke? (Is there a pharmacy here?) Was gibt es zum Mittagessen? (What\'s for lunch?)\n\nWhen something comes before gibt, es moves behind it: Heute gibt es Fisch.',
  comparisonRows: [
    {
      english: "There is a park.",
      german: "Es gibt einen Park.",
      note: "Akkusativ: einen",
    },
    {
      english: "There are two cafés.",
      german: "Es gibt zwei Cafés.",
      note: "Still gibt, not geben.",
    },
    {
      english: "Is there a pharmacy here?",
      german: "Gibt es hier eine Apotheke?",
      note: "Verb first in a yes/no question.",
    },
    {
      english: "There's no bus today.",
      german: "Heute gibt es keinen Bus.",
      note: "es moves behind gibt.",
    },
    {
      english: "What's for dinner?",
      german: "Was gibt es zum Abendessen?",
      note: "Common everyday use.",
    },
  ],
  helps: ['The idea matches "there is / there are".', 'es gibt + kein works like "there is no".'],
  misleads: [
    "One form for singular and plural: Es gibt drei Zimmer.",
    "The noun is an object, so der-words take einen or keinen: Es gibt keinen Aufzug.",
  ],
  examples: [
    {
      de: "In meiner Straße gibt es eine Bäckerei.",
      en: "There's a bakery in my street.",
    },
    {
      de: "Gibt es hier ein Hotel?",
      en: "Is there a hotel here?",
    },
    {
      de: "Es gibt keinen Parkplatz.",
      en: "There's no parking space.",
    },
    {
      de: "Was gibt es heute zum Mittagessen?",
      en: "What's for lunch today?",
    },
    {
      de: "In Köln gibt es viele Museen.",
      en: "There are many museums in Cologne.",
    },
  ],
  mistakes: [
    {
      wrong: "Es geben zwei Supermärkte.",
      right: "Es gibt zwei Supermärkte.",
      why: "es gibt never changes, even for the plural.",
    },
    {
      wrong: "Es gibt ein Park.",
      right: "Es gibt einen Park.",
      why: "Akkusativ: der Park → einen Park.",
    },
    {
      wrong: "Es ist ein Supermarkt in der Nähe.",
      right: "Es gibt einen Supermarkt in der Nähe.",
      why: "To say something exists, use es gibt.",
    },
  ],
  exercises: [
    {
      id: "gibt-fill-einen",
      type: "fillBlank",
      skill: "cases",
      prompt: 'Fill in "a".',
      sentence: "Hier gibt es ___ Supermarkt.",
      answers: [["einen"]],
      en: "There's a supermarket here.",
    },
    {
      id: "gibt-order-apotheke",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order.",
      words: ["gibt", "es", "hier", "eine", "Apotheke"],
      alsoAccept: [],
      en: "Is there a pharmacy here?",
    },
    {
      id: "gibt-mc-parks",
      type: "multipleChoice",
      skill: "verb-position",
      prompt: "Pick the correct sentence.",
      question: "There are many parks in Berlin.",
      options: [
        "In Berlin es gibt viele Parks.",
        "In Berlin gibt es viele Parks.",
        "In Berlin geben es viele Parks.",
      ],
      answer: 1,
    },
    {
      id: "gibt-tr-bus",
      type: "translate",
      skill: "cases",
      prompt: "Translate.",
      en: "There is no bus.",
      answers: ["Es gibt keinen Bus."],
    },
  ],
  vocab: [
    {
      de: "Apotheke",
      en: "pharmacy",
      article: "die",
      plural: "Apotheken",
    },
    {
      de: "Supermarkt",
      en: "supermarket",
      article: "der",
      plural: "Supermärkte",
    },
    {
      de: "Parkplatz",
      en: "parking space",
      article: "der",
      plural: "Parkplätze",
    },
    {
      de: "Museum",
      en: "museum",
      article: "das",
      plural: "Museen",
    },
    {
      de: "in der Nähe",
      en: "nearby",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
