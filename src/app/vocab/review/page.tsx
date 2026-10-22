import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Vocab review" };

export default function Page() {
  return (
    <PageHeader
      title="Vocab review"
      description="Cards from lessons you finished, spaced so you see them before you forget."
    />
  );
}
