import { v } from "../builders";

/** Verbs that fit no pattern store their full tables. Everything else is generated. */
export default [
  v(
    "sein",
    "to be",
    {
      aux: "sein",
      presentForms: ["bin", "bist", "ist", "sind", "seid", "sind"],
      pastForms: ["war", "warst", "war", "waren", "wart", "waren"],
      subjunctiveForms: ["wäre", "wärst", "wäre", "wären", "wärt", "wären"],
      participle: "gewesen",
      imperativeForms: ["sei", "seid", "seien Sie"],
    },
    ["basics"],
    [
      ["Ich bin müde.", "I'm tired."],
      ["Wo warst du gestern?", "Where were you yesterday?"],
    ],
    { lessons: ["sein-und-haben", "praeteritum-sein-haben"] },
  ),

  v(
    "haben",
    "to have",
    {
      presentForms: ["habe", "hast", "hat", "haben", "habt", "haben"],
      pastForms: ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"],
      subjunctiveForms: ["hätte", "hättest", "hätte", "hätten", "hättet", "hätten"],
      participle: "gehabt",
      imperativeForms: ["hab", "habt", "haben Sie"],
      case: "akk",
    },
    ["basics"],
    [
      ["Hast du heute Zeit?", "Do you have time today?"],
      ["Ich habe Hunger.", "I'm hungry."],
    ],
    { lessons: ["sein-und-haben", "praeteritum-sein-haben"] },
  ),

  v(
    "werden",
    "to become; will (future)",
    {
      aux: "sein",
      presentForms: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
      pastForms: ["wurde", "wurdest", "wurde", "wurden", "wurdet", "wurden"],
      subjunctiveForms: ["würde", "würdest", "würde", "würden", "würdet", "würden"],
      participle: "geworden",
      imperativeForms: ["werd", "werdet", "werden Sie"],
    },
    ["basics"],
    [
      ["Sie wird Ärztin.", "She's becoming a doctor."],
      ["Es wird kalt.", "It's getting cold."],
    ],
    { level: "A1" },
  ),

  v(
    "wissen",
    "to know (a fact)",
    {
      presentForms: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
      pastForms: ["wusste", "wusstest", "wusste", "wussten", "wusstet", "wussten"],
      subjunctiveForms: ["wüsste", "wüsstest", "wüsste", "wüssten", "wüsstet", "wüssten"],
      participle: "gewusst",
      imperativeForms: ["wisse", "wisst", "wissen Sie"],
      case: "akk",
    },
    ["communication"],
    [
      ["Ich weiß es nicht.", "I don't know."],
      ["Weißt du, wo der Bahnhof ist?", "Do you know where the station is?"],
    ],
    { note: "wissen is for facts. For people and places, use kennen." },
  ),

  v(
    "können",
    "can; to be able to",
    {
      presentForms: ["kann", "kannst", "kann", "können", "könnt", "können"],
      past: "konnte",
      subjunctiveForms: ["könnte", "könntest", "könnte", "könnten", "könntet", "könnten"],
      participle: "gekonnt",
      imperative: null,
    },
    ["grammar"],
    [
      ["Ich kann gut schwimmen.", "I can swim well."],
      ["Könnten Sie mir helfen?", "Could you help me?"],
    ],
    { lessons: ["modal-verbs"] },
  ),

  v(
    "müssen",
    "must; to have to",
    {
      presentForms: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
      past: "musste",
      subjunctiveForms: ["müsste", "müsstest", "müsste", "müssten", "müsstet", "müssten"],
      participle: "gemusst",
      imperative: null,
    },
    ["grammar"],
    [
      ["Ich muss heute arbeiten.", "I have to work today."],
      ["Du musst nicht kommen.", "You don't have to come."],
    ],
    { lessons: ["modal-verbs"] },
  ),

  v(
    "dürfen",
    "may; to be allowed to",
    {
      presentForms: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
      past: "durfte",
      subjunctiveForms: ["dürfte", "dürftest", "dürfte", "dürften", "dürftet", "dürften"],
      participle: "gedurft",
      imperative: null,
    },
    ["grammar"],
    [
      ["Hier darf man nicht parken.", "You're not allowed to park here."],
      ["Darf ich das Fenster öffnen?", "May I open the window?"],
    ],
    { lessons: ["modal-verbs"] },
  ),

  v(
    "sollen",
    "should; to be supposed to",
    {
      presentForms: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
      past: "sollte",
      subjunctiveForms: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"],
      participle: "gesollt",
      imperative: null,
    },
    ["grammar"],
    [
      ["Du sollst mehr Wasser trinken.", "You're supposed to drink more water."],
      ["Was soll ich machen?", "What should I do?"],
    ],
    { lessons: ["modal-verbs"] },
  ),

  v(
    "wollen",
    "to want (to)",
    {
      presentForms: ["will", "willst", "will", "wollen", "wollt", "wollen"],
      past: "wollte",
      subjunctiveForms: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
      participle: "gewollt",
      imperative: null,
    },
    ["grammar"],
    [
      ["Ich will Deutsch lernen.", "I want to learn German."],
      ["Wir wollen nach Indien fliegen.", "We want to fly to India."],
    ],
    { lessons: ["modal-verbs"], note: 'ich will means "I want", not "I will".' },
  ),

  v(
    "mögen",
    "to like",
    {
      presentForms: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
      past: "mochte",
      subjunctiveForms: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
      participle: "gemocht",
      imperative: null,
      case: "akk",
    },
    ["basics"],
    [
      ["Ich mag Tee.", "I like tea."],
      ["Magst du Hunde?", "Do you like dogs?"],
    ],
    { note: "For activities, German prefers verb + gern: Ich schwimme gern." },
  ),

  v(
    "möchten",
    "would like (to)",
    {
      presentForms: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
      pastForms: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
      subjunctiveForms: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
      participle: "gewollt",
      imperative: null,
      case: "akk",
    },
    ["basics", "shopping"],
    [
      ["Ich möchte einen Kaffee, bitte.", "I'd like a coffee, please."],
      ["Möchten Sie etwas trinken?", "Would you like something to drink?"],
    ],
    {
      lessons: ["modal-verbs"],
      note: "möchten has no past of its own. For the past, use wollen: Ich wollte...",
    },
  ),
];
