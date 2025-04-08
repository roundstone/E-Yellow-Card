import useDashboardTitle from "@/hooks/use-dashboard-title";
import {
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
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
import AppTablePagination from "@/components/common/app-table-pagination";
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";
import Loading from "@/components/loading";

const DirectorRangeList = () => {
  useDashboardTitle("Range List");

  const [search, setSearch] = useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [rangeData, setRangeData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const table = useReactTable({
    data: rangeData,
    columns: rangeListColumns,
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

  const formatRangeData = (data) => {
    return data.map((minidata) => {
      return {
        id: minidata.code,
        code: minidata.code,
        startCardNumber: minidata.start,
        endCardNumber: minidata.end,
        zone: minidata.zone
      };
    });
  };

  const fetchRangeList = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("director/yellowcard/assign/history", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setRangeData(formatRangeData(response.data));
      setRawData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRangeList();
  }, []);

  if (loading) return <Spinner text="Loading Range List..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p6">
      { isLoading ? <Loading /> : '' }
      {/* Search Input */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Range List</h2>
          <p className="text-gray-600">
            View range of yellow cards across all zones.
          </p>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              table.setGlobalFilter(event.target.value);
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
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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

      <AppTablePagination table={table} />
    </div>
  );
};

export default DirectorRangeList;
