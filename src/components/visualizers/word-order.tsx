"use client";

import { useState } from "react";
import { ArrowRightIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { END_ROLES, type Diagram, type Token, type TokenRole } from "@/content/schema";
import { cn } from "@/lib/utils";

const ROLE_LABEL: Record<TokenRole, string> = {
  subject: "subject",
  verb: "verb",
  infinitive: "infinitive",
  participle: "participle",
  prefix: "prefix",
  object: "object",
  time: "time",
  manner: "how",
  place: "place",
  negation: "not",
  question: "question",
  conjunction: "link",
  other: "",
};

const isEnd = (role: TokenRole) => END_ROLES.includes(role);

/** Position labels for German: 0 for und/aber/oder/denn, 1, 2 (the verb), "end". */
export function germanPositions(tokens: Token[]): string[] {
  let pos = 0;
  return tokens.map((t) => {
    if (t.role === "conjunction" && pos === 0) return "0";
    if (isEnd(t.role)) return "end";
    pos += 1;
    return pos <= 2 ? String(pos) : "";
  });
}

function Chip({
  token,
  german,
  position,
  delay,
}: {
  token: Token;
  german: boolean;
  position?: string;
  delay?: number;
}) {
  const verb = token.role === "verb";
  const end = isEnd(token.role);
  return (
    <li className="flex flex-col items-center gap-1">
      {german && (
        <span className="h-4 text-[11px] font-medium text-muted-foreground tabular-nums">
          {position === "end" ? "end" : position}
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-1 font-medium",
          verb && "border-transparent bg-slot-verb",
          end && "border-transparent bg-slot-end",
          german && end && "motion-safe:animate-slide-end",
          german && verb && "motion-safe:animate-pop",
        )}
        style={delay ? { animationDelay: `${delay}ms` } : undefined}
      >
        {german && end && <ArrowRightIcon aria-hidden className="size-3" />}
        {token.text}
      </span>
      <span className="text-[11px] text-muted-foreground">{ROLE_LABEL[token.role]}</span>
    </li>
  );
}

export function WordOrder({ diagram }: { diagram: Diagram }) {
  const [run, setRun] = useState(0);
  const positions = germanPositions(diagram.german);

  return (
    <figure className="rounded-lg border p-3 sm:p-4">
      <div className="flex flex-col gap-3">
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            English
          </p>
          <ol className="flex flex-wrap gap-x-2 gap-y-2" aria-label="English word order">
            {diagram.english.map((t, i) => (
              <Chip key={i} token={t} german={false} />
            ))}
          </ol>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Deutsch
          </p>
          <ol key={run} className="flex flex-wrap gap-x-2 gap-y-2" aria-label="German word order">
            {diagram.german.map((t, i) => (
              <Chip
                key={i}
                token={t}
                german
                position={positions[i]}
                delay={isEnd(t.role) ? 250 : 0}
              />
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="size-3 rounded-sm bg-slot-verb" /> verb in position 2
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="size-3 rounded-sm bg-slot-end" /> moves to the end
          </span>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => setRun((r) => r + 1)}>
          <RotateCcwIcon /> Replay
        </Button>
      </div>
      {diagram.caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground">{diagram.caption}</figcaption>
      )}
    </figure>
  );
}
