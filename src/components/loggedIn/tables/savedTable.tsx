/* eslint-disable @typescript-eslint/no-explicit-any */
import useColumns from "@/hooks/dashboard/tableColumn";

import { DataTable } from "@/components/loggedIn/global/dataTable";

export default function SavedTable({ data }: any) {
  const columns = useColumns();

  return <DataTable data={data || []} columns={columns} />;
}
