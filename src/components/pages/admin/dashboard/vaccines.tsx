import useDashboardTitle from "@/hooks/use-dashboard-title";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import { columns, data } from "../table/vaccines";
import VaccineStats from "./vaccine-stats";
import AppModal from "@/components/common/modal";
import AddVaccineForm from "../form/add-vaccince";
import { apiFetch } from "@/utils/api";
import { toast } from "sonner";
import Loading from "@/components/loading";
import Spinner from "@/components/spinner";

const AdminVaccines = () => {
  useDashboardTitle("Vaccines");

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [vaccineData, setVaccineData] = useState([]);
  const [rawVaccineData, setRawVaccineData] = useState([]);
  const [regUserCount, setRegUserCount] = useState(0);
  const [vaccUserCount, setVaccUserCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [rawStatData, setRawStatData] = useState({});
  const [vaccineInitialData, setVaccineInitialData] = useState(null);
  const [error, setError] = useState(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: vaccineData,
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

  const formatVaccines = (vaccinces) => {
    return vaccinces.map((data) => {
      return {
        id: data.id,
        name: data.vaccineName,
        amount: data.distributedAmount,
        status: data.status
      };
    });
  };

  const formatChartData = (chartData) => {
    return chartData.map((data) => {
      return {
        name: data.vaccineName,
        value: data.count
      };
    });
  };

  const handleAddVaccine = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiFetch("admin/vaccine/create", {
        method: "POST",
        body: JSON.stringify({
          vaccineName: data.vaccineName,
          distributedAmount: data.amountDistributed,
          validty: data.validity,
          status: "in_stock"
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        setOpen(false);
        fetchVaccine();
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to create vaccine.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditVaccine = async (data) => {
    setIsLoading(true);
    const vaccineId = localStorage.getItem("currentEditVaccineId");

    if(!vaccineId) {
      toast.error("User Id not found!");
      return;
    }

    try {
      const response = await apiFetch("admin/vaccine/update/"+vaccineId, {
        method: "POST",
        body: JSON.stringify({
          vaccineName: data.vaccineName,
          distributedAmount: data.amountDistributed,
          validty: data.validity,
          status: data.status
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        setOpen(false);
        fetchVaccine();
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to create account.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditClick = () => {
    const vaccineId = localStorage.getItem("currentEditVaccineId");
    const singleVaccine = rawVaccineData.find(vaccine => vaccine.id == vaccineId);
    setVaccineInitialData({
      vaccines: [
        {
          vaccineName: singleVaccine.vaccineName,
          amountDistributed: singleVaccine.distributedAmount.toString(),
          status: singleVaccine.status,
          validity: singleVaccine.validty
        },
      ],
    });
    setOpen(true);
  }

  const fetchVaccine = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("admin/vaccine/stats", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setVaccineData(formatVaccines(response.data.vaccines));
      setRawVaccineData(response.data.vaccines);
      setRegUserCount(response.data.userCount);
      setVaccUserCount(response.data.vaccinatedCount);
      setChartData(formatChartData(response.data.historyStat));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccine();
  }, []);

  if (loading) return <Spinner text="Loading Vaccine Stats..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="space-y-10">
        <div className="mt-4 flex justify-between items-center ">
          { isLoading ? <Loading /> : '' }

          <div>
            <h2 className="text-lg font-semibold">Add Vaccine</h2>
            <p className="text-gray-600">Add and manage vaccines</p>
          </div>
          <div className="mt10">
            <Button onClick={() => {setVaccineInitialData(null); setOpen(true)}} className="text-white">
              Add Vaccine
            </Button>
            <Button id="editVaccineBtn" onClick={handleEditClick} className="text-white hidden">
              Edit Vaccine
            </Button>
            <Button id="deleteVaccineBtn" onClick={() => fetchVaccine()} className="text-white hidden">
              Delete Vaccine
            </Button>
          </div>
        </div>
        <VaccineStats regUserCount={regUserCount} vaccUserCount={vaccUserCount} chartdata={chartData} />
        <div className="mt-4 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  table.setGlobalFilter(event.target.value);
                }}
                className="w-[388px] max-w-full border p-2 rounded-md pl-10"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
            </div>
          </div>
        </div>

        <div>
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
      </div>

      <AppModal
        open={open}
        setOpen={setOpen}
        className="sm:max-w-[790px] bg-white"
      >
        <AddVaccineForm initialData={vaccineInitialData} onSubmit={ (vaccineInitialData == null) ? handleAddVaccine : handleEditVaccine } />
      </AppModal>
    </>
  );
};

export default AdminVaccines;
