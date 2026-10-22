import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "sein-und-haben",
  slug: "sein-und-haben",
  order: 120,
  unit: "Grammar",
  titleDe: "sein und haben",
  titleEn: "To be and to have: sein and haben",
  category: "grammar",
  minutes: 15,
  summary: "The two most important irregular verbs. Hunger and thirst use haben.",
  englishExplanation:
    '"Be" and "have" are irregular in English too: I am, you are, she is; I have, she has.',
  englishExamples: ["I am tired.", "She is a doctor.", "We have two children.", "He has a car."],
  germanExplanation:
    'sein (to be): ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind.\n\nhaben (to have): ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.\n\nLearn both by heart. You need them all the time, and later as helper verbs for the past (Perfekt).\n\nSome things English says with "be", German says with haben: Ich habe Hunger (I\'m hungry, word for word "I have hunger"), Ich habe Durst (I\'m thirsty), Ich habe keine Zeit.\n\nAge uses sein, as in English: Ich bin 30 Jahre alt.',
  comparisonRows: [
    {
      english: "I am tired.",
      german: "Ich bin müde.",
      note: "Same as English.",
    },
    {
      english: "I'm hungry.",
      german: "Ich habe Hunger.",
      note: "German: I have hunger.",
    },
    {
      english: "I'm 30.",
      german: "Ich bin 30 Jahre alt.",
      note: "Same idea as English.",
    },
    {
      english: "you (all) are",
      german: "ihr seid",
      note: "seid, not seit (since).",
    },
  ],
  helps: [
    "bin and ist look like be and is. hat looks like has.",
    "Like in English, both verbs are irregular, so you learn them as a list.",
  ],
  misleads: [
    "Ich habe Hunger is the normal way to say you're hungry.",
    "ihr seid (you are) and seit (since) sound the same. Spell them differently.",
  ],
  hindiHint:
    "Hindi also talks about hunger as something you have: मुझे भूख लगी है (mujhe bhookh lagi hai). German Ich habe Hunger is closer to Hindi than to English.",
  tables: [
    {
      kind: "conjugation",
      title: "sein and haben",
      verbs: [
        {
          infinitive: "sein",
          forms: ["bin", "bist", "ist", "sind", "seid", "sind"],
          english: "to be",
        },
        {
          infinitive: "haben",
          forms: ["habe", "hast", "hat", "haben", "habt", "haben"],
          english: "to have",
        },
      ],
    },
  ],
  examples: [
    {
      de: "Ich bin Studentin.",
      en: "I'm a student.",
    },
    {
      de: "Bist du müde?",
      en: "Are you tired?",
    },
    {
      de: "Wir haben zwei Kinder.",
      en: "We have two children.",
    },
    {
      de: "Hast du Hunger?",
      en: "Are you hungry?",
      gloss: "Have you hunger?",
    },
    {
      de: "Ihr seid sehr nett.",
      en: "You are very kind.",
    },
    {
      de: "Er hat heute keine Zeit.",
      en: "He has no time today.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich habe 30 Jahre.",
      right: "Ich bin 30 Jahre alt.",
      why: "Age uses sein + alt.",
    },
    {
      wrong: "Er habt ein Auto.",
      right: "Er hat ein Auto.",
      why: "er/sie/es: hat.",
    },
    {
      wrong: "Ihr seit nett.",
      right: "Ihr seid nett.",
      why: "The verb is seid, with d. seit means since.",
    },
  ],
  exercises: [
    {
      id: "sein-conj",
      type: "conjugationTable",
      skill: "conjugation",
      prompt: "Fill in the forms of sein.",
      verb: "sein",
      answers: ["bin", "bist", "ist", "sind", "seid", "sind"],
      given: [2],
      english: "to be",
    },
    {
      id: "sein-fill-hast",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Fill in the right form of haben.",
      sentence: "___ du heute Zeit?",
      answers: [["Hast"]],
      en: "Do you have time today?",
    },
    {
      id: "sein-mc-durst",
      type: "multipleChoice",
      skill: "general",
      prompt: 'How do you say "I\'m thirsty"?',
      question: "I'm thirsty.",
      options: ["Ich bin Durst.", "Ich habe Durst.", "Ich habe durstig."],
      answer: 1,
    },
    {
      id: "sein-tr-tired",
      type: "translate",
      skill: "conjugation",
      prompt: "Translate.",
      en: "We are tired.",
      answers: ["Wir sind müde."],
    },
  ],
  vocab: [
    {
      de: "sein",
      en: "to be",
    },
    {
      de: "haben",
      en: "to have",
    },
    {
      de: "Hunger",
      en: "hunger",
      article: "der",
    },
    {
      de: "Durst",
      en: "thirst",
      article: "der",
    },
    {
      de: "müde",
      en: "tired",
    },
    {
      de: "krank",
      en: "ill, sick",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
