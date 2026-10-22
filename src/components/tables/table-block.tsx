import type { Table } from "@/content/schema";

import { ArticlesTable } from "./articles-table";
import { ConjugationTable } from "./conjugation-table";
import { GenericTable } from "./generic-table";

export function TableBlock({ table }: { table: Table }) {
  switch (table.kind) {
    case "conjugation":
      return <ConjugationTable {...table} />;
    case "articles":
      return <ArticlesTable title={table.title} rows={table.rows} />;
    case "endings":
    case "generic":
      return <GenericTable title={table.title} headers={table.headers} rows={table.rows} />;
  }
}
