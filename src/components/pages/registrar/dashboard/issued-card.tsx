import IMAGES from "@/assets/images";
import AppLevelIndicator from "@/components/common/app-level-indicator";
import AppModal from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";
import AuditCheck from "../modal/audit-check";
import { toast } from "sonner";

type IssuedCardsProps = {
  issued: number;
  total: number;
  lastBatch: {
    count: number;
    date: string;
    time: string;
    range: string;
  };
  reorderLevel: string;
};

const reorderColors: Record<string, string> = {
  Low: "bg-green-500",
  Medium: "bg-yellow-500",
  Critical: "bg-red-500",
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const IssuedCards: React.FC<IssuedCardsProps> = ({ issued, total, lastBatch, reorderLevel }) => {
  const [isOpeHighVoided, setOpeHighVoided] = React.useState(false);
  return (
    <>
      <Card className="w-full h-full bg-white p-0">
        <CardHeader className="bg-background- border-b py-3">
          <CardTitle className="text-sm uppercase text-[#8E8E93] font-semibold">
            Issued Cards
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex items-center gap-4 ">
            <img
              src={IMAGES.nYellowCardIcon}
              alt="Nigeria Flag"
              className="w-11 h-11"
            />
            <p className="text-[28px] font-bold">
              {issued}<span className="text-[23px] ">/{total}</span>
            </p>
          </div>

          {lastBatch && (
            <p className="text-sm text-gray-600 my-4 border-t border-b border-dotted py-6">
              The last batch of cards assigned to your PHS Centre was{" "}
              <span className="font-semibold">{lastBatch.count}</span> on{" "}
              <span className="font-semibold">
                {formatDate(lastBatch.date)}
              </span>{" "}
              (<span className="font-semibold">{lastBatch.range}</span>)
            </p>
          )}

          <div>
            <h4 className="text-gray-500 text-sm font-semibold">
              REORDER LEVEL
            </h4>
            <div className="flex items-center mt-2">
              <div className="flex gap-1">
                <AppLevelIndicator
                  indicator={25}
                  filledColor={"bg-red-600"}
                  emptyColor={"bg-red-300"}
                />
              </div>
              <span className="ml-2 text-gray-800 font-medium">{reorderLevel}</span>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              onClick={() => toast.success("Request sent successfully")}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
            >
              <span className="text-gray-800">Request</span>
              <ArrowRight className="text-green-600" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default IssuedCards;
