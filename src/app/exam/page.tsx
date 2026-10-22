import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import {
  CatalogProgressBadge,
  CatalogProgressProvider,
} from "@/components/lesson/catalog-progress";
import { ConceptCard } from "@/components/lesson/concept-card";
import { Button } from "@/components/ui/button";
import { CONCEPTS, conceptHref } from "@/content";

export const metadata: Metadata = { title: "Exam" };

const PARTS = [
  { de: "Hören", en: "Listening", text: "Short conversations, announcements and phone messages." },
  { de: "Lesen", en: "Reading", text: "Emails, ads, websites, signs and notices." },
  {
    de: "Schreiben",
    en: "Writing",
    text: "Fill in a form, then write a short message covering three points.",
  },
  {
    de: "Sprechen",
    en: "Speaking",
    text: "Introduce yourself, ask and answer questions, make requests.",
  },
];

export default function ExamPage() {
  const exam = CONCEPTS.filter((c) => c.unit === "Exam");
  return (
    <>
      <PageHeader
        title="Exam track"
        description="Goethe-Zertifikat A1: Start Deutsch 1. What each part asks of you, and lessons to prepare."
      />
      <div className="space-y-8">
        <ul className="grid gap-3 sm:grid-cols-2">
          {PARTS.map((p) => (
            <li key={p.de} className="rounded-lg border p-3">
              <p className="font-medium">
                <span lang="de">{p.de}</span>{" "}
                <span className="text-muted-foreground">· {p.en}</span>
              </p>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          The format can change. Check the Goethe-Institut website before you book the exam.
        </p>

        <section className="space-y-3" aria-labelledby="exam-lessons">
          <h2 id="exam-lessons" className="text-lg font-semibold">
            Exam lessons
          </h2>
          <CatalogProgressProvider>
            <div className="grid gap-3 sm:grid-cols-2">
              {exam.map((c) => (
                <ConceptCard
                  key={c.id}
                  href={conceptHref(c)}
                  titleEn={c.titleEn}
                  titleDe={c.titleDe}
                  minutes={c.minutes}
                  draft={c.status === "draft"}
                  summary={c.summary}
                  status={<CatalogProgressBadge progressKey={`core:${c.id}`} />}
                />
              ))}
            </div>
          </CatalogProgressProvider>
        </section>

        <div className="rounded-lg border p-4">
          <p className="font-medium">The grammar the exam expects</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Verb in position 2, modal verbs, the Perfekt and nicht vs kein come up in every part.
            Start there.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-3">
            <Link href="/learn/">
              Core track <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
