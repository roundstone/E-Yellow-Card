import { ColumnDef } from "@tanstack/react-table";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interface/user";
import React from "react";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => row.index + 1, // Auto-incrementing row index
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-x-1">
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

const handleDelete = (user: IUser) => {
  console.log("Delete", user);
};

const handleEdit = (user: IUser) => {
  console.log("Edit", user);
};

export const data: IUser[] = [
  {
    id: 1,
    name: "Kelechi Christopher",
    email: "chriskelechi99@gmail.com",
    role: "Port Health Director",
  },
  {
    id: 2,
    name: "Ilyas Yusuf",
    email: "ilyasuff@gmail.com",
    role: "Registrar",
  },
  {
    id: 3,
    name: "Kabir Sumayyah",
    email: "sumayyahkabiru@gmail.com",
    role: "Medical Officer",
  },
  {
    id: 4,
    name: "Ismail Muhammad",
    email: "ismailmuhammad20@gmail.com",
    role: "User",
  },
  {
    id: 5,
    name: "Lawal Abdullahi",
    email: "abdullahilawal90@gmail.com",
    role: "Medical Officer",
  },
  {
    id: 6,
    name: "Emmanuel Deborah",
    email: "emmydeborah@gmail.com",
    role: "Registrar",
  },
];
