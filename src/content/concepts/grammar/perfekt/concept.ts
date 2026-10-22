import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "perfekt",
  slug: "perfekt",
  order: 300,
  titleDe: "Das Perfekt: haben oder sein?",
  titleEn: "Talking about the past: the Perfekt",
  category: "grammar",
  unit: "Grammar",
  level: "A1",
  minutes: 30,
  status: "complete",
  summary:
    "Spoken German uses haben or sein plus a past participle for almost every past event. Movement verbs take sein.",
  prerequisites: ["sein-und-haben", "regular-verbs", "strong-verbs", "separable-verbs"],

  englishExplanation: `English has two common past forms. The simple past: "I played", "I went". And the present perfect: "I have played", "I have gone".

The present perfect is built from "have" plus a past participle (played, gone, eaten). English uses "have" for every verb.

When people talk about finished events, they mostly use the simple past: "I went to the cinema yesterday."`,
  englishExamples: [
    "I played football yesterday.",
    "I have eaten.",
    "She went home at six.",
    "We have never been to Berlin.",
  ],

  germanExplanation: `Spoken German uses the Perfekt for almost everything in the past. Where English says "I went", German says "Ich bin gegangen". Word for word, that's "I am gone".

The Perfekt has two parts. The helper verb, haben or sein, is conjugated and sits in position 2. The past participle goes to the end of the sentence.

Most verbs use haben. Use sein when the verb means moving from one place to another (gehen, fahren, fliegen, kommen) or a change of state (aufstehen, einschlafen, werden). sein and bleiben also take sein. Quick test: if something moves or changes and the verb has no direct object, it probably takes sein.

Participles come in two main types. Weak (regular) verbs take ge- + stem + -t: machen → gemacht, kaufen → gekauft. Strong (irregular) verbs take ge- + stem + -en, and the vowel often changes: gehen → gegangen, trinken → getrunken. You have to learn strong participles with the verb.

Separable verbs put ge between the prefix and the stem: aufstehen → aufgestanden, einkaufen → eingekauft. Verbs ending in -ieren, and verbs starting with be-, ver- or er-, take no ge- at all: studieren → studiert, besuchen → besucht, verstehen → verstanden.`,

  comparisonRows: [
    {
      english: "I worked.",
      german: "Ich habe gearbeitet.",
      note: "German uses the Perfekt where English uses the simple past.",
    },
    {
      english: "I went home.",
      german: "Ich bin nach Hause gegangen.",
      note: "Movement verb, so sein instead of haben.",
    },
    {
      english: "I have eaten.",
      german: "Ich habe gegessen.",
      note: "Same build as English: helper + participle.",
    },
    {
      english: "Yesterday I bought bread.",
      german: "Gestern habe ich Brot gekauft.",
      note: "Helper in position 2, participle at the end.",
    },
    {
      english: "She got up at six.",
      german: "Sie ist um sechs aufgestanden.",
      note: "Change of state: sein. ge goes inside the separable verb.",
    },
    {
      english: "We stayed at home.",
      german: "Wir sind zu Hause geblieben.",
      note: "bleiben takes sein, even though nothing moves.",
    },
  ],

  helps: [
    '"I have eaten" and "Ich habe gegessen" are built the same way: helper + participle.',
    "Strong verbs often change their vowel in both languages: trinken, getrunken / drink, drunk. singen, gesungen / sing, sung.",
    "Weak participles end in -t, a bit like English -ed: gespielt / played, gekocht / cooked.",
  ],
  misleads: [
    'English always uses "have". German uses sein with movement verbs: Ich bin gefahren, not Ich habe gefahren.',
    'In English the participle follows "have" straight away. In German it waits until the end: Ich habe gestern einen Film gesehen.',
    'English uses the simple past in conversation. In German, "Ich ging" sounds like a novel. Say "Ich bin gegangen".',
    "Don't build strong participles like weak ones: getrunken, not getrinkt.",
  ],
  hindiHint:
    "Hindi also treats verbs differently in the past. With most verbs you use ने: मैंने खाना खाया (maine khaana khaaya). With movement verbs you don't: मैं घर गया (main ghar gaya). German splits verbs in a similar way: Ich habe gegessen (haben), but Ich bin nach Hause gegangen (sein).",

  tables: [
    {
      kind: "conjugation",
      title: "The two helpers",
      verbs: [
        {
          infinitive: "haben",
          english: "have",
          forms: ["habe", "hast", "hat", "haben", "habt", "haben"],
        },
        {
          infinitive: "sein",
          english: "be",
          forms: ["bin", "bist", "ist", "sind", "seid", "sind"],
        },
      ],
    },
    {
      kind: "generic",
      title: "How participles are built",
      headers: ["Type", "Infinitive", "Participle", "Pattern"],
      rows: [
        ["weak", "machen", "gemacht", "ge- + stem + -t"],
        ["weak", "arbeiten", "gearbeitet", "-et after t or d"],
        ["strong", "trinken", "getrunken", "ge- + stem + -en, new vowel"],
        ["strong", "fahren", "gefahren", "ge- + stem + -en"],
        ["separable", "einkaufen", "eingekauft", "prefix + ge + stem"],
        ["separable", "aufstehen", "aufgestanden", "prefix + ge + stem"],
        ["no ge-", "studieren", "studiert", "-ieren verbs"],
        ["no ge-", "besuchen", "besucht", "be-, ver-, er- verbs"],
      ],
    },
    {
      kind: "generic",
      title: "sein or haben?",
      headers: ["sein (movement, change)", "haben (everything else)"],
      rows: [
        ["gehen → ist gegangen", "essen → hat gegessen"],
        ["fahren → ist gefahren", "trinken → hat getrunken"],
        ["fliegen → ist geflogen", "kaufen → hat gekauft"],
        ["kommen → ist gekommen", "machen → hat gemacht"],
        ["aufstehen → ist aufgestanden", "schlafen → hat geschlafen"],
        ["bleiben → ist geblieben", "arbeiten → hat gearbeitet"],
        ["sein → ist gewesen", "lesen → hat gelesen"],
      ],
    },
  ],

  diagrams: [
    {
      kind: "wordOrder",
      caption: "haben in position 2, participle at the end.",
      english: [
        { text: "I", role: "subject" },
        { text: "watched", role: "verb" },
        { text: "a film", role: "object" },
        { text: "yesterday", role: "time" },
      ],
      german: [
        { text: "Ich", role: "subject" },
        { text: "habe", role: "verb" },
        { text: "gestern", role: "time" },
        { text: "einen Film", role: "object" },
        { text: "gesehen", role: "participle" },
      ],
    },
    {
      kind: "wordOrder",
      caption: "Movement verb: sein in position 2.",
      english: [
        { text: "Yesterday", role: "time" },
        { text: "I", role: "subject" },
        { text: "went", role: "verb" },
        { text: "home", role: "place" },
      ],
      german: [
        { text: "Gestern", role: "time" },
        { text: "bin", role: "verb" },
        { text: "ich", role: "subject" },
        { text: "nach Hause", role: "place" },
        { text: "gegangen", role: "participle" },
      ],
    },
  ],

  examples: [
    {
      de: "Ich habe gestern Pizza gegessen.",
      en: "I ate pizza yesterday.",
      gloss: "I have yesterday pizza eaten",
    },
    {
      de: "Wir sind am Wochenende nach Hamburg gefahren.",
      en: "We went to Hamburg at the weekend.",
      gloss: "We are at-the weekend to Hamburg driven",
    },
    { de: "Hast du gut geschlafen?", en: "Did you sleep well?", gloss: "Have you well slept?" },
    {
      de: "Sie ist um sechs Uhr aufgestanden.",
      en: "She got up at six.",
      gloss: "She is at six o'clock up-stood",
    },
    {
      de: "Ich habe am Samstag eingekauft.",
      en: "I did the shopping on Saturday.",
      gloss: "I have on-the Saturday shopped",
    },
    {
      de: "Er hat in Berlin Informatik studiert.",
      en: "He studied computer science in Berlin.",
      gloss: "He has in Berlin computer-science studied",
    },
    { de: "Wo bist du gewesen?", en: "Where have you been?", gloss: "Where are you been?" },
    { de: "Ich bin zu Hause geblieben.", en: "I stayed at home.", gloss: "I am at home stayed" },
    { de: "Was hast du gesagt?", en: "What did you say?", gloss: "What have you said?" },
    {
      de: "Der Zug ist pünktlich angekommen.",
      en: "The train arrived on time.",
      gloss: "The train is on-time arrived",
    },
  ],

  mistakes: [
    {
      wrong: "Ich habe nach Berlin gefahren.",
      right: "Ich bin nach Berlin gefahren.",
      why: "fahren here means moving from A to B, so it takes sein.",
    },
    {
      wrong: "Wir haben gestern ins Kino gegangen.",
      right: "Wir sind gestern ins Kino gegangen.",
      why: "gehen is a movement verb. Movement verbs take sein.",
    },
    {
      wrong: "Ich habe einen Brief geschreibet.",
      right: "Ich habe einen Brief geschrieben.",
      why: "schreiben is strong: ge- + schrieb + -en. Strong verbs never take -et.",
    },
    {
      wrong: "Sie hat lange geschlafet.",
      right: "Sie hat lange geschlafen.",
      why: "schlafen is strong, so the participle ends in -en, not -et.",
    },
    {
      wrong: "Ich habe Wasser getrinkt.",
      right: "Ich habe Wasser getrunken.",
      why: "trinken is strong. The vowel changes and the ending is -en.",
    },
    {
      wrong: "Ich bin um sieben geaufstanden.",
      right: "Ich bin um sieben aufgestanden.",
      why: "With separable verbs, ge goes between the prefix and the stem.",
    },
    {
      wrong: "Ich habe gekauft ein Auto.",
      right: "Ich habe ein Auto gekauft.",
      why: "The participle goes to the end of the sentence.",
    },
    {
      wrong: "Er hat Medizin gestudiert.",
      right: "Er hat Medizin studiert.",
      why: "Verbs ending in -ieren take no ge-.",
    },
  ],

  exercises: [
    {
      id: "perfekt-mc-laufen",
      type: "multipleChoice",
      skill: "perfekt-auxiliary",
      prompt: "haben or sein?",
      question: "Ich ___ gestern nach Hause gelaufen.",
      options: ["habe", "bin", "hat"],
      answer: 1,
      explanation: "laufen means moving to a place, so it takes sein.",
    },
    {
      id: "perfekt-fill-haben",
      type: "fillBlank",
      skill: "perfekt-auxiliary",
      prompt: "Fill in haben or sein.",
      sentence: "Wir ___ gestern einen Film gesehen.",
      answers: [["haben"]],
      en: "We watched a film yesterday.",
    },
    {
      id: "perfekt-fill-ist",
      type: "fillBlank",
      skill: "perfekt-auxiliary",
      prompt: "Fill in haben or sein.",
      sentence: "Er ___ um sieben Uhr aufgestanden.",
      answers: [["ist"]],
      en: "He got up at seven.",
    },
    {
      id: "perfekt-fill-getrunken",
      type: "fillBlank",
      skill: "participle",
      prompt: "Write the participle of trinken.",
      sentence: "Ich habe einen Kaffee ___.",
      answers: [["getrunken"]],
      en: "I drank a coffee.",
    },
    {
      id: "perfekt-fill-gemacht",
      type: "fillBlank",
      skill: "participle",
      prompt: "Write the participle of machen.",
      sentence: "Hast du die Hausaufgaben ___?",
      answers: [["gemacht"]],
      en: "Did you do the homework?",
    },
    {
      id: "perfekt-match-participles",
      type: "matchPairs",
      skill: "participle",
      prompt: "Match each verb to its participle.",
      pairs: [
        { left: "gehen", right: "gegangen" },
        { left: "kaufen", right: "gekauft" },
        { left: "schreiben", right: "geschrieben" },
        { left: "einkaufen", right: "eingekauft" },
        { left: "studieren", right: "studiert" },
        { left: "fliegen", right: "geflogen" },
      ],
    },
    {
      id: "perfekt-order-geblieben",
      type: "reorderWords",
      skill: "verb-position",
      prompt: "Put the words in order.",
      words: ["ich", "bin", "am", "Sonntag", "zu", "Hause", "geblieben"],
      alsoAccept: [["am", "Sonntag", "bin", "ich", "zu", "Hause", "geblieben"]],
      en: "I stayed at home on Sunday.",
    },
    {
      id: "perfekt-translate-flown",
      type: "translate",
      skill: "perfekt-auxiliary",
      prompt: "Translate using the Perfekt.",
      en: "We flew to India.",
      answers: ["Wir sind nach Indien geflogen."],
    },
    {
      id: "perfekt-translate-worked",
      type: "translate",
      skill: "participle",
      prompt: "Translate using the Perfekt.",
      en: "I worked yesterday.",
      answers: ["Ich habe gestern gearbeitet.", "Gestern habe ich gearbeitet."],
    },
    {
      id: "perfekt-mc-schlafen",
      type: "multipleChoice",
      skill: "participle",
      prompt: "Pick the correct participle of schlafen.",
      question: "Ich habe gut ___.",
      options: ["geschlaft", "geschlafen", "geschlafet", "schlafen"],
      answer: 1,
      explanation: "schlafen is strong: ge- + schlaf + -en.",
    },
  ],

  vocab: [
    { de: "fahren", en: "to go (by vehicle), to drive" },
    { de: "fliegen", en: "to fly" },
    { de: "bleiben", en: "to stay" },
    { de: "einkaufen", en: "to do the shopping" },
    { de: "ankommen", en: "to arrive" },
    { de: "pünktlich", en: "on time" },
    { de: "Hausaufgabe", en: "homework task", article: "die", plural: "Hausaufgaben" },
    { de: "Film", en: "film, movie", article: "der", plural: "Filme" },
    { de: "Brief", en: "letter", article: "der", plural: "Briefe" },
  ],
} satisfies ConceptInput;

export default concept;
