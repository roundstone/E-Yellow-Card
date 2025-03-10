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
import { data, columns } from "../table/users";
import UploadCSVForm from "../form/upload-csv";

const AdminStateListUpload = () => {
  useDashboardTitle("State List");

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
          <h2 className="text-lg font-semibold">Upload CRON CSV</h2>
        </div>
      </div>
      <div className="max-w-[512px] mx-auto">
        <UploadCSVForm />
      </div>
    </div>
  );
};

export default AdminStateListUpload;
