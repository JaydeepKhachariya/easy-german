"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { checkAnswer, type CheckResult } from "@/lib/check-answer";
import { seededShuffle } from "@/lib/shuffle";
import { cn } from "@/lib/utils";

import { CheckRow } from "./check-row";
import { AnswerFeedback } from "./feedback";
import type { ExerciseProps } from "./types";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ReorderWords({ exercise, onResult }: ExerciseProps<"reorderWords">) {
  // Tiles carry their index so repeated words stay distinct.
  const tiles = useMemo(
    () =>
      seededShuffle(
        exercise.words.map((w, i) => ({ w, i })),
        exercise.id,
      ),
    [exercise.words, exercise.id],
  );
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [revealed, setRevealed] = useState(false);

  const state = revealed ? "revealed" : result ? (result.correct ? "correct" : "wrong") : "idle";
  const locked = state === "correct" || revealed;
  const built = picked.map((i) => exercise.words[i]!);
  const sentence = (words: string[]) =>
    words.map((w, i) => (i === 0 ? capitalize(w) : w)).join(" ");

  function check() {
    const accepted = [exercise.words, ...exercise.alsoAccept].map((ws) => ws.join(" "));
    // Tiles can't be re-cased by the learner, so case is ignored here.
    const r = checkAnswer(built.join(" "), accepted, { caseSensitive: false });
    setResult(r);
    onResult({ correct: r.correct, given: built.join(" ") });
  }

  function toggle(i: number) {
    if (locked) return;
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
    if (result) setResult(null);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{exercise.en}</p>
      <div
        className={cn(
          "flex min-h-12 flex-wrap items-center gap-2 rounded-md border border-dashed p-2",
          state === "correct" && "border-success",
          state === "wrong" && "border-destructive",
        )}
        aria-label="Your sentence"
        aria-live="polite"
      >
        {picked.length === 0 && (
          <span className="px-1 text-sm text-muted-foreground">Tap the words in order.</span>
        )}
        {(revealed ? exercise.words.map((_, i) => i) : picked).map((i, pos) => (
          <Button
            key={i}
            type="button"
            variant="secondary"
            size="sm"
            className="text-base"
            onClick={() => toggle(i)}
            disabled={locked}
          >
            {pos === 0 ? capitalize(exercise.words[i]!) : exercise.words[i]}
          </Button>
        ))}
      </div>
      {!locked && (
        <div className="flex flex-wrap gap-2" aria-label="Word bank">
          {tiles.map(({ w, i }) => (
            <Button
              key={i}
              type="button"
              variant="outline"
              size="sm"
              className={cn("text-base", picked.includes(i) && "invisible")}
              onClick={() => toggle(i)}
              aria-hidden={picked.includes(i)}
              tabIndex={picked.includes(i) ? -1 : 0}
            >
              {w}
            </Button>
          ))}
        </div>
      )}
      {result && (
        <AnswerFeedback
          result={revealed ? { ...result, expected: sentence(exercise.words) } : result}
          revealed={revealed}
          explanation={exercise.explanation}
        />
      )}
      <CheckRow
        state={state}
        canCheck={picked.length === exercise.words.length}
        onCheck={check}
        onReveal={() => setRevealed(true)}
        onRetry={() => {
          setPicked([]);
          setResult(null);
          setRevealed(false);
        }}
      />
    </div>
  );
}
