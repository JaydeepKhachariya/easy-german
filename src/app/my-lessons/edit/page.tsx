import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { LessonEditLoader } from "@/components/my-lessons/lesson-edit-loader";

export const metadata: Metadata = { title: "Edit lesson" };

export default function EditLessonPage() {
  return (
    <>
      <PageHeader title="Edit lesson" />
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <LessonEditLoader />
      </Suspense>
    </>
  );
}
