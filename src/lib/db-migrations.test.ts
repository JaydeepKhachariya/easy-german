import "fake-indexeddb/auto";

import { Dexie } from "dexie";

import { DeutschBridgeDB } from "./db";
import { DB_VERSIONS, V1_STORES, type DbVersion } from "./db-migrations";

describe("database versions", () => {
  it("has strictly increasing version numbers", () => {
    const nums = DB_VERSIONS.map((v) => v.version);
    expect(nums).toEqual([...nums].sort((a, b) => a - b));
    expect(new Set(nums).size).toBe(nums.length);
  });

  it("keeps existing rows when a new version with an upgrade is added", async () => {
    const name = `migration-test-${Math.random()}`;

    // A learner's browser on version 1.
    const v1 = new DeutschBridgeDB(name, DB_VERSIONS);
    await v1.vocab.add({
      id: "der hund",
      de: "Hund",
      en: "dog",
      article: "der",
      conceptKey: "core:nicht-kein",
      addedAt: 1,
      ease: 2.5,
      interval: 0,
      repetitions: 0,
      lapses: 0,
      due: 0,
    });
    await v1.settings.put({ key: "speechRate", value: 0.8 });
    v1.close();

    // A later release adds a field and an index.
    const future: DbVersion[] = [
      ...DB_VERSIONS,
      {
        version: 99,
        stores: { ...V1_STORES, vocab: "id, due, conceptKey, addedAt, tag" },
        upgrade: (tx) =>
          tx
            .table("vocab")
            .toCollection()
            .modify((c: { tag?: string }) => {
              c.tag = "lesson";
            }),
      },
    ];
    const v2 = new DeutschBridgeDB(name, future);
    const card = (await v2.vocab.get("der hund")) as unknown as { de: string; tag: string };
    expect(card.de).toBe("Hund");
    expect(card.tag).toBe("lesson");
    expect((await v2.settings.get("speechRate"))?.value).toBe(0.8);
    expect(await v2.table("vocab").where("tag").equals("lesson").count()).toBe(1);
    v2.close();
    await Dexie.delete(name);
  });
});
