"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { CheckIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { VocabItem } from "@/content/schema";
import { db } from "@/lib/db";
import { addVocabCards, vocabCardId } from "@/lib/progress";

export function AddWordButton({ item, entryId }: { item: VocabItem; entryId: string }) {
  const id = vocabCardId(item);
  const inDeck = useLiveQuery(async () => !!(await db.vocab.get(id)), [id]);
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={inDeck}
      onClick={async () => {
        try {
          const n = await addVocabCards([item], `dictionary:${entryId}`);
          toast.success(n ? "Added to your review deck." : "Already in your deck.");
        } catch {
          toast.error("Could not save. Storage may be blocked in this browser.");
        }
      }}
    >
      {inDeck ? <CheckIcon /> : <PlusIcon />}
      {inDeck ? "In your review deck" : "Add to my review deck"}
    </Button>
  );
}
