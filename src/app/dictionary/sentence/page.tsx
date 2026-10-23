import { Suspense } from "react";
import type { Metadata } from "next";

import { SentenceHelper } from "@/components/dictionary/sentence-helper";
import { PageHeader } from "@/components/layout/page-header";
import { DICTIONARY_INDEX_URL } from "@/lib/dictionary-file";

export const metadata: Metadata = {
  title: "Sentence helper",
  description: "Break a German sentence into words: meaning, form and word order.",
};

export default function SentenceHelperPage() {
  return (
    <>
      <PageHeader
        title="Sentence helper"
        description="Paste a German sentence to see what each word means, which form it is, and where the verb parts go. It works offline from the dictionary, so it explains sentences rather than translating them."
      />
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <SentenceHelper indexUrl={DICTIONARY_INDEX_URL} />
      </Suspense>
    </>
  );
}
