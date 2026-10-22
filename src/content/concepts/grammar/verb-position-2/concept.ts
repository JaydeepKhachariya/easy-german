import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "verb-position-2",
  slug: "verb-position-2",
  order: 320,
  titleDe: "Das Verb auf Position 2",
  titleEn: "Verb in position 2",
  category: "grammar",
  unit: "Grammar",
  level: "A1",
  minutes: 20,
  status: "complete",
  summary:
    "In a German statement the conjugated verb is always the second element. The rest of the sentence moves around it.",
  prerequisites: ["regular-verbs", "separable-verbs", "modal-verbs", "perfekt"],

  englishExplanation: `English sentences follow a fixed pattern: subject, then verb, then the rest. You can put a time phrase at the front, but the subject and verb stay together as a pair.

So "I work today" and "Today I work" both keep "I work" side by side. Only questions break the pattern, and even then English needs a helper like "do".`,
  englishExamples: [
    "I work today.",
    "Today I work.",
    "On Monday we visit my aunt.",
    "Where do you live?",
  ],

  germanExplanation: `German counts positions, not words. In a statement, the conjugated verb (the one whose ending matches the subject) always sits in position 2.

Position 1 can be the subject, a time phrase, an object, almost anything. It is one block, so "am Montag" or "jeden Abend" count as one position. Whatever goes first, the verb comes next. If the subject is not in position 1, it moves to the slot right after the verb.

Many sentences have a second verb part: an infinitive after a modal, a past participle, or a separable prefix. That part goes to the very end. The two verb parts form a frame around the middle of the sentence.

In the middle, the usual order is time, then manner (how), then place: Ich fahre morgen mit dem Zug nach Berlin. English often does it the other way round.

und, aber, oder and denn don't take a position. They sit in front of position 1.`,

  comparisonRows: [
    { english: "I work today.", german: "Ich arbeite heute.", note: "Same order as English." },
    {
      english: "Today I work.",
      german: "Heute arbeite ich.",
      note: "The verb stays in position 2. The subject moves behind it.",
    },
    {
      english: "On Monday we visit Anna.",
      german: "Am Montag besuchen wir Anna.",
      note: '"Am Montag" is two words but one position.',
    },
    {
      english: "I can come tomorrow.",
      german: "Ich kann morgen kommen.",
      note: "The infinitive goes to the end.",
    },
    {
      english: "I got up at seven.",
      german: "Ich bin um sieben aufgestanden.",
      note: "The participle goes to the end.",
    },
    {
      english: "I get up at seven.",
      german: "Ich stehe um sieben auf.",
      note: "The separable prefix goes to the end.",
    },
    {
      english: "I'm going to Berlin by train tomorrow.",
      german: "Ich fahre morgen mit dem Zug nach Berlin.",
      note: "German order: time, manner, place.",
    },
  ],

  helps: [
    "Sentences that start with the subject look the same in both languages: Ich trinke Tee. I drink tea.",
    "English questions with a question word already put a verb second: Where do you live? Wo wohnst du?",
    'English keeps phrases together too. "On Monday" and "am Montag" are both one block.',
  ],
  misleads: [
    '"Today I work" is fine in English. "Heute ich arbeite" is wrong in German. After a time word in position 1, the verb comes before the subject.',
    'English keeps "can come" together. German splits it: Ich kann morgen kommen.',
    'English puts "often" and "always" before the verb (I often read). German puts them after it: Ich lese oft.',
  ],
  hindiHint:
    "Hindi puts the main verb at the end: मैं कल दिल्ली जाना चाहता हूँ (main kal Dilli jaana chahta hoon). German does this too, but only with the second verb part: Ich will morgen nach Delhi fahren. The small conjugated verb (will) moves up to position 2. So: helper in slot 2, meaning verb at the end, like Hindi.",

  tables: [
    {
      kind: "generic",
      title: "The sentence frame",
      headers: ["Position 1", "Position 2 (verb)", "Middle", "End"],
      rows: [
        ["Ich", "stehe", "jeden Tag um sieben", "auf."],
        ["Jeden Tag", "stehe", "ich um sieben", "auf."],
        ["Heute", "kann", "ich leider nicht", "kommen."],
        ["Gestern", "habe", "ich lange", "gearbeitet."],
        ["Was", "machst", "du am Wochenende?", ""],
      ],
    },
    {
      kind: "generic",
      title: "Time, manner, place",
      headers: ["Subject + verb", "Time (wann?)", "Manner (wie?)", "Place (wohin? wo?)"],
      rows: [
        ["Ich fahre", "morgen", "mit dem Zug", "nach Berlin."],
        ["Wir essen", "heute", "zusammen", "im Restaurant."],
        ["Sie geht", "jeden Tag", "zu Fuß", "zur Arbeit."],
      ],
    },
  ],

  diagrams: [
    {
      kind: "wordOrder",
      caption: "A time word in position 1 pushes the subject behind the verb.",
      english: [
        { text: "Today", role: "time" },
        { text: "I", role: "subject" },
        { text: "work", role: "verb" },
      ],
      german: [
        { text: "Heute", role: "time" },
        { text: "arbeite", role: "verb" },
        { text: "ich", role: "subject" },
      ],
    },
    {
      kind: "wordOrder",
      caption: "Modal in position 2, infinitive at the end.",
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
      caption: "Helper verb in position 2, participle at the end.",
      english: [
        { text: "I", role: "subject" },
        { text: "got up", role: "verb" },
        { text: "at seven", role: "time" },
      ],
      german: [
        { text: "Ich", role: "subject" },
        { text: "bin", role: "verb" },
        { text: "um sieben", role: "time" },
        { text: "aufgestanden", role: "participle" },
      ],
    },
    {
      kind: "wordOrder",
      caption: "Separable verb: the prefix goes to the end.",
      english: [
        { text: "I", role: "subject" },
        { text: "get up", role: "verb" },
        { text: "at seven", role: "time" },
      ],
      german: [
        { text: "Ich", role: "subject" },
        { text: "stehe", role: "verb" },
        { text: "um sieben", role: "time" },
        { text: "auf", role: "prefix" },
      ],
    },
  ],

  examples: [
    {
      de: "Ich lerne jeden Abend Deutsch.",
      en: "I study German every evening.",
      gloss: "I learn every evening German",
    },
    {
      de: "Jeden Abend lerne ich Deutsch.",
      en: "Every evening I study German.",
      gloss: "Every evening learn I German",
    },
    {
      de: "Am Samstag spielen wir Fußball.",
      en: "On Saturday we play football.",
      gloss: "On-the Saturday play we football",
    },
    {
      de: "Deutsch lerne ich seit einem Jahr.",
      en: "I have been learning German for a year.",
      gloss: "German learn I since one year",
    },
    {
      de: "Heute kann ich leider nicht kommen.",
      en: "Unfortunately I can't come today.",
      gloss: "Today can I unfortunately not come",
    },
    {
      de: "Ich rufe dich morgen an.",
      en: "I'll call you tomorrow.",
      gloss: "I call you tomorrow up",
    },
    {
      de: "Gestern habe ich bis acht gearbeitet.",
      en: "Yesterday I worked until eight.",
      gloss: "Yesterday have I until eight worked",
    },
    {
      de: "Ich fahre morgen mit dem Bus zur Arbeit.",
      en: "Tomorrow I'm taking the bus to work.",
      gloss: "I go tomorrow with the bus to-the work",
    },
    {
      de: "Wann fängt der Kurs an?",
      en: "When does the course start?",
      gloss: "When starts the course on",
    },
  ],

  mistakes: [
    {
      wrong: "Heute ich arbeite.",
      right: "Heute arbeite ich.",
      why: "After a time word in position 1, the verb comes next, then the subject.",
    },
    {
      wrong: "Am Montag wir haben Deutsch.",
      right: "Am Montag haben wir Deutsch.",
      why: '"Am Montag" fills position 1, so the verb takes position 2.',
    },
    {
      wrong: "Ich kann kommen morgen.",
      right: "Ich kann morgen kommen.",
      why: "The infinitive goes to the very end.",
    },
    {
      wrong: "Ich oft trinke Tee.",
      right: "Ich trinke oft Tee.",
      why: "oft comes after the verb, not before it.",
    },
    {
      wrong: "Ich aufstehe um sieben.",
      right: "Ich stehe um sieben auf.",
      why: "A separable prefix splits off and goes to the end.",
    },
    {
      wrong: "Ich fahre nach Berlin morgen mit dem Zug.",
      right: "Ich fahre morgen mit dem Zug nach Berlin.",
      why: "In the middle of the sentence: time, then manner, then place.",
    },
  ],

  exercises: [
    {
      id: "v2-mc-morgen",
      type: "multipleChoice",
      skill: "verb-position",
      prompt: "Pick the correct sentence.",
      question: "Tomorrow I'm going to Cologne.",
      options: [
        "Morgen ich fahre nach Köln.",
        "Morgen fahre ich nach Köln.",
        "Morgen fahre nach Köln ich.",
        "Ich morgen fahre nach Köln.",
      ],
      answer: 1,
      explanation: "Morgen is position 1, so fahre comes next and ich moves behind it.",
    },
    {
      id: "v2-order-sonntag",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order. Start with the time.",
      words: ["am", "Sonntag", "schlafe", "ich", "lange"],
      alsoAccept: [["ich", "schlafe", "am", "Sonntag", "lange"]],
      en: "On Sunday I sleep in.",
    },
    {
      id: "v2-fill-abend",
      type: "fillBlank",
      skill: "verb-position",
      prompt: 'Put "wir sehen" into the sentence in the right order.',
      sentence: "Am Abend ___ ___ einen Film.",
      answers: [["sehen"], ["wir"]],
      en: "In the evening we watch a film.",
    },
    {
      id: "v2-translate-home",
      type: "translate",
      skill: "verb-position",
      prompt: 'Translate. Start with "Morgen".',
      en: "Tomorrow I'm working at home.",
      answers: ["Morgen arbeite ich zu Hause.", "Ich arbeite morgen zu Hause."],
      hint: "zu Hause = at home",
    },
    {
      id: "v2-order-modal",
      type: "reorderWords",
      skill: "modal-infinitive",
      prompt: "Put the words in order.",
      words: ["ich", "kann", "heute", "nicht", "kommen"],
      alsoAccept: [["heute", "kann", "ich", "nicht", "kommen"]],
      en: "I can't come today.",
    },
    {
      id: "v2-order-anrufen",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order. anrufen is separable.",
      words: ["ich", "rufe", "dich", "heute", "Abend", "an"],
      alsoAccept: [["heute", "Abend", "rufe", "ich", "dich", "an"]],
      en: "I'll call you this evening.",
    },
    {
      id: "v2-mc-tmp",
      type: "multipleChoice",
      skill: "word-order",
      prompt: "Pick the most natural German order.",
      question: "I'm going to Berlin by train tomorrow.",
      options: [
        "Ich fahre mit dem Zug morgen nach Berlin.",
        "Ich fahre nach Berlin morgen mit dem Zug.",
        "Ich fahre morgen mit dem Zug nach Berlin.",
      ],
      answer: 2,
      explanation: "Time (morgen), manner (mit dem Zug), place (nach Berlin).",
    },
    {
      id: "v2-translate-samstag",
      type: "translate",
      skill: "verb-position",
      prompt: "Translate. Start with the day.",
      en: "On Saturday we play football.",
      answers: ["Am Samstag spielen wir Fußball.", "Wir spielen am Samstag Fußball."],
    },
  ],

  vocab: [
    { de: "heute", en: "today" },
    { de: "morgen", en: "tomorrow" },
    { de: "gestern", en: "yesterday" },
    { de: "oft", en: "often" },
    { de: "leider", en: "unfortunately" },
    { de: "Abend", en: "evening", article: "der", plural: "Abende" },
    { de: "Wochenende", en: "weekend", article: "das", plural: "Wochenenden" },
    { de: "aufstehen", en: "to get up" },
    { de: "anrufen", en: "to call (on the phone)" },
    { de: "Zug", en: "train", article: "der", plural: "Züge" },
  ],
} satisfies ConceptInput;

export default concept;
