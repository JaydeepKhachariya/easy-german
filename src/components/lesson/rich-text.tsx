import { parseRichText, type Inline } from "@/lib/rich-text";
import { cn } from "@/lib/utils";

function Inlines({ items }: { items: Inline[] }) {
  return (
    <>
      {items.map((i, k) =>
        i.bold ? (
          <strong key={k} className="font-semibold">
            {i.text}
          </strong>
        ) : i.italic ? (
          <em key={k}>{i.text}</em>
        ) : (
          <span key={k}>{i.text}</span>
        ),
      )}
    </>
  );
}

export function RichText({ text, className }: { text: string; className?: string }) {
  const blocks = parseRichText(text);
  return (
    <div className={cn("space-y-3 leading-7", className)}>
      {blocks.map((b, k) => {
        if (b.type === "p") {
          return (
            <p key={k}>
              <Inlines items={b.content} />
            </p>
          );
        }
        const List = b.type;
        return (
          <List
            key={k}
            className={cn("ml-5 space-y-1", b.type === "ul" ? "list-disc" : "list-decimal")}
          >
            {b.items.map((item, j) => (
              <li key={j}>
                <Inlines items={item} />
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
}
