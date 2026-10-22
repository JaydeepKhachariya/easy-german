import { PERSONS, TENSE_LABELS, type Conjugation } from "@/lib/conjugate";

function FormsTable({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle?: string;
  rows: [string, string][];
}) {
  return (
    <figure className="min-w-0 rounded-lg border">
      <figcaption className="border-b bg-muted/50 px-3 py-2">
        <span className="font-medium" lang="de">
          {title}
        </span>
        {subtitle && <span className="ml-2 text-xs text-muted-foreground">{subtitle}</span>}
      </figcaption>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([p, f]) => (
            <tr key={p} className="border-t first:border-t-0">
              <th
                scope="row"
                className="w-24 px-3 py-1.5 text-left font-normal text-muted-foreground"
              >
                {p}
              </th>
              <td className="px-3 py-1.5 font-medium" lang="de">
                {f}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function VerbTables({ c }: { c: Conjugation }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {c.tenses.map((t) => (
          <FormsTable
            key={t.key}
            title={TENSE_LABELS[t.key].de}
            subtitle={TENSE_LABELS[t.key].en}
            rows={t.forms.map((f, i) => [PERSONS[i]!, f])}
          />
        ))}
        {c.imperative && (
          <FormsTable
            title="Imperativ"
            subtitle="Commands"
            rows={[
              ["du", `${c.imperative[0]}!`],
              ["ihr", `${c.imperative[1]}!`],
              ["Sie", `${c.imperative[2]}!`],
            ]}
          />
        )}
        <FormsTable
          title="Infinitiv und Partizip"
          subtitle="Non-finite forms"
          rows={[
            ["Infinitiv", c.infinitive],
            ["Partizip II", c.participle],
            ["Perfekt mit", c.aux],
          ]}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        In everyday speech German uses the Perfekt for the past. The Präteritum is mostly written,
        except for sein, haben and the modal verbs.
      </p>
    </div>
  );
}
