import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Funnel,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const vaccineData = [
  { name: "OPV", percentage: 24.3, value: 40000 },
  { name: "Yellow Fever Lifetime", percentage: 53.1, value: 80000 },
  { name: "Yellow Fever Vaccine", percentage: 7.4, value: 12000 },
  { name: "Tetanus", percentage: 5.5, value: 9000 },
  { name: "Small Pox", percentage: 5.1, value: 8500 },
  { name: "CSM", percentage: 4.6, value: 7200 },
];

export default function VaccineIssuanceChart() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = vaccineData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabContent1 = (
    <>
      {/* Bar Chart */}
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip
              formatter={(value: number) => `${value.toLocaleString()} Issued`}
            />
            <Bar dataKey="value" fill="#16a34a" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
  const tabContent2 = tabContent1;

  return (
    <Card className=" bg-white p-0 overflow-hidden">
      <CardHeader className="bg-background py-3 border-b">
        <CardTitle className="text-sm font-semibold">
          Vaccine Issuance
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Search and Filters */}
        <div className="flex items-center gap-2 mt-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 w-full border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="outline" className="flex items-center gap-2 border">
            <Filter className="w-5 h-5" /> Filters
          </Button>
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
          </div>
          <TabsContent value="state">{tabContent1}</TabsContent>
          <TabsContent value="phs">{tabContent2}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
