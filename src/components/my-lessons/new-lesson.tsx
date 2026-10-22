"use client";

import { useState } from "react";

import { LessonEditor } from "@/components/editor/lesson-editor";
import { lessonTemplate } from "@/lib/lessons";

export function NewLesson() {
  // Created once on the client so the random id doesn't differ between server HTML and hydration.
  const [initial] = useState(lessonTemplate);
  return <LessonEditor initial={initial} isNew />;
}
