import useDashboardTitle from "@/hooks/use-dashboard-title";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { RangeItem, rangeListColumns, rangeData } from "../table/range-list";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
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
          <Table>
            <TableHeader>
              {cardTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="px-0 py-3">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {cardTable.getRowModel().rows?.length ? (
                cardTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={rangeListColumns.length} className="py-5">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-[#9FA2B4] text-sm">
            Showing{" "}
            {cardTable.getState().pagination.pageIndex *
              cardTable.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (cardTable.getState().pagination.pageIndex + 1) *
                cardTable.getState().pagination.pageSize,
              cardTable.getCoreRowModel().rows.length
            )}{" "}
            entries of {cardTable.getCoreRowModel().rows.length}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => cardTable.previousPage()}
            disabled={!cardTable.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => cardTable.nextPage()}
            disabled={!cardTable.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
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
          <Table>
            <TableHeader>
              {distributionTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="px-0 py-3">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {distributionTable.getRowModel().rows?.length ? (
                distributionTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={rangeListColumns.length} className="py-5">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-[#9FA2B4] text-sm">
            Showing{" "}
            {distributionTable.getState().pagination.pageIndex *
              distributionTable.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (distributionTable.getState().pagination.pageIndex + 1) *
                distributionTable.getState().pagination.pageSize,
              distributionTable.getCoreRowModel().rows.length
            )}{" "}
            entries of {distributionTable.getCoreRowModel().rows.length}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => distributionTable.previousPage()}
            disabled={!distributionTable.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => distributionTable.nextPage()}
            disabled={!distributionTable.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DirectorRangeDistribution;
