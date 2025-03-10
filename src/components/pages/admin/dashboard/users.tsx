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
import { Button } from "@/components/ui/button";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import { data, columns } from "../table/users";

const AdminUsers = () => {
  useDashboardTitle("Users");

  const [search, setSearch] = useState("");

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
      <div className="mt-4 flex justify-between items-center ">
        <div>
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-gray-600">Overview of all users.</p>
        </div>
        <div className="mt10">
          <Button className="text-white">Add New User</Button>
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

export default AdminUsers;
