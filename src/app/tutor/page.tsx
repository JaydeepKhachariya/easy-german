import type { Metadata } from "next";

import { TutorChat } from "@/components/ai/tutor-chat";
import { PageHeader } from "@/components/layout/page-header";
import { GENERAL_CONTEXT } from "@/lib/ai/prompt";

export const metadata: Metadata = {
  title: "AI tutor",
  description: "Ask an AI tutor anything about German A1 grammar, words and sentences.",
};

export default function TutorPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="AI tutor"
        description="Ask about grammar, words or your own sentences, in English or German. In a lesson, the Ask AI button gives the tutor that lesson too."
      />
      <TutorChat
        context={GENERAL_CONTEXT}
        className="h-[calc(100dvh-16rem)] min-h-96 rounded-lg border"
      />
    </div>
  );
}
