import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "imperative",
  slug: "imperative",
  order: 260,
  unit: "Grammar",
  titleDe: "Der Imperativ",
  titleEn: "Giving instructions: the imperative",
  category: "grammar",
  minutes: 20,
  summary: 'Komm! Kommt! Kommen Sie! One command form for each kind of "you".',
  englishExplanation:
    'English commands use the base verb without a subject: "Come here!", "Please sit down." One form works for everyone.',
  englishExamples: ["Come here!", "Please sit down.", "Call me tomorrow."],
  germanExplanation:
    'German has three forms, one for each "you":\n\n- du: verb stem, no du: Komm! Mach das! Warte!\n- ihr: the ihr form, without ihr: Kommt! Macht das!\n- Sie: verb first, and Sie stays: Kommen Sie! Warten Sie bitte!\n\nVerbs with e → i or e → ie keep the change in the du form but drop the -st: du sprichst → Sprich langsam! du liest → Lies das! Verbs with a → ä don\'t change: Fahr langsam!\n\nSeparable verbs send the prefix to the end: Steh auf! Rufen Sie mich an!\n\nsein is irregular: Sei ruhig! Seid ruhig! Seien Sie ruhig!\n\nAdd bitte to sound polite: Hilf mir bitte! Kommen Sie bitte herein!',
  comparisonRows: [
    {
      english: "Come! (friend)",
      german: "Komm!",
      note: "du: stem only",
    },
    {
      english: "Come! (friends)",
      german: "Kommt!",
      note: "ihr: the ihr form without ihr",
    },
    {
      english: "Come in, please. (formal)",
      german: "Kommen Sie bitte herein!",
      note: "Sie: verb first, keep Sie",
    },
    {
      english: "Speak slowly!",
      german: "Sprich langsam!",
      note: "e → i stays in the du form.",
    },
    {
      english: "Get up!",
      german: "Steh auf!",
      note: "Prefix at the end.",
    },
  ],
  helps: [
    "As in English, the du and ihr forms drop the pronoun.",
    "bitte works like please and fits almost anywhere.",
  ],
  misleads: [
    "The formal command keeps Sie: Warten Sie!, not just Warten!",
    "Don't add -st: Komm!, not Kommst!",
  ],
  tables: [
    {
      kind: "generic",
      title: "Command forms",
      headers: ["Verb", "du", "ihr", "Sie"],
      rows: [
        ["kommen", "Komm!", "Kommt!", "Kommen Sie!"],
        ["warten", "Warte!", "Wartet!", "Warten Sie!"],
        ["sprechen", "Sprich!", "Sprecht!", "Sprechen Sie!"],
        ["aufstehen", "Steh auf!", "Steht auf!", "Stehen Sie auf!"],
        ["sein", "Sei ruhig!", "Seid ruhig!", "Seien Sie ruhig!"],
      ],
    },
  ],
  examples: [
    {
      de: "Komm bitte mit!",
      en: "Please come along!",
    },
    {
      de: "Hilf mir bitte!",
      en: "Help me, please!",
    },
    {
      de: "Wartet hier!",
      en: "Wait here! (to friends)",
    },
    {
      de: "Sprechen Sie bitte langsam.",
      en: "Please speak slowly.",
    },
    {
      de: "Öffnen Sie bitte das Fenster.",
      en: "Please open the window.",
    },
    {
      de: "Ruf mich morgen an!",
      en: "Call me tomorrow!",
    },
  ],
  mistakes: [
    {
      wrong: "Wartest bitte!",
      right: "Warte bitte!",
      why: "The du command has no -st.",
    },
    {
      wrong: "Warten bitte! (to a stranger)",
      right: "Warten Sie bitte!",
      why: "Formal commands keep Sie.",
    },
    {
      wrong: "Sprech langsam!",
      right: "Sprich langsam!",
      why: "e → i verbs keep the change in the du command.",
    },
  ],
  exercises: [
    {
      id: "imp-fill-sprich",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Write the du command of sprechen.",
      sentence: "___ bitte langsam!",
      answers: [["Sprich"]],
      en: "Speak slowly, please!",
    },
    {
      id: "imp-mc-formal",
      type: "multipleChoice",
      skill: "formal-address",
      prompt: 'Formal: "Please sit down."',
      question: "Pick the formal command.",
      options: ["Setz dich bitte!", "Setzen Sie sich bitte!", "Setzt euch bitte!"],
      answer: 1,
    },
    {
      id: "imp-tr-wait",
      type: "translate",
      skill: "conjugation",
      prompt: "Translate. You're talking to one friend.",
      en: "Wait here!",
      answers: ["Warte hier!"],
    },
    {
      id: "imp-order-auf",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order.",
      words: ["steh", "bitte", "auf"],
      alsoAccept: [],
      en: "Get up, please!",
    },
  ],
  vocab: [
    {
      de: "warten",
      en: "to wait",
    },
    {
      de: "öffnen",
      en: "to open",
    },
    {
      de: "Fenster",
      en: "window",
      article: "das",
      plural: "Fenster",
    },
    {
      de: "langsam",
      en: "slow, slowly",
    },
    {
      de: "bitte",
      en: "please",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
