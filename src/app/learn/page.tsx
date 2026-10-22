import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import {
  CatalogProgressBadge,
  CatalogProgressProvider,
} from "@/components/lesson/catalog-progress";
import { ConceptCard } from "@/components/lesson/concept-card";
import { conceptHref, groupByUnit } from "@/content";

export const metadata: Metadata = { title: "Learn" };

export default function LearnPage() {
  const groups = groupByUnit();
  return (
    <>
      <PageHeader
        title="Learn"
        description="The core A1 track, in order. Each lesson starts from English."
      />
      <CatalogProgressProvider>
        <div className="space-y-10">
          {groups.map((g) => (
            <section key={g.unit} aria-labelledby={`unit-${g.unit}`}>
              <h2 id={`unit-${g.unit}`} className="mb-3 text-lg font-semibold">
                {g.unit}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.concepts.map((c) => (
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
            </section>
          ))}
        </div>
      </CatalogProgressProvider>
    </>
  );
}
