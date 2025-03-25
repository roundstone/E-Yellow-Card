import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Check, CircleCheck, CircleX, Clock, X } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableSorting: true,
  },
  {
    accessorKey: "referenceNumber",
    header: "Reference Number (RRR)",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "Amount (₦)",
    enableSorting: true,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        Success: "bg-green-100 text-green-700 border-green-500",
        Pending: "bg-yellow-100 text-yellow-700 border-yellow-500",
        Failed: "bg-red-100 text-red-700 border-red-500",
      };

      return (
        <Badge
          variant="outline"
          className={`px-3 py-1 rounded-full border ${statusColors[status]}`}
        >
          {status === "Success" ? (
            <Check className="text-primary" />
          ) : status === "Failed" ? (
            <Clock className="text-danger" />
          ) : (
            <X className="text-danger" />
          )}{" "}
          {status}
        </Badge>
      );
    },
    enableSorting: true,
  },
];

export const data = [
  {
    id: 1,
    referenceNumber: "2500-0987-6543",
    name: "Margaret Soyinka",
    amount: 2000,
    paymentMethod: "Online (Bank Transfer)",
    status: "Failed",
  },
  {
    id: 2,
    referenceNumber: "1900-2345-6789",
    name: "James Babalola",
    amount: 2000,
    paymentMethod: "Offline (Bank Branch)",
    status: "Pending",
  },
  {
    id: 3,
    referenceNumber: "3400-5678-9012",
    name: "John Tukur",
    amount: 2000,
    paymentMethod: "Offline (Bank Branch)",
    status: "Success",
  },
  {
    id: 4,
    referenceNumber: "7800-1234-5678",
    name: "Elizabeth Ezeoke",
    amount: 3000,
    paymentMethod: "Online (Bank Transfer)",
    status: "Pending",
  },
  {
    id: 5,
    referenceNumber: "5600-9876-5432",
    name: "Lydia Fagbemi",
    amount: 2000,
    paymentMethod: "Online (Debit Card)",
    status: "Success",
  },
  {
    id: 6,
    referenceNumber: "4200-6789-0123",
    name: "Ruth Amiesimaka",
    amount: 3000,
    paymentMethod: "Online (Bank Transfer)",
    status: "Success",
  },
];
