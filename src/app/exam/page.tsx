import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Exam" };

export default function Page() {
  return (
    <PageHeader
      title="Exam"
      description="Goethe Start Deutsch 1: what each part tests and how to prepare."
    />
  );
}
