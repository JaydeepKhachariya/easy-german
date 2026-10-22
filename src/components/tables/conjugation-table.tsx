import { DEFAULT_PRONOUNS } from "@/content/schema";
import { cn } from "@/lib/utils";

import { TableShell, td, th } from "./table-shell";

export type ConjugationTableProps = {
  title?: string;
  pronouns?: string[];
  verbs: { infinitive: string; english?: string; forms: string[]; highlight?: number[] }[];
};

export function ConjugationTable({
  title,
  pronouns = DEFAULT_PRONOUNS,
  verbs,
}: ConjugationTableProps) {
  return (
    <TableShell title={title}>
      <thead>
        <tr>
          <th className={th} scope="col">
            <span className="sr-only">Pronoun</span>
          </th>
          {verbs.map((v) => (
            <th key={v.infinitive} className={th} scope="col">
              {v.infinitive}
              {v.english && (
                <span className="block text-xs font-normal text-muted-foreground">{v.english}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pronouns.map((p, row) => (
          <tr key={p}>
            <th
              scope="row"
              className={cn(td, "font-normal whitespace-nowrap text-muted-foreground")}
            >
              {p}
            </th>
            {verbs.map((v) => {
              const hi = v.highlight?.includes(row);
              return (
                <td key={v.infinitive} className={cn(td, "font-medium", hi && "bg-slot-verb/40")}>
                  {v.forms[row]}
                  {hi && <span className="sr-only"> (irregular)</span>}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}
