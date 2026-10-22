"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  LayersIcon,
  TargetIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CatalogEntry } from "@/content";
import { db, type ProgressRecord } from "@/lib/db";
import { computeWeakAreas, SKILL_LABELS } from "@/lib/progress";

type LessonRef = { key: string; title: string; subtitle: string; href: string };

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border p-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export function DashboardView({ catalog }: { catalog: CatalogEntry[] }) {
  const data = useLiveQuery(async () => {
    const now = Date.now();
    const [progress, attempts, due, cards, lessons] = await Promise.all([
      db.progress.toArray(),
      db.attempts.orderBy("at").reverse().limit(1000).toArray(),
      db.vocab.where("due").belowOrEqual(now).count(),
      db.vocab.count(),
      db.lessons.toArray(),
    ]);
    return { progress, attempts, due, cards, lessons };
  }, []);

  if (!data) return <p className="text-muted-foreground">Loading your progress...</p>;

  const refs = new Map<string, LessonRef>();
  for (const c of catalog) {
    refs.set(`core:${c.id}`, {
      key: `core:${c.id}`,
      title: c.titleEn,
      subtitle: c.titleDe,
      href: c.href,
    });
  }
  for (const l of data.lessons) {
    refs.set(`user:${l.id}`, {
      key: `user:${l.id}`,
      title: l.titleEn,
      subtitle: `${l.titleDe} · My lesson`,
      href: `/my-lessons/view/?id=${encodeURIComponent(l.id)}`,
    });
  }

  const known = data.progress.filter((p) => refs.has(p.key));
  const core = known.filter((p) => p.source === "core");
  const completed = known
    .filter((p) => p.status === "completed")
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));
  const inProgress = known
    .filter((p) => p.status === "in_progress")
    .sort((a, b) => b.updatedAt - a.updatedAt);
  const coreDone = core.filter((p) => p.status === "completed").length;
  const weak = computeWeakAreas(data.attempts.filter((a) => refs.has(a.conceptKey)));
  const next = inProgress[0] ?? null;
  const firstUnstarted = catalog.find((c) => !data.progress.some((p) => p.key === `core:${c.id}`));

  if (data.progress.length === 0) {
    return (
      <Card>
        <CardContent className="space-y-3">
          <p>Nothing here yet. Open a lesson and try its exercises. Your progress shows up here.</p>
          <Button asChild>
            <Link href={catalog[0]?.href ?? "/learn/"}>
              Start with {catalog[0]?.titleEn ?? "the first lesson"} <ArrowRightIcon />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          label="Completed"
          value={`${coreDone}/${catalog.length}`}
          icon={<CheckCircle2Icon className="size-3.5" />}
        />
        <Stat
          label="In progress"
          value={inProgress.length}
          icon={<CircleDashedIcon className="size-3.5" />}
        />
        <Stat label="Cards due" value={data.due} icon={<LayersIcon className="size-3.5" />} />
        <Stat
          label="Weak areas"
          value={weak.skills.length}
          icon={<TargetIcon className="size-3.5" />}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Core track</p>
        <Progress
          value={catalog.length ? (coreDone / catalog.length) * 100 : 0}
          aria-label="Core track completed"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {next && refs.get(next.key) && (
          <Button asChild>
            <Link href={refs.get(next.key)!.href}>
              Continue: {refs.get(next.key)!.title} <ArrowRightIcon />
            </Link>
          </Button>
        )}
        {!next && firstUnstarted && (
          <Button asChild>
            <Link href={firstUnstarted.href}>
              Next: {firstUnstarted.titleEn} <ArrowRightIcon />
            </Link>
          </Button>
        )}
        {data.due > 0 && (
          <Button asChild variant="outline">
            <Link href="/vocab/review/">Review {data.due} cards</Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weak areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weak.skills.length === 0 && weak.concepts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No weak spots yet. This fills in once you have answered a few exercises of each kind.
            </p>
          ) : (
            <>
              <ul className="space-y-3">
                {weak.skills.slice(0, 6).map((s) => (
                  <li key={s.skill} className="space-y-1">
                    <div className="flex justify-between gap-2 text-sm">
                      <span>{SKILL_LABELS[s.skill]}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {s.wrong} of {s.attempts} wrong
                      </span>
                    </div>
                    <Progress
                      value={s.errorRate * 100}
                      indicatorClassName="bg-destructive"
                      aria-label={`${SKILL_LABELS[s.skill]} error rate`}
                    />
                  </li>
                ))}
              </ul>
              {weak.concepts.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium">Lessons to revisit</p>
                  <ul className="flex flex-wrap gap-2">
                    {weak.concepts.slice(0, 6).map((c) => {
                      const ref = refs.get(c.conceptKey)!;
                      return (
                        <li key={c.conceptKey}>
                          <Button asChild variant="outline" size="sm">
                            <Link href={ref.href}>{ref.title}</Link>
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <LessonList title="In progress" items={inProgress} refs={refs} empty="Nothing in progress." />
      <LessonList
        title="Completed"
        items={completed}
        refs={refs}
        empty="No completed lessons yet."
      />
    </div>
  );
}

function LessonList({
  title,
  items,
  refs,
  empty,
}: {
  title: string;
  items: ProgressRecord[];
  refs: Map<string, LessonRef>;
  empty: string;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="divide-y rounded-lg border">
          {items.map((p) => {
            const ref = refs.get(p.key)!;
            return (
              <li key={p.key}>
                <Link
                  href={ref.href}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-accent"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{ref.title}</span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {ref.subtitle}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                    {p.solved.length}/{p.total}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
