"use client";

import Link from "next/link";
import { ArrowLeftIcon, DownloadIcon, PencilIcon } from "lucide-react";

import { ConceptView } from "@/components/lesson/concept-view";
import { Button } from "@/components/ui/button";
import { lessonToConcept, slugify } from "@/lib/lessons";

import { exportLessons } from "./lesson-actions";
import { LessonNotFound } from "./not-found-lesson";
import { useLessonFromQuery } from "./use-lesson-param";

export function LessonViewer() {
  const { lesson } = useLessonFromQuery();
  if (lesson === undefined) return <p className="text-muted-foreground">Loading...</p>;
  if (lesson === null) return <LessonNotFound />;

  return (
    <div className="space-y-6">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/my-lessons/">
            <ArrowLeftIcon /> My Lessons
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportLessons([lesson], `lesson-${slugify(lesson.titleEn)}`)}
          >
            <DownloadIcon /> Export
          </Button>
          <Button asChild size="sm">
            <Link href={`/my-lessons/edit/?id=${encodeURIComponent(lesson.id)}`}>
              <PencilIcon /> Edit
            </Link>
          </Button>
        </div>
      </div>
      <ConceptView concept={lessonToConcept(lesson)} source="user" />
    </div>
  );
}
