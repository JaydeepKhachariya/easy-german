import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "w-questions",
  slug: "w-questions",
  order: 130,
  unit: "Grammar",
  titleDe: "W-Fragen",
  titleEn: "Question words: who, what, where",
  category: "grammar",
  minutes: 15,
  summary: 'Question word first, verb second, no "do". Careful: wer is who, wo is where.',
  englishExplanation:
    'English question words mostly start with wh-: who, what, where, when, why, which, plus how. Most questions also need a helper verb: "Where do you live?"',
  englishExamples: [
    "Where do you live?",
    "What is your name?",
    "When does the course start?",
    "How are you?",
  ],
  germanExplanation:
    'German question words start with w: wer (who), was (what), wo (where), woher (where from), wohin (where to), wann (when), warum (why), wie (how), welcher (which), wie viel (how much).\n\nWord order: question word in position 1, verb in position 2, then the subject. There\'s no helper like "do": Wo wohnst du? Word for word: Where live you?\n\nWatch out: wer means who, not where. Where is wo.',
  comparisonRows: [
    {
      english: "Where do you live?",
      german: "Wo wohnst du?",
      note: 'No "do". Verb in position 2.',
    },
    {
      english: "Who is that?",
      german: "Wer ist das?",
      note: "wer = who",
    },
    {
      english: "Where are you from?",
      german: "Woher kommst du?",
      note: "woher = from where",
    },
    {
      english: "Where are you going?",
      german: "Wohin gehst du?",
      note: "wohin = to where",
    },
  ],
  helps: [
    "Question words start with w, like English wh-.",
    'The verb comes second, as in English "Where is...".',
  ],
  misleads: [
    "wer means who. wo means where.",
    'German has three "where" words: wo, woher, wohin.',
    "Never add a helper: Was machst du?",
  ],
  tables: [
    {
      kind: "generic",
      title: "Question words",
      headers: ["German", "English", "Example"],
      rows: [
        ["wer", "who", "Wer ist das?"],
        ["was", "what", "Was machst du?"],
        ["wo", "where", "Wo wohnst du?"],
        ["woher", "where from", "Woher kommen Sie?"],
        ["wohin", "where to", "Wohin fährst du?"],
        ["wann", "when", "Wann beginnt der Kurs?"],
        ["warum", "why", "Warum lernst du Deutsch?"],
        ["wie", "how", "Wie heißt du?"],
        ["wie viel", "how much", "Wie viel kostet das?"],
      ],
    },
  ],
  diagrams: [
    {
      kind: "wordOrder",
      caption: "No helper verb: the main verb itself takes position 2.",
      english: [
        {
          text: "Where",
          role: "question",
        },
        {
          text: "do",
          role: "verb",
        },
        {
          text: "you",
          role: "subject",
        },
        {
          text: "live",
          role: "other",
        },
      ],
      german: [
        {
          text: "Wo",
          role: "question",
        },
        {
          text: "wohnst",
          role: "verb",
        },
        {
          text: "du",
          role: "subject",
        },
      ],
    },
  ],
  examples: [
    {
      de: "Wie heißen Sie?",
      en: "What's your name?",
      gloss: "How are-called you?",
    },
    {
      de: "Woher kommst du?",
      en: "Where are you from?",
    },
    {
      de: "Wann beginnt der Deutschkurs?",
      en: "When does the German course start?",
    },
    {
      de: "Warum lernst du Deutsch?",
      en: "Why are you learning German?",
    },
    {
      de: "Wie viel kostet das Ticket?",
      en: "How much does the ticket cost?",
    },
  ],
  mistakes: [
    {
      wrong: "Wer wohnst du?",
      right: "Wo wohnst du?",
      why: "wer = who, wo = where.",
    },
    {
      wrong: "Wo du wohnst?",
      right: "Wo wohnst du?",
      why: "In a question the verb comes straight after the question word.",
    },
    {
      wrong: "Wo kommst du?",
      right: "Woher kommst du?",
      why: "For where someone comes from, use woher.",
    },
  ],
  exercises: [
    {
      id: "wq-mc-woher",
      type: "multipleChoice",
      skill: "word-order",
      prompt: "Pick the question word.",
      question: "___ kommst du? – Aus Indien.",
      options: ["Wo", "Woher", "Wohin"],
      answer: 1,
    },
    {
      id: "wq-order-wann",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order.",
      words: ["wann", "beginnt", "der", "Kurs"],
      alsoAccept: [],
      en: "When does the course start?",
    },
    {
      id: "wq-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the question words.",
      pairs: [
        {
          left: "wer",
          right: "who",
        },
        {
          left: "wann",
          right: "when",
        },
        {
          left: "warum",
          right: "why",
        },
        {
          left: "wie",
          right: "how",
        },
        {
          left: "wo",
          right: "where",
        },
      ],
    },
    {
      id: "wq-tr-doing",
      type: "translate",
      skill: "verb-position",
      prompt: "Translate.",
      en: "What are you doing?",
      answers: ["Was machst du?", "Was machen Sie?", "Was macht ihr?"],
    },
  ],
  vocab: [
    {
      de: "wer",
      en: "who",
    },
    {
      de: "was",
      en: "what",
    },
    {
      de: "wo",
      en: "where",
    },
    {
      de: "woher",
      en: "where from",
    },
    {
      de: "wann",
      en: "when",
    },
    {
      de: "warum",
      en: "why",
    },
    {
      de: "wie",
      en: "how",
    },
  ],
  level: "A1",
  status: "draft",
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
