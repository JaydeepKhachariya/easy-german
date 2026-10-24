"use client";

import { useState } from "react";
import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { TutorContext } from "@/lib/ai/prompt";
import { cn } from "@/lib/utils";

import { TutorChat } from "./tutor-chat";

/**
 * Opens the AI tutor in a side panel, already told about the lesson or word on the page.
 * `floating` pins the button to the bottom corner so it's there while scrolling.
 */
export function AskAiButton({
  context,
  floating = false,
  label = "Ask the AI tutor",
}: {
  context: TutorContext;
  floating?: boolean;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={floating ? "default" : "outline"}
        onClick={() => setOpen(true)}
        className={cn(
          floating && "fixed right-4 bottom-4 z-40 rounded-full shadow-lg print:hidden",
        )}
      >
        <SparklesIcon /> {label}
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full gap-0 sm:max-w-lg">
          <SheetHeader className="border-b pr-12">
            <SheetTitle className="flex items-center gap-2">
              <SparklesIcon className="size-4" /> AI tutor
            </SheetTitle>
            <SheetDescription>{context.label}</SheetDescription>
          </SheetHeader>
          {open && <TutorChat context={context} className="min-h-0 flex-1" />}
        </SheetContent>
      </Sheet>
    </>
  );
}
