import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import React from "react";

interface AppTableProps {
  table: any; // Replace `any` with the appropriate type for your table instance
  className?: string;
  noResultsMessage?: string;
}

const AppTable = ({
  table,
  className,
  noResultsMessage = "No results.",
}: AppTableProps) => {
  return (
    <Table className={className}>
      <TableHeader className="bg-background">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="px-3 py-1">
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
                <TableCell key={cell.id} className="px-3 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className="h-24 text-center"
            >
              {noResultsMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AppTable;
