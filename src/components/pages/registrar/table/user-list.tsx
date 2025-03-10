import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import React from "react";


type GUsersRecord = {
  id: number;
  yellowCardNumber: string;
  name: string;
  email: string;
  vaccinations: string[];
};

export const gUserData: GUsersRecord[] = [
  {
    id: 1076381,
    yellowCardNumber: "B129838",
    name: "Kelechi Christopher",
    email: "chriskelechi99@gmail.com",
    vaccinations: ["Yellow Fever", "Tetanus", "OPV"],
  },
  {
    id: 1076382,
    yellowCardNumber: "A128298",
    name: "Ilyas Yusuf",
    email: "ilyasuff@gmail.com",
    vaccinations: ["CSM", "Yellow Fever"],
  },
  {
    id: 1076383,
    yellowCardNumber: "B126783",
    name: "Kabir Sumayyah",
    email: "sumayyahkabiru@gmail.com",
    vaccinations: ["Yellow Fever (Lifetime)", "Small Pox"],
  },
  {
    id: 1076384,
    yellowCardNumber: "A123446",
    name: "Ismail Muhammad",
    email: "ismailmuhammad20@gmail.com",
    vaccinations: ["Tetanus", "Small Pox"],
  },
  {
    id: 1076385,
    yellowCardNumber: "A123456",
    name: "Lawal Abdullahi",
    email: "abdullahilawal90@gmail.com",
    vaccinations: ["Yellow Fever", "Tetanus", "OPV"],
  },
  {
    id: 1076386,
    yellowCardNumber: "A123456",
    name: "Emmanuel Deborah",
    email: "emmydeborah@gmail.com",
    vaccinations: ["CSM", "Yellow Fever"],
  },
];
export const gUserColumns: ColumnDef<GUsersRecord>[] = [
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
        accessorKey: "yellowCardNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Yellow Card Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
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
        accessorKey: "vaccinations",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vaccinations
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableSorting: true,
    },
];

type VUserRecord = {
    id: number;
    generalUserId: number;
    yellowCardNumber: string;
    registrarId: number;
    reason: string;
  };
  
  export const vUserData: VUserRecord[] = [
    {
      id: 1,
      generalUserId: 273561,
      yellowCardNumber: "A021682",
      registrarId: 3,
      reason: "The physical card was damaged at the point of issuance.",
    },
    {
      id: 2,
      generalUserId: 273903,
      yellowCardNumber: "A021698",
      registrarId: 3,
      reason: "The physical card was damaged at the point of issuance.",
    },
    {
      id: 3,
      generalUserId: 273109,
      yellowCardNumber: "A021700",
      registrarId: 3,
      reason: "The physical card was damaged at the point of issuance.",
    },
    {
      id: 4,
      generalUserId: 276910,
      yellowCardNumber: "A021945",
      registrarId: 3,
      reason: "The physical card was damaged at the point of issuance.",
    },
    {
      id: 5,
      generalUserId: 276652,
      yellowCardNumber: "A021946",
      registrarId: 3,
      reason: "The physical card was damaged at the point of issuance.",
    },
    {
      id: 6,
      generalUserId: 276001,
      yellowCardNumber: "A021952",
      registrarId: 3,
      reason: "The physical card was damaged at the point of issuance.",
    },
  ];


export const vUserColumns: ColumnDef<VUserRecord>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        No.
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "generalUserId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        General User ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "yellowCardNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Yellow Card Number
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "registrarId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Registrar ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
];
