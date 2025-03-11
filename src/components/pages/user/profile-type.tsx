import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { useNavigation } from "@/utils/navigation";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

const ProfileType = () => {
  const [selectedOption, setSelectedOption] = useState<"child" | "adult">(
    "adult"
  );
  const { goTo } = useNavigation();

  const handlePayment = () => {
    let route: string | null = null;
    // switch (selectedOption) {
    //     case "adult":
    //         route = ROUTES.PAYMENT_SUCCESS;
    //         toast.success("Payment successful!");
    //         break;
    //     case "child":
    //         route = ROUTES.PAYMENT_INVOICE;
    //         toast.success("Child payment!");
    //         break;
    //     default:
    //         toast.error("Please make a selection!");
    //         return;
    // }
    goTo(`${ROUTES.AUTH.REGISTER}?type=${selectedOption}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen app-container ">
      <div className="bg-white border rounded-xl p-10 w-full max-w-[566px]">
        {/* Header */}
        <div className="max-w-[358px] mx-auto">
        <h2 className="text-xl font-semibold text-center">
          Are you a child or an adult?
        </h2>
        <p className="text-gray-500 text-center text-sm mt-2">
          Please indicate if the person you are registering for is above or
          below 18 years of age
        </p>
        </div>
      

        {/* Payment Options */}
        <div className="mt-6 space-y-4">
          {/* Pay Child Option */}
          <label
            className={`flex items-center p-6 border rounded-lg cursor-pointer transition ${
              selectedOption === "child"
                ? "border-primary"
                : "border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="child"
              checked={selectedOption === "child"}
              onChange={() => setSelectedOption("child")}
              className="hidden"
            />
            <div className="flex items-center">
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                  selectedOption === "child"
                    ? "border-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === "child" && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                )}
              </div>
              <div>
                <p className="font-medium">A Child</p>
                <p className="text-sm text-gray-500">
                  I am below the age of 18 years
                </p>
              </div>
            </div>
          </label>

          {/* Pay Adult Option */}
          <label
            className={`flex items-center p-6 border rounded-lg cursor-pointer transition ${
              selectedOption === "adult"
                ? "border-primary"
                : "border-gray-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="adult"
              checked={selectedOption === "adult"}
              onChange={() => setSelectedOption("adult")}
              className="hidden"
            />
            <div className="flex items-center">
              <div
                className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-3 ${
                  selectedOption === "adult"
                    ? "border-primary"
                    : "border-gray-400"
                }`}
              >
                {selectedOption === "adult" && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                )}
              </div>
              <div>
                <p className="font-medium">An Adult</p>
                <p className="text-sm text-gray-500">
                  I am above the age of 18 years
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

export default ProfileType;
