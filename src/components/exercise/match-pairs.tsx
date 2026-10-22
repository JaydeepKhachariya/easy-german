"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { seededShuffle } from "@/lib/shuffle";
import { cn } from "@/lib/utils";

import { FeedbackBox } from "./feedback";
import type { ExerciseProps } from "./types";

export function MatchPairs({ exercise, onResult }: ExerciseProps<"matchPairs">) {
  const right = useMemo(
    () =>
      seededShuffle(
        exercise.pairs.map((p, i) => ({ text: p.right, i })),
        exercise.id,
      ),
    [exercise.pairs, exercise.id],
  );
  const [active, setActive] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const done = matched.size === exercise.pairs.length;

  function pickRight(i: number) {
    if (active === null || matched.has(i)) return;
    if (active === i) {
      const next = new Set(matched).add(i);
      setMatched(next);
      setActive(null);
      if (next.size === exercise.pairs.length) {
        onResult({ correct: mistakes === 0, given: `${mistakes} mistakes` });
      }
    } else {
      setMistakes((m) => m + 1);
      setWrongFlash(i);
      setTimeout(() => setWrongFlash(null), 600);
    }
  }

  const cell = "h-auto min-h-10 w-full justify-start whitespace-normal py-2 text-left text-base";

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Tap a word on the left, then its match on the right.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          {exercise.pairs.map((p, i) => (
            <Button
              key={i}
              type="button"
              variant="outline"
              className={cn(
                cell,
                active === i && "border-primary bg-accent",
                matched.has(i) && "border-success bg-success/10 text-foreground opacity-100",
              )}
              disabled={matched.has(i)}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              {p.left}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {right.map(({ text, i }) => (
            <Button
              key={i}
              type="button"
              variant="outline"
              className={cn(
                cell,
                matched.has(i) && "border-success bg-success/10 text-foreground opacity-100",
                wrongFlash === i && "border-destructive bg-destructive/10",
              )}
              disabled={matched.has(i)}
              onClick={() => pickRight(i)}
            >
              {text}
            </Button>
          ))}
        </div>
      </div>
      {done && (
        <FeedbackBox correct={mistakes === 0}>
          <p className="font-medium">
            {mistakes === 0
              ? "All matched, no mistakes."
              : `All matched, with ${mistakes} ${mistakes === 1 ? "mistake" : "mistakes"}.`}
          </p>
        </FeedbackBox>
      )}
      {done && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setMatched(new Set());
            setMistakes(0);
            setActive(null);
          }}
        >
          Do it again
        </Button>
      )}
    </div>
  );
}
