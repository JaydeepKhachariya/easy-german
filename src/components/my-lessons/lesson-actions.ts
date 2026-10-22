import { toast } from "sonner";

import type { UserLesson } from "@/lib/db";
import { datedFilename, downloadJson, makeLessonsFile } from "@/lib/import-export";
import { lessonToConcept } from "@/lib/lessons";

export function exportLessons(lessons: UserLesson[], stem: string) {
  if (!lessons.length) {
    toast.info("No lessons to export yet.");
    return;
  }
  downloadJson(datedFilename(stem), makeLessonsFile(lessons.map(lessonToConcept)));
}
