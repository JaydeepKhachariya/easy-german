"use client";

import { Volume2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useSpeechRate } from "@/hooks/use-speech-rate";
import { NO_VOICE_HELP, speakGerman } from "@/lib/speech";
import { cn } from "@/lib/utils";

export function PlayButton({ text, className }: { text: string; className?: string }) {
  const rate = useSpeechRate();

  async function play() {
    const status = await speakGerman(text, rate);
    if (status === "unsupported") {
      toast.info("This browser can't read text aloud.");
    } else if (status === "no-voice") {
      toast.info("No German voice found", { description: NO_VOICE_HELP, duration: 12000 });
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={play}
      className={cn("shrink-0 text-muted-foreground", className)}
      aria-label={`Play: ${text}`}
      title="Listen"
    >
      <Volume2Icon />
    </Button>
  );
}
