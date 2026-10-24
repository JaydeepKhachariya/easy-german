"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpIcon, KeyRoundIcon, RotateCcwIcon, SquareIcon, Trash2Icon } from "lucide-react";

import { insertAtCaret, UmlautBar } from "@/components/exercise/umlaut-bar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMounted } from "@/hooks/use-mounted";
import { useAiConfig } from "@/lib/ai/config";
import { AiError, listModels, PREFERRED_MODELS, streamChat, type ChatMessage } from "@/lib/ai/groq";
import { buildMessages, type TutorContext } from "@/lib/ai/prompt";
import { cn } from "@/lib/utils";

import { ChatMarkdown } from "./chat-markdown";

type Turn = { role: "user" | "assistant"; content: string };

/** Conversations survive closing the panel, until the page reloads. */
const conversations = new Map<string, Turn[]>();

let autoModel: Promise<string> | null = null;
/** The saved model, or the best one this key offers. */
function resolveModel(key: string, saved: string): Promise<string> {
  if (saved) return Promise.resolve(saved);
  autoModel ??= listModels(key)
    .then((ids) => ids[0] ?? PREFERRED_MODELS[0]!)
    .catch((e: unknown) => {
      autoModel = null;
      throw e;
    });
  return autoModel;
}

export function TutorChat({ context, className }: { context: TutorContext; className?: string }) {
  const mounted = useMounted();
  const { apiKey, model } = useAiConfig();
  const [turns, setTurnsState] = useState<Turn[]>(() => conversations.get(context.id) ?? []);
  const [input, setInput] = useState(context.draft ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abort = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const setTurns = (update: (t: Turn[]) => Turn[]) =>
    setTurnsState((prev) => {
      const next = update(prev);
      conversations.set(context.id, next);
      return next;
    });

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, error]);

  useEffect(() => () => abort.current?.abort(), []);

  async function send(text: string, before: Turn[] = turns) {
    const question = text.trim();
    if (!question || busy) return;
    setError(null);
    setInput("");
    const history: ChatMessage[] = [...before, { role: "user", content: question }];
    setTurns(() => [...history, { role: "assistant", content: "" }] as Turn[]);
    setBusy(true);
    const controller = new AbortController();
    abort.current = controller;
    try {
      const chosen = await resolveModel(apiKey, model);
      for await (const piece of streamChat({
        key: apiKey,
        model: chosen,
        messages: buildMessages(context, history),
        signal: controller.signal,
      })) {
        setTurns((t) => {
          const last = t.at(-1)!;
          return [...t.slice(0, -1), { ...last, content: last.content + piece }];
        });
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setError(e instanceof AiError ? e.message : "Something went wrong. Try again.");
      }
    } finally {
      // Drop an empty answer (error or stopped before any text).
      setTurns((t) => (t.at(-1)?.role === "assistant" && !t.at(-1)!.content ? t.slice(0, -1) : t));
      setBusy(false);
      abort.current = null;
    }
  }

  function retry() {
    const i = turns.findLastIndex((t) => t.role === "user");
    if (i >= 0) void send(turns[i]!.content, turns.slice(0, i));
  }

  if (!mounted) return <div className={className} />;

  if (!apiKey) {
    return (
      <div className={cn("space-y-3 p-4 text-sm", className)}>
        <p>
          The AI tutor uses Groq, which is free. You need your own Groq API key, which takes about a
          minute to get.
        </p>
        <Button asChild>
          <Link href="/settings/#ai">
            <KeyRoundIcon /> Set up the AI tutor
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div
        ref={scroller}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4"
        aria-live="polite"
      >
        {turns.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Ask anything about German{context.text ? ", or about what you're reading" : ""}. Your
              questions are sent to Groq to get an answer. The AI can make mistakes, so check
              important points in the lesson.
            </p>
            {context.starters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {context.starters.map((s) => (
                  <Button
                    key={s}
                    variant="outline"
                    size="sm"
                    className="h-auto py-1.5 text-left whitespace-normal"
                    onClick={() => void send(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
        {turns.map((t, i) =>
          t.role === "user" ? (
            <div key={i} className="ml-8 rounded-lg bg-primary px-3 py-2 text-primary-foreground">
              <p className="whitespace-pre-wrap">{t.content}</p>
            </div>
          ) : (
            <div key={i} className="mr-4 rounded-lg border px-3 py-2" data-testid="ai-answer">
              {t.content ? (
                <ChatMarkdown text={t.content} />
              ) : (
                <p className="animate-pulse text-muted-foreground">Thinking...</p>
              )}
            </div>
          ),
        )}
        {error && (
          <div
            className="space-y-2 rounded-lg border border-destructive/40 p-3 text-sm"
            role="alert"
          >
            <p className="text-destructive">{error}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={retry}>
                <RotateCcwIcon /> Try again
              </Button>
              {/(key|model)/i.test(error) && (
                <Button size="sm" variant="outline" asChild>
                  <Link href="/settings/#ai">Open Settings</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <form
        className="space-y-2 border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              void send(input);
            }
          }}
          placeholder="Ask in English or German..."
          aria-label="Your question"
          rows={2}
          className="max-h-40"
        />
        <div className="flex items-center justify-between gap-2">
          <UmlautBar onInsert={(c) => insertAtCaret(inputRef.current, c, setInput)} />
          <div className="flex gap-2">
            {turns.length > 0 && !busy && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Clear the conversation"
                onClick={() => {
                  setError(null);
                  setTurns(() => []);
                }}
              >
                <Trash2Icon />
              </Button>
            )}
            {busy ? (
              <Button type="button" variant="outline" onClick={() => abort.current?.abort()}>
                <SquareIcon /> Stop
              </Button>
            ) : (
              <Button type="submit" disabled={!input.trim()}>
                <ArrowUpIcon /> Ask
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
