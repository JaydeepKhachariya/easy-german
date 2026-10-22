import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "exam-overview",
  slug: "exam-overview",
  order: 500,
  unit: "Exam",
  category: "exam",
  titleDe: "Start Deutsch 1: Überblick",
  titleEn: "Start Deutsch 1: the exam at a glance",
  minutes: 15,
  summary: "Four parts: Hören, Lesen, Schreiben, Sprechen. What each part asks you to do.",
  englishExplanation:
    "English exams you may know, like IELTS, test the same four skills: listening, reading, writing and speaking. Start Deutsch 1 (Goethe-Zertifikat A1) is shorter and uses everyday situations.",
  englishExamples: [
    "Listen to the announcement.",
    "Tick true or false.",
    "Fill in the form.",
    "Introduce yourself.",
  ],
  germanExplanation:
    "The written exam has three parts, followed by a speaking test in a small group. The timings below are approximate. Check the Goethe-Institut website for the current format before you book.\n\nHören (about 20 minutes): short conversations, announcements and phone messages. You tick the right answer.\n\nLesen (about 25 minutes): short letters and emails, ads and websites, signs and notices. You decide richtig or falsch, or pick a or b.\n\nSchreiben (about 20 minutes): fill in a form with personal details, then write a short message (about 30 words) that covers three points.\n\nSprechen (about 15 minutes, in a group): introduce yourself, ask and answer questions on a topic card, make requests and respond to them.\n\nYou pass with 60 out of 100 points overall. The instructions are in German, so learn the common ones: Kreuzen Sie an. Ergänzen Sie. Schreiben Sie.",
  comparisonRows: [
    {
      english: "Listening",
      german: "Hören",
      note: "Announcements, short dialogues, phone messages",
    },
    {
      english: "Reading",
      german: "Lesen",
      note: "Emails, ads, signs",
    },
    {
      english: "Writing",
      german: "Schreiben",
      note: "A form and a short message",
    },
    {
      english: "Speaking",
      german: "Sprechen",
      note: "In a small group with other candidates",
    },
    {
      english: "Tick the box.",
      german: "Kreuzen Sie an.",
      note: "The most common instruction",
    },
  ],
  helps: [
    "The topics are everyday life: family, shopping, travel, work, free time. The vocabulary lessons cover them.",
    "Short, correct sentences score well. You don't need long answers.",
  ],
  misleads: [
    "In the writing task, every one of the three points needs a sentence. Missing one costs points even if your German is good.",
    "Don't switch between du and Sie in a letter or in the speaking test.",
  ],
  tables: [
    {
      kind: "generic",
      title: "Common instructions",
      headers: ["German", "English"],
      rows: [
        ["Kreuzen Sie an.", "Tick the box."],
        ["Richtig oder falsch?", "True or false?"],
        ["Lesen Sie den Text.", "Read the text."],
        ["Hören Sie.", "Listen."],
        ["Ergänzen Sie das Formular.", "Complete the form."],
        ["Schreiben Sie eine E-Mail.", "Write an email."],
        ["Stellen Sie sich vor.", "Introduce yourself."],
      ],
    },
  ],
  examples: [
    {
      de: "Kreuzen Sie an: richtig oder falsch.",
      en: "Tick: true or false.",
    },
    {
      de: "Ergänzen Sie das Formular.",
      en: "Complete the form.",
    },
    {
      de: "Schreiben Sie eine kurze E-Mail.",
      en: "Write a short email.",
    },
    {
      de: "Stellen Sie sich bitte vor.",
      en: "Please introduce yourself.",
    },
    {
      de: "Lesen Sie die Anzeigen.",
      en: "Read the adverts.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich habe 25 Jahre.",
      right: "Ich bin 25 Jahre alt.",
      why: "A common slip in the speaking test. Age uses sein.",
    },
    {
      wrong: "Hallo Herr Müller,",
      right: "Sehr geehrter Herr Müller,",
      why: "Formal emails to people you don't know start with Sehr geehrte or Sehr geehrter.",
    },
  ],
  exercises: [
    {
      id: "exam-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the exam parts.",
      pairs: [
        {
          left: "Hören",
          right: "listening",
        },
        {
          left: "Lesen",
          right: "reading",
        },
        {
          left: "Schreiben",
          right: "writing",
        },
        {
          left: "Sprechen",
          right: "speaking",
        },
        {
          left: "ankreuzen",
          right: "tick",
        },
      ],
    },
    {
      id: "exam-mc-ankreuzen",
      type: "multipleChoice",
      skill: "vocabulary",
      prompt: 'What does "Kreuzen Sie an" mean?',
      question: "Kreuzen Sie an.",
      options: ["Cross it out.", "Tick the box.", "Write it down."],
      answer: 1,
    },
    {
      id: "exam-mc-group",
      type: "multipleChoice",
      skill: "general",
      prompt: "Which part do you take with other candidates?",
      question: "Pick one.",
      options: ["Lesen", "Sprechen", "Schreiben"],
      answer: 1,
    },
  ],
  vocab: [
    {
      de: "Prüfung",
      en: "exam",
      article: "die",
      plural: "Prüfungen",
    },
    {
      de: "Aufgabe",
      en: "task",
      article: "die",
      plural: "Aufgaben",
    },
    {
      de: "richtig",
      en: "right, true",
    },
    {
      de: "falsch",
      en: "wrong, false",
    },
    {
      de: "ankreuzen",
      en: "to tick",
    },
    {
      de: "ergänzen",
      en: "to complete",
    },
    {
      de: "Formular",
      en: "form",
      article: "das",
      plural: "Formulare",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
