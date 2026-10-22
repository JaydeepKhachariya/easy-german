import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryView } from "@/components/dictionary/entry-view";
import { DICTIONARY, getEntry, headword } from "@/content/dictionary";

export const dynamicParams = false;

export function generateStaticParams() {
  return DICTIONARY.map((e) => ({ id: e.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = getEntry((await params).id);
  if (!e) return {};
  const h = headword(e);
  return {
    title: `${h}: ${e.en[0]}`,
    description: `${h} in English: ${e.en.join(", ")}.${e.verb ? " Full conjugation table." : ""}${e.noun ? " Plural and declension." : ""}`,
  };
}

export default async function EntryPage({ params }: Props) {
  const entry = getEntry((await params).id);
  if (!entry) notFound();
  return <EntryView entry={entry} />;
}
