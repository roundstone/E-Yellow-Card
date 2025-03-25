import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Edit2, CircleX, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableSorting: true,
  },
  {
    accessorKey: "zone",
    header: "Zone",
    enableSorting: true,
  },
  {
    accessorKey: "location",
    header: "Location",
    enableSorting: true,
  },
  {
    accessorKey: "state",
    header: "State",
    enableSorting: true,
  },
  {
    accessorKey: "cardsIssued",
    header: "Cards Issued",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`px-3 py-1 rounded-full ${
          row.original.status === "Active"
            ? "bg-green-100 text-primary border-primary border-[0.5px]"
            : "bg-red-100 text-danger border-danger border-[0.5px]"
        }`}
      >
        {row.original.status}
      </Badge>
    ),
    enableSorting: true,
  },
];

export const data = [
  {
    id: 1,
    zone: "North Central",
    location: "109 Marina, Lagos Island, Lagos",
    state: "Lagos",
    cardsIssued: "122,500",
    status: "Active",
  },
  {
    id: 2,
    zone: "South South",
    location: "100 Bungudu-Township Road, Bungudu",
    state: "Osun",
    cardsIssued: "500,000",
    status: "Inactive",
  },
  {
    id: 3,
    zone: "North",
    location: "152 Buguma-Ogbakiri Road, Buguma",
    state: "Anambra",
    cardsIssued: "213,123",
    status: "Inactive",
  },
  {
    id: 4,
    zone: "South West",
    location: "2 Sabon Gari Road, Zaria, Kaduna",
    state: "Bayelsa",
    cardsIssued: "234,001",
    status: "Active",
  },
  {
    id: 5,
    zone: "West",
    location: "169 Mile 50 Road, Abakaliki, Ebonyi",
    state: "Osun",
    cardsIssued: "670,000",
    status: "Active",
  },
  {
    id: 6,
    zone: "South East",
    location: "136 Ibeka Road, Ukwa, Abia",
    state: "Niger",
    cardsIssued: "345,908",
    status: "Inactive",
  },
  {
    id: 7,
    zone: "North West",
    location: "179 Birnin Gwari-Kaduna Road, Birnin Gwari, Kaduna",
    state: "Adamawa",
    cardsIssued: "234,678",
    status: "Active",
  },
  {
    id: 8,
    zone: "North East",
    location: "21 Otuokpoti Road, Ogbia, Bayelsa",
    state: "Kano",
    cardsIssued: "782,590",
    status: "Inactive",
  },
  {
    id: 9,
    zone: "East",
    location: "178 Bukuru-Tor-Dong Road, Bukuru, Plateau",
    state: "Kaduna",
    cardsIssued: "432,111",
    status: "Active",
  },
  {
    id: 10,
    zone: "South",
    location: "55 Warji-Ningi Road, Warji, Bauchi",
    state: "Bayelsa",
    cardsIssued: "300,000",
    status: "Active",
  },
];
