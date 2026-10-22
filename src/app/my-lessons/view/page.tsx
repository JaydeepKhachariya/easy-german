import { Suspense } from "react";
import type { Metadata } from "next";

import { LessonViewer } from "@/components/my-lessons/lesson-viewer";

export const metadata: Metadata = { title: "My lesson" };

// Client-rendered from IndexedDB. useSearchParams needs a Suspense boundary in a static export.
export default function ViewLessonPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
      <LessonViewer />
    </Suspense>
  );
}
