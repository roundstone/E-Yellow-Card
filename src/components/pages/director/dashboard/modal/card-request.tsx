import React, { useState } from "react";
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
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";

interface CardRequest {
  id: number;
  location: string;
  timestamp: string;
  currentCount: string;
  reorderLevel: "Critical" | "Moderate";
  filledPercentage: number; // Comes from API
}

// const cardRequests: CardRequest[] = [
//   {
//     id: 1,
//     location: "Murtala Muhammed International Airport, Lagos",
//     timestamp: "Wed 22 Dec 16:08",
//     currentCount: "230/3422",
//     reorderLevel: "Critical",
//     filledPercentage: 50,
//   },
//   {
//     id: 2,
//     location: "Maiduguri International Airport, Borno",
//     timestamp: "Wed 22 Dec 16:08",
//     currentCount: "230/3422",
//     reorderLevel: "Critical",
//     filledPercentage: 50,
//   },
//   {
//     id: 3,
//     location: "Murtala Muhammed International Airport, Lagos",
//     timestamp: "Wed 22 Dec 16:08",
//     currentCount: "230/3422",
//     reorderLevel: "Critical",
//     filledPercentage: 50,
//   },
//   {
//     id: 4,
//     location: "Murtala Muhammed International Airport, Lagos",
//     timestamp: "Wed 22 Dec 16:08",
//     currentCount: "230/3422",
//     reorderLevel: "Moderate",
//     filledPercentage: 30,
//   },
//   {
//     id: 5,
//     location: "Lekki Deep Sea Port, Lagos",
//     timestamp: "Wed 22 Dec 16:08",
//     currentCount: "230/3422",
//     reorderLevel: "Critical",
//     filledPercentage: 50,
//   },
// ];

function transformCardRequests(originalData) {
  return originalData.map(item => {
    // Calculate filled percentage
    const filledPercentage = Math.round((item.currentCardCount / item.totalCardCapacity) * 100);
    
    // Determine reorder level based on card count
    // Assuming below 20% is Critical, otherwise Moderate
    const reorderLevel = filledPercentage < 20 ? "Critical" : "Moderate";
    
    // Format the timestamp to the required format
    const date = new Date(item.timestamp);
    const formattedDate = date.toDateString().split(' ').slice(0, 3).join(' ') + " " + 
                         String(date.getHours()).padStart(2, '0') + ":" + 
                         String(date.getMinutes()).padStart(2, '0');
    
    return {
      id: item.id,
      location: item.portHealthServiceCentre,
      timestamp: formattedDate,
      currentCount: `${item.currentCardCount}/${item.totalCardCapacity}`,
      reorderLevel: reorderLevel,
      filledPercentage: filledPercentage
    };
  });
}

const CardRequests = ({requests}) => {
  const [isOpenAssignBatch, setOpenAssignBatch] = React.useState(false);

  const handleAssign = (id: number) => {
    setOpenAssignBatch(true);
    localStorage.setItem('requestId', id.toString());
  };

  const handleAssignPro = async () => {
    const id2 = localStorage.getItem('requestId');
    setIsLoading(true);
    try {
      const response = await apiFetch("director/card-request/update", {
        method: "POST",
        body: JSON.stringify({
          requestId: id2,
          status: "Approved"
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        toast.success(`Approved a request!`);
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to approve request.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const cardRequests: CardRequest[] = transformCardRequests(requests);

  const handleDecline = async (phs, id) => {
    setIsLoading(true);
    try {
      const response = await apiFetch("director/card-request/update", {
        method: "POST",
        body: JSON.stringify({
          requestId: id,
          status: "Declined"
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        toast.success(`Declined request from: ${phs}`);
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to decline request.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
                onClick={() => handleDecline(item.location, item.id)}
              >
                Decline
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const handleAssignBatch = async (data) => {
      setIsLoading(true);
      try {
        const response = await apiFetch("director/yellowcard/assign", {
          method: "POST",
          body: JSON.stringify({
            code: data.cardCode,
            quantity: data.quantity,
            type: data.type,
            state: data.state,
            zone: data.zone,
            phsc: data.port
          }),
        });
  
        console.log(response);
  
        if (response.statusCode == 200) {
          setOpenAssignBatch(false);
          toast.success("The card range has been assigned to "+data.port);
          handleAssignPro();
        }
  
        return response;
      } catch (error) {
        toast.error(error.message || "Failed to assign batch.");
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <>
      <div className="">
        { isLoading ? <Loading /> : '' }
        <div>
          <Tabs defaultValue="phs" className="-mt-5">
            <TabsList className="grid grid-cols-1 h-full bg-[#F6F6F6] w-fit rounded-lg p-1">
              <TabsTrigger
                value="phs"
                className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
              >
                New Card Request
              </TabsTrigger>
              {/* <TabsTrigger
                value="state"
                className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
              >
                Card info change requests
              </TabsTrigger> */}
            </TabsList>

            <div className="overflow-x-auto mt-5">
              <TabsContent value="phs">{newCardContent}</TabsContent>
              {/* <TabsContent value="state">{newCardContent}</TabsContent> */}
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
        <AssignBatchOfYellowCards onSubmit={handleAssignBatch} onClose={() => setOpenAssignBatch(false)} />
      </AppModal>
    </>
  );
};

export default CardRequests;
