"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import {
  CopyIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import { ImportLessonsDialog } from "@/components/editor/import-lessons-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db, type UserLesson } from "@/lib/db";
import { slugify, deleteLesson, duplicateLesson } from "@/lib/lessons";

import { DataNote } from "./data-note";
import { exportLessons } from "./lesson-actions";

const viewHref = (id: string) => `/my-lessons/view/?id=${encodeURIComponent(id)}`;
const editHref = (id: string) => `/my-lessons/edit/?id=${encodeURIComponent(id)}`;

function LessonRow({ lesson }: { lesson: UserLesson }) {
  return (
    <li className="flex items-start gap-2 rounded-lg border p-3">
      <Link href={viewHref(lesson.id)} className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{lesson.titleEn}</span>
          {lesson.status === "draft" && (
            <Badge variant="outline" className="border-warning/50 text-warning">
              Draft
            </Badge>
          )}
        </span>
        <span className="block text-sm text-muted-foreground" lang="de">
          {lesson.titleDe}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {lesson.exercises.length} exercises · {lesson.vocab.length} words · edited{" "}
          {new Date(lesson.updatedAt).toLocaleDateString()}
        </span>
      </Link>
      <Button asChild variant="ghost" size="icon-sm" aria-label={`Edit ${lesson.titleEn}`}>
        <Link href={editHref(lesson.id)}>
          <PencilIcon />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${lesson.titleEn}`}>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={async () => {
              const copy = await duplicateLesson(lesson.id);
              if (copy) toast.success(`Created "${copy.titleEn}".`);
            }}
          >
            <CopyIcon /> Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => exportLessons([lesson], `lesson-${slugify(lesson.titleEn)}`)}
          >
            <DownloadIcon /> Export as JSON
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <ConfirmDialog
            trigger={
              <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                <Trash2Icon /> Delete
              </DropdownMenuItem>
            }
            title="Delete this lesson?"
            description={
              <>
                &quot;{lesson.titleEn}&quot; and its progress will be removed from this browser.
                Words already in your review deck stay. Export it first if you might want it back.
              </>
            }
            confirmLabel="Delete"
            onConfirm={async () => {
              await deleteLesson(lesson.id);
              toast.success("Lesson deleted.");
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}

export function MyLessonsList() {
  const lessons = useLiveQuery(() => db.lessons.orderBy("updatedAt").reverse().toArray(), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href="/my-lessons/new/">
            <PlusIcon /> New lesson
          </Link>
        </Button>
        <ImportLessonsDialog />
        <Button
          variant="outline"
          onClick={() => lessons && exportLessons(lessons, "my-lessons")}
          disabled={!lessons?.length}
        >
          <DownloadIcon /> Export all
        </Button>
      </div>

      <DataNote />

      {lessons === undefined ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : lessons.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="font-medium">No lessons yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Write your own lesson in the same format as the core ones, or import a JSON file someone
            shared with you.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {lessons.map((l) => (
            <LessonRow key={l.id} lesson={l} />
          ))}
        </ul>
      )}
    </div>
  );
}
