import { Button } from "@/components/ui/button";

/** Check / Try again / Show answer buttons shared by all exercise types. */
export function CheckRow({
  state,
  onCheck,
  onRetry,
  onReveal,
  canCheck = true,
}: {
  state: "idle" | "correct" | "wrong" | "revealed";
  onCheck: () => void;
  onRetry?: () => void;
  onReveal?: () => void;
  canCheck?: boolean;
}) {
  if (state === "correct" || state === "revealed") {
    return onRetry ? (
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>
        Do it again
      </Button>
    ) : null;
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" size="sm" onClick={onCheck} disabled={!canCheck}>
        Check
      </Button>
      {state === "wrong" && onReveal && (
        <Button type="button" variant="ghost" size="sm" onClick={onReveal}>
          Show answer
        </Button>
      )}
    </div>
  );
}
