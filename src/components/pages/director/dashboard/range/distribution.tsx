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
import { cardColumns, cardData } from "../table/y-card";
import {
  distributionColumns,
  distributionData,
} from "../table/range-distribution";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";

const DirectorRangeDistribution = () => {
  useDashboardTitle("Range Description");

  const [search, setSearch] = useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const cardTable = useReactTable({
    data: cardData,
    columns: cardColumns,
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

  const distributionTable = useReactTable({
    data: distributionData,
    columns: distributionColumns,
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
      <div className="bg-background border p-6 rounded-lg flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative max-md:hidden">
            <div className="bg-[#D5D51D] w-12 h-16 mr-3 -rotate-12"></div>
            <div className="bg-[#E1E122] w-12 h-16 mr-3 absolute top-0 left-0 rotate-12"></div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              Assign a Batch of Yellow Cards to a PHS Centre
            </h2>
            <p className="text-gray-500 text-sm">
              Enter the details of the port health service centre you want to
              assign yellow cards to.
            </p>
          </div>
        </div>
        <Button className=" text-white ">Assign a Batch</Button>
      </div>

      {/* Table 1 */}
      <div>
        {/* Search Input */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Available Yellow Cards</h2>
            <p className="text-gray-600">
              View real-time availability of yellow cards across all PHS
              Centres.
            </p>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                cardTable.setGlobalFilter(event.target.value);
              }}
              className="w-64 border p-2 rounded-md pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto rounded-lg border">
          <AppTable
            table={cardTable}
            className=""
            noResultsMessage="No yellow cards found."
          />
        </div>
        <AppTablePagination table={cardTable} />
      </div>

      {/* Table 2 */}
      <div>
        {/* Search Input */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Range Distribution History
            </h2>
            <p className="text-gray-600">
              Track the range of yellow cards distributed to PHS Centres
            </p>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                distributionTable.setGlobalFilter(event.target.value);
              }}
              className="w-64 border p-2 rounded-md pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto rounded-lg border">
          <AppTable
            table={distributionTable}
            className=""
            noResultsMessage="No yellow cards found."
          />
        </div>
        <AppTablePagination table={cardTable} />
      </div>
    </div>
  );
};

export default DirectorRangeDistribution;
