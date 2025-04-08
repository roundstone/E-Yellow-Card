import { Download, Printer, XCircle } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import { Link } from "react-router-dom";
import IMAGES from "@/assets/images";
import { useNavigation } from "@/utils/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PaymentInvoice = () => {
  const { goTo } = useNavigation();
  const invoiceRef = useRef<HTMLDivElement>(null);

  const userData = sessionStorage.getItem("userData");
  const user = JSON.parse(userData);

  const txnData = sessionStorage.getItem("txnData");
  const txn = JSON.parse(txnData);

  const referenceNumber = txn.rrr;

  // Function to download invoice as PDF
  const downloadInvoice = () => {
    if (!invoiceRef.current) return;

    html2canvas(invoiceRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.6);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("YellowCard_Payment_Invoice.pdf");
    });
  };

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
          <div className="w-[865px] border bg-[#F3F3F3] rounded-lg flex justify-center py-6">
            {/* Custom Invoice Design */}
            <div className="bg-white p-6 rounded-lg w-full max-w-[800px]" ref={invoiceRef}>
              <h3 className="text-xl font-bold text-center mt-6 mb-10">
                PORT HEALTH
              </h3>
              <p className="text-end text-sm">Payment Invoice</p>
              <p className="text-end text-sm">Generate on (14-06-19)</p>
              <div className="mt-4 p-4 rounded-md bg-lime-50 mb-4 text-end">
                <p className="font-semibold">Remita Retrieval Reference (RRR):</p>
                <p className="text-lg font-bold text-green-600">{referenceNumber}</p>
              </div>

              <div className="mt-6 text-start mb-10">
                <h4 className="font-semibold text-lg mb-3 p-4 bg-lime-50">Payer Information</h4>
                <div className="bg-lime-50 p-4">
                  <p>Name: {user.firstName} {user.surName}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                </div>
              </div>

              <div className="mt-6 text-start">
                <h4 className="font-semibold text-lg mb-3 px-4 py-2 bg-lime-50">Payment Details</h4>
                <table className="w-full text-sm border mt-2 bg-lime-50">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Date</th>
                      <th className="p-2">Payment Ref</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Charges</th>
                      <th className="p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">{txn.created_at}</td>
                      <td className="p-4">{referenceNumber}</td>
                      <td className="p-4">{txn.description}</td>
                      <td className="p-4">₦{txn.amount}</td>
                      <td className="p-4">₦0</td>
                      <td className="p-4">₦{txn.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-right mb-10 bg-lime-50 p-3">
                <p className="font-bold text-red-500">Balance Due: ₦{txn.amount}</p>
              </div>
            </div>
          </div>

          {/* Actions - Print & Download */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              className="!bg-transparent border-primary border text-primary px-6 h-[50px] hover:bg-gray-300"
              onClick={() => window.print()}
            >
              Print Invoice
            </Button>
            <Button className="px-6 h-[50px] text-white" onClick={downloadInvoice} >
              Download Invoice
            </Button>
          </div>

          {/* Back Link */}
          <div className="text-center mt-5 mb-20">
            {/* <Link
              to={ROUTES.HOME}
              className="text-text text-sm underline hover:text-text/60"
            >
              Go back home
            </Link> */}
            <Button
              className="text-white px-20 mt-10"
              onClick={() => {
                sessionStorage.clear();
                goTo(ROUTES.HOME);
              }}
            >
              Go back Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;
