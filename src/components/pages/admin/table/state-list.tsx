import { ColumnDef } from "@tanstack/react-table";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

interface IStateList {
  number: number;
  fileName: string;
  totalRow: number;
  affectedRow: number;
  status: string;
  lastInsert: string;
}

export const columns: ColumnDef<IStateList>[] = [
  {
    accessorKey: "number",
    header: "No.",
    cell: ({ row }) => row.index + 1, // Auto-incrementing row index
    enableSorting: true,
  },
  {
    accessorKey: "fileName",
    header: "File Name",
    enableSorting: true,
  },
  {
    accessorKey: "totalRow",
    header: "Total Row",
    enableSorting: true,
  },
  {
    accessorKey: "affectedRow",
    header: "Affected Row",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
  },
  {
    accessorKey: "lastInsert",
    header: "Last Insert",
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Activity",
    cell: ({ row }) => (
      <Button variant="ghost" className="bg-background"  onClick={() => handleDownload(row.original)}>
        <Upload className="w-4 h-4 text-gray-500" /> Export
      </Button>
    ),
  },
];

const handleDownload = async (file: IStateList) => {
  // console.log("Download", file);
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const response = await fetch(`${API_URL}/admin/export/${file.fileName}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer `+localStorage.getItem('token'),
    },
  });

  if (!response.ok) {
    throw new Error('Download failed');
  }

  toast.success("Exporting...");

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = file.fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

export const data: IStateList[] = [
  {
    number: 281,
    fileName: "1562202601-Kwaraupload1.csv",
    totalRow: 1948,
    affectedRow: 1960,
    status: "Finished",
    lastInsert: "2019-07-04 03:16:07",
  },
  {
    number: 282,
    fileName: "1562201077-Nasarawaupload1.csv",
    totalRow: 507,
    affectedRow: 520,
    status: "Finished",
    lastInsert: "2019-07-04 01:59:07",
  },
  {
    number: 283,
    fileName: "1562146345-vinod.csv",
    totalRow: 12,
    affectedRow: 13,
    status: "Finished",
    lastInsert: "2019-07-03 10:34:04",
  },
  {
    number: 284,
    fileName: "1562089316-Yobemain.csv",
    totalRow: 825,
    affectedRow: 840,
    status: "Finished",
    lastInsert: "2019-07-02 19:03:09",
  },
  {
    number: 285,
    fileName: "1562088071-KadunaAddendum.csv",
    totalRow: 4,
    affectedRow: 5,
    status: "Finished",
    lastInsert: "2019-07-02 18:23:02",
  },
  {
    number: 283,
    fileName: "1562088071-KadunaAddendum.csv",
    totalRow: 4,
    affectedRow: 5,
    status: "Finished",
    lastInsert: "2019-07-02 18:23:02",
  },
];
