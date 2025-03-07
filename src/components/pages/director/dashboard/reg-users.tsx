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

const RegisteredUsers = () => {
  const [sortDescending, setSortDescending] = useState(true);
  const [activeTab, setActiveTab] = useState("states");

  const sortedData = [...data].sort((a, b) =>
    sortDescending ? b.count - a.count : a.count - b.count
  );

  const tableStateContent = (
    <div className="mt-3">
      {sortedData.map((item, index) => (
        <div key={index} className="grid grid-cols-3 items-center py-2">
          <div
            className={cn(
              "text-text cursor-pointer",
              index == 0 && "underline"
            )}
          >
            {item.name}
          </div>
          <div className="flex1 mx-3 bg-[#F8F8F8] p-1">
            <div
              className="bg-green-600 h-2 transition-all duration-500"
              style={{
                width: `${Math.min(
                  (item.count / sortedData[0].count) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <div className="font-medium text-end">
            {item.count.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className=" bg-white h-full">
      <CardHeader className="flex-row justify-between items-center border-b px- pb-3">
        <CardTitle className="text-lg font-semibold">
          Registered Users
        </CardTitle>
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

      <CardContent className="">
        <Tabs defaultValue="state" className="">
          <div className="flex justify-between items-center">
            <TabsList className="grid grid-cols-2 h-full bg-[#F6F6F6] w-fit rounded-lg p-1">
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
              className="flex justify-end text-gray-500 text-sm cursor-pointer mt2"
              onClick={() => setSortDescending(!sortDescending)}
            >
              {sortDescending ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <span>Highest to Lowest</span>
            </div>
          </div>
          <TabsContent value="state">{tableStateContent}</TabsContent>
          <TabsContent value="phs">{tableStateContent}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RegisteredUsers;
