"use client";

import { useState } from "react";
import { FileUpIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NativeSelect } from "@/components/ui/native-select";
import { db } from "@/lib/db";
import {
  applyLessonImport,
  ImportError,
  parseLessonsFile,
  planLessonImport,
  readJson,
  type ConflictChoice,
  type ImportPlanItem,
  type ParsedLessons,
} from "@/lib/import-export";

const CHOICES: { value: ConflictChoice; label: string }[] = [
  { value: "skip", label: "Skip (keep mine)" },
  { value: "replace", label: "Replace mine" },
  { value: "keepBoth", label: "Keep both" },
];

type State =
  | { step: "pick" }
  | { step: "error"; messages: string[] }
  | {
      step: "preview";
      plan: ImportPlanItem[];
      invalid: ParsedLessons["invalid"];
      fileName: string;
    };

export function ImportLessonsDialog() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>({ step: "pick" });
  const [choices, setChoices] = useState<Record<string, ConflictChoice>>({});
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    try {
      const parsed = parseLessonsFile(readJson(await file.text()));
      const existing = await db.lessons.toArray();
      const plan = planLessonImport(parsed.valid, existing);
      setChoices({});
      setState({ step: "preview", plan, invalid: parsed.invalid, fileName: file.name });
    } catch (e) {
      setState({
        step: "error",
        messages: e instanceof ImportError ? e.messages : ["Could not read this file."],
      });
    }
  }

  async function doImport(plan: ImportPlanItem[]) {
    setBusy(true);
    try {
      const r = await applyLessonImport(plan, choices);
      const parts = [
        r.added && `${r.added} added`,
        r.replaced && `${r.replaced} replaced`,
        r.skipped && `${r.skipped} skipped`,
      ].filter(Boolean);
      toast.success(`Import done: ${parts.join(", ") || "nothing changed"}.`);
      setOpen(false);
    } catch {
      toast.error("Import failed. Nothing was changed.");
    } finally {
      setBusy(false);
    }
  }

  const conflicts = state.step === "preview" ? state.plan.filter((p) => p.conflict) : [];

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setState({ step: "pick" });
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUpIcon /> Import JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Import lessons</DialogTitle>
          <DialogDescription>
            Pick a .json file exported from Deutsch Bridge. You will see what&apos;s inside before
            anything is saved.
          </DialogDescription>
        </DialogHeader>

        {(state.step === "pick" || state.step === "error") && (
          <div className="space-y-3">
            <input
              type="file"
              accept="application/json,.json"
              aria-label="Lesson file"
              onChange={(e) => onFile(e.target.files?.[0])}
              className="block w-full cursor-pointer rounded-md border p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1"
            />
            {state.step === "error" && (
              <div
                role="alert"
                className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm"
              >
                <p className="font-medium">This file can&apos;t be imported.</p>
                <ul className="mt-1 ml-5 list-disc">
                  {state.messages.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {state.step === "preview" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {state.fileName}: {state.plan.length} valid{" "}
              {state.plan.length === 1 ? "lesson" : "lessons"}
              {state.invalid.length > 0 && `, ${state.invalid.length} with errors`}.
            </p>

            {conflicts.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span>All {conflicts.length} conflicts:</span>
                <NativeSelect
                  aria-label="Choice for all conflicts"
                  className="w-44"
                  defaultValue=""
                  onChange={(e) => {
                    const v = e.target.value as ConflictChoice;
                    if (v) setChoices(Object.fromEntries(conflicts.map((c) => [c.lesson.id, v])));
                  }}
                >
                  <option value="">Choose...</option>
                  {CHOICES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            )}

            <ul className="max-h-72 space-y-2 overflow-y-auto">
              {state.plan.map(({ lesson, conflict }) => (
                <li key={lesson.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{lesson.titleEn}</p>
                      <p className="truncate text-sm text-muted-foreground" lang="de">
                        {lesson.titleDe}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lesson.examples.length} examples · {lesson.exercises.length} exercises ·{" "}
                        {lesson.vocab.length} words
                      </p>
                    </div>
                    {conflict ? (
                      <Badge variant="outline" className="border-warning/50 text-warning">
                        Same id as yours
                      </Badge>
                    ) : (
                      <Badge variant="outline">New</Badge>
                    )}
                  </div>
                  {conflict && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-muted-foreground">
                        You already have &quot;{conflict.existingTitle}&quot; with this id.
                      </p>
                      <NativeSelect
                        aria-label={`What to do with ${lesson.titleEn}`}
                        value={choices[lesson.id] ?? "skip"}
                        onChange={(e) =>
                          setChoices((c) => ({
                            ...c,
                            [lesson.id]: e.target.value as ConflictChoice,
                          }))
                        }
                      >
                        {CHOICES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </NativeSelect>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {state.invalid.length > 0 && (
              <details className="rounded-md border border-destructive/40 p-3 text-sm">
                <summary className="cursor-pointer font-medium">
                  {state.invalid.length} {state.invalid.length === 1 ? "lesson" : "lessons"} will be
                  left out
                </summary>
                <ul className="mt-2 space-y-2">
                  {state.invalid.map((inv) => (
                    <li key={inv.index}>
                      <p className="font-medium">{inv.title}</p>
                      <ul className="ml-5 list-disc text-muted-foreground">
                        {inv.messages.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        <DialogFooter>
          {state.step === "preview" && (
            <Button variant="ghost" onClick={() => setState({ step: "pick" })}>
              Choose another file
            </Button>
          )}
          {state.step === "preview" && (
            <Button disabled={busy || state.plan.length === 0} onClick={() => doImport(state.plan)}>
              Import
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
