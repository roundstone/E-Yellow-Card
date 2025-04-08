import IMAGES from "@/assets/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import React from "react";

// Define TypeScript interface for leaderboard data
// interface LeaderboardData {
//   location: string;
//   totalIssued: number;
//   officer: {
//     name: string;
//     issued: number;
//     location: string;
//   };
// }

// const leaderboard: LeaderboardData = {
//   location: "Lekki Deep Sea Port, Lagos",
//   totalIssued: 13421,
//   officer: {
//     name: "Ahmad Umar",
//     issued: 1233,
//     location: "Illela Border, Sokoto State (Nigeria-Niger Republic)",
//   },
// };

interface LeaderboardCenter {
  center: string;
  count: number | string;
}

interface LeaderboardOfficer {
  officerName: string;
  center: string;
  count: number | string;
}

interface LeaderboardData {
  topCenters?: LeaderboardCenter[];
  topOfficers?: LeaderboardOfficer[];
}

interface LeaderboardProps {
  leaderboard: LeaderboardData;
}

const Leaderboard: React.FC<LeaderboardProps>  = ({ leaderboard }) => {
  const topCenter = leaderboard.topCenters[0];
  const topOfficer = leaderboard.topOfficers[0];

  return (
    <Card className="bg-white w-full p-0 pb-8">
      {/* Header */}
      <CardHeader className="flex-row justify-between items-center border-b py-3">
        <CardTitle className="text-sm font-semibold">Leaderboard</CardTitle>
        <Trophy className="w-5 h-5 text-gray-600" />
      </CardHeader>

      <CardContent>
        {/* Top Location */}
        <div>
          <p className="text-gray500 text-sm font-semibold">#1</p>
          <h3 className="text-md font-light">{topCenter?.center}</h3>
          <p className="text-green-600 text-3xl font-bold">
            {Number(topCenter?.count).toLocaleString()}
          </p>
          <p className="text-gray-600 text-lg">Yellow cards Issued</p>
        </div>

        {/* Divider */}
        <div className="border-t my-4"></div>

        {/* Top Officer */}
        <div>
          <p className="text-sm font-semibold">#1 Officer</p>
          <p className="font-light">
            {topOfficer?.officerName}{" "}
            <em className="text-green-600 underline">
              {topOfficer?.count} issued
            </em>{" "}
            <span className="text-gray-500">
              ({topOfficer?.center})
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="mt-4 bg-secondary rounded-lg h-[54px] relative overflow-hidden">
          <img
            src={IMAGES.multiYellowCard}
            alt="Yellow Cards"
            className="w-[152px] h-auto absolute -top-1 right-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
