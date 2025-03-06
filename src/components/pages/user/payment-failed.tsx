import { XCircle } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/utils/navigation";
import { ROUTES } from "@/config/route";

const PaymentFailed = () => {
  const { goTo } = useNavigation();
  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className=" w-full max-w-[496px] text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mt-4">Failed Transaction</h2>
        <p className="text-gray-500 text-sm mt-4 mb-8 bg-white rounded-lg border p-6">
          Unfortunately, your transaction did not go through due to network
          issues. Please check your payment method and try again.
        </p>

        
        <Button className="text-white px-10" onClick={() => goTo(ROUTES.PAYMENT)}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailed;
