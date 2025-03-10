import { Button } from "@/components/ui/button";
import { CheckCircle, CircleCheckBig, HelpCircle } from "lucide-react";
import React from "react";

interface ConfirmProps {
  title: string;
  message: string | React.ReactNode;
  type?: "confirm" | "success";
  buttonOne?: () => void;
  buttonTwo?: () => void;
  buttonOneLabel?: string;
  buttonTwoLabel?: string;
  customIcon?: React.ReactNode;
}

const Confirm: React.FC<ConfirmProps> = ({
  title,
  message,
  type = "confirm",
  buttonOne,
  buttonTwo,
  buttonOneLabel = "Cancel",
  buttonTwoLabel = "Confirm",
  customIcon,
}) => {
  // Define default icons & colors based on `type`
  const iconStyles = {
    confirm: {
      bgColor: "bg-[#E5E7ED] ring-8 ring-[#EEF1F8]",
      icon: <HelpCircle className="w-8 h-8 text-gray-400" strokeWidth={2.5} />,
    },
    success: {
      bgColor: "bg-[#D1FADF] ring-8 ring-[#ECFDF3]",
      icon: <CircleCheckBig className="w-8 h-8 text-primary" strokeWidth={2.5} />,
    },
  };

  const { bgColor, icon } = iconStyles[type] || iconStyles.confirm;

  return (
    <div className="">
      {/* Icon */}
      <div className="flex justify-start mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
          {customIcon || icon}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      {/* Message */}
      <div className="mt-2 text-gray-600">{message}</div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 w-full mt-6">
        {buttonOne && (
          <Button
            onClick={buttonOne}
            className="px-8 py-3 border w-full rounded-md bg-transparent hover:bg-gray-100"
          >
            {buttonOneLabel}
          </Button>
        )}
        {buttonTwo && (
          <Button
            onClick={buttonTwo}
            className="w-full px-8 py-3 text-white rounded-md bg-primary hover:bg-primary/90"
          >
            {buttonTwoLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Confirm;
