import type { Metadata } from "next";

import { DashboardView } from "@/components/dashboard/dashboard-view";
import { PageHeader } from "@/components/layout/page-header";
import { getCatalog } from "@/content";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="What you finished, what is in progress, and where you make mistakes."
      />
      <DashboardView catalog={getCatalog()} />
    </>
  );
}
