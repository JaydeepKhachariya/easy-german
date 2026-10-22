/**
 * Simple SM-2 spaced repetition.
 * Four buttons map to SM-2 quality scores: Again 1, Hard 3, Good 4, Easy 5.
 */

export type SrsState = {
  ease: number;
  /** Days until the next review. 0 = new or relearning. */
  interval: number;
  repetitions: number;
  lapses: number;
  due: number;
  lastReviewed?: number;
};

export type Rating = "again" | "hard" | "good" | "easy";

export const QUALITY: Record<Rating, number> = { again: 1, hard: 3, good: 4, easy: 5 };

export const DAY = 24 * 60 * 60 * 1000;
/** A failed card comes back in the same session after this delay. */
export const RELEARN_DELAY = 10 * 60 * 1000;
export const MIN_EASE = 1.3;

export function newCardState(now: number): SrsState {
  return { ease: 2.5, interval: 0, repetitions: 0, lapses: 0, due: now };
}

export function review(state: SrsState, rating: Rating, now: number): SrsState {
  const q = QUALITY[rating];
  const ease = Math.max(MIN_EASE, state.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

  if (q < 3) {
    return {
      ease,
      interval: 0,
      repetitions: 0,
      lapses: state.lapses + 1,
      due: now + RELEARN_DELAY,
      lastReviewed: now,
    };
  }

  const repetitions = state.repetitions + 1;
  let interval: number;
  if (repetitions === 1) interval = rating === "easy" ? 4 : 1;
  else if (repetitions === 2) interval = rating === "hard" ? 3 : 6;
  else interval = Math.round(state.interval * (rating === "hard" ? 1.2 : ease));
  if (rating === "easy" && repetitions > 2) interval = Math.round(interval * 1.3);
  interval = Math.max(1, interval);

  return {
    ease,
    interval,
    repetitions,
    lapses: state.lapses,
    due: now + interval * DAY,
    lastReviewed: now,
  };
}

/** Short label for a button, e.g. "10 min", "1 day", "6 days". */
export function previewInterval(state: SrsState, rating: Rating, now: number): string {
  const next = review(state, rating, now);
  const ms = next.due - now;
  if (ms < DAY) return `${Math.round(ms / 60000)} min`;
  const days = Math.round(ms / DAY);
  if (days < 30) return days === 1 ? "1 day" : `${days} days`;
  const months = Math.round(days / 30);
  return months === 1 ? "1 month" : `${months} months`;
}

export function isDue(state: Pick<SrsState, "due">, now: number) {
  return state.due <= now;
}
