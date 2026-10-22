import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Learn" };

export default function Page() {
  return <PageHeader title="Learn" description="The core A1 track, in order." />;
}
