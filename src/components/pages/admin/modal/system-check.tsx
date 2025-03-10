import { CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import React from "react";

const SystemCheck = () => {
  const checks = [
    { name: "Special Character", status: "Passed" },
    { name: "Card Availability", status: "Passed" },
    { name: "CSV Header", status: "Failed" },
  ];

  return (
    <div className="-mt-6">
      <div className="font-medium mb-2">Type</div>
      {checks.map((check, index) => (
        <Card
          key={index}
          className="flex flex-row justify-between items-center text-sm p-2 mb-2 bg-gray-100 rounded-lg"
        >
          <div className="">{check.name}</div>
          {check.status === "Passed" ? (
            <CheckCircle className="text-green-600" size={20} />
          ) : (
            <XCircle className="text-red-600" size={20} />
          )}
        </Card>
      ))}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          The uploaded file's header row does not match the expected format.
          Please ensure column headers match our template exactly, including
          case sensitivity and spacing.{" "}
          Common issues include missing required columns, extra columns, or
          variations in header naming (e.g., "First Name" instead of
          "FirstName").{" "}
          <a href="#" className="font-semibold underline">
            Download our template file
          </a>{" "}
          for reference and resubmit after correcting the headers.
        </p>
      </div>
    </div>
  );
};

export default SystemCheck;
