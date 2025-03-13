import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useState } from "react";
import DashboardStats from "./stats-card";
import CardIssuance from "../../director/dashboard/casrd-issuance";
import VaccineIssuanceChart from "./vaccine-issuance";
import AppTable from "@/components/common/app-table";
import { columns, data } from "../table/users";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/route";
import Leaderboard from "./leader-board";
import VerificationLog from "./verification-log";

type Props = {};

const AdminDashboard = (props: Props) => {
  useDashboardTitle("Dashboard");

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
    <>
      <div className="space-y-8">
        {/* Cards Section */}
        <DashboardStats />

        <div className="grid md:grid-cols-2 gap-4 ">
          <VaccineIssuanceChart />
          <CardIssuance />
        </div>

        <div>
          <Link
            to={ROUTES.DASHBOARD.SUPERADMIN.USERS}
            className="text-base font-semibold"
          >
            Users
          </Link>
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
        <div className="grid md:grid-cols-2 gap-4 ">
          <Leaderboard />
          <VerificationLog />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
