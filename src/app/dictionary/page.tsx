import { Suspense } from "react";
import type { Metadata } from "next";

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
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <DictionarySearch />
      </Suspense>
    </>
  );
}
