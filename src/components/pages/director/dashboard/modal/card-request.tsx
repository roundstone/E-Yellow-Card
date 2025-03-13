import React from "react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import AppLevelIndicator from "@/components/common/app-level-indicator";
import AppModal from "@/components/common/modal";
import AssignBatchOfYellowCards from "./assign-batch-yc";
import { toast } from "sonner";

interface CardRequest {
  id: number;
  location: string;
  timestamp: string;
  currentCount: string;
  reorderLevel: "Critical" | "Moderate";
  filledPercentage: number; // Comes from API
}

const cardRequests: CardRequest[] = [
  {
    id: 1,
    location: "Murtala Muhammed International Airport, Lagos",
    timestamp: "Wed 22 Dec 16:08",
    currentCount: "230/3422",
    reorderLevel: "Critical",
    filledPercentage: 50,
  },
  {
    id: 2,
    location: "Maiduguri International Airport, Borno",
    timestamp: "Wed 22 Dec 16:08",
    currentCount: "230/3422",
    reorderLevel: "Critical",
    filledPercentage: 50,
  },
  {
    id: 3,
    location: "Murtala Muhammed International Airport, Lagos",
    timestamp: "Wed 22 Dec 16:08",
    currentCount: "230/3422",
    reorderLevel: "Critical",
    filledPercentage: 50,
  },
  {
    id: 4,
    location: "Murtala Muhammed International Airport, Lagos",
    timestamp: "Wed 22 Dec 16:08",
    currentCount: "230/3422",
    reorderLevel: "Moderate",
    filledPercentage: 30,
  },
  {
    id: 5,
    location: "Lekki Deep Sea Port, Lagos",
    timestamp: "Wed 22 Dec 16:08",
    currentCount: "230/3422",
    reorderLevel: "Critical",
    filledPercentage: 50,
  },
];

const CardRequests: React.FC = () => {
  const [isOpenAssignBatch, setOpenAssignBatch] = React.useState(false);
  const handleAssign = (id: number) => {
    setOpenAssignBatch(true);
  };

  const handleDecline = (id: number) => {
    toast.success(`Decline clicked for ID: ${id}`);
  };

  const newCardContent = (
    <Table className="border-0">
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow className="uppercase text-gray-500 ">
          <TableHead className="w[100px]">Port Health Service Centre</TableHead>
          <TableHead>Date / Time Stamp</TableHead>
          <TableHead>Current No of Cards</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-t-0">
        {cardRequests.map((item, i) => (
          <TableRow key={item.id} className="space-y-3 border-b-0">
            <TableCell className={cn("cursor-pointer text-sm hover:underline")}>
              {item.location}
            </TableCell>
            <TableCell>{item.timestamp}</TableCell>
            <TableCell className="flex items-center space-x-2">
              <AppLevelIndicator
                totalIndicators={3}
                indicator={item.filledPercentage}
                filledColor={
                  item.reorderLevel === "Critical"
                    ? "bg-red-600"
                    : "bg-[#ECD054]"
                }
                emptyColor={
                  item.reorderLevel === "Critical"
                    ? "bg-red-300"
                    : "bg-[#F2F4D8]"
                }
              />
              <span className="font-medium">{item.reorderLevel}</span>
            </TableCell>
            <TableCell className="space-x-2">
              <Button
                className="px-4 py-1 text-white h-8 rounded-md"
                onClick={() => handleAssign(item.id)}
              >
                Assign
              </Button>
              <Button
                className="px-4 py-1 border h-8 bg-white text-gray-800 rounded-md hover:bg-background"
                onClick={() => handleDecline(item.id)}
              >
                Decline
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      <div className="">
        <div>
          <Tabs defaultValue="phs" className="-mt-5">
            <TabsList className="grid grid-cols-2 h-full bg-[#F6F6F6] w-fit rounded-lg p-1">
              <TabsTrigger
                value="phs"
                className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
              >
                New Card Request
              </TabsTrigger>
              <TabsTrigger
                value="state"
                className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
              >
                Card info change requests
              </TabsTrigger>
            </TabsList>

            <div className="overflow-x-auto mt-5">
              <TabsContent value="state">{newCardContent}</TabsContent>
              <TabsContent value="phs">{newCardContent}</TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <AppModal
        open={isOpenAssignBatch}
        setOpen={setOpenAssignBatch}
        title="Assign a Batch of Yellow Cards"
        className="sm:max-w-[712px] bg-white"
      >
        <AssignBatchOfYellowCards onClose={() => setOpenAssignBatch(false)} />
      </AppModal>
    </>
  );
};

export default CardRequests;
