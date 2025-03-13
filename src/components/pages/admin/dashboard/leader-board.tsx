import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon, Trophy, XCircleIcon } from "lucide-react";
import { useState } from "react";
import React from "react";

const leaderboardData = [
  {
    name: "Lekki Deep Sea Port, Lagos",
    image: IMAGES.yellowCardImage,
    score: 220302,
    progress: 40,
  },
  {
    name: "Maiduguri International Airport, Borno",
    image: IMAGES.yellowCardImage,
    score: 220302,
    progress: 50,
  },
  {
    name: "Mallam Aminu Kano International Airport, Kano",
    image: IMAGES.yellowCardImage,
    score: 220302,
    progress: 30,
  },
  {
    name: "Illela Border, Sokoto State (Nigeria-Niger Republic)",
    image: IMAGES.yellowCardImage,
    score: 220302,
    progress: 60,
  },
  {
    name: "Illela Border, Sokoto State (Nigeria-Niger Republic)",
    image: IMAGES.vaccine,
    score: 220302,
    progress: 25,
  },
];

export default function Leaderboard() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <Card className=" bg-white p-0 pb-5 overflow-hidden">
      <CardHeader className="p-0 py3 bg-background border-b">
        <CardTitle className="text-sm font-semibold border-b px-6 py-5">
          Leaderboard
        </CardTitle>

        <div className="flex items-center justify-between  px-6 py-3">
          <div className="text-[#8E8E93] font-semibold">PERFORMANCE</div>
          <div className="flex gap-2">
            {["Today", "7d ago", "2w", "1m", "6m", "1y"].map((filter) => (
              <Button
                key={filter}
                className={`text-sm bg-gray-100 px-3 py-2 rounded-full hover:text-white ${
                  selectedFilter === filter
                    ? "bg-primary text-white"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="w-full mt-4 flex gap-6">
        <div className="bg-[#47513D] w-[109px] h[254px] rounded-lg flex flex-col justify-center items-center space-y-28">
          <p className="text-center text-white font-semibold">Who’s leading?</p>
          <div style={{ transform: "rotate(9.42deg)" }}>
            <Trophy className="w-[56px] h-[56px] text-[#D3D537] mx-auto" />
          </div>
        </div>
        <div className="w-full">
          {leaderboardData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b"
            >
              <div className="flex gap-6 items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>

                <div className=" space-y-2">
                  <div className="text-sm">{item.name}</div>
                  <div className="w-[227px] bg-gray-200  h-2 overflow-hidden">
                    <div
                      className="bg-green-600 h-2"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-medium">
                  {item.score.toLocaleString()}
                </span>
              </div>
              {/*  */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
