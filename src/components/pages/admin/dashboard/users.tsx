import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import { data, columns } from "../table/users";
import AppModal from "@/components/common/modal";
import AddUserForm from "../form/add-user";
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import Loading from "@/components/loading";

const AdminUsers = () => {
  useDashboardTitle("Users");
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [userData, setUserData] = useState([]);
  const [rawUserData, setRawUserData] = useState([]);
  const [userInitialData, setUserInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const table = useReactTable({
    data: userData,
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

  const handleAddUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiFetch("admin/user/create", {
        method: "POST",
        body: JSON.stringify({
          firstName: data.firstName,
          surName: data.surName,
          email: data.email,
          userType: data.position,
          city: data.city,
          phsLocation: data.phsLocation,
          password: "12345678",
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        setOpen(false);
        fetchUsers();
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to create account.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
        fetchUsers();
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to create account.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditClick = () => {
    const userId = localStorage.getItem("currentEditUserId");
    const singleUser = rawUserData.find(user => user.id == userId);
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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("admin/users", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setUserData(formatUsers(response.data));
      setRawUserData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Spinner text="Loading Admin Users..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="space-y-10">
        <div className="mt-4 flex justify-between items-center ">
          { isLoading ? <Loading /> : '' }

          <div>
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-gray-600">Overview of all users.</p>
          </div>
          <div className="mt10">
            <Button onClick={() => {setUserInitialData(null); setOpen(true)}} className="text-white">
              Add New User
            </Button>
            <Button id="editUserBtn" onClick={handleEditClick} className="text-white hidden">
              Edit User
            </Button>
            <Button id="deleteUserBtn" onClick={() => fetchUsers()} className="text-white hidden">
              Delete User
            </Button>
          </div>
        </div>

        <div>
          <div className="mt-4 overflow-x-auto rounded-lg border">
            <AppTable
              table={table}
              className=""
              noResultsMessage="No yellow cards found."
              tableCellClassName="px-2"
            />
          </div>
          <AppTablePagination table={table} />
        </div>
      </div>

      <AppModal
        open={open}
        setOpen={setOpen}
        className="sm:max-w-[790px] bg-white"
      >
        <AddUserForm initialData={userInitialData} onSubmit={ (userInitialData == null) ? handleAddUser : handleEditUser } />
      </AppModal>
    </>
  );
};

export default AdminUsers;
