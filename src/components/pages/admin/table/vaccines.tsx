import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Edit, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface IVaccine {
  id: number;
  name: string;
  amount: string;
  status: "In Stock" | "Out of Stock";
}

export const columns: ColumnDef<IVaccine>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.index + 1, // Auto-incrementing row index
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Vaccine Name",
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "Amount Distributed",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="outline"
          className={`px-3 py-1 rounded-full ${
            status === "In Stock"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </Badge>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.original)}
        >
          <Trash2 className="w-4 h-4 text-gray-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEdit(row.original)}
        >
          <Edit2 className="w-4 h-4 text-gray-500" />
        </Button>
      </div>
    ),
  },
];

const handleDelete = (vaccine: IVaccine) => {
  console.log("Delete", vaccine);
};

const handleEdit = (vaccine: IVaccine) => {
  console.log("Edit", vaccine);
};

export const data: IVaccine[] = [
  { id: 1, name: "OPV", amount: "100,002", status: "In Stock" },
  {
    id: 2,
    name: "Yellow Fever Lifetime",
    amount: "350,000",
    status: "Out of Stock",
  },
  {
    id: 3,
    name: "Yellow Fever Vaccine",
    amount: "201,001",
    status: "In Stock",
  },
  { id: 4, name: "Tetanus", amount: "025000", status: "In Stock" },
  { id: 5, name: "Small Pox", amount: "600,000", status: "Out of Stock" },
  { id: 6, name: "CSM", amount: "400,000", status: "Out of Stock" },
];
