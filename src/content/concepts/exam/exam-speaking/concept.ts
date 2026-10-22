import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "exam-speaking",
  slug: "exam-speaking",
  order: 520,
  unit: "Exam",
  category: "speaking",
  titleDe: "Sprechen in der Prüfung",
  titleEn: "Speaking tasks in the exam",
  minutes: 25,
  summary: "Introduce yourself, ask and answer questions on a topic card, make polite requests.",
  englishExplanation:
    'In English small talk you introduce yourself, ask simple questions and make polite requests: "Could you...?", "Can I have...?"',
  englishExamples: [
    "My name is Neha and I'm from India.",
    "What do you do at the weekend?",
    "Could you open the window, please?",
  ],
  germanExplanation:
    "The speaking test happens in a small group.\n\nTeil 1: Introduce yourself. Cover your name, age, country, where you live, languages, job and hobbies. The examiner may then ask you to spell your name or say a number. Use short, complete sentences: Ich heiße... Ich bin ... Jahre alt. Ich komme aus... Ich wohne in... Ich spreche... Ich bin ... von Beruf. Mein Hobby ist...\n\nTeil 2: Ask and answer about a topic. You get a card with a topic (for example Essen) and a word (for example Frühstück). Make a question with the word: Was isst du zum Frühstück? Your partner answers, then asks you.\n\nTeil 3: Make a request and react. You get a picture card (for example a window) and make a polite request: Kannst du bitte das Fenster öffnen? Your partner reacts: Ja, gern. or Ja, natürlich.\n\nUse the same form (du or Sie) with your partner for the whole task, and keep your answers short and correct.",
  comparisonRows: [
    {
      english: "Could you open the window, please?",
      german: "Kannst du bitte das Fenster öffnen?",
      note: "Modal first, infinitive at the end",
    },
    {
      english: "Have you got a pen for me?",
      german: "Hast du einen Stift für mich?",
      note: "Simple and polite",
    },
    {
      english: "Of course.",
      german: "Ja, natürlich. / Ja, gern.",
      note: "Short reactions",
    },
    {
      english: "What do you eat for breakfast?",
      german: "Was isst du zum Frühstück?",
      note: "Question from a topic card",
    },
  ],
  helps: [
    "Polite requests work like English: Can you...? = Kannst du...? or Können Sie...?",
    "Short answers are fine. Being correct matters more than being long.",
  ],
  misleads: [
    'Don\'t say "Ich habe 30 Jahre". Say "Ich bin 30 Jahre alt".',
    "Use the same form (du or Sie) with your partner for the whole task.",
  ],
  tables: [
    {
      kind: "generic",
      title: "Topic word → question",
      headers: ["Topic word", "Question you could ask"],
      rows: [
        ["Frühstück", "Was isst du zum Frühstück?"],
        ["Wohnung", "Wie groß ist deine Wohnung?"],
        ["Wochenende", "Was machst du am Wochenende?"],
        ["Sport", "Spielst du Fußball?"],
        ["Geburtstag", "Wann hast du Geburtstag?"],
      ],
    },
  ],
  examples: [
    {
      de: "Ich heiße Neha Gupta und komme aus Indien.",
      en: "My name is Neha Gupta and I'm from India.",
    },
    {
      de: "Ich wohne seit einem Jahr in Leipzig.",
      en: "I've been living in Leipzig for a year.",
    },
    {
      de: "Ich spreche Hindi, Englisch und ein bisschen Deutsch.",
      en: "I speak Hindi, English and a little German.",
    },
    {
      de: "Was machst du am Wochenende?",
      en: "What do you do at the weekend?",
    },
    {
      de: "Kannst du mir bitte einen Stift geben?",
      en: "Can you give me a pen, please?",
    },
    {
      de: "Ja, natürlich. Hier, bitte.",
      en: "Yes, of course. Here you are.",
    },
  ],
  mistakes: [
    {
      wrong: "Ich habe 28 Jahre.",
      right: "Ich bin 28 Jahre alt.",
      why: "Age uses sein.",
    },
    {
      wrong: "Du kannst das Fenster öffnen?",
      right: "Kannst du bitte das Fenster öffnen?",
      why: "A request starts with the verb.",
    },
    {
      wrong: "Ich spreche ein bisschen deutsch.",
      right: "Ich spreche ein bisschen Deutsch.",
      why: "Here Deutsch is a noun (the language), so it takes a capital.",
    },
  ],
  exercises: [
    {
      id: "speak-order-fenster",
      type: "reorderWords",
      skill: "modal-infinitive",
      prompt: "Put the words in order.",
      words: ["kannst", "du", "bitte", "das", "Fenster", "öffnen"],
      alsoAccept: [["kannst", "du", "das", "Fenster", "bitte", "öffnen"]],
      en: "Can you open the window, please?",
    },
    {
      id: "speak-fill-bin",
      type: "fillBlank",
      skill: "conjugation",
      prompt: "Fill in the verb.",
      sentence: "Ich ___ 30 Jahre alt.",
      answers: [["bin"]],
      en: "I'm 30 years old.",
    },
    {
      id: "speak-tr-live",
      type: "translate",
      skill: "general",
      prompt: "Translate.",
      en: "I live in Berlin.",
      answers: ["Ich wohne in Berlin."],
    },
    {
      id: "speak-mc-topic",
      type: "multipleChoice",
      skill: "verb-position",
      prompt: "Topic: Essen. Word: Frühstück. Which question fits?",
      question: "Pick one.",
      options: ["Wo ist das Frühstück?", "Was isst du zum Frühstück?", "Frühstück ist gut?"],
      answer: 1,
    },
  ],
  vocab: [
    {
      de: "sich vorstellen",
      en: "to introduce yourself",
    },
    {
      de: "Sprache",
      en: "language",
      article: "die",
      plural: "Sprachen",
    },
    {
      de: "Wohnort",
      en: "place of residence",
      article: "der",
      plural: "Wohnorte",
    },
    {
      de: "buchstabieren",
      en: "to spell",
    },
    {
      de: "natürlich",
      en: "of course",
    },
    {
      de: "gern",
      en: "gladly, sure",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
