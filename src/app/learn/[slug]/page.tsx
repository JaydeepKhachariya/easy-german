import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConceptNav } from "@/components/lesson/concept-nav";
import { ConceptView } from "@/components/lesson/concept-view";
import { CONCEPTS, conceptHref, getConcept, getNeighbours } from "@/content";
import { PROSE } from "@/content/prose";

export const dynamicParams = false;

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getConcept((await params).slug);
  return c ? { title: `${c.titleEn} (${c.titleDe})`, description: c.summary } : {};
}

export default async function ConceptPage({ params }: Props) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();

  const { prev, next } = getNeighbours(slug);
  const toNav = (c: typeof prev) =>
    c ? { href: conceptHref(c), titleEn: c.titleEn, titleDe: c.titleDe } : null;
  const Prose = PROSE[slug];

  return (
    <ConceptView
      concept={concept}
      source="core"
      prose={Prose ? <Prose /> : undefined}
      footer={<ConceptNav prev={toNav(prev)} next={toNav(next)} />}
    />
  );
}
