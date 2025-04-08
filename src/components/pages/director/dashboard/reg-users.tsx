import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger,TabsContent } from "@/components/ui/tabs";

interface StateData {
  name: string;
  count: number;
}

const data: StateData[] = [
  { name: "Lagos", count: 220302 },
  { name: "Kano", count: 200302 },
  { name: "Rivers", count: 190302 },
  { name: "FCT", count: 150302 },
  { name: "Yobe", count: 120302 },
  { name: "Nasarawa", count: 120002 },
  { name: "Katsina", count: 9304 },
  { name: "Katsina", count: 9304 },
];

interface UserStatItem {
  name: string;
  count: string | number;
}

interface RegisteredUsersProps {
  byState: UserStatItem[];
  byPhs: UserStatItem[];
}

const RegisteredUsers = ({ byState, byPhs }) => {
  const [sortDescending, setSortDescending] = useState(true);
  const [activeTab, setActiveTab] = useState<"state" | "phs">("state");

  const normalizeData = (data) => {
    return data.map((item) => ({
      name: item.state || item.phsc || "Unknown",
      count: item.count,
    }));
  };

  const sortData = (data: UserStatItem[]) => {
    return [...data].sort((a, b) => {
      const countA = Number(a.count);
      const countB = Number(b.count);
      return sortDescending ? countB - countA : countA - countB;
    });
  };

  // const tableStateContent = (
  //   <div className="mt-3">
  //     {sortedData.map((item, index) => (
  //       <div key={index} className="grid grid-cols-3 items-center py-2">
  //         <div
  //           className={cn(
  //             "text-text cursor-pointer",
  //             index == 0 && "underline"
  //           )}
  //         >
  //           {item.state}
  //         </div>
  //         <div className="flex1 mx-3 bg-[#F8F8F8] p-1">
  //           <div
  //             className="bg-green-600 h-2 transition-all duration-500"
  //             style={{
  //               width: `${Math.min(
  //                 (item.count / sortedData[0].count) * 100,
  //                 100
  //               )}%`,
  //             }}
  //           />
  //         </div>
  //         <div className="font-medium text-end">
  //           {item.count.toLocaleString()}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  const renderTable = (data: UserStatItem[]) => {
    const normalized = normalizeData(data);
    const sortedData = sortData(normalized);

    return (
      <div className="mt-3">
        {sortedData.map((item, index) => (
          <div key={index} className="grid grid-cols-3 items-center py-2">
            <div className={cn("text-text cursor-pointer", index === 0 && "underline")}>
              {item.name}
            </div>
            <div className="flex-1 mx-3 bg-[#F8F8F8] p-1">
              <div
                className="bg-green-600 h-2 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (Number(item.count) / Number(sortedData[0].count)) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <div className="font-medium text-end">
              {Number(item.count).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-white h-full p-0">
      <CardHeader className="flex-row justify-between items-center border-b py-3">
        <CardTitle className="text-sm font-semibold">Registered Users</CardTitle>
        <div className="flex gap-2">
          {["Today", "7d ago", "2w", "1m", "6m", "1y"].map((filter) => (
            <Button
              key={filter}
              className="text-sm bg-gray-100 px-3 py-2 rounded-full hover:text-white"
            >
              {filter}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "state" | "phs")}>
          <div className="flex justify-between items-center">
            <TabsList className="grid grid-cols-2 bg-[#F6F6F6] w-fit rounded-lg p-0">
              <TabsTrigger
                value="state"
                className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
              >
                By States
              </TabsTrigger>
              <TabsTrigger
                value="phs"
                className="text-gray-500 bg-transparent data-[state=active]:bg-white data-[state=active]:border data-[state=active]:font-medium data-[state=active]:text-black py-2"
              >
                By PHS Centres
              </TabsTrigger>
            </TabsList>

            <div
              className="flex justify-end text-gray-500 text-sm cursor-pointer mt-2"
              onClick={() => setSortDescending(!sortDescending)}
            >
              {sortDescending ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <span className="ml-1">Highest to Lowest</span>
            </div>
          </div>

          <TabsContent value="state">
            {activeTab === "state" && renderTable(byState)}
          </TabsContent>
          <TabsContent value="phs">
            {activeTab === "phs" && renderTable(byPhs)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RegisteredUsers;
