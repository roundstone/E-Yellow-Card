import { Download, Printer, XCircle } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { Link } from "react-router-dom";
import IMAGES from "@/assets/images";

const PaymentInvoice = () => {
  return (
    <div className="flex justify-center items-center min-h-screen  pt-10 p-4">
      <div className=" w-full max-w-[865px] text-center">
        
        <div className="w-full max-w-[569px] mx-auto ">
          <h2 className="text-lg font-semibold text-center">
            Proceed to the Bank to complete Payment
          </h2>
          <p className="text-sm text-text">
            This payment invoice can be fulfilled at your closest Bank or
            financial institution. Bank Transactions through Remita are
            processed within 24-48 hours.
          </p>
        </div>
        {/* Invoice Container */}
        <div className="flex flex-col w-full items-center mt-10">
          <div className="w-[865px] h-[893px] border bg-[#F3F3F3] rounded-lg flex justify-center items-center">
            <img src={IMAGES.invoiceSample} alt="" className="rounded-lg" />
          </div>

          {/* Actions - Print & Download */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              className="!bg-transparent border-primary border  text-primary px-6 h-[50px] hover:bg-gray-300"
              onClick={() => window.print()}
            >
              Print Invoice
            </Button>
            <Button className="px-6 h-[50px] text-white ">
              Download Invoice
            </Button>
          </div>

          {/* Back Link */}
          <div className="text-center mt-5">
            <Link
              to={ROUTES.HOME}
              className="text-text text-sm underline hover:text-text/60"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;
