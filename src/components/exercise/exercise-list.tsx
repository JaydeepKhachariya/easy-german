"use client";

import { useState } from "react";

import type { Exercise } from "@/content/schema";
import { hashString } from "@/lib/shuffle";

import { ExerciseCard } from "./exercise-card";
import type { ExerciseResult } from "./types";

export type ExerciseListProps = {
  conceptId: string;
  exercises: Exercise[];
  /** Called on every check. Progress tracking hooks in here. */
  onAttempt?: (exercise: Exercise, result: ExerciseResult) => void;
  /** Reset an exercise's state when its content changes (editor preview). */
  remountOnChange?: boolean;
};

export function ExerciseList({ exercises, onAttempt, remountOnChange }: ExerciseListProps) {
  const [solved, setSolved] = useState<Set<string>>(new Set());

  if (exercises.length === 0) {
    return <p className="text-sm text-muted-foreground">No exercises yet.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {solved.size} of {exercises.length} solved
      </p>
      {exercises.map((ex, i) => (
        <ExerciseCard
          key={remountOnChange ? `${ex.id}:${hashString(JSON.stringify(ex))}` : ex.id}
          exercise={ex}
          number={i + 1}
          solved={solved.has(ex.id)}
          onResult={(r) => {
            if (r.correct) setSolved((s) => new Set(s).add(ex.id));
            onAttempt?.(ex, r);
          }}
        />
      ))}
    </div>
  );
}
