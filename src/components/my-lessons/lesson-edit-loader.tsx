"use client";

import { LessonEditor } from "@/components/editor/lesson-editor";
import { lessonToConcept } from "@/lib/lessons";

import { LessonNotFound } from "./not-found-lesson";
import { useLessonFromQuery } from "./use-lesson-param";

export function LessonEditLoader() {
  const { lesson } = useLessonFromQuery();
  if (lesson === undefined) return <p className="text-muted-foreground">Loading...</p>;
  if (lesson === null) return <LessonNotFound />;
  // key: load fresh form state if the id changes.
  return <LessonEditor key={lesson.id} initial={lessonToConcept(lesson)} isNew={false} />;
}
