"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { GENDER_STYLES } from "@/components/visualizers/article";
import type { Article } from "@/content/schema";
import { cn } from "@/lib/utils";

import { CheckRow } from "./check-row";
import { FeedbackBox } from "./feedback";
import type { ExerciseProps } from "./types";

const ARTICLES: Article[] = ["der", "die", "das"];

export function ArticlePick({ exercise, onResult }: ExerciseProps<"articlePick">) {
  const [picks, setPicks] = useState<(Article | null)[]>(() => exercise.nouns.map(() => null));
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const marks = exercise.nouns.map((n, i) => picks[i] === n.article);
  const allCorrect = marks.every(Boolean);
  const state = revealed ? "revealed" : checked ? (allCorrect ? "correct" : "wrong") : "idle";
  const locked = state === "correct" || revealed;

  function check() {
    setChecked(true);
    onResult({
      correct: allCorrect,
      given: exercise.nouns.map((n, i) => `${picks[i] ?? "?"} ${n.noun}`).join(", "),
    });
  }

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {exercise.nouns.map((n, i) => {
          const shown = revealed ? n.article : picks[i];
          const wrong = checked && !revealed && !marks[i];
          return (
            <li
              key={n.noun}
              className={cn(
                "flex flex-wrap items-center justify-between gap-2 rounded-md border px-3 py-2",
                checked && marks[i] && "border-success",
                wrong && "border-destructive",
              )}
            >
              <span>
                <span className="font-medium">{n.noun}</span>
                {n.en && <span className="text-sm text-muted-foreground"> · {n.en}</span>}
                {wrong && <span className="sr-only"> (wrong)</span>}
              </span>
              <span className="flex gap-1" role="radiogroup" aria-label={`Article for ${n.noun}`}>
                {ARTICLES.map((a) => {
                  const on = shown === a;
                  return (
                    <Button
                      key={a}
                      type="button"
                      size="sm"
                      variant="outline"
                      role="radio"
                      aria-checked={on}
                      disabled={locked}
                      onClick={() => {
                        setPicks((p) => p.map((x, j) => (j === i ? a : x)));
                        setChecked(false);
                      }}
                      className={cn(
                        "w-14 font-semibold disabled:opacity-100",
                        on && GENDER_STYLES[a].className,
                      )}
                    >
                      {a}
                    </Button>
                  );
                })}
              </span>
            </li>
          );
        })}
      </ul>
      {state === "correct" && (
        <FeedbackBox correct>
          <p className="font-medium">All correct.</p>
        </FeedbackBox>
      )}
      {state === "wrong" && (
        <FeedbackBox correct={false}>
          <p>
            {marks.filter((m) => !m).length} of {marks.length} are wrong. Change the red ones and
            check again.
          </p>
        </FeedbackBox>
      )}
      <CheckRow
        state={state}
        canCheck={picks.every((p) => p !== null)}
        onCheck={check}
        onReveal={() => setRevealed(true)}
        onRetry={() => {
          setPicks(exercise.nouns.map(() => null));
          setChecked(false);
          setRevealed(false);
        }}
      />
    </div>
  );
}
