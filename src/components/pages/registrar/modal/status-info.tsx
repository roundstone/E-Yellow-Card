import React from "react";
import { Button } from "@/components/ui/button";
import { CircleAlert, CircleCheckBig } from "lucide-react";

export default function StatusInfo({
  onClose,
  statusType,
}: {
  onClose: () => void;
  statusType: "success" | "failed";
}) {
  const iconStyles = {
    failed: {
      bgColor: "bg-[#FEE4E2] ring-8 ring-[#FEF3F2]",
      icon: <CircleAlert className="w-8 h-8 text-danger" strokeWidth={2.5} />,
    },
    success: {
      bgColor: "bg-[#D1FADF] ring-8 ring-[#ECFDF3]",
      icon: (
        <CircleCheckBig className="w-8 h-8 text-primary" strokeWidth={2.5} />
      ),
    },
  };

  const { bgColor, icon } = iconStyles[statusType] || iconStyles.success;

  return (
    <>
      <div className="py-6">
        <div className="flex justify-center mb-4">
          <div
            className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>
        </div>

        <h2 className="text-lg font-semibold text-center">
          {statusType == "success"
            ? "Payment Successful!"
            : "Payment Not Found"}
        </h2>
        <p className="text-sm text-gray-500 text-center">
          {statusType == "success"
            ? "The user’s payment has been received and processed successfully."
            : "No matching transaction was found. Please check your details or complete the payment."}
        </p>
        <div className="flex gap-3 justify-center mt-6">
          {statusType == "success" ? (
            <Button onClick={onClose} className="px-10 text-white">
              Done
            </Button>
          ) : (
            <>
              <Button
                onClick={onClose}
                className="px-8 py-3 border w- rounded-md bg-transparent hover:bg-background"
              >
                Cancel
              </Button>

              <Button onClick={onClose} className="px-8 text-white">
                Try Again
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
