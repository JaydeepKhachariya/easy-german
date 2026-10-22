import type { ConceptInput } from "@/content/schema";

const concept = {
  id: "exam-letters",
  slug: "exam-letters",
  order: 510,
  unit: "Exam",
  category: "writing",
  titleDe: "Briefe und E-Mails schreiben",
  titleEn: "Writing letters and emails",
  minutes: 30,
  summary:
    "Formal and informal templates: greetings, closings, and phrases for inviting, cancelling, asking and apologizing.",
  englishExplanation:
    "English emails have a fixed frame: greeting (Dear Ms Smith, Hi Tom), message, closing (Kind regards, Best wishes), name. Formal and informal letters use different greetings and closings.",
  englishExamples: [
    "Dear Ms Smith,",
    "Thank you for your email.",
    "Unfortunately I can't come on Saturday.",
    "Kind regards, Ravi",
  ],
  germanExplanation:
    "In Schreiben Teil 2 you write a short message (about 30 words) and cover three given points. Write at least one sentence for each point.\n\nFormal (Sie):\n- Greeting: Sehr geehrte Frau Schmidt, / Sehr geehrter Herr Müller, / Sehr geehrte Damen und Herren, (name unknown)\n- Closing: Mit freundlichen Grüßen\n\nInformal (du):\n- Greeting: Liebe Anna, / Lieber Tom, / Hallo Ben,\n- Closing: Viele Grüße / Liebe Grüße / Bis bald!\n\nAfter the comma in the greeting, the first word starts with a lowercase letter, unless it's a noun or Sie.\n\nUseful phrases:\n- Inviting: Ich möchte dich zu meinem Geburtstag einladen. Hast du am Samstag Zeit?\n- Cancelling: Leider kann ich am Montag nicht kommen. Ich bin krank.\n- Asking for information: Können Sie mir bitte Informationen schicken? Wann beginnt der Kurs?\n- Apologizing: Entschuldigen Sie bitte. / Es tut mir leid.\n- Thanking: Vielen Dank für Ihre E-Mail.\n\nThe most common mistake is mixing du and Sie. Decide at the start and keep it: Sie, Ihnen, Ihr in a formal letter; du, dir, dein in an informal one.",
  comparisonRows: [
    {
      english: "Dear Ms Schmidt,",
      german: "Sehr geehrte Frau Schmidt,",
      note: "geehrte for a woman",
    },
    {
      english: "Dear Mr Müller,",
      german: "Sehr geehrter Herr Müller,",
      note: "geehrter for a man",
    },
    {
      english: "Dear Sir or Madam,",
      german: "Sehr geehrte Damen und Herren,",
      note: "",
    },
    {
      english: "Kind regards,",
      german: "Mit freundlichen Grüßen",
      note: "No comma after it.",
    },
    {
      english: "Hi Anna,",
      german: "Liebe Anna,",
      note: "Liebe for women, Lieber for men",
    },
    {
      english: "Best wishes,",
      german: "Viele Grüße",
      note: "",
    },
  ],
  helps: [
    "The structure is the same as an English email.",
    "Fixed phrases make up most of the text. Learn a few by heart.",
  ],
  misleads: [
    "There's no comma after Mit freundlichen Grüßen.",
    "After the greeting line, continue in lowercase: Sehr geehrte Frau Schmidt, ich möchte...",
    "Lieber and Liebe depend on the person's gender.",
  ],
  hindiHint:
    "Hindi letters switch between आप and तुम depending on who you write to. German letters work the same way: Sie for आप, du for तुम. Choose once and keep it.",
  tables: [
    {
      kind: "generic",
      title: "Templates",
      headers: ["", "Formal (Sie)", "Informal (du)"],
      rows: [
        [
          "Greeting",
          "Sehr geehrte Frau ... / Sehr geehrter Herr ...",
          "Liebe ... / Lieber ... / Hallo ...",
        ],
        ["Thanks", "Vielen Dank für Ihre E-Mail.", "Danke für deine Nachricht."],
        ["Inviting", "Ich möchte Sie herzlich einladen.", "Ich möchte dich einladen."],
        ["Cancelling", "Leider kann ich nicht kommen.", "Leider kann ich nicht kommen."],
        ["Asking", "Können Sie mir bitte ... schicken?", "Kannst du mir bitte ... schicken?"],
        [
          "Apologizing",
          "Entschuldigen Sie bitte. Es tut mir leid.",
          "Entschuldige bitte. Es tut mir leid.",
        ],
        ["Closing", "Mit freundlichen Grüßen", "Viele Grüße / Liebe Grüße"],
      ],
    },
  ],
  examples: [
    {
      de: "Sehr geehrte Damen und Herren, ich möchte einen Deutschkurs machen.",
      en: "Dear Sir or Madam, I would like to take a German course.",
    },
    {
      de: "Können Sie mir bitte Informationen über die Kurse schicken?",
      en: "Could you please send me information about the courses?",
    },
    {
      de: "Liebe Maria, vielen Dank für die Einladung!",
      en: "Dear Maria, thank you very much for the invitation!",
    },
    {
      de: "Leider kann ich am Samstag nicht kommen, denn ich muss arbeiten.",
      en: "Unfortunately I can't come on Saturday because I have to work.",
    },
    {
      de: "Hast du nächste Woche Zeit?",
      en: "Do you have time next week?",
    },
    {
      de: "Viele Grüße und bis bald!",
      en: "Best wishes, see you soon!",
    },
  ],
  mistakes: [
    {
      wrong: "Sehr geehrter Herr Weber, können Sie mir helfen? Ich danke dir.",
      right: "Sehr geehrter Herr Weber, können Sie mir helfen? Ich danke Ihnen.",
      why: "A formal letter stays formal: Ihnen, not dir.",
    },
    {
      wrong: "Sehr geehrte Frau Klein, wie geht es dir?",
      right: "Sehr geehrte Frau Klein, wie geht es Ihnen?",
      why: "Sehr geehrte means Sie, so use Ihnen.",
    },
    {
      wrong: "Lieber Anna,",
      right: "Liebe Anna,",
      why: "Anna is a woman: Liebe.",
    },
    {
      wrong: "Mit freundlichen Grüßen,",
      right: "Mit freundlichen Grüßen",
      why: "No comma after the closing.",
    },
    {
      wrong: "Sehr geehrte Frau Klein, Ich möchte einen Termin.",
      right: "Sehr geehrte Frau Klein, ich möchte einen Termin.",
      why: "After the greeting comma, continue in lowercase.",
    },
  ],
  exercises: [
    {
      id: "letter-mc-unknown",
      type: "multipleChoice",
      skill: "writing",
      prompt: "You write to a language school and don't know a name.",
      question: "Pick the greeting.",
      options: ["Liebe Damen und Herren,", "Sehr geehrte Damen und Herren,", "Hallo Schule,"],
      answer: 1,
    },
    {
      id: "letter-fill-ihre",
      type: "fillBlank",
      skill: "formal-address",
      prompt: 'Formal letter: fill in "your".',
      sentence: "Sehr geehrte Frau Berger, vielen Dank für ___ E-Mail.",
      answers: [["Ihre"]],
      en: "Dear Ms Berger, thank you for your email.",
    },
    {
      id: "letter-mc-formal",
      type: "multipleChoice",
      skill: "formal-address",
      prompt: "Formal letter. Which sentence fits?",
      question: "Pick one.",
      options: [
        "Kannst du mir bitte die Preise schicken?",
        "Können Sie mir bitte die Preise schicken?",
        "Könnt ihr mir die Preise schicken?",
      ],
      answer: 1,
    },
    {
      id: "letter-pairs",
      type: "matchPairs",
      skill: "formal-address",
      prompt: "Match each formal phrase to its informal version.",
      pairs: [
        {
          left: "Sehr geehrte Frau Roth,",
          right: "Liebe Petra,",
        },
        {
          left: "Mit freundlichen Grüßen",
          right: "Viele Grüße",
        },
        {
          left: "Vielen Dank für Ihre E-Mail.",
          right: "Danke für deine Nachricht.",
        },
        {
          left: "Können Sie ...?",
          right: "Kannst du ...?",
        },
      ],
    },
    {
      id: "letter-tr-cancel",
      type: "translate",
      skill: "writing",
      prompt: "Translate.",
      en: "Unfortunately I can't come.",
      answers: ["Leider kann ich nicht kommen.", "Ich kann leider nicht kommen."],
    },
  ],
  vocab: [
    {
      de: "E-Mail",
      en: "email",
      article: "die",
      plural: "E-Mails",
    },
    {
      de: "Nachricht",
      en: "message",
      article: "die",
      plural: "Nachrichten",
    },
    {
      de: "Einladung",
      en: "invitation",
      article: "die",
      plural: "Einladungen",
    },
    {
      de: "einladen",
      en: "to invite",
    },
    {
      de: "absagen",
      en: "to cancel",
    },
    {
      de: "leider",
      en: "unfortunately",
    },
    {
      de: "schicken",
      en: "to send",
    },
    {
      de: "Gruß",
      en: "greeting",
      article: "der",
      plural: "Grüße",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
