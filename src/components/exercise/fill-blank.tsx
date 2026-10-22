"use client";

import { Fragment, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { BLANK } from "@/content/schema";
import { checkAnswer, type CheckResult } from "@/lib/check-answer";
import { cn } from "@/lib/utils";

import { CheckRow } from "./check-row";
import { AnswerFeedback, FeedbackBox } from "./feedback";
import type { ExerciseProps } from "./types";
import { insertAtCaret, UmlautBar } from "./umlaut-bar";

export function FillBlank({ exercise, onResult }: ExerciseProps<"fillBlank">) {
  const parts = exercise.sentence.split(BLANK);
  const blanks = exercise.answers.length;
  const [values, setValues] = useState<string[]>(() => Array(blanks).fill(""));
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const lastFocused = useRef(0);

  const allCorrect = results?.every((r) => r.correct) ?? false;
  const state = revealed ? "revealed" : results ? (allCorrect ? "correct" : "wrong") : "idle";

  function setAt(i: number, v: string) {
    setValues((prev) => prev.map((p, j) => (j === i ? v : p)));
    if (results) setResults(null);
  }

  function check() {
    const startsWithBlank = exercise.sentence.trimStart().startsWith(BLANK);
    const r = values.map((v, i) =>
      checkAnswer(v, exercise.answers[i]!, { lenientFirstLetter: i === 0 && startsWithBlank }),
    );
    setResults(r);
    onResult({ correct: r.every((x) => x.correct), given: values.join(" | ") });
  }

  const firstWrong = results?.find((r) => !r.correct);

  return (
    <div className="space-y-3">
      <p className="text-lg leading-10">
        {parts.map((part, i) => (
          <Fragment key={i}>
            {part}
            {i < blanks && (
              <Input
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                value={revealed ? (exercise.answers[i]?.[0] ?? "") : values[i]}
                onChange={(e) => setAt(i, e.target.value)}
                onFocus={() => (lastFocused.current = i)}
                onKeyDown={(e) => e.key === "Enter" && check()}
                readOnly={state === "correct" || revealed}
                aria-label={`Blank ${i + 1}`}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                className={cn(
                  "mx-1 inline-block h-9 w-32 align-baseline text-base",
                  results?.[i]?.correct === true && "border-success",
                  results?.[i]?.correct === false && !revealed && "border-destructive",
                )}
              />
            )}
          </Fragment>
        ))}
      </p>
      {exercise.en && <p className="text-sm text-muted-foreground">{exercise.en}</p>}
      {state !== "correct" && !revealed && (
        <UmlautBar
          onInsert={(c) => {
            const i = lastFocused.current;
            insertAtCaret(inputs.current[i] ?? null, c, (v) => setAt(i, v));
          }}
        />
      )}
      {state === "correct" && (
        <FeedbackBox correct>
          <p className="font-medium">Correct.</p>
          {exercise.explanation && <p className="text-muted-foreground">{exercise.explanation}</p>}
        </FeedbackBox>
      )}
      {state === "wrong" && firstWrong && <AnswerFeedback result={firstWrong} />}
      {revealed && (
        <FeedbackBox correct={false}>
          <p>The answer is filled in above.</p>
          {exercise.explanation && <p className="text-muted-foreground">{exercise.explanation}</p>}
        </FeedbackBox>
      )}
      <CheckRow
        state={state}
        canCheck={values.some((v) => v.trim())}
        onCheck={check}
        onReveal={() => setRevealed(true)}
        onRetry={() => {
          setValues(Array(blanks).fill(""));
          setResults(null);
          setRevealed(false);
        }}
      />
    </div>
  );
}
