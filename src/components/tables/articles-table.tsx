import type { Gender } from "@/content/schema";
import { ArticleTag, GENDER_STYLES } from "@/components/visualizers/article";

import { TableShell, td, th } from "./table-shell";

const COLUMNS: Gender[] = ["der", "die", "das", "plural"];
const SHORT: Record<Gender, string> = { der: "masc.", die: "fem.", das: "neut.", plural: "plural" };

export function ArticlesTable({
  title,
  rows,
}: {
  title?: string;
  rows: { label: string; cells: readonly [string, string, string, string] }[];
}) {
  return (
    <TableShell title={title}>
      <thead>
        <tr>
          <th className={th} scope="col">
            <span className="sr-only">Form</span>
          </th>
          {COLUMNS.map((g) => (
            <th key={g} className={th} scope="col" title={GENDER_STYLES[g].label}>
              {SHORT[g]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row" className={`${td} font-normal text-muted-foreground`}>
              {r.label}
            </th>
            {r.cells.map((cell, i) => (
              <td key={i} className={td}>
                {cell === "–" || cell === "-" ? (
                  <span className="text-muted-foreground">–</span>
                ) : (
                  <ArticleTag gender={COLUMNS[i]!} text={cell} />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}
