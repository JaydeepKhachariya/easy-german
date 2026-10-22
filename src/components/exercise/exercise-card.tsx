"use client";

import { CheckCircle2Icon, LightbulbIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { EXERCISE_TYPES, type Exercise } from "@/content/schema";

import { ArticlePick } from "./article-pick";
import { ConjugationExercise } from "./conjugation-exercise";
import { FillBlank } from "./fill-blank";
import { MatchPairs } from "./match-pairs";
import { MultipleChoice } from "./multiple-choice";
import { ReorderWords } from "./reorder-words";
import { Translate } from "./translate";
import type { ExerciseResult } from "./types";

function Body({
  exercise,
  onResult,
}: {
  exercise: Exercise;
  onResult: (r: ExerciseResult) => void;
}) {
  switch (exercise.type) {
    case "multipleChoice":
      return <MultipleChoice exercise={exercise} onResult={onResult} />;
    case "fillBlank":
      return <FillBlank exercise={exercise} onResult={onResult} />;
    case "reorderWords":
      return <ReorderWords exercise={exercise} onResult={onResult} />;
    case "conjugationTable":
      return <ConjugationExercise exercise={exercise} onResult={onResult} />;
    case "translate":
      return <Translate exercise={exercise} onResult={onResult} />;
    case "matchPairs":
      return <MatchPairs exercise={exercise} onResult={onResult} />;
    case "articlePick":
      return <ArticlePick exercise={exercise} onResult={onResult} />;
  }
}

export function ExerciseCard({
  exercise,
  number,
  solved,
  onResult,
}: {
  exercise: Exercise;
  number: number;
  solved: boolean;
  onResult: (r: ExerciseResult) => void;
}) {
  const label = EXERCISE_TYPES.find((t) => t.type === exercise.type)?.label;
  return (
    <section
      className="space-y-3 rounded-lg border p-4"
      aria-labelledby={`ex-${exercise.id}`}
      data-exercise-type={exercise.type}
    >
      <header className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">
            {number}. {label}
          </p>
          <h3 id={`ex-${exercise.id}`} className="font-medium">
            {exercise.prompt}
          </h3>
        </div>
        {solved && (
          <Badge variant="outline" className="border-success/50 text-success">
            <CheckCircle2Icon /> Done
          </Badge>
        )}
      </header>
      {exercise.hint && (
        <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
          <LightbulbIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
          {exercise.hint}
        </p>
      )}
      <Body exercise={exercise} onResult={onResult} />
    </section>
  );
}
