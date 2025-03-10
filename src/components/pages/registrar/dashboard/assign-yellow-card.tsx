import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useState } from "react";

import {
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { yellowCardColumns, yellowCardData } from "../table/yellow-card";
import AppTablePagination from "@/components/common/app-table-pagination";
import AppModal from "@/components/common/modal";
import AssignNewYellowCard from "../modal/assign-new-y-card";
import AppTable from "@/components/common/app-table";

const RegistrarAssignYellowCard = () => {
  useDashboardTitle("Assign Yellow Card");
  const [search, setSearch] = useState("");
  const [isOpenAssign, setOpenAssign] = React.useState(false);

  const filteredData = yellowCardData.filter((record) =>
    record.name.toLowerCase().includes(search.toLowerCase())
  );

  const table = useReactTable({
    data: yellowCardData,
    columns: yellowCardColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="space-y-10">
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
              placeholder="Search Logs"
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
        <AssignNewYellowCard onClose={() => setOpenAssign(false)} />
      </AppModal>
    </>
  );
};

export default RegistrarAssignYellowCard;
