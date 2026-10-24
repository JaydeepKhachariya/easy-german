"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { useMounted } from "@/hooks/use-mounted";
import { looksLikeGroqKey, saveAiConfig, useAiConfig } from "@/lib/ai/config";
import { AiError, listModels } from "@/lib/ai/groq";

export function AiSettings() {
  const mounted = useMounted();
  const { apiKey, model } = useAiConfig();
  const [draft, setDraft] = useState("");
  const [show, setShow] = useState(false);
  const [checking, setChecking] = useState(false);
  const [models, setModels] = useState<string[] | null>(null);

  async function check(key: string) {
    setChecking(true);
    try {
      const ids = await listModels(key);
      setModels(ids);
      return ids;
    } catch (e) {
      toast.error(e instanceof AiError ? e.message : "Couldn't check the key.");
      return null;
    } finally {
      setChecking(false);
    }
  }

  async function save() {
    const key = draft.trim();
    if (!(await check(key))) return;
    saveAiConfig({ apiKey: key });
    setDraft("");
    toast.success("Connected to Groq. The AI tutor is ready.");
  }

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      {!apiKey ? (
        <>
          <ol className="ml-5 list-decimal space-y-1 text-sm">
            <li>
              Open{" "}
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                console.groq.com/keys
              </a>{" "}
              and sign in. It&apos;s free and doesn&apos;t ask for a card.
            </li>
            <li>Click &quot;Create API Key&quot; and copy the key. It starts with gsk_.</li>
            <li>Paste it below and press Save.</li>
          </ol>
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
          >
            <Label htmlFor="groq-key">Groq API key</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="groq-key"
                  type={show ? "text" : "password"}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="gsk_..."
                  autoComplete="off"
                  spellCheck={false}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
                  aria-label={show ? "Hide key" : "Show key"}
                >
                  {show ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              <Button type="submit" disabled={!draft.trim() || checking}>
                {checking ? "Checking..." : "Save"}
              </Button>
            </div>
            {draft.trim() && !looksLikeGroqKey(draft) && (
              <p className="text-xs text-warning">
                That doesn&apos;t look like a Groq key (gsk_...).
              </p>
            )}
          </form>
        </>
      ) : (
        <>
          <p className="text-sm">
            Connected with key{" "}
            <code className="rounded bg-muted px-1">
              {apiKey.slice(0, 7)}…{apiKey.slice(-4)}
            </code>
            .
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="ai-model">Model</Label>
            {models ? (
              <NativeSelect
                id="ai-model"
                value={model}
                onChange={(e) => saveAiConfig({ model: e.target.value })}
              >
                <option value="">Automatic (best available)</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </NativeSelect>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <span>{model || "Automatic (best available)"}</span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={checking}
                  onClick={() => void check(apiKey)}
                >
                  {checking ? "Loading..." : "Change"}
                </Button>
              </div>
            )}
          </div>
          <ConfirmDialog
            trigger={<Button variant="outline">Remove key</Button>}
            title="Remove your Groq key?"
            description="The AI tutor stops working on this device until you add a key again."
            confirmLabel="Remove"
            onConfirm={() => {
              saveAiConfig({ apiKey: "", model: "" });
              setModels(null);
            }}
          />
        </>
      )}
      <p className="text-xs text-muted-foreground">
        Your key is stored only in this browser and is not included in backups. Questions you ask
        are sent to Groq. The free plan has a daily limit; if you reach it, the tutor tells you when
        to try again.
      </p>
    </div>
  );
}
