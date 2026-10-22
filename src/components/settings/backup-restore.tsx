"use client";

import { useState } from "react";
import { DownloadIcon, FileUpIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setSetting } from "@/lib/settings";
import {
  datedFilename,
  downloadJson,
  ImportError,
  makeBackup,
  parseBackupFile,
  readJson,
  restoreBackup,
  type ParsedBackup,
} from "@/lib/import-export";
import { cn } from "@/lib/utils";

export async function exportBackup() {
  downloadJson(datedFilename("deutsch-bridge-backup"), await makeBackup());
  await setSetting("lastBackupAt", Date.now());
  toast.success("Backup downloaded.");
}

export function ExportBackupButton() {
  return (
    <Button onClick={() => exportBackup().catch(() => toast.error("Could not create the backup."))}>
      <DownloadIcon /> Export all my data
    </Button>
  );
}

const TABLE_LABELS: Record<keyof ParsedBackup["rows"], string> = {
  lessons: "lessons",
  progress: "lesson progress rows",
  attempts: "exercise answers",
  vocab: "review cards",
  settings: "settings",
};

export function ImportBackupDialog() {
  const [open, setOpen] = useState(false);
  const [backup, setBackup] = useState<ParsedBackup | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [mode, setMode] = useState<"merge" | "replace">("merge");
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setErrors([]);
    setBackup(null);
    try {
      setBackup(parseBackupFile(readJson(await file.text())));
    } catch (e) {
      setErrors(e instanceof ImportError ? e.messages : ["Could not read this file."]);
    }
  }

  async function restore() {
    if (!backup) return;
    setBusy(true);
    try {
      await restoreBackup(backup, mode);
      toast.success(mode === "replace" ? "Backup restored." : "Backup merged.");
      setOpen(false);
      setBackup(null);
    } catch {
      toast.error("Restore failed. Nothing was changed.");
    } finally {
      setBusy(false);
    }
  }

  const skippedTotal = backup ? Object.values(backup.skipped).reduce((a, b) => a + b, 0) : 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setBackup(null);
          setErrors([]);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUpIcon /> Import backup
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import backup</DialogTitle>
          <DialogDescription>
            Pick a backup file. You&apos;ll see what&apos;s in it before anything changes.
          </DialogDescription>
        </DialogHeader>
        <input
          type="file"
          accept="application/json,.json"
          aria-label="Backup file"
          onChange={(e) => onFile(e.target.files?.[0])}
          className="block w-full cursor-pointer rounded-md border p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1"
        />
        {errors.length > 0 && (
          <div
            role="alert"
            className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm"
          >
            <p className="font-medium">This file can&apos;t be restored.</p>
            <ul className="mt-1 ml-5 list-disc">
              {errors.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}
        {backup && (
          <div className="space-y-3 text-sm">
            <p>
              Backup from{" "}
              {backup.exportedAt ? new Date(backup.exportedAt).toLocaleString() : "an unknown date"}
              :
            </p>
            <ul className="ml-5 list-disc">
              {(Object.keys(TABLE_LABELS) as (keyof ParsedBackup["rows"])[]).map((k) => (
                <li key={k}>
                  {backup.rows[k].length} {TABLE_LABELS[k]}
                  {backup.skipped[k] > 0 && (
                    <span className="text-destructive">
                      {" "}
                      ({backup.skipped[k]} damaged, will be skipped)
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {skippedTotal > 0 && (
              <p className="text-muted-foreground">
                Damaged rows are left out. Everything else is restored.
              </p>
            )}
            <div className="grid gap-2" role="radiogroup" aria-label="Restore mode">
              {(
                [
                  [
                    "merge",
                    "Merge",
                    "Keep what's in this browser and add the backup. Where both have the same item, the newer one wins.",
                  ],
                  [
                    "replace",
                    "Replace",
                    "Delete everything in this browser first, then restore the backup exactly.",
                  ],
                ] as const
              ).map(([value, label, desc]) => (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer gap-3 rounded-md border p-3",
                    mode === value && "border-primary bg-accent",
                  )}
                >
                  <input
                    type="radio"
                    name="restore-mode"
                    className="mt-1 accent-primary"
                    checked={mode === value}
                    onChange={() => setMode(value)}
                  />
                  <span>
                    <span className="font-medium">{label}</span>
                    <span className="block text-muted-foreground">{desc}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            disabled={!backup || busy}
            variant={mode === "replace" ? "destructive" : "default"}
            onClick={restore}
          >
            {mode === "replace" ? "Replace my data" : "Merge into my data"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
