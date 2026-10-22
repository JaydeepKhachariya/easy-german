import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "nicht-kein",
  slug: "nicht-kein",
  order: 160,
  titleDe: "Verneinung: nicht oder kein?",
  titleEn: "Saying no: nicht vs kein",
  category: "grammar",
  unit: "Grammar",
  level: "A1",
  minutes: 20,
  status: "complete",
  summary: "kein replaces ein (or no article) in front of a noun. nicht negates everything else.",
  prerequisites: ["nouns-and-articles", "regular-verbs"],

  englishExplanation: `English makes most sentences negative with "not", usually together with a helper verb: "I do not work", "She is not tired".

With nouns, English has two choices: "I don't have a car" or "I have no car". They mean the same thing. The first one is more common.`,
  englishExamples: [
    "I am not hungry.",
    "I don't have a car.",
    "I have no time.",
    "She doesn't drink coffee.",
  ],

  germanExplanation: `German has two words for this, and the choice depends on what you negate.

Use kein in front of a noun that would otherwise have ein, or no article at all. Ich habe ein Auto becomes Ich habe kein Auto. Ich habe Zeit becomes Ich habe keine Zeit. Think of kein as "no" or "not a".

kein takes the same endings as ein: kein Hund, keine Katze, kein Kind. In the plural, where ein has no form, you use keine: keine Kinder.

Use nicht for everything else: verbs, adjectives, adverbs, names, and nouns with der/die/das or mein/dein. Ich arbeite nicht. Ich bin nicht müde. Das ist nicht mein Handy.

Where does nicht go? To negate a whole sentence, put nicht late: after the object and after time words. But it comes before adjectives, before most place phrases, and before the second verb part at the end. Ich kaufe das Buch nicht. Ich wohne nicht in Berlin. Ich kann heute nicht kommen.

German doesn't need "do". It's "Ich arbeite nicht", never "Ich tue nicht arbeiten".`,

  comparisonRows: [
    { english: "I'm not tired.", german: "Ich bin nicht müde.", note: "Adjective: nicht." },
    {
      english: "I don't work on Sunday.",
      german: "Am Sonntag arbeite ich nicht.",
      note: 'No "do" in German. nicht goes after the verb.',
    },
    {
      english: "I don't have a car.",
      german: "Ich habe kein Auto.",
      note: "ein Auto becomes kein Auto.",
    },
    {
      english: "I have no time.",
      german: "Ich habe keine Zeit.",
      note: "Noun without an article: kein.",
    },
    {
      english: "That's not my phone.",
      german: "Das ist nicht mein Handy.",
      note: "mein, dein, sein: use nicht.",
    },
    {
      english: "I'm not buying the book.",
      german: "Ich kaufe das Buch nicht.",
      note: "der/die/das + noun: nicht, usually at the end.",
    },
  ],

  helps: [
    'kein works like English "no": I have no time. Ich habe keine Zeit.',
    'With adjectives, nicht is used just like "not": not tired, nicht müde.',
  ],
  misleads: [
    'English says "I don\'t have a car" with "not". German doesn\'t say "Ich habe nicht ein Auto". It says Ich habe kein Auto.',
    "English needs \"do\": I don't work. German doesn't: Ich arbeite nicht.",
    'English "not" sits right after the helper verb. German nicht often moves toward the end: Ich verstehe das nicht.',
  ],
  hindiHint:
    "Hindi नहीं (nahin) covers both cases: मेरे पास गाड़ी नहीं है (mere paas gaadi nahin hai), मैं थका नहीं हूँ (main thaka nahin hoon). German splits them. Ask yourself: is there a noun with ein, or with no article? Then use kein. Otherwise use nicht.",

  tables: [
    {
      kind: "articles",
      title: "kein has the same endings as ein",
      rows: [
        { label: "ein (subject)", cells: ["ein", "eine", "ein", "–"] },
        { label: "kein (subject)", cells: ["kein", "keine", "kein", "keine"] },
        { label: "kein (object, Akkusativ)", cells: ["keinen", "keine", "kein", "keine"] },
      ],
    },
    {
      kind: "generic",
      title: "Where nicht goes",
      headers: ["Sentence", "nicht goes..."],
      rows: [
        ["Ich arbeite heute nicht.", "after the verb and after time words"],
        ["Ich kaufe das Buch nicht.", "after a der/die/das object"],
        ["Ich bin nicht müde.", "before an adjective"],
        ["Ich kann heute nicht kommen.", "before the infinitive at the end"],
        ["Ich wohne nicht in Berlin.", "before most place phrases"],
        ["Das ist nicht mein Handy.", "before mein/dein + noun"],
      ],
    },
  ],

  diagrams: [
    {
      kind: "wordOrder",
      caption: 'No "do" in German. nicht comes after the verb and the time word.',
      english: [
        { text: "I", role: "subject" },
        { text: "don't", role: "negation" },
        { text: "work", role: "verb" },
        { text: "today", role: "time" },
      ],
      german: [
        { text: "Ich", role: "subject" },
        { text: "arbeite", role: "verb" },
        { text: "heute", role: "time" },
        { text: "nicht", role: "negation" },
      ],
    },
  ],

  examples: [
    {
      de: "Ich habe heute keine Zeit.",
      en: "I have no time today.",
      gloss: "I have today no time",
    },
    { de: "Er hat kein Auto.", en: "He doesn't have a car.", gloss: "He has no car" },
    { de: "Wir haben keine Kinder.", en: "We don't have children.", gloss: "We have no children" },
    { de: "Ich bin nicht müde.", en: "I'm not tired.", gloss: "I am not tired" },
    {
      de: "Sie arbeitet am Montag nicht.",
      en: "She doesn't work on Monday.",
      gloss: "She works on-the Monday not",
    },
    {
      de: "Das ist nicht mein Kaffee.",
      en: "That's not my coffee.",
      gloss: "That is not my coffee",
    },
    {
      de: "Ich verstehe das nicht.",
      en: "I don't understand that.",
      gloss: "I understand that not",
    },
    { de: "Das ist kein Problem.", en: "That's no problem.", gloss: "That is no problem" },
    { de: "Ich trinke keinen Alkohol.", en: "I don't drink alcohol.", gloss: "I drink no alcohol" },
    {
      de: "Ich wohne nicht in Berlin.",
      en: "I don't live in Berlin.",
      gloss: "I live not in Berlin",
    },
  ],

  mistakes: [
    {
      wrong: "Ich habe nicht ein Auto.",
      right: "Ich habe kein Auto.",
      why: "ein + noun becomes kein + noun.",
    },
    {
      wrong: "Ich habe nicht Zeit.",
      right: "Ich habe keine Zeit.",
      why: "A noun with no article is negated with kein.",
    },
    {
      wrong: "Ich bin kein müde.",
      right: "Ich bin nicht müde.",
      why: "müde is an adjective. Adjectives take nicht.",
    },
    {
      wrong: "Ich nicht arbeite heute.",
      right: "Ich arbeite heute nicht.",
      why: "The verb keeps position 2. nicht comes later.",
    },
    {
      wrong: "Das ist kein mein Buch.",
      right: "Das ist nicht mein Buch.",
      why: "mein already does the job of an article, so use nicht.",
    },
    {
      wrong: "Ich habe keine zeit.",
      right: "Ich habe keine Zeit.",
      why: "Zeit is a noun. German nouns always start with a capital letter.",
    },
  ],

  exercises: [
    {
      id: "neg-mc-zeit",
      type: "multipleChoice",
      skill: "negation",
      prompt: "nicht, kein or keine?",
      question: "Ich habe heute ___ Zeit.",
      options: ["nicht", "kein", "keine"],
      answer: 2,
      explanation: "Zeit has no article and is feminine (die Zeit), so: keine Zeit.",
    },
    {
      id: "neg-fill-problem",
      type: "fillBlank",
      skill: "negation",
      prompt: "Fill in nicht or the right form of kein.",
      sentence: "Das ist ___ Problem.",
      answers: [["kein"]],
      en: "That's no problem.",
    },
    {
      id: "neg-fill-muede",
      type: "fillBlank",
      skill: "negation",
      prompt: "Fill in nicht or the right form of kein.",
      sentence: "Ich bin heute ___ müde.",
      answers: [["nicht"]],
      en: "I'm not tired today.",
    },
    {
      id: "neg-fill-kinder",
      type: "fillBlank",
      skill: "negation",
      prompt: "Fill in nicht or the right form of kein.",
      sentence: "Wir haben ___ Kinder.",
      answers: [["keine"]],
      en: "We don't have children.",
    },
    {
      id: "neg-mc-frage",
      type: "multipleChoice",
      skill: "negation",
      prompt: "Make this negative: Ich verstehe die Frage.",
      question: "I don't understand the question.",
      options: [
        "Ich verstehe nicht die Frage.",
        "Ich verstehe die Frage nicht.",
        "Ich verstehe keine Frage.",
      ],
      answer: 1,
      explanation:
        'die Frage has der/die/das, so use nicht, at the end. "keine Frage" would mean "no question at all".',
    },
    {
      id: "neg-translate-auto",
      type: "translate",
      skill: "negation",
      prompt: "Translate.",
      en: "I don't have a car.",
      answers: ["Ich habe kein Auto."],
    },
    {
      id: "neg-translate-home",
      type: "translate",
      skill: "negation",
      prompt: "Translate.",
      en: "She isn't at home.",
      answers: ["Sie ist nicht zu Hause.", "Sie ist nicht daheim."],
    },
    {
      id: "neg-order-sonntag",
      type: "reorderWords",
      skill: "negation",
      prompt: "Put the words in order.",
      words: ["ich", "arbeite", "am", "Sonntag", "nicht"],
      alsoAccept: [["am", "Sonntag", "arbeite", "ich", "nicht"]],
      en: "I don't work on Sunday.",
    },
    {
      id: "neg-articles",
      type: "articlePick",
      skill: "articles",
      prompt: "kein follows the gender of the noun. Pick der, die or das for each one.",
      nouns: [
        { noun: "Auto", article: "das", en: "car" },
        { noun: "Zeit", article: "die", en: "time" },
        { noun: "Hund", article: "der", en: "dog" },
        { noun: "Problem", article: "das", en: "problem" },
        { noun: "Frage", article: "die", en: "question" },
        { noun: "Kaffee", article: "der", en: "coffee" },
      ],
    },
    {
      id: "neg-translate-tasche",
      type: "translate",
      skill: "negation",
      prompt: "Translate. die Tasche = the bag.",
      en: "That's not my bag.",
      answers: ["Das ist nicht meine Tasche."],
    },
  ],

  vocab: [
    { de: "Zeit", en: "time", article: "die", plural: "Zeiten" },
    { de: "Auto", en: "car", article: "das", plural: "Autos" },
    { de: "Problem", en: "problem", article: "das", plural: "Probleme" },
    { de: "Kind", en: "child", article: "das", plural: "Kinder" },
    { de: "Frage", en: "question", article: "die", plural: "Fragen" },
    { de: "Handy", en: "mobile phone", article: "das", plural: "Handys" },
    { de: "Tasche", en: "bag", article: "die", plural: "Taschen" },
    { de: "müde", en: "tired" },
    { de: "verstehen", en: "to understand" },
  ],
} satisfies ConceptInput;

export default concept;
