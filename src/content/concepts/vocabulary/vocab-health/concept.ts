import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-health",
  slug: "vocab-health",
  order: 470,
  titleDe: "Gesundheit und Körper",
  titleEn: "Health and the body",
  minutes: 15,
  summary: "Ich habe Kopfschmerzen. Mein Bein tut weh. Gute Besserung!",
  englishExplanation:
    "English: I have a headache, my back hurts, I feel sick, I need to see a doctor.",
  englishExamples: ["I have a headache.", "My back hurts.", "I need to see a doctor."],
  germanExplanation:
    "Body parts: der Kopf, der Bauch, der Rücken, der Arm, das Bein, der Hals, das Auge, der Zahn.\n\nPain: Kopf + Schmerzen = Kopfschmerzen. Ich habe Kopfschmerzen (headache), Bauchschmerzen, Rückenschmerzen. Or: Mein Kopf tut weh. Mir tut der Rücken weh.\n\nAt the doctor's: Ich habe einen Termin. Ich habe Fieber. Ich bin erkältet (I have a cold). Gute Besserung! (Get well soon!)\n\nTo tell work you're ill: Ich bin krank und kann heute nicht arbeiten.",
  comparisonRows: [
    {
      english: "I have a headache.",
      german: "Ich habe Kopfschmerzen.",
      note: "Schmerzen is plural.",
    },
    {
      english: "My back hurts.",
      german: "Mein Rücken tut weh.",
      note: "wehtun is separable.",
    },
    {
      english: "I have a cold.",
      german: "Ich bin erkältet.",
      note: "sein + adjective",
    },
    {
      english: "Get well soon!",
      german: "Gute Besserung!",
      note: "Fixed phrase",
    },
  ],
  helps: [
    "Arm, Hand and Finger are the same words.",
    "Compounds are logical: Zahn (tooth) + Schmerzen (pains) = toothache.",
  ],
  misleads: [
    "Schmerzen is usually plural: Ich habe Kopfschmerzen.",
    '"I feel sick" (nausea) is Mir ist schlecht. Ich bin krank means I\'m ill.',
  ],
  hindiHint:
    "Mein Kopf tut weh works like Hindi मेरा सिर दर्द कर रहा है (mera sir dard kar raha hai): the head is what hurts.",
  examples: [
    {
      de: "Ich habe seit gestern Fieber.",
      en: "I've had a temperature since yesterday.",
    },
    {
      de: "Mein Bein tut weh.",
      en: "My leg hurts.",
    },
    {
      de: "Ich brauche einen Termin beim Arzt.",
      en: "I need an appointment with the doctor.",
    },
    {
      de: "Mir ist schlecht.",
      en: "I feel sick.",
    },
    {
      de: "Gute Besserung!",
      en: "Get well soon!",
    },
  ],
  mistakes: [
    {
      wrong: "Ich habe Kopfschmerz.",
      right: "Ich habe Kopfschmerzen.",
      why: "Schmerzen is normally plural.",
    },
    {
      wrong: "Ich bin Fieber.",
      right: "Ich habe Fieber.",
      why: "Fieber is a noun, so use haben.",
    },
    {
      wrong: "Ich habe weh am Kopf.",
      right: "Mein Kopf tut weh.",
      why: "weh goes with tun: Mein Kopf tut weh. Or: Ich habe Kopfschmerzen.",
    },
  ],
  exercises: [
    {
      id: "health-pick",
      type: "articlePick",
      skill: "articles",
      prompt: "Pick der, die or das.",
      nouns: [
        {
          noun: "Kopf",
          article: "der",
          en: "head",
        },
        {
          noun: "Bauch",
          article: "der",
          en: "stomach",
        },
        {
          noun: "Bein",
          article: "das",
          en: "leg",
        },
        {
          noun: "Hand",
          article: "die",
          en: "hand",
        },
        {
          noun: "Auge",
          article: "das",
          en: "eye",
        },
        {
          noun: "Nase",
          article: "die",
          en: "nose",
        },
      ],
    },
    {
      id: "health-fill-kopf",
      type: "fillBlank",
      skill: "vocabulary",
      prompt: "Fill in the word for headache.",
      sentence: "Ich habe ___.",
      answers: [["Kopfschmerzen"]],
      en: "I have a headache.",
    },
    {
      id: "health-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the words.",
      pairs: [
        {
          left: "Fieber",
          right: "temperature, fever",
        },
        {
          left: "Rücken",
          right: "back",
        },
        {
          left: "Zahn",
          right: "tooth",
        },
        {
          left: "Hals",
          right: "throat, neck",
        },
        {
          left: "Bauch",
          right: "stomach",
        },
      ],
    },
    {
      id: "health-tr-besserung",
      type: "translate",
      skill: "vocabulary",
      prompt: "Translate.",
      en: "Get well soon!",
      answers: ["Gute Besserung!"],
    },
  ],
  vocab: [
    {
      de: "Kopf",
      en: "head",
      article: "der",
      plural: "Köpfe",
    },
    {
      de: "Bauch",
      en: "stomach, belly",
      article: "der",
      plural: "Bäuche",
    },
    {
      de: "Rücken",
      en: "back",
      article: "der",
      plural: "Rücken",
    },
    {
      de: "Bein",
      en: "leg",
      article: "das",
      plural: "Beine",
    },
    {
      de: "Zahn",
      en: "tooth",
      article: "der",
      plural: "Zähne",
    },
    {
      de: "Fieber",
      en: "fever, temperature",
      article: "das",
    },
    {
      de: "Schmerzen",
      en: "pain (plural)",
    },
    {
      de: "erkältet",
      en: "having a cold",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
