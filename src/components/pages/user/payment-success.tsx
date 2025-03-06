import { useState } from "react";
import { CheckCircle, Copy } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/utils/navigation";
import { ROUTES } from "@/config/route";

const PaymentSuccess = () => {
  const referenceNumber = "MOH/A/123456789001";
  const [copied, setCopied] = useState(false);
  const { goTo } = useNavigation();

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className=" w-full max-w-[1029px] text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold mt-4">Payment Successful</h2>
        <p className="text-gray-500 text-sm mt-1">
          Your transaction was completed successfully
        </p>
        {/* Divider */}
        <div className="my-10 border-t border-dotted border-gray-200"></div>

        {/* Reference Number */}
        <div className="max-w-[537px] mx-auto">
          <p className="font-semibold">
            TEMITOPE, This is your Reference Number
          </p>
          <p className="text-gray-500 text-sm font-light mt-4">
            Below is your reference number, you can take it to the port officers
            or medical personnel to confirm your transaction
          </p>

          {/* Reference Number Input */}
          <div className="relative mt-10">
            <input
              type="text"
              value={referenceNumber}
              readOnly
              className="w-full border rounded-lg px-4 py-2 text-center text-gray-800 font-medium"
            />
            <button
              onClick={handleCopy}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {copied && <p className="text-green-500 text-sm mt-2">Copied!</p>}

          {/* Go Back Home Button */}
          <Button
            className="text-white px-20 mt-10"
            onClick={() => goTo(ROUTES.HOME)}
          >
            Go back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
