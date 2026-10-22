import type { ConceptInput } from "@/content/schema";

import alphabetPronunciation from "./basics/alphabet-pronunciation/concept";
import daysMonthsDates from "./basics/days-months-dates/concept";
import greetingsIntroductions from "./basics/greetings-introductions/concept";
import numbers from "./basics/numbers/concept";
import tellingTime from "./basics/telling-time/concept";
import examLetters from "./exam/exam-letters/concept";
import examOverview from "./exam/exam-overview/concept";
import examSpeaking from "./exam/exam-speaking/concept";
import adjectivesAfterSein from "./grammar/adjectives-after-sein/concept";
import akkusativ from "./grammar/akkusativ/concept";
import akkusativPrepositions from "./grammar/akkusativ-prepositions/concept";
import conjunctions from "./grammar/conjunctions/concept";
import dativ from "./grammar/dativ/concept";
import dativPrepositions from "./grammar/dativ-prepositions/concept";
import duIhrSie from "./grammar/du-ihr-sie/concept";
import esGibt from "./grammar/es-gibt/concept";
import gernLieber from "./grammar/gern-lieber/concept";
import imperative from "./grammar/imperative/concept";
import modalVerbs from "./grammar/modal-verbs/concept";
import nichtKein from "./grammar/nicht-kein/concept";
import nounsAndArticles from "./grammar/nouns-and-articles/concept";
import perfekt from "./grammar/perfekt/concept";
import personalPronouns from "./grammar/personal-pronouns/concept";
import possessiveArticles from "./grammar/possessive-articles/concept";
import praeteritumSeinHaben from "./grammar/praeteritum-sein-haben/concept";
import regularVerbs from "./grammar/regular-verbs/concept";
import seinUndHaben from "./grammar/sein-und-haben/concept";
import separableVerbs from "./grammar/separable-verbs/concept";
import strongVerbs from "./grammar/strong-verbs/concept";
import timeAdverbs from "./grammar/time-adverbs/concept";
import verbPosition2 from "./grammar/verb-position-2/concept";
import wQuestions from "./grammar/w-questions/concept";
import yesNoQuestions from "./grammar/yes-no-questions/concept";
import vocabDailyRoutine from "./vocabulary/vocab-daily-routine/concept";
import vocabFamily from "./vocabulary/vocab-family/concept";
import vocabFood from "./vocabulary/vocab-food/concept";
import vocabHealth from "./vocabulary/vocab-health/concept";
import vocabHome from "./vocabulary/vocab-home/concept";
import vocabLeisure from "./vocabulary/vocab-leisure/concept";
import vocabShopping from "./vocabulary/vocab-shopping/concept";
import vocabTravel from "./vocabulary/vocab-travel/concept";
import vocabWork from "./vocabulary/vocab-work/concept";

/** Every core concept. Order on screen comes from each concept's `order` field. */
export const RAW_CONCEPTS: ConceptInput[] = [
  alphabetPronunciation,
  daysMonthsDates,
  greetingsIntroductions,
  numbers,
  tellingTime,
  adjectivesAfterSein,
  akkusativ,
  akkusativPrepositions,
  conjunctions,
  dativ,
  dativPrepositions,
  duIhrSie,
  esGibt,
  gernLieber,
  imperative,
  modalVerbs,
  nichtKein,
  nounsAndArticles,
  perfekt,
  personalPronouns,
  possessiveArticles,
  praeteritumSeinHaben,
  regularVerbs,
  seinUndHaben,
  separableVerbs,
  strongVerbs,
  timeAdverbs,
  verbPosition2,
  wQuestions,
  yesNoQuestions,
  vocabDailyRoutine,
  vocabFamily,
  vocabFood,
  vocabHealth,
  vocabHome,
  vocabLeisure,
  vocabShopping,
  vocabTravel,
  vocabWork,
  examLetters,
  examOverview,
  examSpeaking,
];
