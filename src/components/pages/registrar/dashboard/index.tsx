import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarSeparator } from "@/components/ui/sidebar";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import DashboardStats from "./stats-card";
import AlertNotifications from "./alert-notification";
import QuickAction from "./quick-action";
import IssuedCards from "./issued-card";
import AppModal from "@/components/common/modal";
import Comment from "../modal/comment";

// import DashboardStats from "./stats-card";
// import RegisteredUsers from "./reg-users";
// import CardIssuance from "./casrd-issuance";
// import AlertNotifications from "./alert-notification";
// import Leaderboard from "./leader-board";
// import AppModal from "@/components/common/modal";
// import AssignBatchOfYellowCards from "./modal/assign-batch-yc";
// import AuditRequest from "./modal/request-audit";

type Props = {};

const RegistrarDashboard = (props: Props) => {
  useDashboardTitle("Dashboard");
 
  const [isOpenRequestAudit, setOpenRequestAudit] = useState(false);
  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-10">
            <div>
              <p className="text-[12px] uppercase">
                PORT HEALTH SERVICE CENTRE
              </p>
              <p className="font-[500] text-base">
                Murtala Muhammed International Airport, Lagos
              </p>
            </div>
            <div>
              <p className="text-[12px] uppercase">State</p>
              <p className="font-[500] text-base">Lagos</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 text-end">
              <div className="flex flex-col">
                <p className="text-[12px] uppercase">ACTIVE PROFILE</p>
                <p className="font-[500] text-base">Emmanuel John</p>
              </div>
              <div className="">
                {/* div#D9D9D9 */}
                <img
                  src={IMAGES.jimPassport}
                  className="w-[37px] h-[38px] rounded-lg"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-end">Active since 23, Jan, 2022</p>
          </div>
        </div>

        <div className="border-b border-dotted h-px" />

        <div>
          <p className="font-[500] text-base mb-2">Stats</p>
          <DashboardStats />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <QuickAction />
          <IssuedCards />
          <AlertNotifications />
        </div>
      </div>

      
      {/* 

      <AppModal
        open={isOpenRequestAudit}
        setOpen={setOpenRequestAudit}
        title="Request audit"
        className="sm:max-w-[957px] bg-white"
      >
        <AuditRequest onClose={() => setOpenRequestAudit(false)} />
      </AppModal> */}
    </>
  );
};

export default RegistrarDashboard;
