"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftRightIcon, PartyPopperIcon } from "lucide-react";

import { PlayButton } from "@/components/audio/play-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NounChip } from "@/components/visualizers/article";
import { useSetting } from "@/hooks/use-setting";
import { db, type VocabCard } from "@/lib/db";
import { buildQueue, nextDueLabel, rateCard } from "@/lib/review-queue";
import { previewInterval, type Rating } from "@/lib/srs";

const RATINGS: {
  rating: Rating;
  label: string;
  variant: "destructive" | "outline" | "default" | "secondary";
}[] = [
  { rating: "again", label: "Again", variant: "destructive" },
  { rating: "hard", label: "Hard", variant: "outline" },
  { rating: "good", label: "Good", variant: "default" },
  { rating: "easy", label: "Easy", variant: "secondary" },
];

function GermanSide({ card }: { card: VocabCard }) {
  return (
    <div className="flex items-center justify-center gap-1 text-2xl" lang="de">
      {card.article ? (
        <NounChip
          noun={card.de}
          article={card.article}
          plural={card.plural}
          className="justify-center"
        />
      ) : (
        <span className="font-medium">{card.de}</span>
      )}
      <PlayButton text={card.article ? `${card.article} ${card.de}` : card.de} />
    </div>
  );
}

export function ReviewSession() {
  const [direction, setDirection] = useSetting("reviewDirection");
  const [newLimit] = useSetting("newCardsPerSession");
  const [queue, setQueue] = useState<VocabCard[] | null>(null);
  const [all, setAll] = useState<VocabCard[]>([]);
  const [shown, setShown] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [startSize, setStartSize] = useState(0);
  // Session clock: set when the deck loads and after each rating, so render stays pure.
  const [now, setNow] = useState(0);

  useEffect(() => {
    let cancelled = false;
    db.vocab
      .toArray()
      .then((cards) => {
        if (cancelled) return;
        const t = Date.now();
        setNow(t);
        const q = buildQueue(cards, t, newLimit);
        setAll(cards);
        setQueue(q);
        setStartSize(q.length);
      })
      .catch(() => setQueue([]));
    return () => {
      cancelled = true;
    };
    // Build the queue once per visit. Changing the limit mid-session shouldn't reshuffle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (queue === null) return <p className="text-muted-foreground">Loading your deck...</p>;

  if (all.length === 0) {
    return (
      <Card>
        <CardContent className="space-y-3">
          <p>Your review deck is empty.</p>
          <p className="text-sm text-muted-foreground">
            Finish a lesson, or press &quot;Add words to my review deck&quot; at the bottom of any
            lesson.
          </p>
          <Button asChild>
            <Link href="/learn/">Go to lessons</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const card = queue[0];

  if (!card) {
    const next = nextDueLabel(all, now);
    return (
      <Card>
        <CardContent className="space-y-3 text-center">
          <PartyPopperIcon className="mx-auto size-8 text-success" aria-hidden />
          <p className="font-medium">
            {doneCount
              ? `Done. You reviewed ${doneCount} ${doneCount === 1 ? "card" : "cards"}.`
              : "Nothing is due right now."}
          </p>
          {next && <p className="text-sm text-muted-foreground">Next card is due {next}.</p>}
          <Button asChild variant="outline">
            <Link href="/dashboard/">Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  async function rate(rating: Rating) {
    const updated = await rateCard(card!, rating);
    setNow(updated.lastReviewed ?? now);
    setAll((cards) => cards.map((c) => (c.id === updated.id ? updated : c)));
    setShown(false);
    setDoneCount((n) => n + 1);
    // A failed card comes back at the end of this session.
    setQueue((q) => (q ? [...q.slice(1), ...(rating === "again" ? [updated] : [])] : q));
  }

  const germanFirst = direction === "de-en";
  const left = queue.length;

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
        <span className="tabular-nums">{left} left</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setDirection(germanFirst ? "en-de" : "de-en")}
        >
          <ArrowLeftRightIcon /> {germanFirst ? "German first" : "English first"}
        </Button>
      </div>
      <Progress
        value={
          startSize ? Math.min(100, (doneCount / Math.max(startSize, doneCount + left)) * 100) : 0
        }
        aria-label="Session progress"
      />

      <Card className="min-h-56">
        <CardContent className="flex min-h-48 flex-col items-center justify-center gap-4 text-center">
          {germanFirst ? (
            <GermanSide card={card} />
          ) : (
            <p className="text-2xl font-medium">{card.en}</p>
          )}
          {shown && (
            <>
              <div className="h-px w-16 bg-border" />
              {germanFirst ? <p className="text-xl">{card.en}</p> : <GermanSide card={card} />}
            </>
          )}
        </CardContent>
      </Card>

      {!shown ? (
        <Button type="button" className="w-full" size="lg" onClick={() => setShown(true)}>
          Show answer
        </Button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {RATINGS.map(({ rating, label, variant }) => (
            <Button
              key={rating}
              type="button"
              variant={variant}
              className="h-auto flex-col gap-0.5 py-2"
              onClick={() => rate(rating)}
            >
              <span>{label}</span>
              <span className="text-[11px] font-normal opacity-80">
                {previewInterval(card, rating, now)}
              </span>
            </Button>
          ))}
        </div>
      )}
      <p className="text-center text-xs text-muted-foreground">
        Be honest. &quot;Again&quot; brings the card back later in this session.
      </p>
    </div>
  );
}
