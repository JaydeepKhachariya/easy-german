import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = { title: "My lesson" };

export default function Page() {
  return <PageHeader title="My lesson" description="" />;
}
