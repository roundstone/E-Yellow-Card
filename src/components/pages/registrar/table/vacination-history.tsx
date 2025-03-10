import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";

type VaccinationHistoryType = {
  name: string;
  vaccineAssigned: string[];
  date: string;
};

export const vaccinationHistoryData: VaccinationHistoryType[] = [
  {
    name: "Kelechi Christopher",
    vaccineAssigned:[ "Yellow Fever", "Tetanus", "OPV"],
    date: "01/12/2024",
  },
  {
    name: "Kabir Sumayyah",
    vaccineAssigned:[ "Yellow Fever", "CSM", "OPV"],
    date: "01/12/2024",
  },
  {
    name: "Ismail Muhammad",
    vaccineAssigned:[ "Yellow Fever (Lifetime)", "Small Pox"],
    date: "01/12/2024",
  },
  {
    name: "Lawal Abdullahi",
    vaccineAssigned:[ "Tetanus", "Small Pox"],
    date: "01/12/2024",
  },
];

export const vaccinationHistoryColumns: ColumnDef<VaccinationHistoryType>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="has-[>svg]:px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: "vaccineAssigned",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="has-[>svg]:px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vaccine Assigned
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableSorting: true,
        cell: ({ row }) => row.original.vaccineAssigned.join(", "),
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="has-[>svg]:px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableSorting: true,
    },
];
