import { Card, CardContent } from "@/components/ui/card";
import { CircleAlert, CircleUserRound, RefreshCcw, UserRoundPlusIcon } from "lucide-react";
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
    vaccinatedUsers?: {
      count?: number;
      change?: number;
    };
    issuedCards?: {
      count?: number;
      change?: number;
    };
    voidedCards?: {
      count?: number;
      change?: number;
    };
    mostIssuedVaccine?: {
      name?: string;
      change?: number;
    };
  };
}

const DashboardStats = ({ statData }: StatProps) => {
  
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard
        title="Yellow Cards Issued"
        value={statData?.issuedCards?.count ?? 0}
        change={statData?.issuedCards?.change ?? 0}
        isPositive={statData?.issuedCards?.change > 0}
        icon={<BookOpen className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      <StatCard
        title="Vaccinated Users"
        value={statData?.vaccinatedUsers?.count ?? 0}
        change={statData?.vaccinatedUsers?.change ?? 0}
        isPositive={statData?.vaccinatedUsers?.change > 0}
        icon={<CircleUserRound className="text-black w-5 h-5" />}
      />
      <StatCard
        title="Voided Yellow Cards"
        value={statData?.voidedCards?.count ?? 0}
        change={statData?.voidedCards?.change ?? 0}
        isPositive={statData?.voidedCards?.change > 0}
        icon={<CircleAlert className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />
      <StatCard
        title="Most Issued Vaccine"
        value={statData?.mostIssuedVaccine?.name}
        change={statData?.mostIssuedVaccine?.change ?? 0}
        isPositive={statData?.mostIssuedVaccine?.change > 0}
        icon={<RefreshCcw className="text-black w-5 h-5" />}
        trendUp={trendUp}
        trendDown={trendDown}
      />

      
      
    </div>
  );
};

export default DashboardStats;
