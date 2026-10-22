"use client";

import { toast } from "sonner";

import { ExerciseList } from "@/components/exercise/exercise-list";
import type { Concept } from "@/content/schema";
import type { LessonSource } from "@/lib/db";
import { recordAttempt } from "@/lib/progress";

export type { LessonSource };

/** Client island for a lesson's exercises. Records every check unless in preview. */
export function LessonExercises({
  concept,
  source,
  preview = false,
}: {
  concept: Pick<Concept, "id" | "exercises" | "vocab">;
  source: LessonSource;
  /** Preview mode (editor): don't record anything. */
  preview?: boolean;
}) {
  return (
    <ExerciseList
      conceptId={concept.id}
      exercises={concept.exercises}
      onAttempt={async (ex, r) => {
        if (preview) return;
        try {
          const { completedNow, cardsAdded } = await recordAttempt({
            concept,
            source,
            exerciseId: ex.id,
            skill: ex.skill,
            correct: r.correct,
            given: r.given,
          });
          if (completedNow) {
            toast.success("Lesson complete", {
              description: cardsAdded
                ? `${cardsAdded} new ${cardsAdded === 1 ? "word" : "words"} added to your review deck.`
                : "All exercises solved.",
            });
          }
        } catch {
          // Storage unavailable: exercises still work, progress just isn't saved.
        }
      }}
    />
  );
}
