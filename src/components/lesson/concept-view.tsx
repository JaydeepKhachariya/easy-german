import { ClockIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TableBlock } from "@/components/tables/table-block";
import { WordOrder } from "@/components/visualizers/word-order";
import { CATEGORY_LABELS, type Concept } from "@/content/schema";

import { HelpsMisleads, HindiHint, MistakesBox } from "./callouts";
import { ComparisonTable } from "./comparison-table";
import { ExampleList } from "./example-list";
import { LessonExercises, type LessonSource } from "./lesson-exercises";
import { RichText } from "./rich-text";
import { Section } from "./section";
import { VocabList } from "./vocab-list";

/**
 * Renders any concept, core or user-made. No hooks here, so it works both as a
 * server component (core lessons, static HTML) and inside client pages (user lessons).
 */
export function ConceptView({
  concept: c,
  source,
  prose,
  vocabActions,
  footer,
  preview = false,
}: {
  concept: Concept;
  source: LessonSource;
  /** Long-form MDX for core lessons. */
  prose?: React.ReactNode;
  /** e.g. "Add to review deck" button. */
  vocabActions?: React.ReactNode;
  /** Previous/next navigation. */
  footer?: React.ReactNode;
  preview?: boolean;
}) {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{c.level}</Badge>
          <Badge variant="outline">{CATEGORY_LABELS[c.category]}</Badge>
          <Badge variant="outline">
            <ClockIcon /> {c.minutes} min
          </Badge>
          {source === "user" && <Badge className="bg-der text-background">My lesson</Badge>}
          {c.status === "draft" && (
            <Badge variant="outline" className="border-warning/50 text-warning">
              Draft
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight" lang="de">
          {c.titleDe}
        </h1>
        <p className="text-lg text-muted-foreground">{c.titleEn}</p>
        {c.summary && <p className="max-w-prose">{c.summary}</p>}
      </header>

      <Section id="english" title="In English">
        <RichText text={c.englishExplanation} />
        {c.englishExamples.length > 0 && (
          <ul className="space-y-1 border-l-2 pl-4">
            {c.englishExamples.map((s, i) => (
              <li key={i} className="italic">
                {s}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="german" title="In German">
        <RichText text={c.germanExplanation} />
        <ComparisonTable rows={c.comparisonRows} />
        {c.diagrams.map((d, i) => (
          <WordOrder key={i} diagram={d} />
        ))}
        {prose && (
          <details className="group rounded-lg border p-4">
            <summary className="cursor-pointer font-medium">More detail</summary>
            <div className="mt-3">{prose}</div>
          </details>
        )}
      </Section>

      {(c.helps.length > 0 || c.misleads.length > 0 || c.hindiHint) && (
        <section aria-label="Comparing with English and Hindi" className="space-y-3">
          <HelpsMisleads helps={c.helps} misleads={c.misleads} />
          {c.hindiHint && <HindiHint text={c.hindiHint} />}
        </section>
      )}

      {c.tables.length > 0 && (
        <Section id="tables" title="Tables">
          {c.tables.map((t, i) => (
            <TableBlock key={i} table={t} />
          ))}
        </Section>
      )}

      {c.examples.length > 0 && (
        <Section id="examples" title="Examples">
          <ExampleList examples={c.examples} />
        </Section>
      )}

      {c.mistakes.length > 0 && (
        <Section id="mistakes" title="Common mistakes">
          <MistakesBox mistakes={c.mistakes} />
        </Section>
      )}

      <Section id="exercises" title="Exercises">
        <LessonExercises
          conceptId={c.id}
          source={source}
          exercises={c.exercises}
          preview={preview}
        />
      </Section>

      {c.vocab.length > 0 && (
        <Section id="vocab" title="Vocabulary">
          <VocabList vocab={c.vocab} />
          {vocabActions}
        </Section>
      )}

      {footer && (
        <>
          <Separator />
          {footer}
        </>
      )}
    </article>
  );
}
