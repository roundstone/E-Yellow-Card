import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useEffect, useState } from "react";
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
import { logColumns, logs } from "../../registrar/table/activity-log";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";

const requestTypes = ["All Actions", "Login", "Report Download"];

const AdminActivityLog = () => {
  useDashboardTitle("All Event History");
  const [search, setSearch] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [activityLog, setActivityLog] = useState([]);
  const [error, setError] = useState(null);

  const filteredLogs = activityLog
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

  const formatActivityLog = (data) => {
      return data.map((minidata, index) => {
        return {
          id: index+1,
          timestamp: minidata.timestamp,
          user: minidata.user.firstName+" "+minidata.user.surName,
          userAvatar: "/passport.png",
          action: minidata.action,
          details: minidata.details,
          ipAddress: minidata.ipaddress ?? "192.1******",
        };
      });
    };
  
  const fetchLogData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("admin/activity/log", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setActivityLog(formatActivityLog(response.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
      fetchLogData();
    }, []);
  
  if (loading) return <Spinner text="Loading Event Log..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Card>
      <CardContent className="p-0">
        { isLoading ? <Loading /> : '' }
        <div className="flex justify-between items-center mb-4 px-3">
          <div className="flex gap-3 items-center">
            <Input
              placeholder="Search Logs"
              className="w-[340px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <Button className="bg-green-600 text-white">Download</Button> */}
        </div>
        <div className="mt-6">
          <div className="overflow-auto mt-6">
            <AppTable
              table={table}
              className="px"
              noResultsMessage="No activity found."
              tableCellClassName="px-2"
            />
          </div>
          <AppTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminActivityLog;
