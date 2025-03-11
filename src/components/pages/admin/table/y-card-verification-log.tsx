import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Edit2, CircleX, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "yellowCardNumber",
    header: "Yellow Card Number",
    enableSorting: true,
  },
  {
    accessorKey: "phsLocation",
    header: "PHS Location",
    enableSorting: true,
  },
  {
    accessorKey: "timestamp",
    header: "Date and Time Stamp",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.status === "valid" ? (
        <CircleCheck className="text-primary"></CircleCheck>
      ) : (
        <CircleX className="text-danger"></CircleX>
      ),
    enableSorting: true,
  },
//   {
//     accessorKey: "actions",
//     header: "Actions",
//     cell: ({ row }) => (
//       <div className="flex gap-x-1">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => handleDelete(row.original)}
//         >
//           <Trash2 className="w-4 h-4 text-gray-500" />
//         </Button>
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => handleEdit(row.original)}
//         >
//           <Edit2 className="w-4 h-4 text-gray-500" />
//         </Button>
//       </div>
//     ),
//   },
];

const handleDelete = (record) => {
  console.log("Delete", record);
};

const handleEdit = (record) => {
  console.log("Edit", record);
};

export const data = [
  {
    id: 1,
    name: "David Ibrahim",
    yellowCardNumber: "08116403196",
    phsLocation: "Doma-Rukubi Road",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 2,
    name: "Peter Bala",
    yellowCardNumber: "08064443610",
    phsLocation: "Epe-Lekki Road",
    timestamp: "2019-07-04 03:16:07",
    status: "invalid",
  },
  {
    id: 3,
    name: "Tobiloba Folarin",
    yellowCardNumber: "08002311442",
    phsLocation: "Main Market Road",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 4,
    name: "Chukwuma Okechukwu",
    yellowCardNumber: "08192235084",
    phsLocation: "Sagbama",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 5,
    name: "Seiyefa Diongoli",
    yellowCardNumber: "07042409865",
    phsLocation: "Tambuwal",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 6,
    name: "Chukwudi Anigbogu",
    yellowCardNumber: "08013030853",
    phsLocation: "Otada Road",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 7,
    name: "Bonye Pakabo",
    yellowCardNumber: "08178774879",
    phsLocation: "Irele",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 8,
    name: "Naomi Anozie",
    yellowCardNumber: "09083488692",
    phsLocation: "Ilorin",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 9,
    name: "Stephen Rabiu",
    yellowCardNumber: "09047757788",
    phsLocation: "Jere Road",
    timestamp: "2019-07-04 03:16:07",
    status: "valid",
  },
  {
    id: 10,
    name: "Margaret Idamiebi",
    yellowCardNumber: "09031824586",
    phsLocation: "Kaiama-Bode Saadu Road",
    timestamp: "2019-07-04 03:16:07",
    status: "invalid",
  },
];
