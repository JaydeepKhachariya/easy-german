"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { insertAtCaret, UmlautBar } from "@/components/exercise/umlaut-bar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { DictionaryIndex } from "@/lib/dictionary-index";
import { loadDictionaryIndex } from "@/lib/load-dictionary";
import { AskAiButton } from "@/components/ai/ask-ai-button";
import { sentenceContext } from "@/lib/ai/prompt";
import {
  analyzeSentence,
  splitSentences,
  type AnalyzedSentence,
  type AnalyzedToken,
} from "@/lib/sentence-helper";
import { cn } from "@/lib/utils";

const EXAMPLES = [
  "Ich stehe jeden Tag um sieben Uhr auf.",
  "Gestern bin ich nach Hause gegangen.",
  "Kannst du mir bitte helfen?",
  "Am Wochenende kaufe ich im Supermarkt ein.",
];

const GENDER_BORDER = { der: "border-der", die: "border-die", das: "border-das" } as const;

const ROLE_STYLE = {
  verb: "bg-slot-verb",
  prefix: "bg-slot-end",
  participle: "bg-slot-end",
  infinitive: "bg-slot-end",
} as const;

const ROLE_LABEL = {
  verb: "conjugated verb",
  prefix: "verb part",
  participle: "participle",
  infinitive: "infinitive",
} as const;

function WordChip({ t }: { t: AnalyzedToken }) {
  const word = (
    <span
      className={cn(
        "block border-b-2 border-transparent text-base font-medium",
        t.entry?.article && GENDER_BORDER[t.entry.article],
      )}
      lang="de"
    >
      {t.text}
    </span>
  );
  const body = (
    <>
      {word}
      <span className="block text-sm text-muted-foreground">
        {t.entry ? t.gloss || "(see verb)" : "?"}
      </span>
      {t.entry && t.entry.h.toLowerCase() !== t.text.toLowerCase() && (
        <span className="block text-xs text-muted-foreground" lang="de">
          {t.entry.h}
        </span>
      )}
      {(t.role || t.note || t.form) && (
        <span className="block max-w-40 text-xs text-der">
          {[t.role && ROLE_LABEL[t.role], t.note, t.form].filter(Boolean).join(" · ")}
        </span>
      )}
    </>
  );
  const box = cn(
    "rounded-md border px-2.5 py-1.5 text-left",
    t.role && ROLE_STYLE[t.role],
    !t.entry && "border-dashed",
  );
  return t.entry ? (
    <Link href={`/dictionary/${t.entry.id}/`} className={cn(box, "hover:border-foreground")}>
      {body}
    </Link>
  ) : (
    <span className={box}>{body}</span>
  );
}

function SentenceResult({ s, sentence }: { s: AnalyzedSentence; sentence: string }) {
  const words = s.tokens.filter((t) => !t.punct);
  return (
    <section className="space-y-3 rounded-lg border p-4" aria-label="Sentence analysis">
      <ol className="flex flex-wrap gap-2">
        {words.map((t, i) => (
          <li key={i} className="flex">
            <WordChip t={t} />
          </li>
        ))}
      </ol>
      <p className="text-sm">
        <span className="text-muted-foreground">Word by word (not a translation): </span>
        <span className="italic">{s.gloss}</span>
      </p>
      {s.notes.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {s.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
      <AskAiButton context={sentenceContext(sentence)} label="Translate and explain with AI" />
    </section>
  );
}

export function SentenceHelper({ indexUrl }: { indexUrl: string }) {
  const params = useSearchParams();
  const [text, setText] = useState(params.get("text") ?? "");
  const [index, setIndex] = useState<DictionaryIndex | null>(null);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadDictionaryIndex(indexUrl).then(setIndex, () => setError(true));
  }, [indexUrl]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (text) url.searchParams.set("text", text);
    else url.searchParams.delete("text");
    window.history.replaceState(null, "", url);
  }, [text]);

  const sentences = useMemo(
    () =>
      index
        ? splitSentences(text).map((sentence) => ({
            sentence,
            s: analyzeSentence(index, sentence),
          }))
        : [],
    [index, text],
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste a German sentence..."
          aria-label="German sentence"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          rows={3}
          className="text-base"
          lang="de"
        />
        <UmlautBar onInsert={(c) => insertAtCaret(inputRef.current, c, setText)} />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Try:</span>
          {EXAMPLES.map((ex) => (
            <Button key={ex} variant="outline" size="sm" onClick={() => setText(ex)} lang="de">
              {ex}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-slot-verb" /> conjugated verb (position 2)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-slot-end" /> verb part at the end
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-3 bg-der" />
          <span className="h-0.5 w-3 bg-die" />
          <span className="h-0.5 w-3 bg-das" /> der / die / das noun
        </span>
      </div>

      {error && (
        <p className="text-sm text-destructive">
          The dictionary could not load. Check your connection and reload.
        </p>
      )}
      {!index && !error && <p className="text-muted-foreground">Loading the dictionary...</p>}
      {index && sentences.map((r, i) => <SentenceResult key={i} s={r.s} sentence={r.sentence} />)}
    </div>
  );
}
