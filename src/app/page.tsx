import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4 pt-4">
        <p className="text-sm font-medium text-muted-foreground">German A1 · Start Deutsch 1</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Learn German from the English you already know.
        </h1>
        <p className="max-w-prose text-muted-foreground">
          Every lesson starts with how English does it, then shows what German keeps and what it
          changes. Exercises check your answers as you go. Your progress stays in this browser.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="lg">
            <Link href="/learn/">
              Start learning <ArrowRightIcon />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/exam/">Exam track</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
