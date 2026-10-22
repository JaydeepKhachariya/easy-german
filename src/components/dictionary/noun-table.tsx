import { ArticleTag } from "@/components/visualizers/article";
import type { DeclensionRow } from "@/lib/decline";

function Word({ text, gender }: { text: string; gender: "der" | "die" | "das" | "plural" }) {
  const [art, ...rest] = text.split(" ");
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5" lang="de">
      <ArticleTag gender={gender} text={art} className="text-xs" />
      <span className="font-medium">{rest.join(" ")}</span>
    </span>
  );
}

export function NounTable({
  rows,
  article,
}: {
  rows: DeclensionRow[];
  article: "der" | "die" | "das";
}) {
  const hasSg = rows.some((r) => r.singular);
  const hasPl = rows.some((r) => r.plural);
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th scope="col" className="px-3 py-2 text-left font-medium">
              Case
            </th>
            {hasSg && (
              <th scope="col" className="px-3 py-2 text-left font-medium">
                Singular
              </th>
            )}
            {hasPl && (
              <th scope="col" className="px-3 py-2 text-left font-medium">
                Plural
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.case} className="border-t align-top">
              <th scope="row" className="px-3 py-2 text-left font-normal text-muted-foreground">
                {r.case}
              </th>
              {hasSg && (
                <td className="space-y-1 px-3 py-2">
                  {r.singular && (
                    <>
                      <Word text={r.singular.definite} gender={article} />
                      <div className="text-xs text-muted-foreground" lang="de">
                        {r.singular.indefinite}
                      </div>
                    </>
                  )}
                </td>
              )}
              {hasPl && (
                <td className="px-3 py-2">
                  {r.plural && <Word text={r.plural.definite} gender="plural" />}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
