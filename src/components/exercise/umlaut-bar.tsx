"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LOWER = ["ä", "ö", "ü", "ß"];
const UPPER = ["Ä", "Ö", "Ü", "ß"];

/**
 * Buttons for ä ö ü ß. They don't take focus, so the caret stays in the input.
 * Pair with insertAtCaret() in the input's owner.
 */
export function UmlautBar({
  onInsert,
  className,
}: {
  onInsert: (char: string) => void;
  className?: string;
}) {
  const [upper, setUpper] = useState(false);
  const chars = upper ? UPPER : LOWER;

  return (
    <div
      className={cn("flex flex-wrap items-center gap-1", className)}
      aria-label="Special letters"
    >
      {chars.map((c) => (
        <Button
          key={c}
          type="button"
          variant="outline"
          size="sm"
          className="w-10 text-base"
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => onInsert(c)}
          aria-label={`Insert ${c}`}
        >
          {c}
        </Button>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onPointerDown={(e) => e.preventDefault()}
        onClick={() => setUpper((u) => !u)}
        aria-pressed={upper}
        className="text-xs"
      >
        {upper ? "abc" : "ABC"}
      </Button>
    </div>
  );
}

type TextField = HTMLInputElement | HTMLTextAreaElement;

/** Insert text at the caret of a controlled input and restore the caret afterwards. */
export function insertAtCaret(el: TextField | null, char: string, setValue: (v: string) => void) {
  if (!el) return;
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  const next = el.value.slice(0, start) + char + el.value.slice(end);
  setValue(next);
  const caret = start + char.length;
  requestAnimationFrame(() => {
    el.focus();
    el.setSelectionRange(caret, caret);
  });
}
