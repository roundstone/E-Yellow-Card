import IMAGES from "@/assets/images";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";

const RegistrarVaccinationHistory = () => {
  useDashboardTitle("Manage Vaccines");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [vaccineHistory, setVaccineHistory] = useState([]);

  const [error, setError] = useState(null);

  // const filteredData = vaccinationHistoryData.filter((record) =>
  //   record.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredData = vaccineHistory.filter((record) => {
    const searchLower = search.toLowerCase();
    const name = record.name.toLowerCase();
    
    // Check if the full name contains the search term
    return name.includes(searchLower);
  });

  function formatVaccinationData(records) {
    // Handle single record case
    if (!Array.isArray(records)) {
      records = [records];
    }
    
    // Group by userId
    const userMap = {};
  
    records.forEach(record => {
      const userId = record.user.userId;
      const vaccineName = record.vaccine?.vaccineName;
      
      if (!userMap[userId]) {
        userMap[userId] = {
          name: `${record.user.firstName} ${record.user.surName}`,
          vaccineAssigned: [],
          date: new Date(record.administeredAt).toLocaleDateString("en-GB")
        };
      }
      
      // Add vaccine if it exists and isn't already in the list
      if (vaccineName && !userMap[userId].vaccineAssigned.includes(vaccineName)) {
        userMap[userId].vaccineAssigned.push(vaccineName);
      }
    });
  
    // Convert map to array
    return Object.values(userMap);
  }

  const table = useReactTable({
    data: vaccineHistory,
    columns: vaccinationHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("registrar/vaccination/list", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setVaccineHistory(formatVaccinationData(response.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchHistoryData();
  }, []);

  if (loading) return <Spinner text="Loading data..." />;
  if (error) return <p>Error: {error}</p>;

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
              placeholder="Search"
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
