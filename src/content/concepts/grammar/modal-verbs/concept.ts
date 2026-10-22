import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "modal-verbs",
  slug: "modal-verbs",
  order: 270,
  titleDe: "Modalverben",
  titleEn: "Modal verbs: can, must, want to",
  category: "grammar",
  unit: "Grammar",
  level: "A1",
  minutes: 25,
  status: "complete",
  summary:
    "können, müssen, dürfen, sollen, wollen and möchten. The modal goes in position 2 and the main verb waits at the end.",
  prerequisites: ["regular-verbs", "sein-und-haben"],

  englishExplanation: `English modals are small helper words: can, must, may, should. They never change. You say "I can" and "he can", never "he cans".

The main verb comes straight after the modal, in its base form: "She can swim." A few modal-like phrases add "to": "I want to go", "I have to work".`,
  englishExamples: [
    "I can swim.",
    "She must work tomorrow.",
    "We want to go home.",
    "Would you like a coffee?",
  ],

  germanExplanation: `At A1 you need six modal verbs: können (can), müssen (must, have to), dürfen (may, be allowed to), sollen (should, be supposed to), wollen (want to) and möchten (would like to).

Two things work differently from English.

First, the sentence splits. The modal is conjugated and sits in position 2. The main verb stays in the infinitive and goes to the very end: Ich kann morgen nicht kommen.

Second, the singular forms are irregular. ich and er/sie/es look the same and have no ending: ich kann, er kann. Most modals also change their vowel in the singular: können becomes kann, müssen becomes muss, dürfen becomes darf, wollen becomes will. The plural forms (wir, ihr, sie/Sie) are regular.

German never puts zu after a modal. It is "Ich will gehen", not "Ich will zu gehen".

When the main verb is obvious, people drop it: Ich muss nach Hause. Ich möchte einen Kaffee. That's normal, everyday German.`,

  comparisonRows: [
    {
      english: "I can swim.",
      german: "Ich kann schwimmen.",
      note: "Modal in position 2, infinitive at the end.",
    },
    {
      english: "I can't come tomorrow.",
      german: "Ich kann morgen nicht kommen.",
      note: "The infinitive jumps past morgen and nicht to the end.",
    },
    {
      english: "He wants to learn German.",
      german: "Er will Deutsch lernen.",
      note: "No zu. And er will has no -t.",
    },
    {
      english: "You don't have to work.",
      german: "Du musst nicht arbeiten.",
      note: 'nicht müssen means there is no need. It does not mean "must not".',
    },
    {
      english: "You mustn't smoke here.",
      german: "Hier darfst du nicht rauchen.",
      note: 'For "must not", use nicht dürfen.',
    },
    {
      english: "Would you like a tea?",
      german: "Möchtest du einen Tee?",
      note: "möchten also works with just a noun.",
    },
  ],

  helps: [
    "As in English, the verb after a modal stays in its base form: Ich kann schwimmen. I can swim.",
    "kann looks like can and muss looks like must. Their meanings match too.",
    'English says "he can", not "he cans". German does the same: er kann, sie muss, es darf.',
  ],
  misleads: [
    'Ich will means "I want to", not "I will". For plans, German usually uses the present tense: Ich komme morgen.',
    'Du musst nicht means "you don\'t have to". To forbid something, say du darfst nicht.',
    'English keeps "can come" together. German sends the infinitive to the end: Ich kann heute nicht kommen.',
    'No "to" after a modal: Ich will gehen, not Ich will zu gehen.',
  ],
  hindiHint:
    "Hindi puts the main verb near the end too: मैं कल नहीं आ सकता (main kal nahin aa sakta). German does the same with the infinitive: Ich kann morgen nicht kommen. The difference: German moves the सकता part (kann) up to position 2.",

  tables: [
    {
      kind: "conjugation",
      title: "können, müssen, dürfen",
      verbs: [
        {
          infinitive: "können",
          english: "can",
          forms: ["kann", "kannst", "kann", "können", "könnt", "können"],
          highlight: [0, 1, 2],
        },
        {
          infinitive: "müssen",
          english: "must, have to",
          forms: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
          highlight: [0, 1, 2],
        },
        {
          infinitive: "dürfen",
          english: "may",
          forms: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
          highlight: [0, 1, 2],
        },
      ],
    },
    {
      kind: "conjugation",
      title: "sollen, wollen, möchten",
      verbs: [
        {
          infinitive: "sollen",
          english: "should",
          forms: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
          highlight: [0, 2],
        },
        {
          infinitive: "wollen",
          english: "want to",
          forms: ["will", "willst", "will", "wollen", "wollt", "wollen"],
          highlight: [0, 1, 2],
        },
        {
          infinitive: "möchten",
          english: "would like to",
          forms: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
          highlight: [0, 2],
        },
      ],
    },
    {
      kind: "generic",
      title: "Which modal?",
      headers: ["Modal", "English", "Use it for", "Example"],
      rows: [
        ["können", "can", "ability, possibility", "Ich kann gut kochen."],
        ["müssen", "must, have to", "something necessary", "Ich muss heute arbeiten."],
        ["dürfen", "may, be allowed to", "permission", "Hier darf man parken."],
        [
          "sollen",
          "should, be supposed to",
          "advice or orders from someone else",
          "Der Arzt sagt, ich soll viel trinken.",
        ],
        ["wollen", "want to", "a firm wish or plan", "Ich will Ärztin werden."],
        ["möchten", "would like to", "a polite wish", "Ich möchte bitte bezahlen."],
      ],
    },
  ],

  diagrams: [
    {
      kind: "wordOrder",
      caption: "The modal takes position 2. The infinitive goes to the end.",
      english: [
        { text: "I", role: "subject" },
        { text: "can", role: "verb" },
        { text: "come", role: "infinitive" },
        { text: "tomorrow", role: "time" },
      ],
      german: [
        { text: "Ich", role: "subject" },
        { text: "kann", role: "verb" },
        { text: "morgen", role: "time" },
        { text: "kommen", role: "infinitive" },
      ],
    },
    {
      kind: "wordOrder",
      caption: "With a time word first, the subject moves behind the modal.",
      english: [
        { text: "Tomorrow", role: "time" },
        { text: "I", role: "subject" },
        { text: "have to", role: "verb" },
        { text: "work", role: "infinitive" },
      ],
      german: [
        { text: "Morgen", role: "time" },
        { text: "muss", role: "verb" },
        { text: "ich", role: "subject" },
        { text: "arbeiten", role: "infinitive" },
      ],
    },
  ],

  examples: [
    { de: "Kannst du mir helfen?", en: "Can you help me?", gloss: "Can you me help?" },
    {
      de: "Ich muss heute lange arbeiten.",
      en: "I have to work late today.",
      gloss: "I must today long work",
    },
    {
      de: "Hier darf man nicht parken.",
      en: "You're not allowed to park here.",
      gloss: "Here may one not park",
    },
    {
      de: "Wir wollen im Sommer nach Indien fliegen.",
      en: "We want to fly to India in the summer.",
      gloss: "We want in-the summer to India fly",
    },
    {
      de: "Du sollst mehr Wasser trinken.",
      en: "You're supposed to drink more water.",
      gloss: "You shall more water drink",
    },
    {
      de: "Ich möchte ein Zimmer für zwei Nächte.",
      en: "I'd like a room for two nights.",
      gloss: "I would-like a room for two nights",
    },
    {
      de: "Möchten Sie etwas trinken?",
      en: "Would you like something to drink?",
      gloss: "Would-like you something drink?",
    },
    {
      de: "Morgen kann ich leider nicht kommen.",
      en: "Unfortunately I can't come tomorrow.",
      gloss: "Tomorrow can I unfortunately not come",
    },
    {
      de: "Du musst nicht kommen.",
      en: "You don't have to come.",
      gloss: "You must not come (= there's no need)",
    },
  ],

  mistakes: [
    {
      wrong: "Ich kann gut schwimme.",
      right: "Ich kann gut schwimmen.",
      why: "Only the modal gets an ending. The main verb stays in the infinitive.",
    },
    {
      wrong: "Er muss arbeitet heute.",
      right: "Er muss heute arbeiten.",
      why: "Don't conjugate the second verb. It stays an infinitive and goes to the end.",
    },
    {
      wrong: "Ich wolle nach Hause gehen.",
      right: "Ich will nach Hause gehen.",
      why: 'wollen changes to will in the singular: ich will, du willst, er will. "wolle" isn\'t the present tense.',
    },
    {
      wrong: "Er kannt Deutsch sprechen.",
      right: "Er kann Deutsch sprechen.",
      why: "With modals, er/sie/es has no ending: er kann, sie muss, es darf.",
    },
    {
      wrong: "Ich will zu gehen.",
      right: "Ich will gehen.",
      why: "No zu after a modal verb.",
    },
    {
      wrong: "Du musst hier nicht rauchen. (meaning: it's forbidden)",
      right: "Du darfst hier nicht rauchen.",
      why: "To forbid something, use nicht dürfen. nicht müssen only means there is no need.",
    },
  ],

  exercises: [
    {
      id: "modal-conj-koennen",
      type: "conjugationTable",
      skill: "conjugation",
      prompt: "Fill in the forms of können.",
      verb: "können",
      english: "can",
      answers: ["kann", "kannst", "kann", "können", "könnt", "können"],
      given: [3],
    },
    {
      id: "modal-conj-wollen",
      type: "conjugationTable",
      skill: "conjugation",
      prompt: "Fill in the forms of wollen.",
      verb: "wollen",
      english: "want to",
      answers: ["will", "willst", "will", "wollen", "wollt", "wollen"],
      given: [3],
    },
    {
      id: "modal-fill-kann",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Fill in the right form of können.",
      sentence: "Ich ___ heute nicht kommen. Ich bin krank.",
      answers: [["kann"]],
      en: "I can't come today. I'm sick.",
    },
    {
      id: "modal-fill-aufstehen",
      type: "fillBlank",
      skill: "modal-infinitive",
      prompt: "Which verb form goes at the end? (aufstehen)",
      sentence: "Wir müssen morgen früh ___.",
      answers: [["aufstehen"]],
      en: "We have to get up early tomorrow.",
      explanation: "After a modal, the whole verb stays together as an infinitive: aufstehen.",
    },
    {
      id: "modal-order-arbeiten",
      type: "reorderWords",
      skill: "modal-infinitive",
      prompt: "Put the words in order.",
      words: ["ich", "muss", "heute", "lange", "arbeiten"],
      alsoAccept: [["heute", "muss", "ich", "lange", "arbeiten"]],
      en: "I have to work late today.",
    },
    {
      id: "modal-mc-no-need",
      type: "multipleChoice",
      skill: "negation",
      prompt: "Your friend says you don't need to bring anything. Which sentence says that?",
      question: "You don't have to bring anything.",
      options: [
        "Du darfst nichts mitbringen.",
        "Du musst nichts mitbringen.",
        "Du willst nichts mitbringen.",
      ],
      answer: 1,
      explanation:
        "nicht/nichts müssen means there is no need. nicht dürfen means it's not allowed.",
    },
    {
      id: "modal-mc-rauchen",
      type: "multipleChoice",
      skill: "conjugation",
      prompt: "Which modal fits? Smoking is not allowed here.",
      question: "Hier ___ man nicht rauchen.",
      options: ["muss", "darf", "will", "möchte"],
      answer: 1,
    },
    {
      id: "modal-translate-help",
      type: "translate",
      skill: "modal-infinitive",
      prompt: "Translate.",
      en: "Can you help me?",
      answers: ["Kannst du mir helfen?", "Können Sie mir helfen?"],
      hint: "mir = me (after helfen)",
    },
    {
      id: "modal-translate-learn",
      type: "translate",
      skill: "modal-infinitive",
      prompt: "Translate.",
      en: "I want to learn German.",
      answers: ["Ich will Deutsch lernen.", "Ich möchte Deutsch lernen."],
    },
    {
      id: "modal-match-meanings",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match each modal to its meaning.",
      pairs: [
        { left: "können", right: "can" },
        { left: "müssen", right: "have to" },
        { left: "dürfen", right: "be allowed to" },
        { left: "sollen", right: "be supposed to" },
        { left: "wollen", right: "want to" },
        { left: "möchten", right: "would like to" },
      ],
    },
  ],

  vocab: [
    { de: "können", en: "can, to be able to" },
    { de: "müssen", en: "must, to have to" },
    { de: "dürfen", en: "may, to be allowed to" },
    { de: "sollen", en: "should, to be supposed to" },
    { de: "wollen", en: "to want to" },
    { de: "möchten", en: "would like to" },
    { de: "helfen", en: "to help" },
    { de: "rauchen", en: "to smoke" },
    { de: "Arzt", en: "doctor (male)", article: "der", plural: "Ärzte" },
    { de: "Ärztin", en: "doctor (female)", article: "die", plural: "Ärztinnen" },
    { de: "Zimmer", en: "room", article: "das", plural: "Zimmer" },
  ],
} satisfies ConceptInput;

export default concept;
