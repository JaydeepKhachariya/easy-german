import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "My Lessons" };

export default function Page() {
  return (
    <PageHeader
      title="My Lessons"
      description="Lessons you write yourself. Stored only in this browser."
    />
  );
}
