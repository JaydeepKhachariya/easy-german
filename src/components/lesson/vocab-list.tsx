import Link from "next/link";
import { BookTextIcon } from "lucide-react";

import { PlayButton } from "@/components/audio/play-button";
import { NounChip } from "@/components/visualizers/article";
import type { VocabItem } from "@/content/schema";

export function vocabSpeechText(v: VocabItem) {
  return v.article ? `${v.article} ${v.de}` : v.de;
}

export function VocabList({ vocab }: { vocab: VocabItem[] }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {vocab.map((v) => (
        <li
          key={`${v.article ?? ""}${v.de}`}
          className="flex items-center gap-2 rounded-md border px-2 py-1.5"
        >
          <PlayButton text={vocabSpeechText(v)} />
          <div className="min-w-0" lang="de">
            {v.article ? (
              <NounChip noun={v.de} article={v.article} plural={v.plural} />
            ) : (
              <span className="font-medium">{v.de}</span>
            )}
            <p className="text-sm text-muted-foreground" lang="en">
              {v.en}
            </p>
          </div>
          <Link
            href={`/dictionary/?q=${encodeURIComponent(v.de)}`}
            className="ml-auto shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label={`Look up ${v.de} in the dictionary`}
            title="Dictionary"
          >
            <BookTextIcon className="size-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
