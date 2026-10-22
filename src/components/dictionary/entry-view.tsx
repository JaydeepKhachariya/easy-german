import Link from "next/link";
import { BookOpenIcon, InfoIcon } from "lucide-react";

import { PlayButton } from "@/components/audio/play-button";
import { Badge } from "@/components/ui/badge";
import { ArticleTag } from "@/components/visualizers/article";
import { getConcept, conceptHref } from "@/content";
import { comparisonOf, conjugationOf, declensionOf, headword } from "@/content/dictionary";
import { POS_LABELS, TOPIC_LABELS, type DictEntry } from "@/content/dictionary/schema";

import { AddWordButton } from "./add-word-button";
import { NounTable } from "./noun-table";
import { VerbTables } from "./verb-tables";

const KIND_LABEL = {
  weak: "regular",
  strong: "strong",
  mixed: "mixed",
  irregular: "irregular",
} as const;
const CASE_LABEL = {
  akk: "+ Akkusativ",
  dat: "+ Dativ",
  "akk+dat": "+ Akkusativ + Dativ",
  none: "no object",
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function EntryView({ entry: e }: { entry: DictEntry }) {
  const conj = conjugationOf(e);
  const decl = declensionOf(e);
  const comp = comparisonOf(e);
  const head = headword(e);
  const lessons = e.lessons.map(getConcept).filter((c) => c !== undefined);
  const deckItem = {
    de: e.word,
    en: e.en.join(", "),
    article: e.noun && !e.noun.pluralOnly ? e.noun.article : undefined,
    plural: e.noun?.plural ?? undefined,
  };

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{e.level}</Badge>
          <Badge variant="outline">{POS_LABELS[e.pos]}</Badge>
          {e.topics.map((t) => (
            <Badge key={t} variant="outline" className="text-muted-foreground">
              {TOPIC_LABELS[t]}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <h1
            className="flex flex-wrap items-center gap-2 text-3xl font-semibold tracking-tight"
            lang="de"
          >
            {e.noun && (
              <ArticleTag
                gender={e.noun.pluralOnly ? "plural" : e.noun.article}
                className="text-xl"
              />
            )}
            {e.verb?.reflexive && <span className="text-muted-foreground">sich</span>}
            <span>{e.word}</span>
          </h1>
          <PlayButton text={head} />
        </div>
        <p className="text-lg">{e.en.join("; ")}</p>

        {conj && (
          <div className="space-y-2">
            <p className="font-medium" lang="de">
              {conj.principalParts}
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline">{KIND_LABEL[conj.kind]}</Badge>
              <Badge variant="outline">Perfekt with {conj.aux}</Badge>
              {e.verb?.separable && <Badge variant="outline">separable: {e.verb.separable}-</Badge>}
              {e.verb?.reflexive && <Badge variant="outline">reflexive</Badge>}
              {e.verb?.case && <Badge variant="outline">{CASE_LABEL[e.verb.case]}</Badge>}
            </div>
          </div>
        )}

        {e.noun && (
          <p className="flex flex-wrap items-center gap-2 text-sm" lang="de">
            {e.noun.pluralOnly ? (
              <span className="text-muted-foreground">Only used in the plural.</span>
            ) : e.noun.plural ? (
              <>
                <span className="text-muted-foreground">Plural:</span>
                <ArticleTag gender="plural" className="text-xs" />
                <span className="font-medium">{e.noun.plural}</span>
              </>
            ) : (
              <span className="text-muted-foreground">No plural.</span>
            )}
            {e.noun.feminine && (
              <span>
                <span className="text-muted-foreground"> · Female form: </span>
                <span className="font-medium">die {e.noun.feminine}</span>
              </span>
            )}
          </p>
        )}

        {comp && (
          <p className="text-sm" lang="de">
            <span className="font-medium">{comp.positive}</span>
            <span className="text-muted-foreground"> · </span>
            <span className="font-medium">{comp.comparative}</span>
            <span className="text-muted-foreground"> · </span>
            <span className="font-medium">{comp.superlative}</span>
          </p>
        )}

        <AddWordButton item={deckItem} entryId={e.id} />
      </header>

      {e.note && (
        <p className="flex gap-2 rounded-lg border border-der/30 bg-der-bg/40 p-3 text-sm">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-der" aria-hidden />
          {e.note}
        </p>
      )}

      {e.examples.length > 0 && (
        <Section title="Examples">
          <ul className="divide-y rounded-lg border">
            {e.examples.map((ex, i) => (
              <li key={i} className="flex items-start gap-2 p-3">
                <PlayButton text={ex.de} className="-mt-0.5 -ml-1" />
                <div>
                  <p className="font-medium" lang="de">
                    {ex.de}
                  </p>
                  <p className="text-sm text-muted-foreground">{ex.en}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {conj && (
        <Section title="Conjugation">
          <VerbTables c={conj} />
        </Section>
      )}

      {decl && e.noun && (
        <Section title="Declension">
          <NounTable rows={decl} article={e.noun.article} />
          {e.noun.nDeclension && (
            <p className="text-sm text-muted-foreground">
              This is an n-noun: it adds -{e.noun.nDeclension} in every case except the Nominativ
              singular.
            </p>
          )}
        </Section>
      )}

      {lessons.length > 0 && (
        <Section title="Lessons">
          <ul className="flex flex-wrap gap-2">
            {lessons.map((c) => (
              <li key={c.id}>
                <Link
                  href={conceptHref(c)}
                  className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
                >
                  <BookOpenIcon className="size-4" /> {c.titleEn}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <p>
        <Link href="/dictionary/" className="text-sm underline underline-offset-2">
          Back to the dictionary
        </Link>
      </p>
    </article>
  );
}
