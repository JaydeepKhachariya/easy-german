"use client";

import { useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { CheckCircle2Icon, CircleDashedIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { conceptKey, db, type LessonSource, type ProgressRecord } from "@/lib/db";
import { markLessonOpened } from "@/lib/progress";

export function ProgressBadge({ record }: { record: ProgressRecord | undefined }) {
  if (!record) return null;
  if (record.status === "completed") {
    return (
      <Badge variant="outline" className="border-success/50 text-success">
        <CheckCircle2Icon /> Done
      </Badge>
    );
  }
  return (
    <Badge variant="outline">
      <CircleDashedIcon /> {record.solved.length}/{record.total}
    </Badge>
  );
}

/** Shows progress for the open lesson and marks it as started. */
export function LessonStatus({
  conceptId,
  source,
  total,
  preview,
}: {
  conceptId: string;
  source: LessonSource;
  total: number;
  preview?: boolean;
}) {
  const key = conceptKey(source, conceptId);
  const record = useLiveQuery(() => db.progress.get(key), [key]);

  useEffect(() => {
    if (!preview && total > 0) markLessonOpened(source, conceptId, total).catch(() => {});
  }, [preview, source, conceptId, total]);

  if (preview) return null;
  return <ProgressBadge record={record} />;
}
