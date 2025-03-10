import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { logColumns, logs } from "../table/activity-log";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const RegistrarActivityLog = () => {
  useDashboardTitle("Activity Log");
  const [search, setSearch] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase())
  ).filter(log => 
    selectedAction === "" || log.action === selectedAction
  );

  const table = useReactTable({
    data: filteredLogs,
    columns: logColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4 px-6">
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Search Logs"
              className="w-[340px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <Select onValueChange={setSelectedAction}>
              <SelectTrigger className="w-[238px]">
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">All Actions</SelectItem>
                  <SelectItem value="Login">Login</SelectItem>
                  <SelectItem value="Report Download">Report Download</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </div>
          <Button className="bg-green-600 text-white">Download</Button>
        </div>
        <Table className="mt-6">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="p-0 bg-background" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="px-6" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-6" key={cell.id}>
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
                <TableCell colSpan={logColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RegistrarActivityLog;
