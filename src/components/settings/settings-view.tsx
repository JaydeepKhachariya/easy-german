"use client";

import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  HardDriveIcon,
  MonitorIcon,
  MoonIcon,
  ShieldCheckIcon,
  SunIcon,
  Volume2Icon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { useMounted } from "@/hooks/use-mounted";
import { useSetting } from "@/hooks/use-setting";
import { db } from "@/lib/db";
import { loadGermanVoice, NO_VOICE_HELP, speakGerman } from "@/lib/speech";
import { getPersistState, getUsage, requestPersist, type PersistState } from "@/lib/storage";
import { cn } from "@/lib/utils";

import { exportBackup, ExportBackupButton, ImportBackupDialog } from "./backup-restore";

function ThemeSection() {
  const { theme: rawTheme, setTheme } = useTheme();
  const theme = useMounted() ? rawTheme : undefined;
  const options = [
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
    { value: "system", label: "System", icon: MonitorIcon },
  ];
  return (
    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Theme">
      {options.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          type="button"
          variant="outline"
          role="radio"
          aria-checked={theme === value}
          onClick={() => setTheme(value)}
          className={cn(theme === value && "border-primary bg-accent")}
        >
          <Icon /> {label}
        </Button>
      ))}
    </div>
  );
}

function AudioSection() {
  const [rate, setRate] = useSetting("speechRate");
  const [voice, setVoice] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    loadGermanVoice().then((v) => setVoice(v ? `${v.name} (${v.lang})` : null));
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm">
        {voice === undefined
          ? "Looking for a German voice..."
          : voice
            ? `German voice: ${voice}`
            : "No German voice found."}
      </p>
      {voice === null && <p className="text-sm text-muted-foreground">{NO_VOICE_HELP}</p>}
      <div className="space-y-2">
        <Label htmlFor="rate">Speed: {rate.toFixed(1)}×</Label>
        <input
          id="rate"
          type="range"
          min={0.5}
          max={1.5}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
      <Button
        variant="outline"
        onClick={async () => {
          const s = await speakGerman("Guten Tag! Wie geht es dir?", rate);
          if (s !== "ready") toast.info("No German voice available on this device.");
        }}
      >
        <Volume2Icon /> Test voice
      </Button>
    </div>
  );
}

function ReviewSection() {
  const [direction, setDirection] = useSetting("reviewDirection");
  const [newCards, setNewCards] = useSetting("newCardsPerSession");
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <Label htmlFor="dir">Card side shown first</Label>
        <NativeSelect
          id="dir"
          value={direction}
          onChange={(e) => setDirection(e.target.value as "de-en" | "en-de")}
        >
          <option value="de-en">German first</option>
          <option value="en-de">English first</option>
        </NativeSelect>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="newcards">New cards per session</Label>
        <NativeSelect
          id="newcards"
          value={String(newCards)}
          onChange={(e) => setNewCards(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </NativeSelect>
      </div>
    </div>
  );
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function DataSection() {
  const [persist, setPersist] = useState<PersistState | null>(null);
  const [usage, setUsage] = useState<{ usage: number; quota: number } | null>(null);
  const [lastBackupAt] = useSetting("lastBackupAt");
  const counts = useLiveQuery(async () => {
    const [lessons, cards, progress, attempts] = await Promise.all([
      db.lessons.count(),
      db.vocab.count(),
      db.progress.count(),
      db.attempts.count(),
    ]);
    return { lessons, cards, progress, attempts };
  }, []);

  useEffect(() => {
    getPersistState().then(setPersist);
    getUsage().then(setUsage);
  }, [counts]);

  return (
    <div className="space-y-5">
      <div className="space-y-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm">
        <p className="flex items-center gap-2 font-medium">
          <HardDriveIcon className="size-4" /> Your data lives only in this browser
        </p>
        <p>
          There is no account and no server. Progress, review cards and your own lessons are stored
          in this browser&apos;s storage on this device. Clearing site data, uninstalling the
          browser or using private mode deletes them. Another browser or device starts empty.
        </p>
        <p>
          Export a backup regularly and keep the file somewhere safe. You can import it here later
          or in another browser.
        </p>
      </div>

      {counts && (
        <p className="text-sm text-muted-foreground">
          Stored now: {counts.lessons} lessons, {counts.cards} review cards, {counts.progress}{" "}
          lessons with progress, {counts.attempts} answers
          {usage && usage.usage > 0 && ` (${formatBytes(usage.usage)})`}.{" "}
          {lastBackupAt
            ? `Last backup: ${new Date(lastBackupAt).toLocaleDateString()}.`
            : "No backup yet."}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <ExportBackupButton />
        <ImportBackupDialog />
      </div>

      <div className="space-y-2">
        <p className="flex items-center gap-2 text-sm font-medium">
          <ShieldCheckIcon className="size-4" /> Persistent storage
        </p>
        <p className="text-sm text-muted-foreground">
          {persist === "persisted" &&
            "This browser has agreed to keep your data, even when the device is low on space."}
          {persist === "not-persisted" &&
            "This browser may delete your data if the device runs low on space. Ask it to keep the data below. Some browsers only agree after you've used the site for a while or bookmarked it."}
          {persist === "unsupported" &&
            "This browser doesn't support persistent storage. Backups are your safety net."}
        </p>
        {persist === "not-persisted" && (
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              const s = await requestPersist();
              setPersist(s);
              toast[s === "persisted" ? "success" : "info"](
                s === "persisted"
                  ? "The browser will keep your data."
                  : "The browser said no for now.",
              );
            }}
          >
            Ask the browser to keep my data
          </Button>
        )}
      </div>

      <div className="space-y-2 border-t pt-4">
        <p className="text-sm font-medium">Start over</p>
        <ConfirmDialog
          trigger={<Button variant="destructive">Delete all my data</Button>}
          title="Delete all data in this browser?"
          description="Progress, review cards, your own lessons and settings will be deleted. This can't be undone. A backup is downloaded first, just in case."
          confirmLabel="Download backup and delete"
          onConfirm={async () => {
            await exportBackup();
            await Promise.all(db.tables.map((t) => t.clear()));
            toast.success("All data deleted.");
          }}
        />
      </div>
    </div>
  );
}

export function SettingsView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your data</CardTitle>
          <CardDescription>Backups, restore and storage.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataSection />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeSection />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Audio</CardTitle>
          <CardDescription>Uses your device&apos;s built-in text-to-speech.</CardDescription>
        </CardHeader>
        <CardContent>
          <AudioSection />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vocab review</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewSection />
        </CardContent>
      </Card>
    </div>
  );
}
