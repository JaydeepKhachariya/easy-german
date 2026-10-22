import Link from "next/link";
import { HardDriveIcon } from "lucide-react";

export function DataNote() {
  return (
    <p className="flex items-start gap-2 rounded-lg border bg-muted/40 p-3 text-sm">
      <HardDriveIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>
        Your lessons and progress live only in this browser. Clearing site data or using another
        device means they&apos;re gone. Export a backup now and then in{" "}
        <Link href="/settings/" className="underline underline-offset-2">
          Settings
        </Link>
        .
      </span>
    </p>
  );
}
