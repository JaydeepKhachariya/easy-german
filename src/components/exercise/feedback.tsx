import { CheckCircle2Icon, XCircleIcon } from "lucide-react";

import { describeIssues, type CheckResult } from "@/lib/check-answer";
import { cn } from "@/lib/utils";

export function FeedbackBox({
  correct,
  children,
}: {
  correct: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex gap-2 rounded-md border p-3 text-sm",
        correct ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10",
      )}
    >
      {correct ? (
        <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
      ) : (
        <XCircleIcon className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
      )}
      <div className="min-w-0 space-y-1">{children}</div>
    </div>
  );
}

/** Shows the learner's words with the wrong ones marked, plus plain-English hints. */
export function AnswerFeedback({
  result,
  revealed,
  explanation,
}: {
  result: CheckResult;
  revealed?: boolean;
  explanation?: string;
}) {
  if (result.correct) {
    const lines = describeIssues(result);
    return (
      <FeedbackBox correct>
        <p className="font-medium">{lines[0] ?? "Correct."}</p>
        {explanation && <p className="text-muted-foreground">{explanation}</p>}
      </FeedbackBox>
    );
  }

  const marked = new Map<number, "wrong" | "case" | "extra">();
  for (const i of result.issues) {
    if (i.kind === "wrong" || i.kind === "case" || i.kind === "extra") marked.set(i.index, i.kind);
  }

  return (
    <FeedbackBox correct={false}>
      {result.givenWords.length > 0 && (
        <p className="flex flex-wrap gap-x-1.5" aria-label="Your answer">
          {result.givenWords.map((w, i) => {
            const kind = marked.get(i);
            return (
              <span
                key={i}
                className={cn(
                  kind &&
                    "rounded-sm bg-destructive/15 px-0.5 font-medium underline decoration-destructive decoration-wavy underline-offset-4",
                  kind === "extra" && "line-through",
                )}
              >
                {w}
                {kind && <span className="sr-only"> ({kind})</span>}
              </span>
            );
          })}
        </p>
      )}
      <ul className="space-y-0.5">
        {describeIssues(result).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      {revealed && (
        <p>
          <span className="text-muted-foreground">Answer: </span>
          <span className="font-medium">{result.expected}</span>
        </p>
      )}
      {revealed && explanation && <p className="text-muted-foreground">{explanation}</p>}
    </FeedbackBox>
  );
}
