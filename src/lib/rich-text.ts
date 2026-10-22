/**
 * A tiny, safe text format for explanation fields (core and user lessons):
 * - blank line = new paragraph
 * - lines starting with "- " = bullet list, "1. " = numbered list
 * - **bold** and *italic* inline
 * Everything else is plain text. No HTML is ever produced from strings, so imported
 * lessons can't inject markup or scripts.
 */

export type Inline = { text: string; bold?: boolean; italic?: boolean };
export type Block = { type: "p"; content: Inline[] } | { type: "ul" | "ol"; items: Inline[][] };

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;

export function parseInline(s: string): Inline[] {
  const out: Inline[] = [];
  for (const part of s.split(INLINE)) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      out.push({ text: part.slice(2, -2), bold: true });
    } else if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      out.push({ text: part.slice(1, -1), italic: true });
    } else {
      out.push({ text: part });
    }
  }
  return out;
}

const BULLET = /^\s*[-•]\s+/;
const NUMBER = /^\s*\d+[.)]\s+/;

export function parseRichText(src: string): Block[] {
  const blocks: Block[] = [];
  const paragraphs = src.replace(/\r\n/g, "\n").split(/\n\s*\n/);

  for (const para of paragraphs) {
    const lines = para.split("\n").filter((l) => l.trim().length > 0);
    let buffer: string[] = [];
    const flush = () => {
      if (buffer.length) blocks.push({ type: "p", content: parseInline(buffer.join(" ")) });
      buffer = [];
    };

    let i = 0;
    while (i < lines.length) {
      const line = lines[i]!;
      const kind = BULLET.test(line) ? "ul" : NUMBER.test(line) ? "ol" : null;
      if (!kind) {
        buffer.push(line.trim());
        i++;
        continue;
      }
      flush();
      const re = kind === "ul" ? BULLET : NUMBER;
      const items: Inline[][] = [];
      while (i < lines.length && re.test(lines[i]!)) {
        items.push(parseInline(lines[i]!.replace(re, "").trim()));
        i++;
      }
      blocks.push({ type: kind, items });
    }
    flush();
  }
  return blocks;
}
