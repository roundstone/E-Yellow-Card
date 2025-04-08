import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import DashboardStats from "./stats-card";
import RegisteredUsers from "./reg-users";
import CardIssuance from "./casrd-issuance";
import AlertNotifications from "./alert-notification";
import Leaderboard from "./leader-board";
import AppModal from "@/components/common/modal";
import AssignBatchOfYellowCards from "./modal/assign-batch-yc";
import AuditRequest from "./modal/request-audit";
import { useAtomValue } from "jotai";
import { userAtom } from "@/stores/user";
import { toast } from "sonner";
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";
import Spinner from "@/components/spinner";

type Props = {};

const DirectorDashboard = (props: Props) => {
  useDashboardTitle("Dashboard");
  const [isOpenAssignBatch, setOpenAssignBatch] = useState(false);
  const [isOpenRequestAudit, setOpenRequestAudit] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userData = useAtomValue(userAtom);

  const [dashboardData, setDashboardData] = useState({});
  const [regUserStateData, setRegUserStateData] = useState({});
  const [regUserPhsData, setRegUserPhsData] = useState({});
  const [cardAvailData, setCardAvailData] = useState([]);
  const [alertData, setAlertData] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState({});
  const [error, setError] = useState(null);

  const handleAssignBatch = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiFetch("director/yellowcard/assign", {
        method: "POST",
        body: JSON.stringify({
          code: data.cardCode,
          quantity: data.quantity,
          type: data.type,
          state: data.state,
          zone: data.zone,
          phsc: data.port
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        setOpenAssignBatch(false);
        toast.success("The card range has been assigned to "+data.port);
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to assign batch.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("director/dashboard/stats", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setDashboardData(response.data);
      setRegUserStateData(response.data.registeredUsersByState);
      setRegUserPhsData(response.data.registeredUsersByPhs);
      setCardAvailData(response.data.cardAvailability);
      setAlertData(response.data.alerts);
      setLeaderBoardData(response.data.leaderboard);
      console.log(dashboardData);
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

          <div>
            <h1 className="text-2xl font-semibold">Analytics</h1>
            <p className="text-gray-500">Welcome back, {userData.user.firstName}</p>
          </div>
          <Button
            onClick={() => setOpenAssignBatch(true)}
            className="text-white"
          >
            Assign Batch of YC
          </Button>
        </div>

        {/* Cards Section */}
        <DashboardStats statData={dashboardData} />

        <div className="grid md:grid-cols-2 gap-4 ">
          <div className="flex flex-col gap-4">
            <Card className="bg-[#C3E998] border border-[#9EDC57]">
              <CardHeader>
                <h3 className="text-lg font-semibold">Quick Action</h3>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button onClick={() => setOpenAssignBatch(true)} className="bg-[#A1CA73] hover:bg-[#A1CA73]/80 font-normal w-full flex justify-between">
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
            <RegisteredUsers byState={regUserStateData} byPhs={regUserPhsData} />
          </div>
          <CardIssuance cardAvailability={cardAvailData} />
        </div>

        <div className="grid md:grid-cols-4 gap-4 ">
          <AlertNotifications alerts={alertData} />
          <Leaderboard leaderboard={leaderBoardData} />
        </div>
      </div>

      <AppModal
        open={isOpenAssignBatch}
        setOpen={setOpenAssignBatch}
        title="Assign a Batch of Yellow Cards"
        className="sm:max-w-[712px] bg-white"
      >
        <AssignBatchOfYellowCards onSubmit={handleAssignBatch} onClose={() => setOpenAssignBatch(false)} />
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
