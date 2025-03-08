import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon,
  trendUp,
  trendDown,
}: any) => {
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

export default StatCard;
