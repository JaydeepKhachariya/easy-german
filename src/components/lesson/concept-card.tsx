import Link from "next/link";
import { ClockIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function ConceptCard({
  href,
  titleEn,
  titleDe,
  minutes,
  draft,
  summary,
  status,
}: {
  href: string;
  titleEn: string;
  titleDe: string;
  minutes: number;
  draft?: boolean;
  summary?: string;
  /** Learner progress badge, filled in by client code. */
  status?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-lg border p-3 transition-colors hover:bg-accent"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="font-medium">{titleEn}</span>
        <span className="flex shrink-0 items-center gap-1">
          {status}
          {draft && (
            <Badge variant="outline" className="border-warning/50 text-warning">
              Draft
            </Badge>
          )}
        </span>
      </span>
      <span className="text-sm text-muted-foreground" lang="de">
        {titleDe}
      </span>
      {summary && <span className="line-clamp-2 text-sm">{summary}</span>}
      <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <ClockIcon className="size-3" /> {minutes} min
      </span>
    </Link>
  );
}
