import useDashboardTitle from "@/hooks/use-dashboard-title";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { columns, data } from "../table/phs-centres";

const PHSCentres = () => {
  useDashboardTitle("PHS Centres");

  const [search, setSearch] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedState, setSelectedState] = useState("");

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

  // Unique values for filters
  const uniqueZones = Array.from(new Set(data.map((item) => item.zone)));
  const uniqueStates = Array.from(new Set(data.map((item) => item.state)));

  return (
    <div className="space-y-10">
      <div className="mt-4 flex flex-col">
        <div>
          <h2 className="text-lg font-semibold">PHS Centres</h2>
        </div>
        <div className="flex justify-between items-center mt-10">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                table.setGlobalFilter(event.target.value);
              }}
              className="w-[388px] max-w-full border p-2 rounded-md pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
          </div>

          <div className="flex gap-3">
            {/* Zone Filter */}
            <select
              value={selectedZone}
              onChange={(e) => {
                setSelectedZone(e.target.value);
                table.getColumn("zone")?.setFilterValue(e.target.value);
              }}
              className="border p-2 rounded-lg"
            >
              <option value="">Filter by Zone</option>
              {uniqueZones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                table.getColumn("state")?.setFilterValue(e.target.value);
              }}
              className="border p-2 rounded-lg"
            >
              <option value="">Filter by State</option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
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

export default PHSCentres;
