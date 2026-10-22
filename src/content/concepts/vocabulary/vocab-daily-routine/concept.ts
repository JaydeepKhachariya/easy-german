import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-daily-routine",
  slug: "vocab-daily-routine",
  order: 430,
  titleDe: "Der Tagesablauf",
  titleEn: "Daily routine",
  minutes: 20,
  summary:
    "aufstehen, frühstücken, duschen, einkaufen. Structure your day with zuerst, dann and danach.",
  englishExplanation:
    "English describes the day like this: I get up, have a shower, have breakfast, go to work, come home, go to bed.",
  englishExamples: [
    "I get up at seven.",
    "First I have a shower, then I have breakfast.",
    "I go to bed at eleven.",
  ],
  germanExplanation:
    'Many routine verbs are separable: aufstehen (Ich stehe um 7 Uhr auf), einkaufen, fernsehen, anfangen.\n\nSome take mich/dich/sich: sich anziehen (Ich ziehe mich an), sich waschen.\n\nEnglish "have breakfast" and "have a shower" are single verbs in German: Ich frühstücke. Ich dusche.\n\nUse time words to give order: zuerst (first), dann (then), danach (after that), am Abend. Each one takes position 1, so the verb comes next: Zuerst dusche ich, dann frühstücke ich.',
  comparisonRows: [
    {
      english: "I get up at seven.",
      german: "Ich stehe um sieben auf.",
      note: "Separable: auf at the end",
    },
    {
      english: "I have breakfast.",
      german: "Ich frühstücke.",
      note: 'One verb, no "have".',
    },
    {
      english: "I get dressed.",
      german: "Ich ziehe mich an.",
      note: "With mich, and separable",
    },
    {
      english: "First I shower, then...",
      german: "Zuerst dusche ich, dann...",
      note: "Verb right after zuerst or dann",
    },
  ],
  helps: [
    "The order of the day is the same in both languages, so it's easy to plan what you'll say.",
    "Many routine verbs are one word: frühstücken, duschen.",
  ],
  misleads: [
    '"Have breakfast" and "have a shower" don\'t use haben: Ich frühstücke. Ich dusche.',
    "After zuerst or dann, the verb comes before the subject.",
  ],
  examples: [
    {
      de: "Ich stehe jeden Tag um halb sieben auf.",
      en: "I get up at half past six every day.",
    },
    {
      de: "Zuerst dusche ich, dann frühstücke ich.",
      en: "First I shower, then I have breakfast.",
    },
    {
      de: "Um acht Uhr fahre ich zur Arbeit.",
      en: "At eight I go to work.",
    },
    {
      de: "Am Abend koche ich und sehe fern.",
      en: "In the evening I cook and watch TV.",
    },
    {
      de: "Ich gehe um elf Uhr ins Bett.",
      en: "I go to bed at eleven.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich habe Frühstück um acht.",
      right: "Ich frühstücke um acht.",
      why: "German uses the verb frühstücken.",
    },
    {
      wrong: "Dann ich gehe zur Arbeit.",
      right: "Dann gehe ich zur Arbeit.",
      why: "dann takes position 1. The verb comes next.",
    },
    {
      wrong: "Ich aufstehe um sechs.",
      right: "Ich stehe um sechs auf.",
      why: "Separable: auf goes to the end.",
    },
  ],
  exercises: [
    {
      id: "day-order-zuerst",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order. Start with zuerst.",
      words: ["zuerst", "dusche", "ich"],
      alsoAccept: [["ich", "dusche", "zuerst"]],
      en: "First I take a shower.",
    },
    {
      id: "day-fill-auf",
      type: "fillBlank",
      skill: "verb-position",
      prompt: "Fill in the prefix.",
      sentence: "Ich stehe um sieben Uhr ___.",
      answers: [["auf"]],
      en: "I get up at seven.",
    },
    {
      id: "day-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the verbs.",
      pairs: [
        {
          left: "aufstehen",
          right: "get up",
        },
        {
          left: "frühstücken",
          right: "have breakfast",
        },
        {
          left: "duschen",
          right: "have a shower",
        },
        {
          left: "einkaufen",
          right: "do the shopping",
        },
        {
          left: "fernsehen",
          right: "watch TV",
        },
      ],
    },
    {
      id: "day-tr-bed",
      type: "translate",
      skill: "word-order",
      prompt: "Translate.",
      en: "I go to bed at ten.",
      answers: [
        "Ich gehe um zehn ins Bett.",
        "Ich gehe um zehn Uhr ins Bett.",
        "Um zehn gehe ich ins Bett.",
        "Um zehn Uhr gehe ich ins Bett.",
      ],
    },
  ],
  vocab: [
    {
      de: "aufstehen",
      en: "to get up",
    },
    {
      de: "frühstücken",
      en: "to have breakfast",
    },
    {
      de: "duschen",
      en: "to have a shower",
    },
    {
      de: "sich anziehen",
      en: "to get dressed",
    },
    {
      de: "einkaufen",
      en: "to do the shopping",
    },
    {
      de: "fernsehen",
      en: "to watch TV",
    },
    {
      de: "Tagesablauf",
      en: "daily routine",
      article: "der",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
