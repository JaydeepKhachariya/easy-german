"use client";

import { useSearchParams } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";

import { db, type UserLesson } from "@/lib/db";

/** Reads ?id= and loads that lesson. undefined = loading, null = not found. */
export function useLessonFromQuery(): { id: string | null; lesson: UserLesson | null | undefined } {
  const id = useSearchParams().get("id");
  const lesson = useLiveQuery(async () => (id ? ((await db.lessons.get(id)) ?? null) : null), [id]);
  return { id, lesson };
}
