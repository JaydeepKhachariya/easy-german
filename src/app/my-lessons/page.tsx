import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { MyLessonsList } from "@/components/my-lessons/my-lessons-list";

export const metadata: Metadata = { title: "My Lessons" };

export default function MyLessonsPage() {
  return (
    <>
      <PageHeader
        title="My Lessons"
        description="Lessons you write or import. They use the same format as the core track and stay separate from it."
      />
      <MyLessonsList />
    </>
  );
}
