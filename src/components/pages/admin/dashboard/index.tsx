import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useEffect, useState } from "react";
import DashboardStats from "./stats-card";
import CardIssuance from "../../director/dashboard/casrd-issuance";
import VaccineIssuanceChart from "./vaccine-issuance";
import AppTable from "@/components/common/app-table";
import { columns, data } from "../table/users";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/route";
import Leaderboard from "./leader-board";
import VerificationLog from "./verification-log";
import Spinner from "@/components/spinner";
import Loading from "@/components/loading";
import { apiFetch } from "@/utils/api";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/common/modal";
import AddUserForm from "../form/add-user";
import { toast } from "sonner";

type Props = {};

const AdminDashboard = (props: Props) => {
  useDashboardTitle("Dashboard");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [vaccinneData, setVaccineData] = useState({});
  const [rawUserList, setRawUserList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [cardAvailData, setCardAvailData] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState({});
  const [verificationLog, setVerificationLog] = useState({});
  const [userInitialData, setUserInitialData] = useState(null);
  const [error, setError] = useState(null);

  const table = useReactTable({
    data: userList,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleEditClick = () => {
    const userId = localStorage.getItem("currentEditUserId");
    const singleUser = rawUserList.find(user => user.id == userId);
    setUserInitialData({
      surName: singleUser.surName,
      firstName: singleUser.firstName,
      email: singleUser.email,
      city: "",
      phsLocation: "",
      position: singleUser.userType,
    });
    setOpen(true);
  }

  const handleEditUser = async (data) => {
    setIsLoading(true);
    const userId = localStorage.getItem("currentEditUserId");

    if(!userId) {
      toast.error("User Id not found!");
      return;
    }

    try {
      const response = await apiFetch("admin/user/update/"+userId, {
        method: "POST",
        body: JSON.stringify({
          firstName: data.firstName,
          surName: data.surName,
          email: data.email,
          city: data.city,
          phsLocation: data.phsLocation
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        setOpen(false);
        fetchDashboardData();
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to create account.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const formatUsers = (users) => {
    return users.map((data) => {
      return {
        id: data.id,
        name: data.firstName+" "+data.surName,
        email: data.email,
        role: data.userType
      };
    });
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("admin/dashboard/stats", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setDashboardData(response.data);
      setVaccineData(response.data.vaccineIssuance);
      setUserList(formatUsers(response.data.users));
      setRawUserList(response.data.users);
      setCardAvailData(response.data.cardAvailability);
      setLeaderBoardData(response.data.leaderBoard);
      setVerificationLog(response.data.verificationLog);
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
        { isLoading ? <Loading /> : '' }

        {/* Cards Section */}
        <DashboardStats statData={dashboardData} />

        <div className="grid md:grid-cols-2 gap-4 ">
          <VaccineIssuanceChart vaccineHistoryData={dashboardData.vaccineIssuance} />
          <CardIssuance cardAvailability={cardAvailData} cardRequest={dashboardData.cardRequests} zoneAggregatedData={dashboardData.zoneAggregatedData} />
        </div>

        <div>
          <Link
            to={ROUTES.DASHBOARD.SUPERADMIN.USERS}
            className="text-base font-semibold"
          >
            Users
          </Link>
          <Button id="editUserBtn" onClick={handleEditClick} className="text-white hidden">
            Edit User
          </Button>
          <Button id="deleteUserBtn" onClick={() => fetchDashboardData()} className="text-white hidden">
            Delete User
          </Button>
          <div className="mt-4 overflow-x-auto rounded-lg border">
            <AppTable
              table={table}
              className=""
              noResultsMessage="No user found."
              tableCellClassName="px-2"
            />
          </div>
          <AppTablePagination table={table} />
        </div>
        <div className="grid md:grid-cols-2 gap-4 ">
          <Leaderboard leaderboardData={dashboardData.leaderBoard} />
          <VerificationLog VerificationLogData={dashboardData.verificationLog} />
        </div>
      </div>

      <AppModal
        open={open}
        setOpen={setOpen}
        className="sm:max-w-[790px] bg-white"
      >
        <AddUserForm initialData={userInitialData} onSubmit={ handleEditUser } />
      </AppModal>
    </>
  );
};

export default AdminDashboard;
