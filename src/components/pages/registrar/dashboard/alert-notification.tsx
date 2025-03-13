import AppModal from "@/components/common/modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Comment from "../modal/comment";
import AuditCheck from "../modal/audit-check";
import QueryUser from "../modal/query-user";

type AlertType = "critical" | "warning" | "moderate";

interface Alert {
  id: number;
  type: AlertType;
  action: string;
  details: string;
  timestamp: string;
  onClick?: () => void;
}

const AlertNotifications: React.FC = () => {
  const [isOpenComment, setOpenComment] = React.useState(false);
  const [isOpenAuditCheck, setOpenAuditCheck] = React.useState(false);
  const [isOpenHighVoidCard, setOpenHighVoidCard] = React.useState(false);

  const alerts: Alert[] = [
    {
      id: 1,
      type: "critical",
      action: "Tell us why",
      details: "2311 YC issued since Dec 2024",
      timestamp: "27 Feb, 2025 18:09",
      onClick: () => setOpenComment(true),
    },
    {
      id: 2,
      type: "critical",
      action: "Card Request",
      details: "Submit report",
      timestamp: "27 Feb, 2025 18:09",
      onClick: () => setOpenAuditCheck(true),
    },
    {
      id: 3,
      type: "moderate",
      action: "Card Request",
      details: "High Voided cards",
      timestamp: "27 Feb, 2025 18:09",
      onClick: () => setOpenHighVoidCard(true),
    },
  ];

  return (
    <>
      <Card className="col-span-2 w-full h-full bg-white p-0">
        <CardHeader className="bg-background- border-b py-3">
          <CardTitle className="text-sm uppercase text-[#8E8E93] font-semibold">
            Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-3 text-gray-700 font-semibold py-2 text-sm">
            <span className="text-left">TYPE</span>
            <span className="text-left"> DETAILS </span>
            <span className="text-left">ACTION</span>
          </div>
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={`grid grid-cols-3 py-3 text-sm items-center border- `}
            >
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-8 h-3  ${
                        alert.type === "critical"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <span className="font- capitalize">{alert.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-gray-600 self-start">{alert.details}</div>
              <div>
                <p
                  onClick={alert.onClick}
                  className="text-gray-600 underline cursor-pointer"
                >
                  {alert.action}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <AppModal
        open={isOpenComment}
        setOpen={setOpenComment}
        title="COMMENT"
        className="sm:max-w-[567px] bg-white"
      >
        <Comment type="lowIssuanceRate" onClose={() => setOpenComment(false)} />
      </AppModal>

      <AppModal
        open={isOpenAuditCheck}
        setOpen={setOpenAuditCheck}
        title="COMMENT"
        className="sm:max-w-[567px] bg-white"
      >
        <AuditCheck onClose={() => setOpenAuditCheck(false)} />
      </AppModal>

      <AppModal
        open={isOpenHighVoidCard}
        setOpen={setOpenHighVoidCard}
        title="COMMENT"
        className="sm:max-w-[567px] bg-white"
      >
        <Comment type="highVoidedCards" onClose={() => setOpenHighVoidCard(false)} />
      </AppModal>
    </>
  );
};

export default AlertNotifications;
