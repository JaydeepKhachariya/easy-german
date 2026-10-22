import type { VocabCard } from "./db";
import { buildQueue, nextDueLabel } from "./review-queue";

const card = (id: string, extra: Partial<VocabCard>): VocabCard => ({
  id,
  de: id,
  en: id,
  conceptKey: "core:x",
  addedAt: 0,
  ease: 2.5,
  interval: 0,
  repetitions: 0,
  lapses: 0,
  due: 0,
  ...extra,
});

describe("buildQueue", () => {
  it("puts due reviews first, then limited new cards", () => {
    const now = 1000;
    const q = buildQueue(
      [
        card("new1", { addedAt: 1 }),
        card("later", { lastReviewed: 1, due: 5000 }),
        card("due2", { lastReviewed: 1, due: 900 }),
        card("due1", { lastReviewed: 1, due: 100 }),
        card("new2", { addedAt: 2 }),
        card("new3", { addedAt: 3 }),
      ],
      now,
      2,
    );
    expect(q.map((c) => c.id)).toEqual(["due1", "due2", "new1", "new2"]);
  });
});

describe("nextDueLabel", () => {
  it("describes the next due card", () => {
    expect(nextDueLabel([card("a", { due: 2 * 3_600_000 })], 0)).toBe("in 2 hours");
    expect(nextDueLabel([card("a", { due: 3 * 86_400_000 })], 0)).toBe("in 3 days");
    expect(nextDueLabel([card("a", { due: 0 })], 10)).toBeNull();
  });
});
