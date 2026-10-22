import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { TextSearchIcon } from "lucide-react";

import { DictionarySearch } from "@/components/dictionary/dictionary-search";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Dictionary",
  description: "German–English A1 dictionary with conjugation and declension tables.",
};

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
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <DictionarySearch />
      </Suspense>
    </>
  );
}
