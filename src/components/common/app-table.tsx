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
  tableCellClassName?: string;
  tableHeadClassName?: string;
}

const AppTable = ({
  table,
  className,
  noResultsMessage = "No results.",
  tableCellClassName,
  tableHeadClassName,
}: AppTableProps) => {
  return (
    <Table className={className}>
      <TableHeader className="bg-background">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={`text-start px- py-1 ${tableHeadClassName}`}
                >
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
                <TableCell
                  key={cell.id}
                  className={`px-5 py-3 ${tableCellClassName}`}
                >
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
