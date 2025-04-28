import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarSeparator } from "@/components/ui/sidebar";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardStats from "./stats-card";
import AlertNotifications from "./alert-notification";
import QuickAction from "./quick-action";
import IssuedCards from "./issued-card";
import AppModal from "@/components/common/modal";
import Comment from "../modal/comment";
import { userAtom } from "@/stores/user";
import { useAtomValue } from "jotai";
import Spinner from "@/components/spinner";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";

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

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
 
  const [isOpenRequestAudit, setOpenRequestAudit] = useState(false);


  const userData = useAtomValue(userAtom);
  
  const [dashboardData, setDashboardData] = useState({});
  const [issuedCardsInfo, setIssuedCardsInfo] = useState({
    currentBatch: {
        used: 3,
        total: 4
    },
    lastBatch: null,
    reorderLevel: "Critical"
  });
  const [alertData, setAlertData] = useState([]);
  const [error, setError] = useState(null);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
  
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("registrar/dashboard/stats", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setDashboardData(response.data);
      console.log(response.data);
      setIssuedCardsInfo(response.data.issuedCardsInfo);
      setAlertData(response.data.alerts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Spinner text="Loading Dashboard..." />;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          { isLoading ? <Loading /> : '' }
          <div className="flex gap-10">
            <div>
              <p className="text-[12px] uppercase">
                PORT HEALTH SERVICE CENTRE
              </p>
              <p className="font-[500] text-base">
                {userData.user.phsLocation}
              </p>
            </div>
            <div>
              <p className="text-[12px] uppercase">State</p>
              <p className="font-[500] text-base">{userData.user.city}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 text-end">
              <div className="flex flex-col">
                <p className="text-[12px] uppercase">ACTIVE PROFILE</p>
                <p className="font-[500] text-base">{userData.user.firstName +" "+userData.user.surName}</p>
              </div>
              <div className="">
                {/* div#D9D9D9 */}
                <img
                  src={userData.user.photo ? userData.user.photo : '/passport.png'}
                  className="w-[37px] h-[38px] rounded-lg"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-end">Active since {formatDate(userData.user.created_at)}</p>
          </div>
        </div>

        <div className="border-b border-dotted h-px" />

        <div>
          <p className="font-[500] text-base mb-2">Stats</p>
          <DashboardStats statData={dashboardData} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <QuickAction />
          <IssuedCards issued={issuedCardsInfo.currentBatch.used} total={issuedCardsInfo.currentBatch.total} lastBatch={issuedCardsInfo.lastBatch} reorderLevel={issuedCardsInfo.reorderLevel} />
          <AlertNotifications alertData={alertData} />
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
