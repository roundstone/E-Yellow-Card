import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";

export type CardData = {
  id: number;
  phsCentre: string;
  code: string;
  startCardNumber: string;
  endCardNumber: string;
  remainingCards: number;
};

export const cardData: CardData[] = [
  {
    id: 1,
    phsCentre: "Federal Sec. Abuja",
    code: "A",
    startCardNumber: "00001",
    endCardNumber: "005000",
    remainingCards: 3500,
  },
  {
    id: 2,
    phsCentre: "Apapa Port",
    code: "A",
    startCardNumber: "005001",
    endCardNumber: "007000",
    remainingCards: 2000,
  },
  {
    id: 3,
    phsCentre: "Federal Sec. Gombe",
    code: "A",
    startCardNumber: "007001",
    endCardNumber: "010000",
    remainingCards: 1800,
  },
  {
    id: 4,
    phsCentre: "MAKIA Kano",
    code: "A",
    startCardNumber: "010001",
    endCardNumber: "025000",
    remainingCards: 1000,
  },
  {
    id: 5,
    phsCentre: "Tin Can Island Port",
    code: "A",
    startCardNumber: "025001",
    endCardNumber: "032000",
    remainingCards: 3000,
  },
  {
    id: 6,
    phsCentre: "Federal Sec. Kawo",
    code: "A",
    startCardNumber: "032001",
    endCardNumber: "040000",
    remainingCards: 9000,
  },
];

export const cardColumns: ColumnDef<CardData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
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
    accessorKey: "startCardNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Card Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "remainingCards",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Remaining Cards
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
];
