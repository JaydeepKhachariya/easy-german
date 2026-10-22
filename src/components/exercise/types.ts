import type { ExerciseOf, ExerciseType } from "@/content/schema";

export type ExerciseResult = {
  correct: boolean;
  /** What the learner submitted, for the attempt history. */
  given: string;
};

export type ExerciseProps<T extends ExerciseType> = {
  exercise: ExerciseOf<T>;
  onResult: (r: ExerciseResult) => void;
};
