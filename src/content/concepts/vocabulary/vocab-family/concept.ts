import type { ConceptInput } from "@/content/schema";

const concept = {
  unit: "Vocabulary",
  category: "vocabulary",
  id: "vocab-family",
  slug: "vocab-family",
  order: 400,
  titleDe: "Die Familie",
  titleEn: "Family",
  minutes: 15,
  summary: "Mutter, Vater, Bruder, Schwester look like English. Eltern (parents) is always plural.",
  englishExplanation:
    'English family words: mother, father, brother, sister, grandmother, uncle, aunt, cousin. "Parents" and "siblings" group them.',
  englishExamples: [
    "These are my parents.",
    "I have two brothers.",
    "Do you have any brothers or sisters?",
  ],
  germanExplanation:
    "Many German family words are close to English: die Mutter, der Vater, der Bruder, die Schwester, der Sohn, die Tochter.\n\nGroup words: die Eltern (parents, always plural), die Geschwister (brothers and sisters, usually plural), die Großeltern (grandparents).\n\nWith possessives: mein Vater, meine Mutter, meine Eltern.\n\nFamily is a typical Start Deutsch 1 speaking topic: Ich habe einen Bruder und zwei Schwestern. Ich bin verheiratet und habe ein Kind.",
  comparisonRows: [
    {
      english: "my parents",
      german: "meine Eltern",
      note: "Plural only.",
    },
    {
      english: "I have a brother.",
      german: "Ich habe einen Bruder.",
      note: "Akkusativ: einen",
    },
    {
      english: "I'm married.",
      german: "Ich bin verheiratet.",
      note: "sein + adjective",
    },
    {
      english: "my cousin (male / female)",
      german: "mein Cousin / meine Cousine",
      note: "Two forms",
    },
  ],
  helps: [
    "Mutter/mother, Vater/father, Bruder/brother, Sohn/son, Tochter/daughter are related words.",
    "Großmutter works like grandmother: groß = grand.",
  ],
  misleads: [
    "Eltern doesn't look like parents, and it's always plural: Meine Eltern sind...",
    "Geschwister means brothers and sisters together.",
  ],
  hindiHint:
    "Hindi has separate words for father's and mother's relatives (चाचा, मामा, ताऊ, फूफा). German doesn't: Onkel covers all of them, and Tante covers all aunts.",
  tables: [
    {
      kind: "generic",
      title: "Family words",
      headers: ["German", "Plural", "English"],
      rows: [
        ["der Vater", "die Väter", "father"],
        ["die Mutter", "die Mütter", "mother"],
        ["der Bruder", "die Brüder", "brother"],
        ["die Schwester", "die Schwestern", "sister"],
        ["der Sohn", "die Söhne", "son"],
        ["die Tochter", "die Töchter", "daughter"],
        ["der Onkel", "die Onkel", "uncle"],
        ["die Tante", "die Tanten", "aunt"],
        ["die Oma / der Opa", "die Omas / die Opas", "grandma / grandpa"],
      ],
    },
  ],
  examples: [
    {
      de: "Das sind meine Eltern.",
      en: "These are my parents.",
    },
    {
      de: "Ich habe zwei Brüder und eine Schwester.",
      en: "I have two brothers and a sister.",
    },
    {
      de: "Meine Tochter ist fünf Jahre alt.",
      en: "My daughter is five years old.",
    },
    {
      de: "Hast du Geschwister?",
      en: "Do you have brothers or sisters?",
    },
    {
      de: "Meine Großeltern wohnen in Kerala.",
      en: "My grandparents live in Kerala.",
    },
  ],
  mistakes: [
    {
      wrong: "Meine Eltern ist nett.",
      right: "Meine Eltern sind nett.",
      why: "Eltern is plural: sind.",
    },
    {
      wrong: "Ich habe ein Bruder.",
      right: "Ich habe einen Bruder.",
      why: "Akkusativ: einen.",
    },
    {
      wrong: "Das ist mein Tochter.",
      right: "Das ist meine Tochter.",
      why: "die Tochter: meine.",
    },
  ],
  exercises: [
    {
      id: "fam-pick",
      type: "articlePick",
      skill: "articles",
      prompt: "Pick der, die or das.",
      nouns: [
        {
          noun: "Vater",
          article: "der",
          en: "father",
        },
        {
          noun: "Mutter",
          article: "die",
          en: "mother",
        },
        {
          noun: "Kind",
          article: "das",
          en: "child",
        },
        {
          noun: "Tochter",
          article: "die",
          en: "daughter",
        },
        {
          noun: "Sohn",
          article: "der",
          en: "son",
        },
        {
          noun: "Tante",
          article: "die",
          en: "aunt",
        },
      ],
    },
    {
      id: "fam-pairs",
      type: "matchPairs",
      skill: "vocabulary",
      prompt: "Match the words.",
      pairs: [
        {
          left: "Eltern",
          right: "parents",
        },
        {
          left: "Geschwister",
          right: "brothers and sisters",
        },
        {
          left: "Großeltern",
          right: "grandparents",
        },
        {
          left: "Tochter",
          right: "daughter",
        },
        {
          left: "Sohn",
          right: "son",
        },
      ],
    },
    {
      id: "fam-tr-sister",
      type: "translate",
      skill: "cases",
      prompt: "Translate.",
      en: "I have a sister.",
      answers: ["Ich habe eine Schwester."],
    },
  ],
  vocab: [
    {
      de: "Vater",
      en: "father",
      article: "der",
      plural: "Väter",
    },
    {
      de: "Mutter",
      en: "mother",
      article: "die",
      plural: "Mütter",
    },
    {
      de: "Eltern",
      en: "parents",
    },
    {
      de: "Sohn",
      en: "son",
      article: "der",
      plural: "Söhne",
    },
    {
      de: "Tochter",
      en: "daughter",
      article: "die",
      plural: "Töchter",
    },
    {
      de: "Geschwister",
      en: "brothers and sisters",
    },
    {
      de: "Tante",
      en: "aunt",
      article: "die",
      plural: "Tanten",
    },
    {
      de: "verheiratet",
      en: "married",
    },
  ],
  level: "A1",
  status: "draft",
  diagrams: [],
  prerequisites: [],
} satisfies ConceptInput;

export default concept;
