import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";

type YellowCardData = {
  name: string;
  email: string;
  yellowCardNumber: string;
};

export const yellowCardData: YellowCardData[] = [
  {
    name: "Kelechi Christopher",
    email: "chriskelechi99@gmail.com",
    yellowCardNumber: "YC/2343430",
  },
  {
    name: "Kabir Sumayyah",
    email: "sumayyahkabiru@gmail.com",
    yellowCardNumber: "YC/2343430",
  },
  {
    name: "Ismail Muhammad",
    email: "ismailmuhammad20@gmail.com",
    yellowCardNumber: "YC/2343430",
  },
  {
    name: "Lawal Abdullahi",
    email: "abdullahilawal90@gmail.com",
    yellowCardNumber: "YC/2343430",
  },
];

export const yellowCardColumns: ColumnDef<YellowCardData>[] = [
  {
    accessorKey: "name",
    // header: "Name",
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
    accessorKey: "email",
    // header: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="has-[>svg]:px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "yellowCardNumber",
    // header: "Yellow Card Number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="has-[>svg]:px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Yellow Card Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
];
