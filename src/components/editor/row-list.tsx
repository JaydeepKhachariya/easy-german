"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import type { LessonDraft } from "@/lib/lesson-draft";

type ListName = "comparisonRows" | "examples" | "mistakes" | "vocab";

export type Column = {
  key: string;
  label: string;
  placeholder?: string;
  lang?: string;
  /** Renders a select instead of a text input. */
  options?: { value: string; label: string }[];
};

/** Add, remove and reorder rows of small objects (comparison rows, examples, mistakes, vocab). */
export function RowList({
  name,
  columns,
  empty,
  addLabel,
  itemLabel,
}: {
  name: ListName;
  columns: Column[];
  /** A blank row with every column key. */
  empty: Record<string, string>;
  addLabel: string;
  itemLabel: string;
}) {
  const { control, register } = useFormContext<LessonDraft>();
  const { fields, append, remove, move } = useFieldArray({ control, name });

  return (
    <div className="space-y-3">
      {fields.length === 0 && <p className="text-sm text-muted-foreground">None yet.</p>}
      {fields.map((f, i) => (
        <div key={f.id} className="space-y-2 rounded-md border bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {itemLabel} {i + 1}
            </span>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Move up"
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
              >
                <ArrowUpIcon />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Move down"
                disabled={i === fields.length - 1}
                onClick={() => move(i, i + 1)}
              >
                <ArrowDownIcon />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${itemLabel} ${i + 1}`}
                onClick={() => remove(i)}
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {columns.map((c) => {
              const path = `${name}.${i}.${c.key}` as const;
              const id = `${name}-${i}-${c.key}`;
              return (
                <div key={c.key} className="space-y-1">
                  <label htmlFor={id} className="text-xs text-muted-foreground">
                    {c.label}
                  </label>
                  {c.options ? (
                    <NativeSelect id={id} {...register(path as never)}>
                      {c.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </NativeSelect>
                  ) : (
                    <Input
                      id={id}
                      lang={c.lang}
                      placeholder={c.placeholder}
                      {...register(path as never)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ ...empty } as never)}
      >
        <PlusIcon /> {addLabel}
      </Button>
    </div>
  );
}
