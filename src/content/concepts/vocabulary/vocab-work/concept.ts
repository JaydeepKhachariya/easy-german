import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-work",
  slug: "vocab-work",
  order: 480,
  titleDe: "Arbeit und Beruf",
  titleEn: "Work and jobs",
  minutes: 15,
  summary:
    "Ich bin Ingenieurin. Ich arbeite bei Siemens. No article before jobs, and -in for women.",
  englishExplanation:
    "English: What do you do? I'm a nurse. I work at a hospital. I work part-time.",
  englishExamples: ["What do you do?", "I'm a nurse.", "I work part-time."],
  germanExplanation:
    "Asking about work: Was sind Sie von Beruf? or Was machst du beruflich? Answer without an article: Ich bin Krankenpfleger. Ich bin Programmiererin.\n\nMost jobs have a male and a female form. The female form usually adds -in: der Lehrer, die Lehrerin; der Arzt, die Ärztin.\n\nWhere: Ich arbeite bei Siemens (a company: bei). Ich arbeite in einem Krankenhaus or im Büro (a place: in).\n\nHours: Vollzeit (full-time), Teilzeit (part-time). Ich arbeite 40 Stunden pro Woche. Ich bin arbeitslos (unemployed). Ich suche eine Stelle (a job).",
  comparisonRows: [
    {
      english: "I'm a nurse.",
      german: "Ich bin Krankenpflegerin.",
      note: "No article. Female form with -in.",
    },
    {
      english: "I work at Google.",
      german: "Ich arbeite bei Google.",
      note: "Company: bei",
    },
    {
      english: "I work in an office.",
      german: "Ich arbeite in einem Büro.",
      note: "Place: in",
    },
    {
      english: "part-time",
      german: "Teilzeit",
      note: "Teil = part",
    },
  ],
  helps: [
    "Many tech job titles come from English: Manager, Designer, Softwareentwickler (software developer).",
    "Teilzeit/part-time and Vollzeit/full-time match word for word.",
  ],
  misleads: [
    "No article before jobs: Ich bin Ingenieurin, not eine Ingenieurin.",
    "Chef means boss, not cook. A cook is der Koch or die Köchin.",
  ],
  examples: [
    {
      de: "Was sind Sie von Beruf?",
      en: "What do you do for a living?",
    },
    {
      de: "Ich bin Softwareentwickler.",
      en: "I'm a software developer.",
    },
    {
      de: "Meine Frau arbeitet als Ärztin im Krankenhaus.",
      en: "My wife works as a doctor in a hospital.",
    },
    {
      de: "Ich arbeite Teilzeit, 20 Stunden pro Woche.",
      en: "I work part-time, 20 hours a week.",
    },
    {
      de: "Ich suche eine neue Stelle.",
      en: "I'm looking for a new job.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich bin ein Lehrer.",
      right: "Ich bin Lehrer.",
      why: "No article before jobs.",
    },
    {
      wrong: "Sie ist Arzt. (talking about a woman)",
      right: "Sie ist Ärztin.",
      why: "Use the female form for a woman.",
    },
    {
      wrong: "Ich arbeite an Siemens.",
      right: "Ich arbeite bei Siemens.",
      why: "For a company, use bei.",
    },
  ],
  exercises: [
    {
      id: "work-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the male and female forms.",
      pairs: [
        {
          left: "Lehrer",
          right: "Lehrerin",
        },
        {
          left: "Arzt",
          right: "Ärztin",
        },
        {
          left: "Koch",
          right: "Köchin",
        },
        {
          left: "Verkäufer",
          right: "Verkäuferin",
        },
        {
          left: "Ingenieur",
          right: "Ingenieurin",
        },
      ],
    },
    {
      id: "work-fill-bei",
      type: "fillBlank",
      skill: "cases",
      prompt: "Fill in the preposition.",
      sentence: "Ich arbeite ___ BMW.",
      answers: [["bei"]],
      en: "I work at BMW.",
    },
    {
      id: "work-tr-teacher",
      type: "translate",
      skill: "vocabulary",
      prompt: "Translate. You are a woman.",
      en: "I'm a teacher.",
      answers: ["Ich bin Lehrerin."],
    },
    {
      id: "work-mc-chef",
      type: "multipleChoice",
      skill: "vocabulary",
      prompt: "What does Chef mean?",
      question: "der Chef",
      options: ["cook", "boss", "chief doctor"],
      answer: 1,
    },
  ],
  vocab: [
    {
      de: "Beruf",
      en: "job, profession",
      article: "der",
      plural: "Berufe",
    },
    {
      de: "Stelle",
      en: "job, position",
      article: "die",
      plural: "Stellen",
    },
    {
      de: "Büro",
      en: "office",
      article: "das",
      plural: "Büros",
    },
    {
      de: "Krankenhaus",
      en: "hospital",
      article: "das",
      plural: "Krankenhäuser",
    },
    {
      de: "Chef",
      en: "boss",
      article: "der",
      plural: "Chefs",
    },
    {
      de: "Teilzeit",
      en: "part-time",
      article: "die",
    },
    {
      de: "Vollzeit",
      en: "full-time",
      article: "die",
    },
  ],
  level: "A1",
  status: "draft",
  tables: [],
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
