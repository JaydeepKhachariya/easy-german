import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return <PageHeader title="Settings" description="Theme, audio and your data." />;
}
