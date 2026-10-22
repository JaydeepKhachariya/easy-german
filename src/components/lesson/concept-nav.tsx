import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export type NavTarget = { href: string; titleEn: string; titleDe: string } | null;

export function ConceptNav({ prev, next }: { prev: NavTarget; next: NavTarget }) {
  return (
    <nav className="grid gap-3 sm:grid-cols-2" aria-label="Previous and next concept">
      {prev ? (
        <Link href={prev.href} className="group rounded-lg border p-3 hover:bg-accent">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeftIcon className="size-3" /> Previous
          </span>
          <span className="font-medium">{prev.titleEn}</span>
          <span className="block text-sm text-muted-foreground" lang="de">
            {prev.titleDe}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="group rounded-lg border p-3 text-right hover:bg-accent">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            Next <ArrowRightIcon className="size-3" />
          </span>
          <span className="font-medium">{next.titleEn}</span>
          <span className="block text-sm text-muted-foreground" lang="de">
            {next.titleDe}
          </span>
        </Link>
      )}
    </nav>
  );
}
