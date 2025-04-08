import { Card, CardContent } from "@/components/ui/card";
import { CircleAlert, CircleUserRound, UserRoundPlusIcon } from "lucide-react";
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

interface StatProps {
  statData?: {
    registeredUsers?: {
      total?: number;
      percentageChange?: number;
      trend?: string;
    };
    distributedCards?: {
      total?: number;
      percentageChange?: number;
      trend?: string;
    };
    issuedCards?: {
      total?: number;
      percentageChange?: number;
      trend?: string;
    };
    voidedCards?: {
      total?: number;
      percentageChange?: number;
      trend?: string;
    };
  };
}

const DashboardStats = ({ statData }: StatProps) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mt-6">
      <StatCard
        title="Registered Users"
        value={statData?.registeredUsers?.total ?? 0}
        change={statData?.registeredUsers?.percentageChange ?? 0}
        isPositive={statData?.registeredUsers?.trend === "up"}
        icon={<CircleUserRound className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      <StatCard
        title="Distributed Yellow Cards"
        value={statData?.distributedCards?.total ?? 0}
        change={statData?.distributedCards?.percentageChange ?? 0}
        isPositive={statData?.distributedCards?.trend === "up"}
        icon={<ExternalLink className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      <StatCard
        title="Yellow Cards Issued"
        value={statData?.issuedCards?.total ?? 0}
        change={statData?.issuedCards?.percentageChange ?? 0}
        isPositive={statData?.issuedCards?.trend === "up"}
        icon={<BookOpen className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      <StatCard
        title="Voided Yellow Cards"
        value={statData?.voidedCards?.total ?? 0}
        change={statData?.voidedCards?.percentageChange ?? 0}
        isPositive={statData?.voidedCards?.trend === "up"}
        icon={<CircleAlert className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />
    </div>
  );
};

export default DashboardStats;
