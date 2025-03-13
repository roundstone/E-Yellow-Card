import AppModal from "@/components/common/modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search } from "lucide-react";
import React from "react";
import QueryUser from "../modal/query-user";
import verifyTransaction from "../modal/verify-transaction";
import VerifyTransaction from "../modal/verify-transaction";
import { toast } from "sonner";

type ActionItem = {
  label: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

const QuickAction: React.FC = () => {
  const [isOpenQueryUser, setOpenQueryUser] = React.useState(false);
  const [isOpenVerifyTransaction, setOpenVerifyTransaction] =
    React.useState(false);

  const actions: ActionItem[] = [
    {
      label: "Query User",
      icon: <Search className="text-green-600" />,
      onClick: () => setOpenQueryUser(true),
    },
    {
      label: "Issue Yellow Card",
      icon: <ArrowRight className="text-green-600" />,
      onClick: () => console.log("Issue Yellow Card clicked"),
    },
    {
      label: "Request Yellow Card",
      icon: <ArrowRight className="text-green-600" />,
      onClick: () => {
        toast.success("Request sent successfully");
      },
    },
    {
      label: "Verify a Remita Transaction",
      icon: <ArrowRight className="text-green-600" />,
      onClick: () => setOpenVerifyTransaction(true),
    },
  ];

  return (
    <>
      <Card className="w-full h-full bg-white p-0 overflow-hidden">
        <div className="bg-[#525D46] text-white p-6 border-b flex flex-col relative overflow-hidden">
          <p className="font-normal text-[14px]">Manage port operations with</p>
          <p className="font-normal text-[14px]">complete oversight</p>
          {/* <div className="bg-[#D5D51D] w-12 h-16 mr-3 -rotate-12"></div> */}
          <div className="bg-[#E1E122] w-12 h-16 absolute -bottom-6 right-[12%] rotate-12 rounded-lg border border-primary" />
          <div className="bg-[#E1E122] w-12 h-16 absolute -bottom-7 right-[16%] rotate-12 rounded-lg border border-primary" />
          <div className="bg-[#E1E122] w-12 h-16 absolute -bottom-8 right-[20%] rotate-12 rounded-lg border border-primary" />
        </div>
        <CardContent className="">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="my-4 space-y-3 overflow-y-scroll">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className=" text-start flex justify-between items-center w-full bg-background p-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
              >
                <span className="text-gray-800">{action.label}</span>
                {action.icon}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <AppModal
        open={isOpenQueryUser}
        setOpen={setOpenQueryUser}
        title="QUERY USER"
        className="sm:max-w-[567px] bg-white"
      >
        <QueryUser onClose={() => setOpenQueryUser(false)} />
      </AppModal>

      <AppModal
        open={isOpenVerifyTransaction}
        setOpen={setOpenVerifyTransaction}
        className="sm:max-w-[790px] bg-white"
      >
        <VerifyTransaction onClose={() => setOpenVerifyTransaction(false)} />
      </AppModal>

      {/* <AppModal
        open={isOpeHighVoided}
        setOpen={setOpeHighVoided}
        title="QUERY USER"
        className="sm:max-w-[567px] bg-white"
      >
        <AuditCheck onClose={() => setOpeHighVoided(false)} />
      </AppModal> */}
    </>
  );
};

export default QuickAction;
