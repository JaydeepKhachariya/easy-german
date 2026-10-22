"use client";

import { useEffect, useRef } from "react";

import { UmlautBar } from "@/components/exercise/umlaut-bar";

type TextField = HTMLInputElement | HTMLTextAreaElement;

const isTextField = (el: Element | null): el is TextField =>
  !!el &&
  (el instanceof HTMLTextAreaElement ||
    (el instanceof HTMLInputElement && ["text", "search", ""].includes(el.type)));

/**
 * Inserts into whichever editor field was focused last. Works with uncontrolled
 * react-hook-form inputs by using the native value setter and an input event.
 */
export function EditorUmlautBar({ scope }: { scope: React.RefObject<HTMLElement | null> }) {
  const last = useRef<TextField | null>(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const onFocus = (e: FocusEvent) => {
      if (isTextField(e.target as Element)) last.current = e.target as TextField;
    };
    root.addEventListener("focusin", onFocus);
    return () => root.removeEventListener("focusin", onFocus);
  }, [scope]);

  function insert(char: string) {
    const el = last.current;
    if (!el || !el.isConnected) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const next = el.value.slice(0, start) + char + el.value.slice(end);
    const proto =
      el instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(el, next);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.focus();
    el.setSelectionRange(start + char.length, start + char.length);
  }

  return <UmlautBar onInsert={insert} />;
}
