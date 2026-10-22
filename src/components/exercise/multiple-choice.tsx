"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

import { CheckRow } from "./check-row";
import { FeedbackBox } from "./feedback";
import type { ExerciseProps } from "./types";

export function MultipleChoice({ exercise, onResult }: ExerciseProps<"multipleChoice">) {
  const [picked, setPicked] = useState<number | null>(null);
  const [state, setState] = useState<"idle" | "correct" | "wrong" | "revealed">("idle");
  const name = useId();

  function check() {
    if (picked === null) return;
    const correct = picked === exercise.answer;
    setState(correct ? "correct" : "wrong");
    onResult({ correct, given: exercise.options[picked] ?? "" });
  }

  const done = state === "correct" || state === "revealed";

  return (
    <div className="space-y-3">
      <p className="font-medium">{exercise.question}</p>
      <div role="radiogroup" className="grid gap-2">
        {exercise.options.map((opt, i) => {
          const isPicked = picked === i;
          const showRight = done && i === exercise.answer;
          const showWrong = state === "wrong" && isPicked;
          return (
            <label
              key={i}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-left has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                isPicked && !done && "border-primary bg-accent",
                showRight && "border-success bg-success/10",
                showWrong && "border-destructive bg-destructive/10",
                done && "cursor-default",
              )}
            >
              <input
                type="radio"
                name={name}
                className="accent-primary"
                checked={isPicked}
                disabled={done}
                onChange={() => {
                  setPicked(i);
                  if (state === "wrong") setState("idle");
                }}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {state === "wrong" && (
        <FeedbackBox correct={false}>
          <p>Not quite. Try another option.</p>
        </FeedbackBox>
      )}
      {done && (
        <FeedbackBox correct={state === "correct"}>
          <p className="font-medium">
            {state === "correct" ? "Correct." : `Answer: ${exercise.options[exercise.answer]}`}
          </p>
          {exercise.explanation && <p className="text-muted-foreground">{exercise.explanation}</p>}
        </FeedbackBox>
      )}
      <CheckRow
        state={state}
        canCheck={picked !== null}
        onCheck={check}
        onReveal={() => setState("revealed")}
        onRetry={() => {
          setPicked(null);
          setState("idle");
        }}
      />
    </div>
  );
}
