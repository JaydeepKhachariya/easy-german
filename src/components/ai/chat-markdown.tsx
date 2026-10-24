import { parseChatMarkdown, type ChatInline } from "@/lib/ai/markdown";
import { cn } from "@/lib/utils";

function Inlines({ items }: { items: ChatInline[] }) {
  return (
    <>
      {items.map((i, k) =>
        i.code ? (
          <code key={k} className="rounded bg-muted px-1 py-0.5 text-[0.9em]">
            {i.text}
          </code>
        ) : i.bold ? (
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

/** Renders a chat reply. Text only ever becomes React text nodes, never HTML. */
export function ChatMarkdown({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("space-y-2 leading-6", className)}>
      {parseChatMarkdown(text).map((b, k) => {
        switch (b.type) {
          case "h":
            return (
              <p key={k} className="pt-1 font-semibold">
                <Inlines items={b.content} />
              </p>
            );
          case "p":
            return (
              <p key={k}>
                <Inlines items={b.content} />
              </p>
            );
          case "quote":
            return (
              <blockquote key={k} className="border-l-2 pl-3 text-muted-foreground">
                <Inlines items={b.content} />
              </blockquote>
            );
          case "code":
            return (
              <pre key={k} className="overflow-x-auto rounded-md bg-muted p-2 text-sm">
                {b.text}
              </pre>
            );
          case "table":
            return (
              <div key={k} className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {b.head.map((c, j) => (
                        <th key={j} className="border-b px-2 py-1 text-left font-semibold">
                          <Inlines items={c} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, m) => (
                          <td key={m} className="border-b px-2 py-1">
                            <Inlines items={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default: {
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
          }
        }
      })}
    </div>
  );
}
