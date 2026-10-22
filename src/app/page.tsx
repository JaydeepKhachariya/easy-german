import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  GraduationCapIcon,
  LayersIcon,
  NotebookPenIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONCEPTS } from "@/content";

const AREAS = [
  {
    href: "/learn/",
    icon: BookOpenIcon,
    title: "Learn",
    text: "The core A1 track: basics, grammar, vocabulary themes.",
  },
  {
    href: "/exam/",
    icon: GraduationCapIcon,
    title: "Exam track",
    text: "What Start Deutsch 1 asks for, letter templates and speaking tasks.",
  },
  {
    href: "/vocab/review/",
    icon: LayersIcon,
    title: "Review",
    text: "Words from finished lessons, spaced so they stick.",
  },
  {
    href: "/my-lessons/",
    icon: NotebookPenIcon,
    title: "My Lessons",
    text: "Write your own lessons in the same format, or import one.",
  },
];

const STEPS = [
  ["In English", "How English handles the idea, with a few sentences you already know."],
  ["In German", "The rule, side by side with English, and what changes."],
  ["Helps and misleads", "Where English is a good guide and where it trips you up."],
  ["Practice", "Exercises that point to the exact word you got wrong."],
];

export default function HomePage() {
  const first = CONCEPTS[0];
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4 pt-4">
        <p className="text-sm font-medium text-muted-foreground">German A1 · Start Deutsch 1</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Learn German from the English you already know.
        </h1>
        <p className="max-w-prose text-muted-foreground">
          Every lesson starts with how English does it, then shows what German keeps and what it
          changes. Exercises check your answers as you go. Your progress stays in this browser.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="lg">
            <Link href="/learn/">
              Start learning <ArrowRightIcon />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/exam/">Exam track</Link>
          </Button>
        </div>
      </section>

      <section aria-labelledby="how" className="space-y-4">
        <h2 id="how" className="text-lg font-semibold">
          How a lesson works
        </h2>
        <ol className="grid gap-3 sm:grid-cols-2">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="flex gap-3 rounded-lg border p-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                {i + 1}
              </span>
              <span>
                <span className="block font-medium">{title}</span>
                <span className="text-sm text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="areas" className="space-y-4">
        <h2 id="areas" className="text-lg font-semibold">
          Where to go
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {AREAS.map(({ href, icon: Icon, title, text }) => (
            <Link
              key={href}
              href={href}
              className="flex gap-3 rounded-lg border p-3 hover:bg-accent"
            >
              <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <span>
                <span className="block font-medium">{title}</span>
                <span className="text-sm text-muted-foreground">{text}</span>
              </span>
            </Link>
          ))}
        </div>
        {first && (
          <p className="text-sm text-muted-foreground">
            New to German? Start with{" "}
            <Link href={`/learn/${first.slug}/`} className="underline underline-offset-2">
              {first.titleEn}
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  );
}
