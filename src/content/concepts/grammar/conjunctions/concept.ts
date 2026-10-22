import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "conjunctions",
  slug: "conjunctions",
  order: 310,
  unit: "Grammar",
  titleDe: "und, aber, oder, denn",
  titleEn: "Joining sentences: und, aber, oder, denn",
  category: "grammar",
  minutes: 15,
  summary:
    "These four take no position. The next clause starts as normal, with the verb in position 2.",
  englishExplanation:
    "English joins sentences with and, but, or, because. The word order after them doesn't change.",
  englishExamples: [
    "I'm tired, but I'm still working.",
    "Tea or coffee?",
    "I'm learning German because I want to work in Germany.",
  ],
  germanExplanation:
    "und (and), aber (but), oder (or) and denn (because) join two main clauses. They don't take a position. They sit in front of position 1, and the next clause starts normally, with the verb in position 2.\n\nIch bin müde, aber ich arbeite noch.\n\nIch lerne Deutsch, denn ich will in Deutschland arbeiten.\n\nPut a comma before aber and denn. Before und and oder there's usually no comma.\n\ndenn and weil both mean because, but weil sends the verb to the end. At A1, use denn.",
  comparisonRows: [
    {
      english: "I'm tired, but I'm still working.",
      german: "Ich bin müde, aber ich arbeite noch.",
      note: "aber in front of position 1, verb still second",
    },
    {
      english: "I'm learning German because I want to work in Germany.",
      german: "Ich lerne Deutsch, denn ich will in Deutschland arbeiten.",
      note: "denn: normal order",
    },
    {
      english: "Tea or coffee?",
      german: "Tee oder Kaffee?",
      note: "Same as English.",
    },
    {
      english: "...and then I go home.",
      german: "...und dann gehe ich nach Hause.",
      note: "dann takes position 1, so the verb follows it.",
    },
  ],
  helps: [
    "und, aber and oder work like and, but and or.",
    "After these four, the clause keeps its normal order, as in English.",
  ],
  misleads: [
    'und dann + verb: "und dann gehe ich", not "und dann ich gehe".',
    'denn doesn\'t mean "then". Then is dann.',
  ],
  diagrams: [
    {
      kind: "wordOrder",
      caption: "aber takes no position. The verb is still second.",
      english: [
        {
          text: "but",
          role: "conjunction",
        },
        {
          text: "I",
          role: "subject",
        },
        {
          text: "work",
          role: "verb",
        },
        {
          text: "late",
          role: "time",
        },
      ],
      german: [
        {
          text: "aber",
          role: "conjunction",
        },
        {
          text: "ich",
          role: "subject",
        },
        {
          text: "arbeite",
          role: "verb",
        },
        {
          text: "lange",
          role: "time",
        },
      ],
    },
  ],
  examples: [
    {
      de: "Ich trinke Tee, aber mein Mann trinkt Kaffee.",
      en: "I drink tea, but my husband drinks coffee.",
    },
    {
      de: "Kommst du heute oder morgen?",
      en: "Are you coming today or tomorrow?",
    },
    {
      de: "Ich bleibe zu Hause, denn ich bin krank.",
      en: "I'm staying at home because I'm ill.",
    },
    {
      de: "Ich koche und meine Schwester deckt den Tisch.",
      en: "I cook and my sister sets the table.",
    },
    {
      de: "Ich arbeite bis fünf und dann gehe ich einkaufen.",
      en: "I work until five and then I go shopping.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich bleibe zu Hause, denn ich krank bin.",
      right: "Ich bleibe zu Hause, denn ich bin krank.",
      why: "After denn, the verb stays in position 2.",
    },
    {
      wrong: "Und dann ich gehe nach Hause.",
      right: "Und dann gehe ich nach Hause.",
      why: "dann is in position 1, so the verb comes next.",
    },
    {
      wrong: "Ich lerne viel, dann ich will den Test bestehen.",
      right: "Ich lerne viel, denn ich will den Test bestehen.",
      why: "Because = denn. dann means then.",
    },
  ],
  exercises: [
    {
      id: "conj-mc-denn",
      type: "multipleChoice",
      skill: "word-order",
      prompt: "Pick the word.",
      question: "Ich komme nicht, ___ ich habe keine Zeit.",
      options: ["aber", "denn", "oder"],
      answer: 1,
    },
    {
      id: "conj-fill-oder",
      type: "fillBlank",
      skill: "general",
      prompt: "Fill in the word.",
      sentence: "Möchtest du Tee ___ Kaffee?",
      answers: [["oder"]],
      en: "Would you like tea or coffee?",
    },
    {
      id: "conj-order-aber",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order.",
      words: ["aber", "ich", "habe", "keine", "Zeit"],
      alsoAccept: [],
      en: "...but I have no time.",
    },
    {
      id: "conj-tr-tired",
      type: "translate",
      skill: "word-order",
      prompt: "Translate.",
      en: "I'm tired, but I'm working.",
      answers: ["Ich bin müde, aber ich arbeite."],
    },
  ],
  vocab: [
    {
      de: "und",
      en: "and",
    },
    {
      de: "aber",
      en: "but",
    },
    {
      de: "oder",
      en: "or",
    },
    {
      de: "denn",
      en: "because",
    },
    {
      de: "dann",
      en: "then",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
