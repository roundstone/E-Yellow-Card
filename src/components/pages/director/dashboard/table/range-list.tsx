import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export const rangeData: RangeItem[] = [
  {
    id: "1",
    code: "A",
    startCardNumber: "00001",
    endCardNumber: "005000",
    zone: "North Central",
  },
  {
    id: "2",
    code: "A",
    startCardNumber: "005001",
    endCardNumber: "007000",
    zone: "North West",
  },
  {
    id: "3",
    code: "A",
    startCardNumber: "007001",
    endCardNumber: "010000",
    zone: "North East",
  },
  {
    id: "4",
    code: "A",
    startCardNumber: "010001",
    endCardNumber: "025000",
    zone: "South South",
  },
  {
    id: "5",
    code: "A",
    startCardNumber: "025001",
    endCardNumber: "032000",
    zone: "South West",
  },
  {
    id: "6",
    code: "A",
    startCardNumber: "032001",
    endCardNumber: "040000",
    zone: "North North",
  },
];

export type RangeItem = {
  id: string;
  code: string;
  startCardNumber: string;
  endCardNumber: string;
  zone: string;
};

export const rangeListColumns: ColumnDef<RangeItem>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No.
          <ArrowUpDown />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "startCardNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Card Number
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("startCardNumber")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "endCardNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Card Number
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("endCardNumber")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "zone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Zone
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("zone")}</div>,
    enableSorting: true,
  },
];
