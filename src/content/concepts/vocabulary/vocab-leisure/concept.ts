import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-leisure",
  slug: "vocab-leisure",
  order: 440,
  titleDe: "Freizeit und Hobbys",
  titleEn: "Leisure and hobbies",
  minutes: 15,
  summary: "Ich lese gern. Ich spiele Gitarre. Wir gehen schwimmen.",
  englishExplanation:
    'English: I like reading, I play football, I go swimming. "In my free time I..."',
  englishExamples: [
    "In my free time I like reading.",
    "I play the guitar.",
    "We go swimming on Sundays.",
  ],
  germanExplanation:
    "Talk about hobbies with verb + gern: Ich lese gern. Ich spiele gern Fußball.\n\nspielen is for games, sports and instruments: Fußball spielen, Karten spielen, Gitarre spielen. No article before instruments.\n\ngehen + infinitive means going to do something: schwimmen gehen, tanzen gehen, spazieren gehen.\n\nPlaces: ins Kino (to the cinema), ins Konzert, ins Museum, in den Park.\n\nQuestions: Was machst du in deiner Freizeit? Was sind deine Hobbys?",
  comparisonRows: [
    {
      english: "I like reading.",
      german: "Ich lese gern.",
      note: "verb + gern",
    },
    {
      english: "I play the guitar.",
      german: "Ich spiele Gitarre.",
      note: "No article with instruments.",
    },
    {
      english: "We go swimming.",
      german: "Wir gehen schwimmen.",
      note: "gehen + infinitive",
    },
    {
      english: "to the cinema",
      german: "ins Kino",
      note: "in + das = ins",
    },
  ],
  helps: [
    "Many hobby words are international: Fußball, Tennis, Yoga, Gitarre, Musik.",
    'spielen is like "play".',
  ],
  misleads: [
    "No article with instruments: Ich spiele Klavier.",
    'Don\'t say "Ich mag schwimmen". Say "Ich schwimme gern".',
  ],
  examples: [
    {
      de: "In meiner Freizeit lese ich gern.",
      en: "In my free time I like reading.",
    },
    {
      de: "Am Wochenende spiele ich Badminton.",
      en: "At the weekend I play badminton.",
    },
    {
      de: "Wir gehen heute Abend ins Kino.",
      en: "We're going to the cinema this evening.",
    },
    {
      de: "Spielst du ein Instrument?",
      en: "Do you play an instrument?",
    },
    {
      de: "Sonntags gehen wir spazieren.",
      en: "On Sundays we go for a walk.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich spiele die Gitarre.",
      right: "Ich spiele Gitarre.",
      why: "No article with instruments.",
    },
    {
      wrong: "Ich gehe zu schwimmen.",
      right: "Ich gehe schwimmen.",
      why: "gehen + infinitive, without zu.",
    },
    {
      wrong: "Ich mag lesen.",
      right: "Ich lese gern.",
      why: "For activities, use verb + gern.",
    },
  ],
  exercises: [
    {
      id: "free-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the verbs.",
      pairs: [
        {
          left: "lesen",
          right: "read",
        },
        {
          left: "schwimmen",
          right: "swim",
        },
        {
          left: "tanzen",
          right: "dance",
        },
        {
          left: "wandern",
          right: "hike",
        },
        {
          left: "kochen",
          right: "cook",
        },
      ],
    },
    {
      id: "free-fill-ins",
      type: "fillBlank",
      skill: "cases",
      prompt: "Fill in the missing word.",
      sentence: "Wir gehen heute Abend ___ Kino.",
      answers: [["ins"]],
      en: "We're going to the cinema tonight.",
    },
    {
      id: "free-tr-football",
      type: "translate",
      skill: "vocabulary",
      prompt: "Translate.",
      en: "I play football.",
      answers: ["Ich spiele Fußball."],
    },
  ],
  vocab: [
    {
      de: "Freizeit",
      en: "free time",
      article: "die",
    },
    {
      de: "Hobby",
      en: "hobby",
      article: "das",
      plural: "Hobbys",
    },
    {
      de: "Kino",
      en: "cinema",
      article: "das",
      plural: "Kinos",
    },
    {
      de: "spielen",
      en: "to play",
    },
    {
      de: "wandern",
      en: "to hike",
    },
    {
      de: "spazieren gehen",
      en: "to go for a walk",
    },
    {
      de: "Gitarre",
      en: "guitar",
      article: "die",
      plural: "Gitarren",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
