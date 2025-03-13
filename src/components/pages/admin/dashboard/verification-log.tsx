import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon, Trophy, XCircleIcon } from "lucide-react";
import React from "react";

const verificationLogs = [
  { name: "DAVID IBRAHIM", ycNumber: "A08116403", status: "approved" },
  { name: "PETER BALA", ycNumber: "A0806444", status: "approved" },
  { name: "TOBILOBA FOLARIN", ycNumber: "A08002311", status: "failed" },
  { name: "CHUKWUMA OKECHUKWU", ycNumber: "A0819223", status: "approved" },
  { name: "NAOMI ANOZIE", ycNumber: "A0704240", status: "approved" },
];

export default function VerificationLog() {
  return (
    <Card className="bg-white p-0 pb-5">
      <CardHeader className="flex-row items-center justify-between py-3 border-b bg-background">
        <CardTitle className="text-sm font-semibold">
          Verification Logs
        </CardTitle>
        <span className="bg-black text-white text-sm px-3 py- rounded-lg">
          {verificationLogs.length}
        </span>
      </CardHeader>

      {/* Logs List */}
      <CardContent className="mt-4">
        <div className="grid grid-cols-3 text-gray-500 text-sm font-medium pb-2 -b mb-10">
          <span>NAME</span>
          <span>YC NUMBER</span>
          <span>STATUS</span>
        </div>

        {verificationLogs.map((log, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center py-5 border-b"
          >
            <span className="text-gray-700 font-medium">{log.name}</span>
            <span className="text-gray-800">{log.ycNumber}</span>
            {log.status === "approved" ? (
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            ) : (
              <XCircleIcon className="w-5 h-5 text-red-600" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
