import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "New lesson" };

export default function Page() {
  return (
    <PageHeader
      title="New lesson"
      description="Build a lesson with the same shape as the core ones."
    />
  );
}
