"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { CheckIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { VocabItem } from "@/content/schema";
import { conceptKey, db, type LessonSource } from "@/lib/db";
import { addVocabCards, vocabCardId } from "@/lib/progress";

export function AddVocabButton({
  conceptId,
  source,
  vocab,
}: {
  conceptId: string;
  source: LessonSource;
  vocab: VocabItem[];
}) {
  const ids = vocab.map(vocabCardId);
  const inDeck = useLiveQuery(
    async () => (await db.vocab.bulkGet(ids)).filter(Boolean).length,
    [ids.join("|")],
  );
  const all = inDeck !== undefined && inDeck >= new Set(ids).size;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={all}
        onClick={async () => {
          const n = await addVocabCards(vocab, conceptKey(source, conceptId));
          toast.success(
            n
              ? `Added ${n} ${n === 1 ? "card" : "cards"} to your review deck.`
              : "Already in your deck.",
          );
        }}
      >
        {all ? <CheckIcon /> : <PlusIcon />}
        {all ? "In your review deck" : "Add words to my review deck"}
      </Button>
      <span className="text-sm text-muted-foreground">
        Finishing every exercise adds them automatically.
      </span>
    </div>
  );
}
