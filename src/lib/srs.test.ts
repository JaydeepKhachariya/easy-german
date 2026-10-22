import { DAY, MIN_EASE, newCardState, previewInterval, RELEARN_DELAY, review } from "./srs";

const NOW = 1_700_000_000_000;

describe("SM-2 review", () => {
  it("schedules 1 day, then 6 days, then interval × ease", () => {
    let s = newCardState(NOW);
    s = review(s, "good", NOW);
    expect(s.interval).toBe(1);
    expect(s.due).toBe(NOW + DAY);
    s = review(s, "good", s.due);
    expect(s.interval).toBe(6);
    s = review(s, "good", s.due);
    expect(s.interval).toBe(Math.round(6 * s.ease));
    expect(s.repetitions).toBe(3);
  });

  it("keeps ease at 2.5 for 'good' and raises it for 'easy'", () => {
    expect(review(newCardState(NOW), "good", NOW).ease).toBeCloseTo(2.5);
    expect(review(newCardState(NOW), "easy", NOW).ease).toBeCloseTo(2.6);
  });

  it("lowers ease for 'hard' but never below the minimum", () => {
    let s = newCardState(NOW);
    for (let i = 0; i < 30; i++) s = review(s, "hard", NOW);
    expect(s.ease).toBe(MIN_EASE);
  });

  it("resets a failed card and brings it back in the same session", () => {
    let s = newCardState(NOW);
    s = review(s, "good", NOW);
    s = review(s, "good", NOW);
    s = review(s, "again", NOW);
    expect(s.repetitions).toBe(0);
    expect(s.interval).toBe(0);
    expect(s.lapses).toBe(1);
    expect(s.due).toBe(NOW + RELEARN_DELAY);
  });

  it("gives 'easy' a longer first interval than 'good'", () => {
    const s = newCardState(NOW);
    expect(review(s, "easy", NOW).interval).toBeGreaterThan(review(s, "good", NOW).interval);
  });

  it("previews intervals as short labels", () => {
    const s = newCardState(NOW);
    expect(previewInterval(s, "again", NOW)).toBe("10 min");
    expect(previewInterval(s, "good", NOW)).toBe("1 day");
    expect(previewInterval(s, "easy", NOW)).toBe("4 days");
  });
});
