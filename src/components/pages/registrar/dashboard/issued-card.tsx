import IMAGES from "@/assets/images";
import AppLevelIndicator from "@/components/common/app-level-indicator";
import AppModal from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React from "react";
import AuditCheck from "../modal/audit-check";

type IssuedCardsProps = {
  issued: number;
  total: number;
  lastBatch: {
    count: number;
    date: string;
    time: string;
    range: string;
  };
  reorderLevel: "Low" | "Medium" | "Critical";
};

const reorderColors: Record<string, string> = {
  Low: "bg-green-500",
  Medium: "bg-yellow-500",
  Critical: "bg-red-500",
};

const IssuedCards: React.FC = () => {
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
              124<span className="text-[23px] ">/{"2424"}</span>
            </p>
          </div>

          <p className="text-sm text-gray-600 my-4 border-t border-b border-dotted py-6">
            The last batch of cards assigned to your PHS Centre was{" "}
            <span className="font-semibold">{3000}</span> on{" "}
            <span className="font-semibold">
              {"24 Jan, 2025"}, {"18:24"}
            </span>{" "}
            (<span className="font-semibold">{"A23000-A5300"}</span>)
          </p>

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
              <span className="ml-2 text-gray-800 font-medium">Critical</span>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button onClick={() => setOpeHighVoided(true)}  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition">
              <span className="text-gray-800">Request</span>
              <ArrowRight className="text-green-600" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <AppModal
        open={isOpeHighVoided}
        setOpen={setOpeHighVoided}
        title="QUERY USER"
        className="sm:max-w-[567px] bg-white"
      >
        <AuditCheck onClose={() => setOpeHighVoided(false)} />
      </AppModal>
    </>
  );
};

export default IssuedCards;
