import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ReviewSession } from "@/components/review/review-session";

export const metadata: Metadata = { title: "Vocab review" };

export default function ReviewPage() {
  return (
    <>
      <PageHeader
        title="Vocab review"
        description="Cards from your lessons, spaced so you see each one just before you'd forget it."
      />
      <ReviewSession />
    </>
  );
}
