import { VerbInfoSchema, type VerbInfo } from "@/content/dictionary/schema";

import { allVerbForms, conjugate, needsLinkingE, weakParticiple } from "./conjugate";

const info = (v: Partial<VerbInfo> = {}) => VerbInfoSchema.parse(v);
const tense = (inf: string, v: Partial<VerbInfo>, key: string) =>
  conjugate(inf, info(v)).tenses.find((t) => t.key === key)!.forms;

describe("present tense", () => {
  it("regular verbs", () => {
    expect(tense("machen", {}, "present")).toEqual([
      "mache",
      "machst",
      "macht",
      "machen",
      "macht",
      "machen",
    ]);
    expect(tense("wohnen", {}, "present")).toEqual([
      "wohne",
      "wohnst",
      "wohnt",
      "wohnen",
      "wohnt",
      "wohnen",
    ]);
  });

  it("adds a linking e after t, d and consonant + n/m", () => {
    expect(tense("arbeiten", {}, "present")).toEqual([
      "arbeite",
      "arbeitest",
      "arbeitet",
      "arbeiten",
      "arbeitet",
      "arbeiten",
    ]);
    expect(tense("öffnen", {}, "present")).toEqual([
      "öffne",
      "öffnest",
      "öffnet",
      "öffnen",
      "öffnet",
      "öffnen",
    ]);
    expect(tense("rechnen", {}, "present")[1]).toBe("rechnest");
    expect(tense("finden", {}, "present")[2]).toBe("findet");
    expect(needsLinkingE("lern")).toBe(false);
    expect(needsLinkingE("komm")).toBe(false);
  });

  it("du only adds -t after s, ß, z", () => {
    expect(tense("heißen", {}, "present")[1]).toBe("heißt");
    expect(tense("tanzen", {}, "present")[1]).toBe("tanzt");
    expect(tense("reisen", {}, "present")[1]).toBe("reist");
  });

  it("-eln and -ern verbs", () => {
    expect(tense("wandern", {}, "present")).toEqual([
      "wandere",
      "wanderst",
      "wandert",
      "wandern",
      "wandert",
      "wandern",
    ]);
    expect(tense("sammeln", {}, "present")).toEqual([
      "sammle",
      "sammelst",
      "sammelt",
      "sammeln",
      "sammelt",
      "sammeln",
    ]);
    expect(tense("tun", { past: "tat", participle: "getan" }, "present")).toEqual([
      "tue",
      "tust",
      "tut",
      "tun",
      "tut",
      "tun",
    ]);
  });

  it("vowel change for du and er/sie/es only", () => {
    expect(tense("fahren", { presentStem: "fähr" }, "present")).toEqual([
      "fahre",
      "fährst",
      "fährt",
      "fahren",
      "fahrt",
      "fahren",
    ]);
    expect(tense("nehmen", { presentStem: "nimm" }, "present")).toEqual([
      "nehme",
      "nimmst",
      "nimmt",
      "nehmen",
      "nehmt",
      "nehmen",
    ]);
    expect(tense("essen", { presentStem: "iss" }, "present")).toEqual([
      "esse",
      "isst",
      "isst",
      "essen",
      "esst",
      "essen",
    ]);
    expect(tense("lesen", { presentStem: "lies" }, "present")).toEqual([
      "lese",
      "liest",
      "liest",
      "lesen",
      "lest",
      "lesen",
    ]);
    expect(tense("halten", { presentStem: "hält" }, "present")).toEqual([
      "halte",
      "hältst",
      "hält",
      "halten",
      "haltet",
      "halten",
    ]);
    expect(tense("sehen", { presentStem: "sieh" }, "present")).toEqual([
      "sehe",
      "siehst",
      "sieht",
      "sehen",
      "seht",
      "sehen",
    ]);
  });

  it("separable and reflexive verbs", () => {
    expect(tense("aufstehen", { separable: "auf", aux: "sein" }, "present")).toEqual([
      "stehe auf",
      "stehst auf",
      "steht auf",
      "stehen auf",
      "steht auf",
      "stehen auf",
    ]);
    expect(tense("anziehen", { separable: "an", reflexive: true }, "present")).toEqual([
      "ziehe mich an",
      "ziehst dich an",
      "zieht sich an",
      "ziehen uns an",
      "zieht euch an",
      "ziehen sich an",
    ]);
  });
});

describe("Präteritum", () => {
  it("weak verbs", () => {
    expect(tense("machen", {}, "past")).toEqual([
      "machte",
      "machtest",
      "machte",
      "machten",
      "machtet",
      "machten",
    ]);
    expect(tense("arbeiten", {}, "past")).toEqual([
      "arbeitete",
      "arbeitetest",
      "arbeitete",
      "arbeiteten",
      "arbeitetet",
      "arbeiteten",
    ]);
    expect(tense("wandern", {}, "past")[0]).toBe("wanderte");
  });

  it("strong verbs", () => {
    expect(tense("gehen", { past: "ging" }, "past")).toEqual([
      "ging",
      "gingst",
      "ging",
      "gingen",
      "gingt",
      "gingen",
    ]);
    expect(tense("finden", { past: "fand" }, "past")).toEqual([
      "fand",
      "fandest",
      "fand",
      "fanden",
      "fandet",
      "fanden",
    ]);
    expect(tense("essen", { past: "aß" }, "past")).toEqual([
      "aß",
      "aßest",
      "aß",
      "aßen",
      "aßt",
      "aßen",
    ]);
    expect(tense("schreiben", { past: "schrieb" }, "past")[3]).toBe("schrieben");
    expect(tense("schreien", { past: "schrie" }, "past")[3]).toBe("schrien");
  });

  it("mixed verbs use -te endings", () => {
    expect(tense("bringen", { past: "brachte", participle: "gebracht" }, "past")).toEqual([
      "brachte",
      "brachtest",
      "brachte",
      "brachten",
      "brachtet",
      "brachten",
    ]);
  });

  it("keeps the prefix at the end", () => {
    expect(tense("aufstehen", { separable: "auf", past: "stand" }, "past")[0]).toBe("stand auf");
  });
});

describe("participles and compound tenses", () => {
  it("builds weak participles", () => {
    expect(weakParticiple("machen")).toBe("gemacht");
    expect(weakParticiple("arbeiten")).toBe("gearbeitet");
    expect(weakParticiple("kaufen", "ein")).toBe("eingekauft");
    expect(weakParticiple("besuchen")).toBe("besucht");
    expect(weakParticiple("verkaufen")).toBe("verkauft");
    expect(weakParticiple("studieren")).toBe("studiert");
    expect(weakParticiple("wandern")).toBe("gewandert");
  });

  it("uses haben or sein", () => {
    expect(
      tense("gehen", { aux: "sein", past: "ging", participle: "gegangen" }, "perfect"),
    ).toEqual([
      "bin gegangen",
      "bist gegangen",
      "ist gegangen",
      "sind gegangen",
      "seid gegangen",
      "sind gegangen",
    ]);
    expect(tense("machen", {}, "perfect")[0]).toBe("habe gemacht");
    expect(tense("machen", {}, "pluperfect")[0]).toBe("hatte gemacht");
    expect(
      tense("fahren", { aux: "sein", past: "fuhr", participle: "gefahren" }, "pluperfect")[3],
    ).toBe("waren gefahren");
  });

  it("future and würde", () => {
    expect(tense("aufstehen", { separable: "auf" }, "future")[1]).toBe("wirst aufstehen");
    expect(tense("anziehen", { separable: "an", reflexive: true }, "subjunctive")[0]).toBe(
      "würde mich anziehen",
    );
    expect(
      tense(
        "anziehen",
        { separable: "an", reflexive: true, participle: "angezogen", past: "zog" },
        "perfect",
      )[0],
    ).toBe("habe mich angezogen");
  });
});

describe("imperative", () => {
  const imp = (inf: string, v: Partial<VerbInfo> = {}) => conjugate(inf, info(v)).imperative;

  it("regular and linking-e verbs", () => {
    expect(imp("kommen")).toEqual(["komm", "kommt", "kommen Sie"]);
    expect(imp("warten")).toEqual(["warte", "wartet", "warten Sie"]);
    expect(imp("öffnen")).toEqual(["öffne", "öffnet", "öffnen Sie"]);
    expect(imp("sammeln")).toEqual(["sammle", "sammelt", "sammeln Sie"]);
  });

  it("e → i verbs give their own du form; a → ä verbs don't change", () => {
    expect(imp("nehmen", { presentStem: "nimm", imperative: "nimm" })).toEqual([
      "nimm",
      "nehmt",
      "nehmen Sie",
    ]);
    expect(imp("fahren", { presentStem: "fähr" })).toEqual(["fahr", "fahrt", "fahren Sie"]);
  });

  it("separable and reflexive", () => {
    expect(imp("aufstehen", { separable: "auf" })).toEqual([
      "steh auf",
      "steht auf",
      "stehen Sie auf",
    ]);
    expect(imp("anziehen", { separable: "an", reflexive: true })).toEqual([
      "zieh dich an",
      "zieht euch an",
      "ziehen Sie sich an",
    ]);
  });

  it("modals have none", () => {
    expect(imp("können", { imperative: null })).toBeNull();
  });
});

describe("irregular verbs with stored tables", () => {
  const sein = info({
    aux: "sein",
    presentForms: ["bin", "bist", "ist", "sind", "seid", "sind"],
    pastForms: ["war", "warst", "war", "waren", "wart", "waren"],
    subjunctiveForms: ["wäre", "wärst", "wäre", "wären", "wärt", "wären"],
    participle: "gewesen",
    imperativeForms: ["sei", "seid", "seien Sie"],
  });

  it("uses the stored forms", () => {
    const c = conjugate("sein", sein);
    expect(c.kind).toBe("irregular");
    expect(c.principalParts).toBe("ist · war · ist gewesen");
    expect(c.tenses.find((t) => t.key === "perfect")!.forms[0]).toBe("bin gewesen");
    expect(c.imperative).toEqual(["sei", "seid", "seien Sie"]);
  });

  it("lists every form for lookup", () => {
    const c = conjugate(
      "aufstehen",
      info({ separable: "auf", past: "stand", participle: "aufgestanden", aux: "sein" }),
    );
    const forms = allVerbForms(c);
    expect(forms).toEqual(
      expect.arrayContaining(["aufstehen", "aufgestanden", "stehe auf", "stehe", "stand", "steh"]),
    );
  });

  it("principal parts", () => {
    expect(
      conjugate("gehen", info({ aux: "sein", past: "ging", participle: "gegangen" }))
        .principalParts,
    ).toBe("geht · ging · ist gegangen");
    expect(conjugate("machen", info()).principalParts).toBe("macht · machte · hat gemacht");
  });
});
