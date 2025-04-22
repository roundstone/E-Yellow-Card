import useDashboardTitle from "@/hooks/use-dashboard-title";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { columns, data } from "../table/y-cards";
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";

const AdminYellowCardRange = () => {
  useDashboardTitle("Yellow Card Range");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [specialCards, setSpecialCards] = useState([]);
  const [error, setError] = useState(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: specialCards,
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

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  }

  const formatData = (data) => {
    return data.map((minidata, index) => {
      return {
        id: index+1,
        code: minidata.code,
        startCardNumber: minidata.start,
        endCardNumber: minidata.end,
        numberOfCards: minidata.quantity,
        zone: minidata.zone,
        dateIssued: formatDate(minidata.createdAt),
      };
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("admin/yellowcard/special/list", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setSpecialCards(formatData(response.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
      fetchData();
    }, []);
  
  if (loading) return <Spinner text="Loading Card Range..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-10">
      <div className="mt-4 flex flex-col">
        <div>
          <h2 className="text-lg font-semibold">Card Range List</h2>
          <p className="text-gray-600">
            See a list of allocated card a and range of their distribution
          </p>
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

          <div className="flex flex-col">
            <label>Entries</label>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border p-2 rounded-lg"
            >
              {[5, 10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-3">
          {/* <Button className="bg-gray-50 rounded text-black">All Cards</Button> */}
          <Button className=" text-white">Special Cards</Button>
        </div>

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

export default AdminYellowCardRange;
