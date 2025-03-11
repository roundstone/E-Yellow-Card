import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import { columns, data } from "../table/y-card-verification-log";

const AdminYCardVerificationLog = () => {
  useDashboardTitle("Verify Yellow Card");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-10">
      <div className="mt-4 flex flex-col">
        <div>
          <h2 className="text-lg font-semibold">Verify Yellow Card</h2>
        </div>

        <div className="border-b pt-10 p-5">
          <h2 className="text-sm font-semibold">Verification Logs</h2>
        </div>
      </div>

      <div>
        <div className="mt-4 overflow-x-auto rounded-lg border">
          <AppTable
            table={table}
            className=""
            noResultsMessage="No yellow cards found."
            tableCellClassName="px-2"
          />
        </div>
        <AppTablePagination table={table} />
      </div>
    </div>
  );
};

export default AdminYCardVerificationLog;
