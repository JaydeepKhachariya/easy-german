/**
 * A small client for Groq's OpenAI-compatible API, called straight from the browser with the
 * learner's own key. There is no server: the key is stored on the device (see config.ts) and
 * only ever sent to Groq.
 *
 * If the browser blocks the direct call (CORS), requests go through /groq/..., which
 * vercel.json forwards to api.groq.com. The first route that works is remembered.
 */
import { BASE_PATH } from "@/lib/base-path";

export const GROQ_DIRECT = "https://api.groq.com/openai/v1";
export const GROQ_PROXY = `${BASE_PATH}/groq/openai/v1`;

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type AiErrorKind =
  "no-key" | "auth" | "rate-limit" | "too-long" | "model" | "network" | "server";

export class AiError extends Error {
  constructor(
    public kind: AiErrorKind,
    message: string,
    /** Seconds to wait, from a 429 response. */
    public retryAfter?: number,
  ) {
    super(message);
    this.name = "AiError";
  }
}

/** Turns an HTTP error from Groq into a message a learner can act on. */
export function errorFromResponse(
  status: number,
  body: string,
  retryAfter?: string | null,
): AiError {
  let detail = "";
  try {
    detail = (JSON.parse(body) as { error?: { message?: string } }).error?.message ?? "";
  } catch {
    // not JSON
  }
  const wait = retryAfter ? Math.ceil(Number(retryAfter)) : undefined;
  if (status === 401 || status === 403) {
    return new AiError("auth", "Groq didn't accept your API key. Check it in Settings.");
  }
  if (status === 429) {
    return new AiError(
      "rate-limit",
      `You've reached Groq's free limit for now. Try again in ${wait && wait > 0 ? `${wait} seconds` : "a minute"}.`,
      wait,
    );
  }
  if (status === 413 || /context|too long|too large/i.test(detail)) {
    return new AiError("too-long", "The conversation is too long. Clear it and ask again.");
  }
  if (status === 404 || /model.*(not found|does not exist|decommissioned)/i.test(detail)) {
    return new AiError("model", "That AI model isn't available. Pick another one in Settings.");
  }
  return new AiError(
    "server",
    detail ? `Groq: ${detail}` : `Groq had a problem (${status}). Try again in a moment.`,
  );
}

let preferred: string | null = null;

/** fetch() against Groq, trying the direct route first and the same-site proxy if it's blocked. */
async function groqFetch(path: string, key: string, init: RequestInit = {}): Promise<Response> {
  if (!key.trim()) throw new AiError("no-key", "Add your free Groq API key in Settings first.");
  const routes = preferred ? [preferred] : [GROQ_DIRECT, GROQ_PROXY];
  let lastError: unknown;
  for (const base of routes) {
    try {
      const res = await fetch(`${base}${path}`, {
        ...init,
        headers: { ...init.headers, Authorization: `Bearer ${key.trim()}` },
      });
      // The proxy route doesn't exist outside Vercel (e.g. `pnpm dev`): treat its 404 page as unreachable.
      if (
        base === GROQ_PROXY &&
        res.status === 404 &&
        !res.headers.get("content-type")?.includes("json")
      ) {
        throw new TypeError("no proxy");
      }
      preferred = base;
      if (!res.ok)
        throw errorFromResponse(res.status, await res.text(), res.headers.get("retry-after"));
      return res;
    } catch (e) {
      if (e instanceof AiError) throw e;
      if ((e as Error).name === "AbortError") throw e;
      lastError = e;
    }
  }
  console.warn("Groq request failed", lastError);
  throw new AiError("network", "Couldn't reach Groq. Check your internet connection.");
}

/** Reads a server-sent-events stream and yields each `data:` payload. */
export async function* readSSE(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split(/\r?\n/);
      buffer = done ? "" : lines.pop()!;
      for (const line of lines) {
        if (line.startsWith("data:")) yield line.slice(5).trim();
      }
      if (done) return;
    }
  } finally {
    reader.releaseLock();
  }
}

type StreamChunk = {
  choices?: { delta?: { content?: string | null } }[];
  error?: { message?: string };
};

/** Streams the assistant's reply, yielding text as it arrives. */
export async function* streamChat({
  key,
  model,
  messages,
  signal,
}: {
  key: string;
  model: string;
  messages: ChatMessage[];
  signal?: AbortSignal;
}): AsyncGenerator<string> {
  const res = await groqFetch("/chat/completions", key, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.4,
      max_completion_tokens: 1024,
      // gpt-oss models think before answering; keep that short so replies start quickly.
      ...(model.includes("gpt-oss") ? { reasoning_effort: "low" } : {}),
    }),
  });
  if (!res.body) throw new AiError("server", "Groq sent an empty reply. Try again.");
  for await (const data of readSSE(res.body)) {
    if (data === "[DONE]") return;
    let chunk: StreamChunk;
    try {
      chunk = JSON.parse(data) as StreamChunk;
    } catch {
      continue;
    }
    if (chunk.error) throw new AiError("server", chunk.error.message ?? "Groq stopped the reply.");
    const text = chunk.choices?.[0]?.delta?.content;
    if (text) yield text;
  }
}

/** Models we'd pick for a tutor, best first. The first one the account offers is the default. */
export const PREFERRED_MODELS = [
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-20b",
  "meta-llama/llama-4-maverick-17b-128e-instruct",
  "llama-3.1-8b-instant",
];

const NOT_CHAT = /whisper|tts|guard|embed|orpheus|playai|compound|safeguard|distil/i;

/** Lists the chat models this key can use, preferred ones first. */
export async function listModels(key: string, signal?: AbortSignal): Promise<string[]> {
  const res = await groqFetch("/models", key, { signal });
  const json = (await res.json()) as { data?: { id: string; active?: boolean }[] };
  const ids = (json.data ?? [])
    .filter((m) => m.active !== false && !NOT_CHAT.test(m.id))
    .map((m) => m.id);
  return sortModels(ids);
}

export function sortModels(ids: string[]): string[] {
  const rank = (id: string) => {
    const i = PREFERRED_MODELS.indexOf(id);
    return i === -1 ? PREFERRED_MODELS.length : i;
  };
  return [...new Set(ids)].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}

/** For tests. */
export function resetRoute() {
  preferred = null;
}
