import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export type DistributionData = {
  code: string;
  quantity: string;
  range: string;
  phsCentre: string;
  date: string;
};

export const distributionData: DistributionData[] = [
  {
    code: "A",
    quantity: "5000",
    range: "000000 - 005000",
    phsCentre: "Federal Sec. Abuja",
    date: "01/12/2024",
  },
  {
    code: "A",
    quantity: "2000",
    range: "005001 - 007000",
    phsCentre: "Apapa Port",
    date: "10/12/2024",
  },
  {
    code: "A",
    quantity: "20,000",
    range: "007001 - 027000",
    phsCentre: "Federal Sec. Gombe",
    date: "23/12/2024",
  },
  {
    code: "A",
    quantity: "1500",
    range: "027001 - 028500",
    phsCentre: "MAKIA Kano",
    date: "01/01/2025",
  },
  {
    code: "A",
    quantity: "4000",
    range: "028501 - 032500",
    phsCentre: "Tin Can Island Port",
    date: "09/01/2024",
  },
  {
    code: "A",
    quantity: "7500",
    range: "032501 - 040000",
    phsCentre: "Federal Sec. Kawo",
    date: "15/01/2024",
  },
];

export const distributionColumns: ColumnDef<DistributionData>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "range",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Range
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "phsCentre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PHS Centre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
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
