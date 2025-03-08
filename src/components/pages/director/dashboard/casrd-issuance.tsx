import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppLevelIndicator from "@/components/common/app-level-indicator";
import AppModal from "@/components/common/modal";
import CardRequests from "./modal/card-request";

interface CardIssuanceData {
  centre: string;
  issued: number;
  total: number;
  reorderLevel: "Critical" | "Great";
  issueCount?: number; // in percentage
}

const generateRandomIssueCount = () => Math.floor(Math.random() * 100) + 1;

const cardIssuanceData: CardIssuanceData[] = [
  {
    centre: "Murtala Muhammed International Airport, Lagos",
    issued: 23001,
    total: 23021,
    reorderLevel: "Critical",
    issueCount: generateRandomIssueCount(),
  },
  {
    centre: "Mallam Aminu Kano International Airport, Kano",
    issued: 2342,
    total: 23021,
    reorderLevel: "Great",
    issueCount: generateRandomIssueCount(),
  },
  {
    centre: "Maiduguri International Airport, Borno",
    issued: 1342,
    total: 23021,
    reorderLevel: "Great",
    issueCount: generateRandomIssueCount(),
  },
  {
    centre: "Lekki Deep Sea Port, Lagos",
    issued: 283,
    total: 23021,
    reorderLevel: "Great",
    issueCount: generateRandomIssueCount(),
  },
  {
    centre: "Lekki Deep Sea Port, Lagos",
    issued: 231,
    total: 23021,
    reorderLevel: "Great",
    issueCount: generateRandomIssueCount(),
  },
  {
    centre: "Illela Border, Sokoto State (Nigeria-Niger Republic)",
    issued: 129,
    total: 23021,
    reorderLevel: "Great",
    issueCount: generateRandomIssueCount(),
  },
];

const CardIssuance = () => {
  const [sortDescending, setSortDescending] = useState(true);
  const [open, setOpen] = useState(false);

  //   const sortedData = [...cardIssuanceData].sort((a, b) =>
  //     sortDescending ? a.issued - b.issued : b.issued - a.issued
  //   );

  const tableStateContent = (
    <Table>
      <TableHeader>
        <TableRow className="uppercase text-gray-500">
          <TableHead className="w-[100px]">PHS Center</TableHead>
          <TableHead>YC Issued</TableHead>
          <TableHead>Recorder Level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {cardIssuanceData.map((item, i) => (
          <TableRow key={item.centre} className="space-y-3">
            <TableCell className={cn("cursor-pointer text-sm hover:underline")}>
              {item.centre}
            </TableCell>
            <TableCell>
              <span className="w/4 text-center font-medium text-gray-500">
                {item.issued.toLocaleString()}/
                <span className="text-gray-700 font-semibold">
                  {item.total.toLocaleString()}
                </span>
              </span>
            </TableCell>
            <TableCell className="w-/4 flex items-center justify-start gap-3">
              <div className="flex space-x-1">
                <AppLevelIndicator
                  indicator={item.issueCount}
                  filledColor={
                    item.reorderLevel === "Critical"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }
                  emptyColor={
                    item.reorderLevel === "Critical"
                      ? "bg-red-300"
                      : "bg-green-300"
                  }
                />
              </div>
              <span className="ml2 font-medium text-sm">
                {item.reorderLevel}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Card className=" bg-white p-0">
        {/* Header */}
        <CardHeader className="flex-row items-center justify-between py-3">
          <CardTitle className="text-sm font-semibold">Card Issuance</CardTitle>
          <div>
            <button onClick={() => setOpen(true)} className="flex items-center space-x-1 text-sm font-medium text-black">
              <span>Requests</span>
              <span className="bg-black text-white px-2 py-1 text-xs rounded-full">
                24
              </span>
            </button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Banner */}
          <div className="bg-black text-white p-4 rounded-md flex items-center justify-between relative">
            <span>Card Availability & Distribution</span>
            <div className="absolute right-[10%] bottom-[0%]">
              <svg
                width="135"
                height="49"
                viewBox="0 0 135 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="95.7749"
                  y="2.98009"
                  width="41"
                  height="54"
                  rx="4.5"
                  transform="rotate(17.3998 95.7749 2.98009)"
                  stroke="#DCDF73"
                />
                <rect
                  x="-0.309533"
                  y="24.1006"
                  width="41"
                  height="54"
                  rx="4.5"
                  transform="rotate(-32.5454 -0.309533 24.1006)"
                  stroke="#DCDF73"
                />
                <rect
                  x="44.83"
                  y="3.00063"
                  width="41"
                  height="54"
                  rx="4.5"
                  transform="rotate(-3.45577 44.83 3.00063)"
                  stroke="#DCDF73"
                />
              </svg>
            </div>
          </div>

          <Tabs defaultValue="phs" className="">
            <div className="flex justify-between items-center py-5">
              <TabsList className="grid grid-cols-2 h-full bg-[#F6F6F6] w-fit rounded-lg p-1">
                <TabsTrigger
                  value="phs"
                  className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
                >
                  By PHS Centres
                </TabsTrigger>
                <TabsTrigger
                  value="state"
                  className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
                >
                  By States
                </TabsTrigger>
              </TabsList>
              <div
                className="flex justify-end text-gray-500 text-sm cursor-pointer mt2"
                onClick={() => setSortDescending(!sortDescending)}
              >
                {sortDescending ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>Critical to Great</span>
              </div>
            </div>
            <TabsContent value="state">{tableStateContent}</TabsContent>
            <TabsContent value="phs">{tableStateContent}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AppModal open={open} setOpen={setOpen} title="Manage Card Requests" className="sm:max-w-[1153px] bg-white">
        <CardRequests />
      </AppModal>
    </>
  );
};

export default CardIssuance;
