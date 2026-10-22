"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpenIcon, LayersIcon, NotebookPenIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { BASE_PATH } from "@/lib/base-path";
import { db } from "@/lib/db";
import type { SearchDoc, SearchKind } from "@/lib/search";

type Searcher = (q: string, limit?: number) => SearchDoc[];

const GROUPS: { kind: SearchKind; label: string; icon: typeof BookOpenIcon }[] = [
  { kind: "concept", label: "Lessons", icon: BookOpenIcon },
  { kind: "user-lesson", label: "My lessons", icon: NotebookPenIcon },
  { kind: "vocab", label: "Vocabulary", icon: LayersIcon },
];

/** Loads Fuse.js, the prebuilt core index and the learner's own data only when opened. */
async function loadSearcher(): Promise<Searcher> {
  const [{ createSearcher, conceptToDoc, vocabToDoc, dedupe }, coreDocs, lessons, deck] =
    await Promise.all([
      import("@/lib/search"),
      fetch(`${BASE_PATH}/search-index.json`).then((r) =>
        r.ok ? (r.json() as Promise<SearchDoc[]>) : [],
      ),
      db.lessons.toArray().catch(() => []),
      db.vocab.toArray().catch(() => []),
    ]);
  const userDocs = lessons.map((l) =>
    conceptToDoc(l, "user-lesson", `/my-lessons/view/?id=${encodeURIComponent(l.id)}`),
  );
  const deckDocs = deck.map((c) => vocabToDoc(c, "/vocab/review/", "in your deck"));
  return createSearcher(dedupe([...coreDocs, ...userDocs, ...deckDocs]));
}

export function SearchButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searcher, setSearcher] = useState<Searcher | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    // Rebuild each time the dialog opens so new lessons and cards are included.
    let cancelled = false;
    loadSearcher()
      .then((s) => !cancelled && setSearcher(() => s))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [open]);

  const results = useMemo(() => (searcher ? searcher(query, 30) : []), [searcher, query]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search (Ctrl+K)"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search lessons, your own lessons and vocabulary"
      >
        <CommandInput
          placeholder="Search lessons and words..."
          value={query}
          onValueChange={setQuery}
          autoCapitalize="off"
          autoCorrect="off"
        />
        <CommandList>
          {query.trim().length >= 2 && (
            <CommandEmpty>
              {error ? "Search could not load." : searcher ? "No results." : "Loading..."}
            </CommandEmpty>
          )}
          {query.trim().length < 2 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Type at least two letters. Umlauts are optional: &quot;moechte&quot; finds
              &quot;möchte&quot;.
            </p>
          )}
          {GROUPS.map(({ kind, label, icon: Icon }) => {
            const items = results.filter((r) => r.kind === kind);
            if (!items.length) return null;
            return (
              <CommandGroup key={kind} heading={label}>
                {items.map((r) => (
                  <CommandItem key={r.id} value={r.id} onSelect={() => go(r.href)}>
                    <Icon />
                    <span className="min-w-0">
                      <span className="block truncate">{r.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {r.subtitle}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
