"use client";

import { useId } from "react";
import { useFormContext, type FieldPath } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import type { LessonDraft } from "@/lib/lesson-draft";
import { cn } from "@/lib/utils";

type Name = FieldPath<LessonDraft>;

export function Field({
  label,
  hint,
  children,
  id,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function TextField({
  name,
  label,
  hint,
  lang,
  placeholder,
  type,
  className,
}: {
  name: Name;
  label: string;
  hint?: string;
  lang?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  const id = useId();
  const { register } = useFormContext<LessonDraft>();
  return (
    <Field label={label} hint={hint} id={id} className={className}>
      <Input id={id} lang={lang} placeholder={placeholder} type={type} {...register(name)} />
    </Field>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  rows = 3,
  lang,
  placeholder,
}: {
  name: Name;
  label: string;
  hint?: string;
  rows?: number;
  lang?: string;
  placeholder?: string;
}) {
  const id = useId();
  const { register } = useFormContext<LessonDraft>();
  return (
    <Field label={label} hint={hint} id={id}>
      <Textarea id={id} rows={rows} lang={lang} placeholder={placeholder} {...register(name)} />
    </Field>
  );
}

export function SelectField({
  name,
  label,
  options,
  hint,
  className,
}: {
  name: Name;
  label: string;
  options: { value: string; label: string }[];
  hint?: string;
  className?: string;
}) {
  const id = useId();
  const { register } = useFormContext<LessonDraft>();
  return (
    <Field label={label} hint={hint} id={id} className={className}>
      <NativeSelect id={id} {...register(name)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </NativeSelect>
    </Field>
  );
}

export function EditorSection({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4 rounded-lg border p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <legend className="font-semibold">{title}</legend>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </fieldset>
  );
}
