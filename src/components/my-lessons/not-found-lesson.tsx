import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LessonNotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Lesson not found</h1>
      <p className="text-muted-foreground">
        It may have been deleted, or it was made in another browser. Lessons are stored per browser.
      </p>
      <Button asChild>
        <Link href="/my-lessons/">Back to My Lessons</Link>
      </Button>
    </div>
  );
}
