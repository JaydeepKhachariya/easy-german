"use client";

import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { checkAnswer } from "@/lib/check-answer";
import { cn } from "@/lib/utils";

import { CheckRow } from "./check-row";
import { FeedbackBox } from "./feedback";
import type { ExerciseProps } from "./types";
import { insertAtCaret, UmlautBar } from "./umlaut-bar";

export function ConjugationExercise({ exercise, onResult }: ExerciseProps<"conjugationTable">) {
  const given = new Set(exercise.given);
  const [values, setValues] = useState<string[]>(() =>
    exercise.answers.map((a, i) => (given.has(i) ? a : "")),
  );
  const [marks, setMarks] = useState<boolean[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const lastFocused = useRef(exercise.answers.findIndex((_, i) => !given.has(i)));

  const allCorrect = marks?.every(Boolean) ?? false;
  const state = revealed ? "revealed" : marks ? (allCorrect ? "correct" : "wrong") : "idle";
  const locked = state === "correct" || revealed;

  function setAt(i: number, v: string) {
    setValues((prev) => prev.map((p, j) => (j === i ? v : p)));
    if (marks) setMarks(null);
  }

  function check() {
    // Verb forms: case is not what's being tested.
    const m = values.map(
      (v, i) => checkAnswer(v, exercise.answers[i]!, { caseSensitive: false }).correct,
    );
    setMarks(m);
    onResult({ correct: m.every(Boolean), given: values.join(", ") });
  }

  const wrongCount = marks ? marks.filter((x) => !x).length : 0;

  return (
    <div className="space-y-3">
      <p className="font-medium">
        {exercise.verb}
        {exercise.english && (
          <span className="font-normal text-muted-foreground"> ({exercise.english})</span>
        )}
      </p>
      <div className="grid max-w-sm grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
        {exercise.pronouns.map((p, i) => (
          <div key={p} className="contents">
            <label htmlFor={`${exercise.id}-${i}`} className="text-sm text-muted-foreground">
              {p}
            </label>
            <Input
              id={`${exercise.id}-${i}`}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={revealed ? exercise.answers[i] : values[i]}
              onChange={(e) => setAt(i, e.target.value)}
              onFocus={() => (lastFocused.current = i)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              readOnly={given.has(i) || locked}
              tabIndex={given.has(i) ? -1 : 0}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className={cn(
                "text-base",
                given.has(i) && "bg-muted",
                marks?.[i] === true && !given.has(i) && "border-success",
                marks?.[i] === false && !revealed && "border-destructive",
              )}
            />
          </div>
        ))}
      </div>
      {!locked && (
        <UmlautBar
          onInsert={(c) => {
            const i = lastFocused.current;
            insertAtCaret(inputs.current[i] ?? null, c, (v) => setAt(i, v));
          }}
        />
      )}
      {state === "correct" && (
        <FeedbackBox correct>
          <p className="font-medium">All forms correct.</p>
        </FeedbackBox>
      )}
      {state === "wrong" && (
        <FeedbackBox correct={false}>
          <p>
            {wrongCount === 1 ? "One form is wrong." : `${wrongCount} forms are wrong.`} They are
            marked in red.
          </p>
        </FeedbackBox>
      )}
      <CheckRow
        state={state}
        canCheck={values.some((v, i) => !given.has(i) && v.trim())}
        onCheck={check}
        onReveal={() => setRevealed(true)}
        onRetry={() => {
          setValues(exercise.answers.map((a, i) => (given.has(i) ? a : "")));
          setMarks(null);
          setRevealed(false);
        }}
      />
    </div>
  );
}
