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
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import { columns, data } from "../table/remita-transaction";
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";

const RemitaTransaction = () => {
  useDashboardTitle("Remita Transaction");

  const [search, setSearch] = useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const table = useReactTable<any>({
    data: transactions,
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

  const formatTransactions = (transactions) => {
    return transactions.map((data) => {
      return {
        id: data.id,
        referenceNumber: data.rrr || "N/A",
        name: `${data.user.firstName || "Unknown"} ${data.user.surName || "User"}`,
        amount: parseFloat(data.amount) || 0,
        paymentMethod: data.channel || "Unknown",
        status: data.status || "Pending",
      };
    });
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiFetch("admin/remita-transactions/list", {
          method: "GET",
        }, true); // Ensure JWT token is included

        if (response.statusCode !== 200) {
          throw new Error(response.message || "Something went wrong");
        }

        setTransactions(formatTransactions(response.data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <Spinner text="Loading transactions..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-10">
      <div className="mt-4 flex flex-cl justify-between">
        <div>
          <h2 className="text-lg font-semibold">Remita Transactions</h2>
          <p>
            Track and manage all payment transactions processed through Remita.
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

export default RemitaTransaction;
