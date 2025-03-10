import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import StatCard from "@/components/common/app-stats-card";

const data = [
  { name: "OPV", value: 24.3 },
  { name: "Yellow Fever Lifetime", value: 53.1 },
  { name: "Yellow Fever Vaccine", value: 7.4 },
  { name: "Tetanus", value: 5.5 },
  { name: "Small Pox", value: 5.1 },
  { name: "CSM", value: 4.6 },
];

const trendUp = [
  { value: 30 },
  { value: 40 },
  { value: 35 },
  { value: 50 },
  { value: 55 },
];

const trendDown = [
  { value: 60 },
  { value: 55 },
  { value: 50 },
  { value: 45 },
  { value: 40 },
];

const VaccineStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Registered Users Card */}
     
      <StatCard
        title="Registered Users"
        value={775400}
        change="20"
        isPositive={true}
        trendUp={trendDown}
        trendDown={trendUp}
      />

      {/* Vaccinated Users Card */}
      <StatCard
        title="Vaccinated Users"
        value={1672443}
        change="20"
        isPositive={true}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      {/* Bar Chart */}
      <div className="p-4 col-span-1 md:col-span-2">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart layout="vertical" data={data}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="value" fill="#0f9d58" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VaccineStats;
