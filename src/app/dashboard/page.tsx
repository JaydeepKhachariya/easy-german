import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Dashboard" };

export default function Page() {
  return (
    <PageHeader
      title="Dashboard"
      description="What you finished, what is in progress, and where you make mistakes."
    />
  );
}
