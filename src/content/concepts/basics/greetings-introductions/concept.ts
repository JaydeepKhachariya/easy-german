import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "greetings-introductions",
  slug: "greetings-introductions",
  order: 20,
  unit: "Basics",
  titleDe: "Begrüßung und sich vorstellen",
  titleEn: "Greetings and introducing yourself",
  category: "speaking",
  minutes: 20,
  summary:
    "Say hello at the right level of formality and tell people your name, where you're from and what you do.",
  englishExplanation:
    'English greetings change with the time of day: good morning, good evening. "Hello" and "hi" work almost anywhere. To introduce yourself you say "My name is..." or "I\'m..." and add where you\'re from.',
  englishExamples: [
    "Hi, I'm Priya.",
    "Good morning, my name is Arjun Mehta.",
    "I'm from India and I live in Pune.",
    "Nice to meet you.",
  ],
  germanExplanation:
    'German has the same pattern, with one extra choice: formal or informal. With friends, family, children and young people, say Hallo and use du. With strangers, at work and in offices, say Guten Tag and use Sie.\n\nGreetings by time of day: Guten Morgen (until about 11), Guten Tag (daytime), Guten Abend (evening). Gute Nacht is only for going to bed. Goodbye: Auf Wiedersehen (formal), Tschüss (informal).\n\nTo introduce yourself: Ich heiße... or Mein Name ist... Then: Ich komme aus Indien. Ich wohne in Pune. Ich bin Ingenieurin.\n\nJobs come without "a": Ich bin Lehrer. Not "Ich bin ein Lehrer".',
  comparisonRows: [
    {
      english: "My name is Ravi.",
      german: "Ich heiße Ravi.",
      note: 'heißen means "to be called".',
    },
    {
      english: "I'm from India.",
      german: "Ich komme aus Indien.",
      note: "Word for word: I come out of India.",
    },
    {
      english: "I'm a teacher.",
      german: "Ich bin Lehrerin.",
      note: "No article before jobs.",
    },
    {
      english: "How are you?",
      german: "Wie geht es Ihnen? / Wie geht's?",
      note: "Formal and informal.",
    },
  ],
  helps: [
    "Hallo is almost the same word.",
    "Guten Morgen and Guten Abend follow the English pattern: good + time of day.",
  ],
  misleads: [
    "Gute Nacht is only for bedtime, not a general evening greeting.",
    "Don't add ein before a job: Ich bin Arzt.",
    'Wie geht\'s? is a real question. People expect a short answer, like "Gut, danke".',
  ],
  hindiHint:
    "The du/Sie choice works like तुम and आप. Use Sie where you would say आप: with older people, officials and people you don't know.",
  tables: [
    {
      kind: "generic",
      title: "Greetings",
      headers: ["", "Informal", "Formal"],
      rows: [
        ["Hello", "Hallo!", "Guten Tag!"],
        ["Goodbye", "Tschüss!", "Auf Wiedersehen!"],
        ["How are you?", "Wie geht's?", "Wie geht es Ihnen?"],
        ["What's your name?", "Wie heißt du?", "Wie heißen Sie?"],
        ["Where are you from?", "Woher kommst du?", "Woher kommen Sie?"],
      ],
    },
  ],
  examples: [
    {
      de: "Guten Tag, ich heiße Arjun Mehta.",
      en: "Hello, my name is Arjun Mehta.",
    },
    {
      de: "Ich komme aus Indien, aus Mumbai.",
      en: "I'm from India, from Mumbai.",
    },
    {
      de: "Ich wohne jetzt in Stuttgart.",
      en: "I live in Stuttgart now.",
    },
    {
      de: "Ich bin Ingenieur von Beruf.",
      en: "I'm an engineer by profession.",
      gloss: "I am engineer by profession",
    },
    {
      de: "Wie geht es Ihnen?",
      en: "How are you? (formal)",
      gloss: "How goes it to-you?",
    },
    {
      de: "Danke, gut. Und Ihnen?",
      en: "Fine, thanks. And you?",
    },
    {
      de: "Freut mich!",
      en: "Nice to meet you!",
      gloss: "Pleases me!",
    },
  ],
  mistakes: [
    {
      wrong: "Ich bin ein Lehrer.",
      right: "Ich bin Lehrer.",
      why: "No ein before jobs.",
    },
    {
      wrong: "Ich komme von Indien.",
      right: "Ich komme aus Indien.",
      why: "For the country or city you come from, use aus.",
    },
    {
      wrong: "Mein Name heißt Anna.",
      right: "Ich heiße Anna.",
      why: 'Say "Ich heiße Anna" or "Mein Name ist Anna". A name isn\'t "called" anything.',
    },
  ],
  exercises: [
    {
      id: "greet-mc-manager",
      type: "multipleChoice",
      skill: "formal-address",
      prompt: "You meet your new manager at 10 a.m. What do you say?",
      question: "Pick the best greeting.",
      options: ["Hallo, wie geht's?", "Guten Morgen, Frau Schmidt!", "Gute Nacht, Frau Schmidt!"],
      answer: 1,
    },
    {
      id: "greet-fill-aus",
      type: "fillBlank",
      skill: "general",
      prompt: "Fill in the missing word.",
      sentence: "Ich komme ___ Indien.",
      answers: [["aus"]],
      en: "I come from India.",
    },
    {
      id: "greet-tr-name",
      type: "translate",
      skill: "general",
      prompt: "Translate.",
      en: "My name is Priya.",
      answers: ["Ich heiße Priya.", "Mein Name ist Priya."],
    },
    {
      id: "greet-order-woher",
      type: "reorderWords",
      skill: "word-order",
      prompt: "Put the words in order.",
      words: ["woher", "kommen", "Sie"],
      alsoAccept: [],
      en: "Where are you from? (formal)",
    },
  ],
  vocab: [
    {
      de: "heißen",
      en: "to be called",
    },
    {
      de: "kommen",
      en: "to come",
    },
    {
      de: "wohnen",
      en: "to live",
    },
    {
      de: "Name",
      en: "name",
      article: "der",
      plural: "Namen",
    },
    {
      de: "Land",
      en: "country",
      article: "das",
      plural: "Länder",
    },
    {
      de: "Beruf",
      en: "job, profession",
      article: "der",
      plural: "Berufe",
    },
    {
      de: "Tschüss",
      en: "bye",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
