import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const AppTablePagination = ({ table }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4 px-6">
      <div className="text-[#9FA2B4] text-sm">
        Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
        {Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getCoreRowModel().rows.length
        )} entries of {table.getCoreRowModel().rows.length}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default AppTablePagination;