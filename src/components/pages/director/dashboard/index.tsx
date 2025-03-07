import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

import DashboardStats from "./stats-card";
import RegisteredUsers from "./reg-users";
import CardIssuance from "./casrd-issuance";
import AlertNotifications from "./alert-notification";
import Leaderboard from "./leader-board";
import AppModal from "@/components/common/modal";
import AssignBatchOfYellowCards from "./modal/assign-batch-yc";
import AuditRequest from "./modal/request-audit";

type Props = {};

const DirectorDashboard = (props: Props) => {
  useDashboardTitle("Dashboard");
  const [isOpenAssignBatch, setOpenAssignBatch] = useState(false);
  const [isOpenRequestAudit, setOpenRequestAudit] = useState(false);
  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <p className="text-gray-500">Welcome back, Umar</p>
          </div>
          <Button
            onClick={() => setOpenAssignBatch(true)}
            className="text-white"
          >
            Assign Batch of YC
          </Button>
        </div>

        {/* Cards Section */}
        <DashboardStats />

        <div className="grid md:grid-cols-2 gap-4 ">
          <div className="flex flex-col gap-4">
            <Card className="bg-[#C3E998] border border-[#9EDC57]">
              <CardHeader>
                <h3 className="text-lg font-semibold">Quick Action</h3>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button className="bg-[#A1CA73] hover:bg-[#A1CA73]/80 font-normal w-full flex justify-between">
                  <span>Assign Batches of Card </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setOpenRequestAudit(true)}
                  className="bg-[#A1CA73] hover:bg-[#A1CA73]/80 font-normal w-full flex justify-between"
                >
                  <span>Request Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            <RegisteredUsers />
          </div>
          <CardIssuance />
        </div>

        <div className="grid md:grid-cols-4 gap-4 ">
          <AlertNotifications />
          <Leaderboard />
        </div>
      </div>

      <AppModal
        open={isOpenAssignBatch}
        setOpen={setOpenAssignBatch}
        title="Assign a Batch of Yellow Cards"
        className="sm:max-w-[712px] bg-white"
      >
        <AssignBatchOfYellowCards onClose={() => setOpenAssignBatch(false)} />
      </AppModal>

      <AppModal
        open={isOpenRequestAudit}
        setOpen={setOpenRequestAudit}
        title="Request audit"
        className="sm:max-w-[957px] bg-white"
      >
        <AuditRequest onClose={() => setOpenRequestAudit(false)} />
      </AppModal>
    </>
  );
};

export default DirectorDashboard;
