import type { Concept } from "@/content/schema";

/** English | German | What changes. Stacks into cards below the sm breakpoint. */
export function ComparisonTable({ rows }: { rows: Concept["comparisonRows"] }) {
  if (rows.length === 0) return null;
  return (
    <div
      className="overflow-hidden rounded-lg border"
      role="table"
      aria-label="English and German compared"
    >
      <div role="row" className="hidden bg-muted/60 text-sm font-medium sm:grid sm:grid-cols-3">
        <span role="columnheader" className="px-3 py-2">
          English
        </span>
        <span role="columnheader" className="px-3 py-2">
          German
        </span>
        <span role="columnheader" className="px-3 py-2">
          What changes
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          role="row"
          className="grid gap-1 border-t px-3 py-3 first:border-t-0 sm:grid-cols-3 sm:gap-0 sm:px-0 sm:py-0 sm:first:border-t"
        >
          <span role="cell" className="sm:px-3 sm:py-2">
            <span className="mr-1 text-xs text-muted-foreground sm:hidden">EN</span>
            {r.english}
          </span>
          <span role="cell" lang="de" className="font-medium sm:px-3 sm:py-2">
            <span className="mr-1 text-xs font-normal text-muted-foreground sm:hidden">DE</span>
            {r.german}
          </span>
          <span role="cell" className="text-sm text-muted-foreground sm:px-3 sm:py-2">
            {r.note}
          </span>
        </div>
      ))}
    </div>
  );
}
