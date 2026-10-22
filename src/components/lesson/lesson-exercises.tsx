"use client";

import { ExerciseList } from "@/components/exercise/exercise-list";
import type { Exercise } from "@/content/schema";

export type LessonSource = "core" | "user";

/** Client island for a lesson's exercises. Progress tracking is wired in here. */
export function LessonExercises({
  conceptId,
  exercises,
}: {
  conceptId: string;
  source: LessonSource;
  exercises: Exercise[];
  /** Preview mode (editor): don't record anything. */
  preview?: boolean;
}) {
  return <ExerciseList conceptId={conceptId} exercises={exercises} />;
}
