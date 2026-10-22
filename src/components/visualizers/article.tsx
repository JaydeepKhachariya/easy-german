import type { Article, Gender } from "@/content/schema";
import { cn } from "@/lib/utils";

/**
 * One shared component for article colour coding.
 * Colour is never the only signal: the article word is always shown, plus a small
 * m / f / n / pl marker (plural "die" and feminine "die" look different).
 */
export const GENDER_STYLES: Record<Gender, { label: string; short: string; className: string }> = {
  der: { label: "masculine", short: "m", className: "bg-der-bg text-der border-der/40" },
  die: { label: "feminine", short: "f", className: "bg-die-bg text-die border-die/40" },
  das: { label: "neuter", short: "n", className: "bg-das-bg text-das border-das/40" },
  plural: { label: "plural", short: "pl", className: "bg-plural-bg text-plural border-plural/40" },
};

export function ArticleTag({
  gender,
  text,
  className,
}: {
  gender: Gender;
  /** Override the shown word, e.g. "keine" or "einen". Defaults to der/die/das. */
  text?: string;
  className?: string;
}) {
  const s = GENDER_STYLES[gender];
  const word = text ?? (gender === "plural" ? "die" : gender);
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-0.5 rounded border px-1.5 py-0.5 font-semibold",
        s.className,
        className,
      )}
    >
      {word}
      <span aria-hidden className="text-[0.65em] font-medium opacity-80">
        {s.short}
      </span>
      <span className="sr-only">({s.label})</span>
    </span>
  );
}

export function NounChip({
  noun,
  article,
  plural,
  className,
}: {
  noun: string;
  article: Article;
  plural?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-1.5 gap-y-1", className)}>
      <ArticleTag gender={article} />
      <span className="font-medium">{noun}</span>
      {plural && plural !== "-" && (
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <span aria-hidden>·</span>
          <ArticleTag gender="plural" className="text-xs" />
          {plural}
        </span>
      )}
    </span>
  );
}
