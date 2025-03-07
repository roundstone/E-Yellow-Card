import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React  from "react";

type AlertType = "critical" | "warning" | "info";

interface Alert {
  id: number;
  type: AlertType;
  action: string;
  details: string;
  location: string;
  timestamp: string;
  requester?: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    type: "critical",
    action: "Exceedingly low issuance rate",
    details: "2311 YC issued since Dec 2024",
    location: "Murtala Muhammed International Airport, Lagos",
    timestamp: "27 Feb, 2025 18:09",
  },
  {
    id: 2,
    type: "critical",
    action: "Card Request",
    details: "New card request",
    location: "Illela Border, Sokoto State (Nigeria-Niger Republic)",
    timestamp: "27 Feb, 2025 18:09",
    requester: "Ahmed Idaholo",
  },
];

const AlertNotifications: React.FC = () => {
  return (
    <Card className="col-span-3 w-full h-full bg-white">
      <CardHeader className="bg-background- border-b">
        <CardTitle className="text-xl font-semibold">
          Alerts & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-3 text-gray-700 font-semibold py-2 text-sm">
          <span className="text-left">TYPE</span>
          <span className="text-left">ACTION</span>
          <span className="text-left">DETAILS</span>
        </div>
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className={`grid grid-cols-3 py-4 text-sm items-center border-t `}
          >
            <div className="flex items-center space-x-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-3  ${
                      alert.type === "critical" ? "bg-red-500" : "bg-blue-500"
                    }`}
                  />
                  <span className="font-semibold capitalize">{alert.type}</span>
                </div>
                <span className="text-gray-500 text-xs">{alert.timestamp}</span>
              </div>
            </div>
            <div className="text-gray-600 self-start">{alert.action}</div>
            <div>
              <p className="font-semibold underline">{alert.location}</p>
              <p className="text-gray-500">{alert.details}</p>
              {alert.requester && (
                <p className="text-gray-500 text-xs">by {alert.requester}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertNotifications;
