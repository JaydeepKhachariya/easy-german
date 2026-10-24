import { getConcept } from "@/content";

import {
  AiError,
  errorFromResponse,
  GROQ_DIRECT,
  GROQ_PROXY,
  listModels,
  readSSE,
  resetRoute,
  sortModels,
} from "./groq";
import { parseChatMarkdown } from "./markdown";
import { buildMessages, conceptContext, GENERAL_CONTEXT, SYSTEM_PROMPT } from "./prompt";

const stream = (...chunks: string[]) =>
  new ReadableStream<Uint8Array>({
    start(c) {
      for (const s of chunks) c.enqueue(new TextEncoder().encode(s));
      c.close();
    },
  });

describe("readSSE", () => {
  it("yields data lines, even when split across chunks", async () => {
    const out: string[] = [];
    for await (const d of readSSE(stream('data: {"a"', ":1}\n\ndata: [DONE]\n"))) out.push(d);
    expect(out).toEqual(['{"a":1}', "[DONE]"]);
  });
});

describe("errorFromResponse", () => {
  it("explains auth and rate limits", () => {
    expect(errorFromResponse(401, "").kind).toBe("auth");
    const e = errorFromResponse(429, "", "12.4");
    expect(e).toBeInstanceOf(AiError);
    expect(e.kind).toBe("rate-limit");
    expect(e.message).toContain("13 seconds");
  });

  it("passes on Groq's own message for other errors", () => {
    const e = errorFromResponse(400, JSON.stringify({ error: { message: "bad thing" } }));
    expect(e.message).toBe("Groq: bad thing");
    expect(errorFromResponse(404, "").kind).toBe("model");
  });
});

describe("sortModels", () => {
  it("puts the preferred tutor models first", () => {
    expect(sortModels(["zeta", "llama-3.1-8b-instant", "openai/gpt-oss-120b", "alpha"])).toEqual([
      "openai/gpt-oss-120b",
      "llama-3.1-8b-instant",
      "alpha",
      "zeta",
    ]);
  });
});

describe("prompts", () => {
  it("builds a short lesson context", () => {
    const ctx = conceptContext(getConcept("modal-verbs")!);
    expect(ctx.id).toBe("lesson:modal-verbs");
    expect(ctx.text).toContain("Lesson:");
    expect(ctx.text.length).toBeLessThanOrEqual(3500);
  });

  it("adds the context to the system prompt and trims old turns", () => {
    const ctx = conceptContext(getConcept("modal-verbs")!);
    const history = Array.from({ length: 30 }, (_, i) => ({
      role: i % 2 ? ("assistant" as const) : ("user" as const),
      content: `turn ${i}`,
    }));
    const msgs = buildMessages(ctx, history);
    expect(msgs[0]!.role).toBe("system");
    expect(msgs[0]!.content).toContain(ctx.text);
    expect(msgs[1]!.role).toBe("user");
    expect(msgs.at(-1)!.content).toBe("turn 29");
    expect(msgs.length).toBeLessThanOrEqual(13);
  });

  it("uses only the system prompt for general questions", () => {
    const msgs = buildMessages(GENERAL_CONTEXT, [{ role: "user", content: "Hallo" }]);
    expect(msgs[0]!.content).toBe(SYSTEM_PROMPT);
  });
});

describe("parseChatMarkdown", () => {
  it("parses the common shapes models write", () => {
    const blocks = parseChatMarkdown(
      [
        "### Modal verbs",
        "Use **können** for *can* and `kann` for ich.",
        "",
        "- ich kann",
        "- du kannst",
        "",
        "| Person | Form |",
        "|---|---|",
        "| ich | kann |",
        "",
        "```",
        "Ich kann schwimmen.",
        "```",
      ].join("\n"),
    );
    expect(blocks.map((b) => b.type)).toEqual(["h", "p", "ul", "table", "code"]);
    const p = blocks[1] as Extract<(typeof blocks)[number], { type: "p" }>;
    expect(p.content.filter((i) => i.bold || i.italic || i.code).map((i) => i.text)).toEqual([
      "können",
      "can",
      "kann",
    ]);
  });

  it("keeps HTML as plain text", () => {
    const [b] = parseChatMarkdown("<script>alert(1)</script>");
    expect(b).toEqual({ type: "p", content: [{ text: "<script>alert(1)</script>" }] });
  });
});

describe("route fallback", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    resetRoute();
  });

  it("uses the same-site proxy when the direct call is blocked", async () => {
    const urls: string[] = [];
    vi.stubGlobal("fetch", async (url: string) => {
      urls.push(url);
      if (url.startsWith(GROQ_DIRECT)) throw new TypeError("Failed to fetch");
      return new Response(JSON.stringify({ data: [{ id: "openai/gpt-oss-20b" }] }), {
        headers: { "content-type": "application/json" },
      });
    });
    expect(await listModels("gsk_x")).toEqual(["openai/gpt-oss-20b"]);
    expect(urls).toEqual([`${GROQ_DIRECT}/models`, `${GROQ_PROXY}/models`]);
    // Remembered for the next call.
    await listModels("gsk_x");
    expect(urls.at(-1)).toBe(`${GROQ_PROXY}/models`);
  });

  it("says when there's no key", async () => {
    await expect(listModels(" ")).rejects.toMatchObject({ kind: "no-key" });
  });
});
