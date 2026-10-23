"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { insertAtCaret, UmlautBar } from "@/components/exercise/umlaut-bar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { ArticleTag } from "@/components/visualizers/article";
import { POS, POS_LABELS, type Pos } from "@/content/dictionary/schema";
import type { DictionaryIndex, IndexEntry } from "@/lib/dictionary-index";
import { createDictionarySearch, DICTIONARY_PAGE_SIZE } from "@/lib/dictionary-search";
import { loadDictionaryIndex } from "@/lib/load-dictionary";

function Headword({ e }: { e: IndexEntry }) {
  if (e.article) {
    return (
      <span className="inline-flex items-center gap-1.5" lang="de">
        <ArticleTag gender={e.article} className="text-xs" />
        <span className="font-medium">{e.h.replace(/^(der|die|das) /, "")}</span>
      </span>
    );
  }
  return (
    <span className="font-medium" lang="de">
      {e.h}
    </span>
  );
}

/** The first words as plain HTML, shown while the page's script loads. */
export function DictionaryListPreview({ entries }: { entries: IndexEntry[] }) {
  return (
    <div className="space-y-4">
      <div className="h-11 rounded-md border bg-muted/40" aria-hidden />
      <ul className="divide-y rounded-lg border">
        {entries.map((e) => (
          <Row key={e.id} e={e} />
        ))}
      </ul>
    </div>
  );
}

function Row({ e, reason }: { e: IndexEntry; reason?: string }) {
  return (
    <li>
      <Link
        href={`/dictionary/${e.id}/`}
        className="flex items-start justify-between gap-3 px-3 py-2.5 hover:bg-accent"
      >
        <span className="min-w-0">
          <Headword e={e} />
          <span className="block truncate text-sm text-muted-foreground">{e.en.join("; ")}</span>
          {reason && <span className="block text-xs text-der">{reason}</span>}
        </span>
        <span className="flex shrink-0 gap-1">
          <Badge variant="outline" className="text-xs">
            {POS_LABELS[e.pos]}
          </Badge>
        </span>
      </Link>
    </li>
  );
}

/**
 * Calls onVisible when the element is near the viewport. `step` re-checks after each page,
 * since an observer only reports changes and a tall screen may still show the element.
 */
function useNearViewport(onVisible: () => void, active: boolean, step: number) {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useRef(onVisible);
  useEffect(() => {
    callback.current = onVisible;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && callback.current(),
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active, step]);
  return ref;
}

export function DictionarySearch({
  indexUrl,
  firstEntries,
}: {
  indexUrl: string;
  /** Rendered into the HTML so the list shows before the full index has loaded. */
  firstEntries: IndexEntry[];
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [pos, setPos] = useState<Pos | "">("");
  const [index, setIndex] = useState<DictionaryIndex | null>(null);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDictionaryIndex(indexUrl).then(setIndex, () => setError(true));
  }, [indexUrl]);

  // Keep ?q= in the address bar so a search can be shared or bookmarked.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [query]);

  const search = useMemo(() => (index ? createDictionarySearch(index) : null), [index]);
  const results = useMemo(() => {
    if (!index)
      return query.trim() || pos ? [] : firstEntries.map((entry) => ({ entry, reason: "" }));
    if (query.trim() && search) {
      return search(query, 120).filter((h) => !pos || h.entry.pos === pos);
    }
    return index.entries
      .filter((e) => !pos || e.pos === pos)
      .map((entry) => ({ entry, reason: "" }));
  }, [index, search, query, pos, firstEntries]);

  // Render the list a page at a time. The count starts over when the search changes.
  const listKey = `${query}|${pos}`;
  const [shown, setShown] = useState({ key: listKey, n: DICTIONARY_PAGE_SIZE });
  const visible = shown.key === listKey ? shown.n : DICTIONARY_PAGE_SIZE;
  const hasMore = visible < results.length;
  const sentinel = useNearViewport(
    () => setShown({ key: listKey, n: visible + DICTIONARY_PAGE_SIZE }),
    hasMore,
    visible,
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="German or English: ging, Häuser, to go..."
            aria-label="Search the dictionary"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="h-11 pl-9 text-base"
            autoFocus
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <UmlautBar onInsert={(c) => insertAtCaret(inputRef.current, c, setQuery)} />
          <NativeSelect
            aria-label="Word type"
            value={pos}
            onChange={(e) => setPos(e.target.value as Pos | "")}
            className="w-40"
          >
            <option value="">All word types</option>
            {POS.map((p) => (
              <option key={p} value={p}>
                {POS_LABELS[p]}
              </option>
            ))}
          </NativeSelect>
        </div>
        <p className="text-xs text-muted-foreground">
          Type any form: &quot;ging&quot; finds gehen, &quot;Häusern&quot; finds Haus, &quot;stehe
          auf&quot; finds aufstehen. Umlauts are optional.
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive">
          The dictionary could not load. Check your connection and reload.
        </p>
      )}
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {!index
          ? error
            ? ""
            : "Loading the dictionary..."
          : query.trim()
            ? results.length
              ? `${results.length} ${results.length === 1 ? "result" : "results"}`
              : "No results. Try the infinitive or the singular."
            : `${results.length} words`}
      </p>
      {results.length > 0 && (
        <ul className="divide-y rounded-lg border">
          {results.slice(0, visible).map((r) => (
            <Row key={r.entry.id} e={r.entry} reason={r.reason} />
          ))}
        </ul>
      )}
      {hasMore && (
        <div ref={sentinel} className="py-4 text-center text-sm text-muted-foreground">
          Loading more words...
        </div>
      )}
    </div>
  );
}
