import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  CircleAlert,
  CircleUserRound,
  UserRoundPlusIcon,
} from "lucide-react";
import React from "react";
import {
  ArrowUpRight,
  BookOpen,
  MoreVertical,
  ExternalLink,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import StatCard from "@/components/common/app-stats-card";

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

const DashboardStats = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mt-6">
      <StatCard
        title="Registered Users"
        value={5000010}
        change={40}
        isPositive={true}
        icon={<CircleUserRound className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      <StatCard
        title="Yellow Cards Issued"
        value={122190}
        change={10}
        isPositive={false}
        icon={<BookOpen className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      <StatCard
        title="Voided Yellow Cards"
        value={7450}
        change={20}
        isPositive={true}
        icon={<CircleAlert className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      <StatCard
        title="Number of Port Health Centres"
        value={30000}
        change={20}
        isPositive={false}
        icon={<Building className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />
    </div>
  );
};

export default DashboardStats;
