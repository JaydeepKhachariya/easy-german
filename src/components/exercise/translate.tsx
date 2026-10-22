"use client";

import { useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { checkAnswer, type CheckResult } from "@/lib/check-answer";

import { CheckRow } from "./check-row";
import { AnswerFeedback } from "./feedback";
import type { ExerciseProps } from "./types";
import { insertAtCaret, UmlautBar } from "./umlaut-bar";

export function Translate({ exercise, onResult }: ExerciseProps<"translate">) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const state = revealed ? "revealed" : result ? (result.correct ? "correct" : "wrong") : "idle";

  function check() {
    const r = checkAnswer(value, exercise.answers);
    setResult(r);
    onResult({ correct: r.correct, given: value });
  }

  return (
    <div className="space-y-3">
      <p className="font-medium">{exercise.en}</p>
      <Textarea
        ref={ref}
        rows={2}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (result && !result.correct) setResult(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            check();
          }
        }}
        readOnly={state === "correct" || revealed}
        placeholder="Auf Deutsch..."
        aria-label="Your German translation"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        lang="de"
        className="text-base"
      />
      {state !== "correct" && !revealed && (
        <UmlautBar onInsert={(c) => insertAtCaret(ref.current, c, setValue)} />
      )}
      {result && (
        <AnswerFeedback result={result} revealed={revealed} explanation={exercise.explanation} />
      )}
      <CheckRow
        state={state}
        canCheck={value.trim().length > 0}
        onCheck={check}
        onReveal={() => {
          setRevealed(true);
          if (!result) setResult(checkAnswer(value, exercise.answers));
        }}
        onRetry={() => {
          setValue("");
          setResult(null);
          setRevealed(false);
        }}
      />
    </div>
  );
}
