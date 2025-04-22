import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useEffect, useState } from "react";
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
import Spinner from "@/components/spinner";
import { apiFetch } from "@/utils/api";

const AdminYCardVerificationLog = () => {
  useDashboardTitle("Verify Yellow Card");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [verificationLog, setVerificationLog] = useState([]);
  const [error, setError] = useState(null);

  const table = useReactTable({
    data: verificationLog,
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
        name: minidata.user.firstName+" "+minidata.user.surName,
        yellowCardNumber: minidata.yellowCardNumber,
        phsLocation: minidata.user.phsc ?? "--",
        timestamp: formatDate(minidata.createdAt),
        status: "valid"
      };
    });
  };

  const fetchData = async () => {
      setLoading(true);
    try {
      const response = await apiFetch("admin/yellow-card/verified", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setVerificationLog(formatData(response.data));
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
