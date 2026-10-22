import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { NewLesson } from "@/components/my-lessons/new-lesson";

export const metadata: Metadata = { title: "New lesson" };

export default function NewLessonPage() {
  return (
    <>
      <PageHeader
        title="New lesson"
        description="Same shape as the core lessons: English first, then German."
      />
      <NewLesson />
    </>
  );
}
