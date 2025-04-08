import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { apiFetch } from "@/utils/api";
import { useNavigation } from "@/utils/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import RemitaPaymentUtil from "@/utils/remita";

const Payment = () => {
  const [selectedOption, setSelectedOption] = useState<"offline" | "online">(
    "online"
  );
  const [loading, setLoading] = useState(true);

  const { goTo } = useNavigation();

  setTimeout(()=> {
    setLoading(false);
  }, 3000)

  const userData = sessionStorage.getItem("userData");
  const user = JSON.parse(userData);

  const param = {
    payerEmail: user.email,
    payerName: user.firstName,
    userId: user.userId,
  };

  const initiateTxn = async () => {
    // const storedPayment = sessionStorage.getItem("txnData");
    // if (storedPayment) {
    //   toast.error("Payment already initiated.");
    //   return {
    //     code: -1,
    //     data: JSON.parse(storedPayment)
    //   };
    // }
 
    const endpoint =
      selectedOption === "online" ? "user/remita/initiate" : "user/remita/payment/offline";

    const payload =
      selectedOption === "online"
        ? param
        : { ...param, payerPhone: user.phone };

    try {
      const response = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if(response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong")
      }

      sessionStorage.setItem("txnData", JSON.stringify(response.data));

      toast.success(
        selectedOption === "online"
          ? "Online payment initiated!"
          : "Offline payment request sent!"
      );
      return {
        code: 1,
        data: response.data
      };
    } catch (error) {
      toast.error(error.message || "An error occurred while processing payment.");
      return {
        code: 0,
        data: {}
      };
    }
  };

  const payOnline = async (tnx) => {
    setLoading(true);
    await RemitaPaymentUtil.loadScript(tnx.data.live); // Pass `true` for live environment
    setLoading(false);

    let paymentData = {
      key: tnx.data.key, // enter your key here
      transactionId: tnx.data.tnxid,
      customerId: user.userId,
      firstName: user.firstName,
      lastName: user.surName,
      email: user.email,
      amount: tnx.data.amount,
      narration: "E-Yellowcard Payment",
    };

    let remitaData = {
      ...paymentData,
      onSuccess: async function (response) {
        console.log(response);

        const responseData = response;

        // function callback when payment is successful
        setLoading(true);
        
        try {
          const response = await apiFetch(`user/remita/verify/${responseData.transactionId}`, {
            method: "GET",
          });

          console.log(response);
    
          if (response.statusCode !== 200) {
            throw new Error(response.message || "Something went wrong");
          }
  
          toast.success("Payment verified successfully!");

          setLoading(false);

          console.log("callback Successful Response", response);

          sessionStorage.setItem("txnData", JSON.stringify(response.data));

          // Handle navigation or further logic after successful verification
          goTo(ROUTES.PAYMENT_SUCCESS); // Assuming there's a route for successful verification
        } catch (error) {
          toast.error(error.message || "Verification failed.");
          console.log("Error!", error);
          setLoading(false);
        }
      },
      onError: function (response) {
        // function callback when payment fails
        console.log("callback Error Response", response);
        toast.error("Transaction failed! Try again");
        goTo(ROUTES.PAYMENT_FAILED);
      },
      onClose: function () {
        // function callback when payment modal is closed
        sessionStorage.removeItem("txnData");
        console.log("closed");
        // toast.success("Payment Abandoned!");
      },
    }

    await RemitaPaymentUtil.startPayment(remitaData);
  }

  const handlePayment = async () => {
    setLoading(true);
    const tnx = await initiateTxn();

    if (tnx.code === 0) {
      setLoading(false);
      return;
    }

    console.log(tnx.data);

    let route: string | null = null;

    switch (selectedOption) {
      case "online":
        await payOnline(tnx);
        break;
      case "offline":
        route = ROUTES.PAYMENT_INVOICE;
        toast.success("Offline payment!");
        break;
      default:
        toast.error("Please make a selection!");
        return;
    }
    
    setLoading(false);

    if (route) {
      goTo(route);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] app-container ">
      <div className="bg-white border rounded-xl p-10 w-full max-w-[566px]">
        { loading ? <Loading /> : '' }

        {/* Header */}
        <div className="max-w-[358px] mx-auto">
          <h2 className="text-xl font-semibold text-center">
            How would you like to pay for your Yellow Card?
          </h2>
          <p className="text-gray-500 text-center text-sm mt-2">
            Please choose a payment method that is most convenient for you
          </p>
        </div>

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
