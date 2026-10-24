/**
 * Parses the Markdown that chat models write into simple blocks, rendered as React elements
 * (never as HTML). Supports headings, paragraphs, lists, tables, code blocks, quotes, and
 * **bold**, *italic* and `code` inline. Anything else stays plain text.
 */

export type ChatInline = { text: string; bold?: boolean; italic?: boolean; code?: boolean };
export type ChatBlock =
  | { type: "h"; content: ChatInline[] }
  | { type: "p"; content: ChatInline[] }
  | { type: "quote"; content: ChatInline[] }
  | { type: "ul" | "ol"; items: ChatInline[][] }
  | { type: "table"; head: ChatInline[][]; rows: ChatInline[][][] }
  | { type: "code"; text: string };

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*)/g;

export function parseChatInline(s: string): ChatInline[] {
  const out: ChatInline[] = [];
  for (const part of s.split(INLINE)) {
    if (!part) continue;
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      out.push({ text: part.slice(1, -1), code: true });
    } else if (part.length > 4 && /^(\*\*|__).*(\*\*|__)$/.test(part)) {
      out.push({ text: part.slice(2, -2), bold: true });
    } else if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      out.push({ text: part.slice(1, -1), italic: true });
    } else {
      out.push({ text: part });
    }
  }
  return out;
}

const HEADING = /^#{1,6}\s+/;
const BULLET = /^\s*[-*•+]\s+/;
const NUMBER = /^\s*\d+[.)]\s+/;
const QUOTE = /^\s*>\s?/;
const TABLE_ROW = /^\s*\|.*\|\s*$/;
const TABLE_RULE = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => parseChatInline(c.trim()));

export function parseChatMarkdown(src: string): ChatBlock[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: ChatBlock[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ type: "p", content: parseChatInline(para.join(" ")) });
    para = [];
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    if (!line.trim()) {
      flush();
      i++;
    } else if (line.trim().startsWith("```")) {
      flush();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.trim().startsWith("```")) code.push(lines[i++]!);
      i++; // closing fence (or end of a reply that is still streaming)
      blocks.push({ type: "code", text: code.join("\n") });
    } else if (HEADING.test(line)) {
      flush();
      blocks.push({ type: "h", content: parseChatInline(line.replace(HEADING, "").trim()) });
      i++;
    } else if (TABLE_ROW.test(line) && TABLE_RULE.test(lines[i + 1] ?? "")) {
      flush();
      const head = cells(line);
      i += 2;
      const rows: ChatInline[][][] = [];
      while (i < lines.length && TABLE_ROW.test(lines[i]!)) rows.push(cells(lines[i++]!));
      blocks.push({ type: "table", head, rows });
    } else if (QUOTE.test(line)) {
      flush();
      const quote: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i]!)) quote.push(lines[i++]!.replace(QUOTE, ""));
      blocks.push({ type: "quote", content: parseChatInline(quote.join(" ")) });
    } else if (BULLET.test(line) || NUMBER.test(line)) {
      flush();
      const kind = BULLET.test(line) ? "ul" : "ol";
      const re = kind === "ul" ? BULLET : NUMBER;
      const items: ChatInline[][] = [];
      while (i < lines.length && re.test(lines[i]!)) {
        items.push(parseChatInline(lines[i++]!.replace(re, "").trim()));
      }
      blocks.push({ type: kind, items });
    } else {
      para.push(line.trim());
      i++;
    }
  }
  flush();
  return blocks;
}
