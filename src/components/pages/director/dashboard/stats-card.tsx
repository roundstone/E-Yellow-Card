import { Card, CardContent } from "@/components/ui/card";
import { UserRoundPlusIcon } from "lucide-react";
import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

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

const StatCard = ({ title, value, change, isPositive, icon }: any) => {
  return (
    <Card className=" flex-col justify-between bg-white">
      <CardContent>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-gray-700 font-medium text-sm">{title}</span>
          </div>
          <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
        </div>

        <div className="text-3xl font-semibold text-black mt-5">
          {value.toLocaleString()}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div
            className={`text-xs flex items-center ${
              isPositive ? "text-primary" : "text-red-600"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowUpRight className="w-4 h-4 rotate-180" />
            )}
            <span className="ml-1">
              {change}% <span className="text-text">vs last month</span>
            </span>
          </div>
          <ResponsiveContainer width={60} height={40}>
            <LineChart data={isPositive ? trendUp : trendDown}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "#16a34a" : "#dc2626"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mt-6">
      <StatCard
        title="Registered Users"
        value={775400}
        change={40}
        isPositive={true}
        icon={<UserRoundPlusIcon className="text-black w-5 h-5" />}
      />
      <StatCard
        title="Distributed Yellow Cards"
        value={800000}
        change={20}
        isPositive={true}
        icon={<ExternalLink className="text-black w-5 h-5" />}
      />

      <StatCard
        title="Yellow Cards Issued"
        value={122190}
        change={10}
        isPositive={false}
        icon={<BookOpen className="text-black w-5 h-5" />}
      />
      <StatCard
        title="Voided Yellow Cards"
        value={75}
        change={20}
        isPositive={true}
        icon={<ExternalLink className="text-black w-5 h-5" />}
      />
    </div>
  );
};

export default DashboardStats;
