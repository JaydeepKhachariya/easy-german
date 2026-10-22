import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "du-ihr-sie",
  slug: "du-ihr-sie",
  order: 170,
  unit: "Grammar",
  titleDe: "du, ihr oder Sie?",
  titleEn: 'Formal and informal "you"',
  category: "grammar",
  minutes: 20,
  summary:
    "du for one friend, ihr for friends, Sie for formal. Once you pick Sie, keep Ihnen and Ihr too.",
  englishExplanation:
    'English has one "you" for everyone. You show politeness with other words: "could you", "sir", "please".',
  englishExamples: ["Are you coming?", "Could you help me, please?", "Is this your bag?"],
  germanExplanation:
    "German has three words for \"you\":\n\n- du: one person you know well (friends, family, children, classmates)\n- ihr: two or more people you'd each call du\n- Sie: formal, for one or more people (strangers, officials, customers, your landlord, often colleagues). Always with a capital S.\n\nSie takes the same verb form as sie (they): Sie wohnen. The matching words also have a capital: Ihnen (to you), Ihr/Ihre (your).\n\nDon't mix them. If you start with Sie, keep Sie, Ihnen and Ihr for the whole conversation or letter. Switching to du is offered by the other person, usually the older one or the boss.\n\nIn the Start Deutsch 1 exam, formal letters and parts of the speaking test need Sie.",
  comparisonRows: [
    {
      english: "Are you coming? (friend)",
      german: "Kommst du?",
      note: "du + -st",
    },
    {
      english: "Are you coming? (two friends)",
      german: "Kommt ihr?",
      note: "ihr + -t",
    },
    {
      english: "Are you coming? (formal)",
      german: "Kommen Sie?",
      note: "Sie + -en",
    },
    {
      english: "Can I help you?",
      german: "Kann ich Ihnen helfen?",
      note: "Ihnen with a capital I",
    },
    {
      english: "your name (formal)",
      german: "Ihr Name",
      note: "Ihr with a capital I",
    },
  ],
  helps: [
    'The politeness of "could you" is built into Sie, so the rest of the sentence can stay simple.',
  ],
  misleads: [
    'English has one "you". In German, du with a stranger can sound rude.',
    "sie (they) and Sie (you) sound the same. In writing, the capital matters.",
  ],
  hindiHint:
    "Think of आप and तुम. Where you'd say आप, use Sie. Where you'd say तुम, use du. Just as you wouldn't mix आप and तुम in one sentence, don't mix Sie and du.",
  tables: [
    {
      kind: "generic",
      title: "The three forms",
      headers: ["", "du", "ihr", "Sie"],
      rows: [
        ["kommen", "du kommst", "ihr kommt", "Sie kommen"],
        ["to you", "dir", "euch", "Ihnen"],
        ["your", "dein / deine", "euer / eure", "Ihr / Ihre"],
        ["sein", "du bist", "ihr seid", "Sie sind"],
      ],
    },
  ],
  examples: [
    {
      de: "Wie heißt du?",
      en: "What's your name? (informal)",
    },
    {
      de: "Wie heißen Sie?",
      en: "What's your name? (formal)",
    },
    {
      de: "Was macht ihr am Wochenende?",
      en: "What are you doing at the weekend? (to friends)",
    },
    {
      de: "Kann ich Ihnen helfen?",
      en: "Can I help you? (formal)",
    },
    {
      de: "Ist das Ihr Koffer?",
      en: "Is that your suitcase? (formal)",
    },
  ],
  mistakes: [
    {
      wrong: "Können Sie mir helfen? Ich danke dir!",
      right: "Können Sie mir helfen? Ich danke Ihnen!",
      why: "Stay with Sie: Ihnen, not dir.",
    },
    {
      wrong: "Wie heißt Sie?",
      right: "Wie heißen Sie?",
      why: "Sie takes the -en form: Sie heißen.",
    },
    {
      wrong: "Haben sie Zeit? (asking your doctor)",
      right: "Haben Sie Zeit?",
      why: "Formal Sie always has a capital S.",
    },
  ],
  exercises: [
    {
      id: "you-mc-station",
      type: "multipleChoice",
      skill: "formal-address",
      prompt: "You ask a stranger at the station for the time.",
      question: "Pick the polite question.",
      options: [
        "Weißt du, wie spät es ist?",
        "Entschuldigung, wissen Sie, wie spät es ist?",
        "Hey, wisst ihr die Uhrzeit?",
      ],
      answer: 1,
    },
    {
      id: "you-fill-ihnen",
      type: "fillBlank",
      skill: "formal-address",
      prompt: 'Formal: fill in "you".',
      sentence: "Kann ich ___ helfen?",
      answers: [["Ihnen"]],
      en: "Can I help you?",
    },
    {
      id: "you-fill-kommt",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Write the right form of kommen.",
      sentence: "Woher ___ ihr?",
      answers: [["kommt"]],
      en: "Where are you from? (to friends)",
    },
    {
      id: "you-tr-formal",
      type: "translate",
      skill: "formal-address",
      prompt: 'Translate. Use the formal "you".',
      en: "Where do you live?",
      answers: ["Wo wohnen Sie?"],
    },
  ],
  vocab: [
    {
      de: "duzen",
      en: "to say du to someone",
    },
    {
      de: "siezen",
      en: "to say Sie to someone",
    },
    {
      de: "Entschuldigung",
      en: "excuse me, sorry",
    },
    {
      de: "Herr",
      en: "Mr, gentleman",
      article: "der",
      plural: "Herren",
    },
    {
      de: "Koffer",
      en: "suitcase",
      article: "der",
      plural: "Koffer",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
