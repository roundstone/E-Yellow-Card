import IMAGES from "@/assets/images";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import {
  vaccinationHistoryColumns,
  vaccinationHistoryData,
} from "../table/vacination-history";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import AppTablePagination from "@/components/common/app-table-pagination";

const RegistrarVaccinationHistory = () => {
  useDashboardTitle("Manage Vaccines");
  const [search, setSearch] = useState("");

  const filteredData = vaccinationHistoryData.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase())
  );

  const table = useReactTable({
    data: vaccinationHistoryData,
    columns: vaccinationHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="space-y-6">
        <div className=" flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h2 className="font-semibold text-lg">Vaccination History</h2>
              <p className="text-gray-500 text-sm">
                Overview of vaccinations assigned.
              </p>
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
            <Table className="mt6">
              <TableHeader className="bg-background">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="px-6 py-1">
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
                  table.getRowModel().rows.map((row, i) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-5 py-3">
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
                    <TableCell
                      colSpan={vaccinationHistoryData.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <AppTablePagination table={table} />
        </div>
      </div>
    </>
  );
};

export default RegistrarVaccinationHistory;
