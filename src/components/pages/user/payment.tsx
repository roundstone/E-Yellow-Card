import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { useNavigation } from "@/utils/navigation";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState<"offline" | "online">(
    "online"
  );
  const { goTo } = useNavigation();

  const handlePayment = () => {
    let route: string | null = null;

    switch (selectedOption) {
      case "online":
        route = ROUTES.PAYMENT_SUCCESS;
        toast.success("Payment successful!");
        break;
      case "offline":
        route = ROUTES.PAYMENT_INVOICE;
        toast.success("Offline payment!");
        break;
      default:
        toast.error("Please make a selection!");
        return;
    }

    if (route) {
      goTo(route);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen app-container ">
      <div className="bg-white border rounded-xl p-10 w-full max-w-[566px]">
        {/* Header */}
        <h2 className="text-xl font-semibold text-center">
          How would you like to pay for your Yellow Card?
        </h2>
        <p className="text-gray-500 text-center text-sm mt-2">
          Please choose a payment method that is most convenient for you
        </p>

        {/* Payment Options */}
        <div className="mt-6 space-y-4">
          {/* Pay Online Option */}
          <label
            className={`flex items-center p-6 border rounded-lg cursor-pointer transition ${
              selectedOption === "online"
                ? "border-primary"
                : "border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="online"
              checked={selectedOption === "online"}
              onChange={() => setSelectedOption("online")}
              className="hidden"
            />
            <div className="flex items-center">
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                  selectedOption === "online"
                    ? "border-green-500"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === "online" && (
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                )}
              </div>
              <div>
                <p className="font-medium">Pay Online</p>
                <p className="text-sm text-gray-500">
                  Choose to pay online through Remita
                </p>
              </div>
            </div>
          </label>

          {/* Pay Offline Option */}
          <label
            className={`flex items-center p-6 border rounded-lg cursor-pointer transition ${
              selectedOption === "offline"
                ? "border-primary"
                : "border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="offline"
              checked={selectedOption === "offline"}
              onChange={() => setSelectedOption("offline")}
              className="hidden"
            />
            <div className="flex items-center">
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                  selectedOption === "offline"
                    ? "border-green-500"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === "offline" && (
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                )}
              </div>
              <div>
                <p className="font-medium">Pay Offline</p>
                <p className="text-sm text-gray-500">
                  Choose to pay offline through a bank branch
                </p>
              </div>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <Button className="mt-6 w-full h-11 text-white" onClick={handlePayment}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Payment;
