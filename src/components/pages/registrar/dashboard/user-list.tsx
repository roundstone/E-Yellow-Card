import IMAGES from "@/assets/images";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { vaccinationHistoryData } from "../table/vacination-history";
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
import {
  gUserColumns,
  gUserData,
  vUserColumns,
  vUserData,
} from "../table/user-list";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppTable from "@/components/common/app-table";

const RegistrarUserList = () => {
  useDashboardTitle("User List");
  const [search, setSearch] = useState("");

  const filteredData = vaccinationHistoryData.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase())
  );

  //   const table = useReactTable({
  //     data: vaccinationHistoryData,
  //     columns: vaccinationHistoryColumns,
  //     getCoreRowModel: getCoreRowModel(),
  //   });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const gTable = useReactTable({
    data: gUserData,
    columns: gUserColumns,
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

  const vTable = useReactTable({
    data: vUserData,
    columns: vUserColumns,
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
      <Tabs defaultValue="gUserTab" className="">
        <TabsList className="grid grid-cols-2 h-full bg-[#F6F6F6] w-fit rounded-lg p-1">
          <TabsTrigger
            value="gUserTab"
            className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
          >
            New Card Request
          </TabsTrigger>
          <TabsTrigger
            value="vUserTab"
            className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
          >
            Card info change requests
          </TabsTrigger>
        </TabsList>

        <div className="overflow-x-auto mt-5">
          <TabsContent value="gUserTab">
            <GeneralUsers
              title={"General Users"}
              description={"Overview of all registered users."}
              table={gTable}
            />
          </TabsContent>
          <TabsContent value="vUserTab">
            <GeneralUsers
              title={"Void Users"}
              description={"Manage, add or remove void users."}
              table={vTable}
            />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
};

export default RegistrarUserList;

const GeneralUsers = ({
  title,
  description,
  table,
}: {
  title: string;
  description: string;
  table: any;
}) => {
  useDashboardTitle("User List");
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="space-y-6">
        <div className=" flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h2 className="font-semibold text-lg">{title}</h2>
              <p className="text-gray-500 text-sm">{description}</p>
            </div>
          </div>
          <div className="relative mt-1">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="checkbox"
              className="w-full p-2 pl-10 border rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="overflow-auto border rounded-lg mt-6">
            <AppTable
              table={table}
              className=""
              noResultsMessage="No yellow cards found."
            />
          </div>
          <AppTablePagination table={table} />
        </div>
      </div>
    </>
  );
};
