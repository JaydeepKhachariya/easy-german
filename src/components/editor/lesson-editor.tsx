"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { AlertCircleIcon, EyeIcon, PencilIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";

import { ConceptView } from "@/components/lesson/concept-view";
import { Button } from "@/components/ui/button";
import { CATEGORIES, CATEGORY_LABELS, type Concept } from "@/content/schema";
import {
  conceptToDraft,
  draftToConcept,
  draftToPreview,
  type LessonDraft,
} from "@/lib/lesson-draft";
import { saveLesson } from "@/lib/lessons";
import { cn } from "@/lib/utils";

import { EditorUmlautBar } from "./editor-umlaut-bar";
import { ExerciseEditor } from "./exercise-editor";
import { EditorSection, SelectField, TextAreaField, TextField } from "./fields";
import { RowList } from "./row-list";
import { TableEditor } from "./table-editor";

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] }));
const ARTICLE_OPTIONS = [
  { value: "", label: "(not a noun)" },
  { value: "der", label: "der" },
  { value: "die", label: "die" },
  { value: "das", label: "das" },
];

function Preview({ draft }: { draft: LessonDraft }) {
  const deferred = useDeferredValue(draft);
  const { concept, hidden } = useMemo(() => draftToPreview(deferred), [deferred]);
  return (
    <div className="space-y-3">
      {hidden > 0 && (
        <p className="rounded-md border border-warning/40 bg-warning/10 p-2 text-sm">
          {hidden} unfinished {hidden === 1 ? "exercise is" : "exercises are"} hidden until
          complete.
        </p>
      )}
      <ConceptView concept={concept} source="user" preview />
    </div>
  );
}

export function LessonEditor({ initial, isNew }: { initial: Concept; isNew: boolean }) {
  const router = useRouter();
  const form = useForm<LessonDraft>({ defaultValues: conceptToDraft(initial) });
  const draft = useWatch({ control: form.control }) as LessonDraft;
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [errors, setErrors] = useState<{ path: string; message: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const errorsRef = useRef<HTMLDivElement>(null);
  const dirty = form.formState.isDirty;

  useEffect(() => {
    if (!dirty || saving) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, saving]);

  useEffect(() => {
    if (errors.length) errorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [errors]);

  async function onSave(values: LessonDraft) {
    const r = draftToConcept(values);
    if (!r.ok) {
      setErrors(r.errors);
      setTab("edit");
      toast.error("Fix the problems listed before saving.");
      return;
    }
    setErrors([]);
    setSaving(true);
    try {
      const saved = await saveLesson(r.concept);
      form.reset(values);
      toast.success(isNew ? "Lesson created." : "Lesson saved.");
      router.push(`/my-lessons/view/?id=${encodeURIComponent(saved.id)}`);
    } catch {
      toast.error("Could not save. Your browser may be blocking storage for this site.");
      setSaving(false);
    }
  }

  return (
    <FormProvider {...form}>
      <div className="mb-4 flex gap-1 rounded-lg bg-muted p-1 lg:hidden" role="tablist">
        {(["edit", "preview"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium",
              tab === t ? "bg-background shadow-sm" : "text-muted-foreground",
            )}
          >
            {t === "edit" ? <PencilIcon className="size-4" /> : <EyeIcon className="size-4" />}
            {t === "edit" ? "Edit" : "Preview"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSave)}
          className={cn("space-y-4 pb-24", tab !== "edit" && "hidden lg:block")}
          noValidate
        >
          <div ref={errorsRef}>
            {errors.length > 0 && (
              <div
                role="alert"
                className="space-y-1 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm"
              >
                <p className="flex items-center gap-1.5 font-medium">
                  <AlertCircleIcon className="size-4" /> {errors.length}{" "}
                  {errors.length === 1 ? "problem" : "problems"} to fix
                </p>
                <ul className="ml-5 list-disc">
                  {errors.slice(0, 15).map((e, i) => (
                    <li key={i}>
                      <span className="font-medium">{e.path}:</span> {e.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <EditorSection title="Basics">
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField name="titleDe" label="German title" lang="de" placeholder="Die Uhrzeit" />
              <TextField name="titleEn" label="English title" placeholder="Telling the time" />
              <SelectField name="category" label="Category" options={CATEGORY_OPTIONS} />
              <div className="grid grid-cols-2 gap-3">
                <TextField name="minutes" label="Minutes" type="number" />
                <SelectField
                  name="status"
                  label="Status"
                  options={[
                    { value: "draft", label: "Draft" },
                    { value: "complete", label: "Complete" },
                  ]}
                />
              </div>
            </div>
            <TextField name="summary" label="One-line summary" />
          </EditorSection>

          <EditorSection title="In English" description="Start with how English does it.">
            <TextAreaField
              name="englishExplanation"
              label="Explanation"
              rows={4}
              hint="Blank line = new paragraph. Lines starting with - make a list. **bold** works."
            />
            <TextAreaField
              name="englishExamplesText"
              label="English example sentences, one per line"
              rows={3}
            />
          </EditorSection>

          <EditorSection title="In German">
            <TextAreaField name="germanExplanation" label="The rule" rows={5} />
            <p className="text-sm font-medium">Comparison table</p>
            <RowList
              name="comparisonRows"
              itemLabel="Row"
              addLabel="Add row"
              empty={{ english: "", german: "", note: "" }}
              columns={[
                { key: "english", label: "English" },
                { key: "german", label: "German", lang: "de" },
                { key: "note", label: "What changes" },
              ]}
            />
          </EditorSection>

          <EditorSection title="English helps and misleads">
            <TextAreaField
              name="helpsText"
              label="Where English helps (one point per line)"
              rows={3}
            />
            <TextAreaField
              name="misleadsText"
              label="Where English misleads (one point per line)"
              rows={3}
            />
            <TextAreaField name="hindiHint" label="Hindi hint (optional)" rows={2} />
          </EditorSection>

          <EditorSection title="Tables">
            <TableEditor />
          </EditorSection>

          <EditorSection title="Examples">
            <RowList
              name="examples"
              itemLabel="Example"
              addLabel="Add example"
              empty={{ de: "", en: "", gloss: "" }}
              columns={[
                { key: "de", label: "German", lang: "de" },
                { key: "en", label: "English" },
                {
                  key: "gloss",
                  label: "Word by word (optional)",
                  placeholder: "I can tomorrow not come",
                },
              ]}
            />
          </EditorSection>

          <EditorSection title="Common mistakes">
            <RowList
              name="mistakes"
              itemLabel="Mistake"
              addLabel="Add mistake"
              empty={{ wrong: "", right: "", why: "" }}
              columns={[
                { key: "wrong", label: "Wrong", lang: "de" },
                { key: "right", label: "Right", lang: "de" },
                { key: "why", label: "Why (one line)" },
              ]}
            />
          </EditorSection>

          <EditorSection title="Exercises">
            <ExerciseEditor />
          </EditorSection>

          <EditorSection
            title="Vocabulary"
            description="Added to the review deck when the lesson is done."
          >
            <RowList
              name="vocab"
              itemLabel="Word"
              addLabel="Add word"
              empty={{ de: "", en: "", article: "", plural: "" }}
              columns={[
                { key: "de", label: "German (noun without article)", lang: "de" },
                { key: "en", label: "English" },
                { key: "article", label: "Article", options: ARTICLE_OPTIONS },
                { key: "plural", label: "Plural (optional)", lang: "de" },
              ]}
            />
          </EditorSection>

          <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-2">
              <EditorUmlautBar scope={formRef} />
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  <SaveIcon /> Save
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div
          className={cn(
            "min-w-0 lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto",
            tab !== "preview" && "hidden lg:block",
          )}
        >
          <p className="mb-3 hidden text-sm font-medium text-muted-foreground lg:block">
            Live preview
          </p>
          <div className="rounded-lg border p-4">
            <Preview draft={draft} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
