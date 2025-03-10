import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CardBatch>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.index + 1, // Auto-incrementing row index
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "startCardNumber",
    header: "Start Card Number",
  },
  {
    accessorKey: "endCardNumber",
    header: "End Card Number",
  },
  {
    accessorKey: "numberOfCards",
    header: "No. of card",
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "dateIssued",
    header: "Date Issued",
  },
];

export type CardBatch = {
  id: number;
  code: string;
  startCardNumber: string;
  endCardNumber: string;
  numberOfCards: number;
  zone: string;
  dateIssued: string;
};

export const data: CardBatch[] = [
  {
    id: 1,
    code: "A",
    startCardNumber: "000001",
    endCardNumber: "005000",
    numberOfCards: 5000,
    zone: "North Central",
    dateIssued: "01/12/2024",
  },
  {
    id: 2,
    code: "A",
    startCardNumber: "005001",
    endCardNumber: "007000",
    numberOfCards: 2000,
    zone: "North West",
    dateIssued: "10/12/2024",
  },
  {
    id: 3,
    code: "A",
    startCardNumber: "007001",
    endCardNumber: "010000",
    numberOfCards: 3000,
    zone: "North East",
    dateIssued: "23/12/2024",
  },
  {
    id: 4,
    code: "A",
    startCardNumber: "010001",
    endCardNumber: "025000",
    numberOfCards: 15000,
    zone: "South South",
    dateIssued: "01/01/2025",
  },
  {
    id: 5,
    code: "A",
    startCardNumber: "025001",
    endCardNumber: "032000",
    numberOfCards: 5000,
    zone: "South West",
    dateIssued: "09/01/2024",
  },
  {
    id: 6,
    code: "A",
    startCardNumber: "032001",
    endCardNumber: "040000",
    numberOfCards: 5000,
    zone: "North North",
    dateIssued: "15/01/2024",
  },
];
