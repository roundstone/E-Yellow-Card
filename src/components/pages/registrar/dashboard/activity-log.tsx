import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
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
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { logColumns, logs } from "../table/activity-log";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";

const requestTypes = ["All Actions", "Login", "Report Download"];

const RegistrarActivityLog = () => {
  useDashboardTitle("Activity Log");
  const [search, setSearch] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  const filteredLogs = logs
    .filter(
      (log) =>
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase())
    )
    .filter((log) => selectedAction === "" || log.action === selectedAction);

  const table = useReactTable({
    data: filteredLogs,
    columns: logColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-4 px-3">
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Search Logs"
              className="w-[340px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <Select onValueChange={setSelectedAction} value={selectedAction}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Request Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {requestTypes.map((email) => (
                      <SelectItem key={email} value={email}>
                        {email}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-green-600 text-white">Download</Button>
        </div>
        <div className="mt-6">
          <div className="overflow-auto mt-6">
            <AppTable
              table={table}
              className="px"
              noResultsMessage="No yellow cards found."
              tableCellClassName="px-2"
            />
          </div>
          <AppTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrarActivityLog;
