"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { LessonDraft } from "@/lib/lesson-draft";

export function TableEditor() {
  const { control, register, getValues } = useFormContext<LessonDraft>();
  const { fields, append, remove } = useFieldArray({ control, name: "genericTables" });
  const kept = getValues("keep.otherTables").length;

  return (
    <div className="space-y-3">
      {kept > 0 && (
        <p className="text-sm text-muted-foreground">
          This lesson also has {kept} special {kept === 1 ? "table" : "tables"} (conjugation or
          articles) from an import. They are kept as they are.
        </p>
      )}
      {fields.map((f, i) => (
        <div key={f.id} className="space-y-2 rounded-md border bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Table {i + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove table ${i + 1}`}
              onClick={() => remove(i)}
            >
              <Trash2Icon />
            </Button>
          </div>
          <Input
            placeholder="Title (optional)"
            aria-label="Table title"
            {...register(`genericTables.${i}.title`)}
          />
          <Input
            placeholder="Headers, separated by |   e.g.  Person | sein | haben"
            aria-label="Table headers"
            {...register(`genericTables.${i}.headersText`)}
          />
          <Textarea
            rows={4}
            placeholder={
              "One row per line, cells separated by |\nich | bin | habe\ndu | bist | hast"
            }
            aria-label="Table rows"
            {...register(`genericTables.${i}.rowsText`)}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ title: "", headersText: "", rowsText: "" })}
      >
        <PlusIcon /> Add table
      </Button>
    </div>
  );
}
