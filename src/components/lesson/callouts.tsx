import { CircleAlertIcon, HandshakeIcon, LanguagesIcon, TriangleAlertIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Callout({
  title,
  icon,
  tone,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  tone: "good" | "warn" | "info";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        tone === "good" && "border-success/40 bg-success/5",
        tone === "warn" && "border-warning/40 bg-warning/5",
        tone === "info" && "border-der/30 bg-der-bg/40",
      )}
    >
      <p className="mb-2 flex items-center gap-2 font-medium">
        {icon}
        {title}
      </p>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5 text-sm leading-6">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

export function HelpsMisleads({ helps, misleads }: { helps: string[]; misleads: string[] }) {
  if (!helps.length && !misleads.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {helps.length > 0 && (
        <Callout
          title="Where English helps"
          tone="good"
          icon={<HandshakeIcon className="size-4 text-success" />}
        >
          <Bullets items={helps} />
        </Callout>
      )}
      {misleads.length > 0 && (
        <Callout
          title="Where English misleads"
          tone="warn"
          icon={<TriangleAlertIcon className="size-4 text-warning" />}
        >
          <Bullets items={misleads} />
        </Callout>
      )}
    </div>
  );
}

export function HindiHint({ text }: { text: string }) {
  return (
    <Callout title="Hindi hint" tone="info" icon={<LanguagesIcon className="size-4 text-der" />}>
      <p className="text-sm leading-6">{text}</p>
    </Callout>
  );
}

export function MistakesBox({
  mistakes,
}: {
  mistakes: { wrong: string; right: string; why: string }[];
}) {
  return (
    <ul className="space-y-3">
      {mistakes.map((m, i) => (
        <li key={i} className="rounded-lg border p-3">
          <p className="flex items-start gap-2" lang="de">
            <CircleAlertIcon className="mt-1 size-4 shrink-0 text-destructive" aria-hidden />
            <span>
              <span className="sr-only">Wrong: </span>
              <span className="text-destructive line-through decoration-destructive/60">
                {m.wrong}
              </span>
            </span>
          </p>
          <p className="mt-1 ml-6 font-medium" lang="de">
            <span className="sr-only">Right: </span>
            {m.right}
          </p>
          <p className="mt-1 ml-6 text-sm text-muted-foreground">{m.why}</p>
        </li>
      ))}
    </ul>
  );
}
