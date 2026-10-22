import { z } from "zod";

import { RAW_CONCEPTS } from "./concepts";
import { ConceptSchema, type Category, type Concept } from "./schema";

export function parseConcept(input: unknown, label = "concept"): Concept {
  const r = ConceptSchema.safeParse(input);
  if (!r.success) {
    throw new Error(`Invalid ${label}:\n${z.prettifyError(r.error)}`);
  }
  return r.data;
}

/** Core concepts, validated at import time so a bad file fails the build. */
export const CONCEPTS: Concept[] = RAW_CONCEPTS.map((c) =>
  parseConcept(c, `concept "${c.id}"`),
).sort((a, b) => a.order - b.order);

const bySlug = new Map(CONCEPTS.map((c) => [c.slug, c]));
const byId = new Map(CONCEPTS.map((c) => [c.id, c]));

export function getConcept(slug: string): Concept | undefined {
  return bySlug.get(slug);
}

export function getConceptById(id: string): Concept | undefined {
  return byId.get(id) ?? bySlug.get(id);
}

export function conceptHref(c: Pick<Concept, "slug">) {
  return `/learn/${c.slug}/`;
}

export function getNeighbours(slug: string) {
  const i = CONCEPTS.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? CONCEPTS[i - 1]! : null,
    next: i >= 0 && i < CONCEPTS.length - 1 ? CONCEPTS[i + 1]! : null,
  };
}

const UNIT_ORDER = ["Basics", "Grammar", "Vocabulary", "Exam"];

/** Concepts grouped for the Learn page, in track order. */
export function groupByUnit(
  concepts: Concept[] = CONCEPTS,
): { unit: string; concepts: Concept[] }[] {
  const groups = new Map<string, Concept[]>();
  for (const c of concepts) {
    const unit = c.unit ?? unitFromCategory(c.category);
    groups.set(unit, [...(groups.get(unit) ?? []), c]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => rank(a) - rank(b))
    .map(([unit, concepts]) => ({ unit, concepts }));
}

function rank(unit: string) {
  const i = UNIT_ORDER.indexOf(unit);
  return i === -1 ? UNIT_ORDER.length : i;
}

function unitFromCategory(c: Category) {
  return c === "exam" ? "Exam" : c === "vocabulary" ? "Vocabulary" : "Grammar";
}

/** Lightweight list for client components (dashboard, search) without lesson bodies. */
export type CatalogEntry = Pick<
  Concept,
  "id" | "slug" | "order" | "titleEn" | "titleDe" | "minutes" | "status" | "category"
> & { unit: string; exerciseCount: number; href: string };

export function getCatalog(): CatalogEntry[] {
  return CONCEPTS.map((c) => ({
    id: c.id,
    slug: c.slug,
    order: c.order,
    titleEn: c.titleEn,
    titleDe: c.titleDe,
    minutes: c.minutes,
    status: c.status,
    category: c.category,
    unit: c.unit ?? unitFromCategory(c.category),
    exerciseCount: c.exercises.length,
    href: conceptHref(c),
  }));
}
