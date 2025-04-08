import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useEffect, useState } from "react";

import {
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { yellowCardColumns, yellowCardData } from "../table/yellow-card";
import AppTablePagination from "@/components/common/app-table-pagination";
import AppModal from "@/components/common/modal";
import AssignNewYellowCard from "../modal/assign-new-y-card";
import AppTable from "@/components/common/app-table";
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";
import Loading from "@/components/loading";
import { toast } from "sonner";

const RegistrarAssignYellowCard = () => {
  useDashboardTitle("Assign Yellow Card");
  const [search, setSearch] = useState("");
  const [isOpenAssign, setOpenAssign] = React.useState(false);

  const filteredData = yellowCardData.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase())
  );

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [cardIssuanceHistory, setCardIssuanceHistory] = useState([]);
  const [error, setError] = useState(null);

  const table = useReactTable({
    data: cardIssuanceHistory,
    columns: yellowCardColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const formatIssuance = (data) => {
    return data.map((minidata, index) => {
      return {
        name: minidata.user.firstName+" "+minidata.user.surName,
        email: minidata.user.email,
        yellowCardNumber: minidata.yellowCardNumber,
      };
    });
  };

  const handleAssignYC = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/yellow-card/assign", {
        method: "POST",
        body: JSON.stringify({
          passportNumber: data.passportNumber,
          yellowCardNumber: data.yellowCardNumber,
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        // fetchIssuanceData();
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to assign yellow card.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
    
  const fetchIssuanceData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("registrar/issuance/history", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setCardIssuanceHistory(formatIssuance(response.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchIssuanceData();
    }, []);
  
  if (loading) return <Spinner text="Loading Card Issuance History..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="space-y-10">
        { isLoading ? <Loading /> : '' }
        <div className=" flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h2 className="font-semibold text-lg">Assign Yellow Card</h2>
              <p className="text-gray-500 text-sm">
                Enter user details and assign a yellow card to them.
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              setOpenAssign(true);
            }}
            className=" text-white "
          >
            Assign New Yellow Card
          </Button>
        </div>

        <div>
          <div className=" flex justify-between items-center">
            <div className="flex items-center">
              <div>
                <h2 className="font-semibold text-lg">Card Issuance History</h2>
                <p className="text-gray-500 text-sm">
                  Overview of yellow cards issued.
                </p>
              </div>
            </div>
            <Input
              placeholder="Search"
              className="w-[340px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-auto border rounded-lg mt-6">
            <AppTable table={table} tableCellClassName="px-2" />
          </div>
          <AppTablePagination table={table} />
        </div>
      </div>

      <AppModal
        open={isOpenAssign}
        setOpen={setOpenAssign}
        title="Who would you like to assign a yellow card to?"
        className="sm:max-w-[481px] bg-white"
      >
        <AssignNewYellowCard onSubmit={handleAssignYC} onClose={() => { setOpenAssign(false); fetchIssuanceData();} } />
      </AppModal>
    </>
  );
};

export default RegistrarAssignYellowCard;
