import { TableShell, td, th } from "./table-shell";

export function GenericTable({
  title,
  headers,
  rows,
}: {
  title?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <TableShell title={title}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className={th} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => (
              <td key={j} className={td}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableShell>
  );
}
