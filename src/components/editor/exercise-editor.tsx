"use client";

import { useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_PRONOUNS, EXERCISE_TYPES, SKILLS, type ExerciseType } from "@/content/schema";
import { emptyExercise, lines, type LessonDraft } from "@/lib/lesson-draft";
import { SKILL_LABELS } from "@/lib/progress";

const TYPE_OPTIONS = EXERCISE_TYPES.map((t) => ({ value: t.type, label: t.label }));

function Small({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs text-muted-foreground">
      {children}
    </label>
  );
}

function TypeFields({ index }: { index: number }) {
  const { register, control } = useFormContext<LessonDraft>();
  const type = useWatch({ control, name: `exercises.${index}.type` });
  const options = useWatch({ control, name: `exercises.${index}.optionsText` });
  const p = `exercises.${index}` as const;
  const id = (k: string) => `ex-${index}-${k}`;

  switch (type) {
    case "multipleChoice":
      return (
        <>
          <div className="space-y-1">
            <Small htmlFor={id("q")}>Question or sentence</Small>
            <Input id={id("q")} lang="de" {...register(`${p}.question`)} />
          </div>
          <div className="space-y-1">
            <Small htmlFor={id("opts")}>Options, one per line (2 to 6)</Small>
            <Textarea id={id("opts")} rows={4} lang="de" {...register(`${p}.optionsText`)} />
          </div>
          <div className="space-y-1">
            <Small htmlFor={id("ans")}>Correct option</Small>
            <NativeSelect id={id("ans")} {...register(`${p}.answerIndex`)}>
              {(lines(options ?? "").length ? lines(options ?? "") : ["(add options first)"]).map(
                (o, i) => (
                  <option key={i} value={String(i)}>
                    {i + 1}. {o}
                  </option>
                ),
              )}
            </NativeSelect>
          </div>
        </>
      );
    case "fillBlank":
      return (
        <>
          <div className="space-y-1">
            <Small htmlFor={id("s")}>Sentence. Write ___ (three underscores) for each blank.</Small>
            <Input
              id={id("s")}
              lang="de"
              placeholder="Ich ___ heute nicht kommen."
              {...register(`${p}.sentence`)}
            />
          </div>
          <div className="space-y-1">
            <Small htmlFor={id("b")}>
              Answers: one line per blank. Separate other accepted answers with |
            </Small>
            <Textarea
              id={id("b")}
              rows={2}
              lang="de"
              placeholder="kann"
              {...register(`${p}.blanksText`)}
            />
          </div>
          <div className="space-y-1">
            <Small htmlFor={id("en")}>English meaning (optional)</Small>
            <Input id={id("en")} {...register(`${p}.en`)} />
          </div>
        </>
      );
    case "reorderWords":
      return (
        <>
          <div className="space-y-1">
            <Small htmlFor={id("w")}>Correct German sentence. It is split into word tiles.</Small>
            <Input
              id={id("w")}
              lang="de"
              placeholder="Ich kann heute nicht kommen."
              {...register(`${p}.wordsText`)}
            />
          </div>
          <div className="space-y-1">
            <Small htmlFor={id("alt")}>Other correct orders, one per line (same words)</Small>
            <Textarea
              id={id("alt")}
              rows={2}
              lang="de"
              placeholder="Heute kann ich nicht kommen."
              {...register(`${p}.alsoAcceptText`)}
            />
          </div>
          <div className="space-y-1">
            <Small htmlFor={id("en")}>English meaning</Small>
            <Input id={id("en")} {...register(`${p}.en`)} />
          </div>
        </>
      );
    case "conjugationTable":
      return (
        <>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1">
              <Small htmlFor={id("verb")}>Verb (infinitive)</Small>
              <Input id={id("verb")} lang="de" {...register(`${p}.verb`)} />
            </div>
            <div className="space-y-1">
              <Small htmlFor={id("eng")}>English (optional)</Small>
              <Input id={id("eng")} {...register(`${p}.english`)} />
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 gap-y-1.5">
            <span className="text-xs text-muted-foreground">Pronoun</span>
            <span className="text-xs text-muted-foreground">Form</span>
            <span className="text-xs text-muted-foreground">Shown</span>
            {DEFAULT_PRONOUNS.map((pr, i) => (
              <div key={pr} className="contents">
                <label htmlFor={id(`f${i}`)} className="text-sm">
                  {pr}
                </label>
                <Input id={id(`f${i}`)} lang="de" {...register(`${p}.forms.${i}`)} />
                <input
                  type="checkbox"
                  aria-label={`Show ${pr} form already filled in`}
                  className="size-4 accent-primary"
                  {...register(`${p}.given.${i}`)}
                />
              </div>
            ))}
          </div>
        </>
      );
    case "translate":
      return (
        <>
          <div className="space-y-1">
            <Small htmlFor={id("en")}>English sentence</Small>
            <Input id={id("en")} {...register(`${p}.en`)} />
          </div>
          <div className="space-y-1">
            <Small htmlFor={id("a")}>Accepted German answers, one per line</Small>
            <Textarea id={id("a")} rows={3} lang="de" {...register(`${p}.answersText`)} />
          </div>
        </>
      );
    case "matchPairs":
      return (
        <div className="space-y-1">
          <Small htmlFor={id("pairs")}>Pairs, one per line: left = right (2 to 8)</Small>
          <Textarea
            id={id("pairs")}
            rows={5}
            placeholder={"gehen = to go\nessen = to eat"}
            {...register(`${p}.pairsText`)}
          />
        </div>
      );
    case "articlePick":
      return (
        <div className="space-y-1">
          <Small htmlFor={id("nouns")}>
            Nouns, one per line: article noun = English (English is optional)
          </Small>
          <Textarea
            id={id("nouns")}
            rows={5}
            lang="de"
            placeholder={"der Hund = dog\ndie Katze = cat\ndas Haus = house"}
            {...register(`${p}.nounsText`)}
          />
        </div>
      );
    default:
      return null;
  }
}

export function ExerciseEditor() {
  const { control, register, getValues } = useFormContext<LessonDraft>();
  const { fields, append, remove, move } = useFieldArray({ control, name: "exercises" });
  const [newType, setNewType] = useState<ExerciseType>("multipleChoice");

  function add() {
    const ids = new Set(getValues("exercises").map((e) => e.id));
    let n = fields.length + 1;
    while (ids.has(`ex-${n}`)) n++;
    append(emptyExercise(newType, `ex-${n}`));
  }

  return (
    <div className="space-y-3">
      {fields.length === 0 && <p className="text-sm text-muted-foreground">No exercises yet.</p>}
      {fields.map((f, i) => (
        <div key={f.id} className="space-y-3 rounded-md border bg-muted/20 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground">Exercise {i + 1}</span>
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
                aria-label={`Remove exercise ${i + 1}`}
                onClick={() => remove(i)}
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1">
              <Small htmlFor={`ex-${i}-type`}>Type</Small>
              <NativeSelect id={`ex-${i}-type`} {...register(`exercises.${i}.type`)}>
                {TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className="space-y-1">
              <Small htmlFor={`ex-${i}-skill`}>Skill (for weak areas)</Small>
              <NativeSelect id={`ex-${i}-skill`} {...register(`exercises.${i}.skill`)}>
                {SKILLS.map((s) => (
                  <option key={s} value={s}>
                    {SKILL_LABELS[s]}
                  </option>
                ))}
              </NativeSelect>
            </div>
          </div>
          <div className="space-y-1">
            <Small htmlFor={`ex-${i}-prompt`}>Instruction</Small>
            <Input id={`ex-${i}-prompt`} {...register(`exercises.${i}.prompt`)} />
          </div>
          <TypeFields index={i} />
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1">
              <Small htmlFor={`ex-${i}-hint`}>Hint (optional)</Small>
              <Input id={`ex-${i}-hint`} {...register(`exercises.${i}.hint`)} />
            </div>
            <div className="space-y-1">
              <Small htmlFor={`ex-${i}-expl`}>Explanation after answering (optional)</Small>
              <Input id={`ex-${i}-expl`} {...register(`exercises.${i}.explanation`)} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-2">
        <NativeSelect
          aria-label="New exercise type"
          value={newType}
          onChange={(e) => setNewType(e.target.value as ExerciseType)}
          className="w-48"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </NativeSelect>
        <Button type="button" variant="outline" size="sm" onClick={add}>
          <PlusIcon /> Add exercise
        </Button>
      </div>
    </div>
  );
}
