import { db, type VocabCard } from "./db";
import { review, type Rating } from "./srs";

/**
 * Cards for one session: due review cards first (oldest due first), then up to
 * `newLimit` new cards in the order they were added.
 */
export function buildQueue(cards: VocabCard[], now: number, newLimit: number): VocabCard[] {
  const isNew = (c: VocabCard) => c.lastReviewed === undefined;
  const due = cards.filter((c) => !isNew(c) && c.due <= now).sort((a, b) => a.due - b.due);
  const fresh = cards
    .filter(isNew)
    .sort((a, b) => a.addedAt - b.addedAt || a.id.localeCompare(b.id))
    .slice(0, newLimit);
  return [...due, ...fresh];
}

export function nextDueLabel(cards: VocabCard[], now: number): string | null {
  const future = cards.filter((c) => c.due > now).map((c) => c.due);
  if (!future.length) return null;
  const ms = Math.min(...future) - now;
  const h = Math.round(ms / 3_600_000);
  if (h < 1) return "in less than an hour";
  if (h < 24) return `in ${h} ${h === 1 ? "hour" : "hours"}`;
  const d = Math.round(h / 24);
  return `in ${d} ${d === 1 ? "day" : "days"}`;
}

/** Applies a rating and saves the card. Returns the updated card. */
export async function rateCard(card: VocabCard, rating: Rating): Promise<VocabCard> {
  const updated: VocabCard = { ...card, ...review(card, rating, Date.now()) };
  await db.vocab.put(updated);
  return updated;
}
