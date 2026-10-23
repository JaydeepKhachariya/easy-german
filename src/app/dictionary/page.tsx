import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { TextSearchIcon } from "lucide-react";

import { DictionaryListPreview, DictionarySearch } from "@/components/dictionary/dictionary-search";
import { PageHeader } from "@/components/layout/page-header";
import { DICTIONARY_INDEX, DICTIONARY_INDEX_URL } from "@/lib/dictionary-file";
import { DICTIONARY_PAGE_SIZE } from "@/lib/dictionary-search";

export const metadata: Metadata = {
  title: "Dictionary",
  description: "German–English A1 dictionary with conjugation and declension tables.",
};

// The first words are built into the HTML, so the list shows before any script or data loads.
const firstEntries = DICTIONARY_INDEX.entries.slice(0, DICTIONARY_PAGE_SIZE);

export default function DictionaryPage() {
  return (
    <>
      <PageHeader
        title="Dictionary"
        description="German–English, with full conjugation and declension. Search in either language."
      />
      <Link
        href="/dictionary/sentence/"
        className="mb-4 flex items-center gap-3 rounded-lg border p-3 text-sm hover:bg-accent"
      >
        <TextSearchIcon className="size-5 shrink-0 text-muted-foreground" />
        <span>
          <span className="font-medium">Sentence helper</span>
          <span className="block text-muted-foreground">
            Paste a whole sentence to see each word, its form and where the verb goes.
          </span>
        </span>
      </Link>
      <Suspense fallback={<DictionaryListPreview entries={firstEntries} />}>
        <DictionarySearch indexUrl={DICTIONARY_INDEX_URL} firstEntries={firstEntries} />
      </Suspense>
    </>
  );
}
