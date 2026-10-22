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
        </li>
      ))}
    </ul>
  );
}
