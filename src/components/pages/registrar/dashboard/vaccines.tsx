import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import VaccinationForm from "../form/vaccination-form";
import AppModal from "@/components/common/modal";
import Confirm from "../../director/dashboard/modal/confirm";
import { toast } from "sonner";
import { useNavigation } from "@/utils/navigation";
import { ROUTES } from "@/config/route";
import Spinner from "@/components/spinner";
import { apiFetch } from "@/utils/api";
import Loading from "@/components/loading";

const users = [
  { id: 1, name: "Kelechi Christopher", yellowCardNumber: null },
  { id: 2, name: "Ilyas Yusuf", yellowCardNumber: null },
  { id: 3, name: "Kabir Sumayyah", yellowCardNumber: null },
  { id: 4, name: "Ismail Muhammad", yellowCardNumber: null },
  { id: 5, name: "Abdullahi Umar", yellowCardNumber: null },
  { id: 6, name: "Emmanuel Deborah", yellowCardNumber: null },
];

const RegistrarVaccines = () => {
  useDashboardTitle("Manage Vaccines");

  const [isOpenStatusInfo, setOpenStatusInfo] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const { goTo } = useNavigation();

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [usersList, setUsersList] = useState([]);
  const [vaccineFormData, setVaccineFormData] = useState(null);
  
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenAssignVForm, setIsOpenAssignVForm] = useState(false);

  // const filteredUsers = usersList.filter((user) =>
  //   user.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredUsers = usersList.filter((user) => {
    const searchTerm = search.toLowerCase();
    
    return (
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm)) ||
      (user.surName && user.surName.toLowerCase().includes(searchTerm)) ||
      (user.passportNumber && user.passportNumber.toLowerCase().includes(searchTerm)) ||
      (user.nin && user.nin.toLowerCase().includes(searchTerm))
    );
  });

  const preHandleVaccinceAssign = (data) => {
    setOpenStatusInfo(true);
    setVaccineFormData(data);
  }

  const handleVaccineAssign = async () => {
    if (!vaccineFormData) {
      toast.error("Form Data not found!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiFetch("registrar/vaccine/assign", {
        method: "POST",
        body: JSON.stringify({
          userId: selectedUser.userId,
          vaccineIds: vaccineFormData.vaccines
        }),
      });

      console.log(response);

      if (response.statusCode !== 200) {
        throw new Error("Something went wrong");
      }

      setSuccess(true);
    } catch (error) {
      toast.error(error.message || "Request failed");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("registrar/users/list", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setUsersList(response.data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <Spinner text="Loading data..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex ">
        {/* Left Side - User List */}
        { isLoading ? <Loading /> : '' }
        <div className="w-1/3">
          <h2 className="text-lg font-semibold">Manage Vaccines</h2>
          <p className="text-gray-500 mb-4">
            Add, remove or update user vaccines.
          </p>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search user by name, passport number or NIN..."
              className="pl-10 w-full border rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* User List */}
          <div className="border  divide-y-2">
            {filteredUsers.slice(0, 7).map((user) => (
              <div
                key={user.id}
                className={`p-4 cursor-pointer ${
                  selectedUser?.userId === user.userId
                    ? "bg-green-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => { setSelectedUser(user); setIsOpenAssignVForm(false); }}
              >
                {user.firstName +" "+ user.surName}
              </div>
            ))}
          </div>

          {/* Vaccination History Button */}
          <Button
            onClick={() =>
              goTo(ROUTES.DASHBOARD.REGISTRAR.MANAGE_VACCINES_HISTORY)
            }
            className="mt-8 text-white"
          >
            Vaccination History
          </Button>
        </div>

        {/* Right Side - Selected User Details */}
        <div className="w-2/3 p-6 bg-[#FAFAFA] h-[941px] md:-mt-6 ml-6">
          {selectedUser ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Vaccination Details
              </h2>
              <h3 className="text-lg font-medium">
                {selectedUser.firstName+" "+selectedUser.surName}{" "}
                <span className=" pl-5">
                  Yellow Card Number: {selectedUser.yellowCardNumber || "Nil"}
                </span>
              </h3>

              <Card className="mt-10 bg-white p-0 pb-5 border-0 shadow-none h-[715px]">
                <CardHeader className="border-b py-5">
                  <CardTitle>Vaccines Assigned</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Display payment required message if user hasn't paid */}
                  {!selectedUser.paid && (
                    <div className="p-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                      <p className="text-sm">This user hasn't completed payment yet. Vaccine assignment is unavailable until payment is completed.</p>
                    </div>
                  )}
                  {!isOpenAssignVForm ? (
                    selectedUser && selectedUser.vaccines && selectedUser.vaccines.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Assigned Vaccines</h3>
                          <Button 
                            onClick={() => setIsOpenAssignVForm(true)}
                            variant="outline"
                            size="sm"
                          >
                            Edit Vaccines
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedUser.vaccines.map((vaccine) => (
                            <div key={vaccine.id} className="bg-gray-50 p-3 rounded-md flex items-center">
                              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                              <span>{vaccine.vaccineName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="fle items-center justify-center text-center text-gray-500">
                        <img
                          src={IMAGES.pendingBlock}
                          alt="No User Selected"
                          className="h-16 mx-auto mb-4"
                        />
                        <h2 className="text-lg font-medium">No record found</h2>
                        <p>This user currently has no assigned vaccine.</p>
                        <Button
                          disabled={!selectedUser.paid}
                          onClick={() => setIsOpenAssignVForm(true)}
                          className="mt-4 text-white"
                        >
                          Assign vaccine(s)
                        </Button>
                      </div>
                    )
                  ) : (
                    <VaccinationForm
                      onSuccess={preHandleVaccinceAssign}
                      vToggleVForm={() => setIsOpenAssignVForm(false)}
                      userVaccines={selectedUser.vaccines}
                    />
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex items-center my-auto justify-center">
              <div className=" text-center text-gray-500">
                <img
                  src={IMAGES.pendingBlock}
                  alt="No User Selected"
                  className="h-20 mx-auto mb-4"
                />
                <h2 className="text-lg font-medium">Select User first</h2>
                <p>
                  You are yet to select the user you want to get vaccination
                  details for.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <AppModal
        open={isOpenStatusInfo}
        setOpen={setOpenStatusInfo}
        className="sm:max-w-[400px] bg-white"
      >
        <Confirm
          buttonOne={() => setOpenStatusInfo(false)}
          buttonTwo={() => {
            setOpenStatusInfo(false);
            handleVaccineAssign();
            // setSuccess(true);
          }}
          title={"Confirm Assign Vaccine"}
          message={
            "Are you sure you want to assign Vaccines this user?"
          }
        />
      </AppModal>

      <AppModal
        open={isSuccess}
        setOpen={setSuccess}
        className="sm:max-w-[400px] bg-white"
      >
        <Confirm
          buttonOne={() => setSuccess(false)}
          buttonTwo={() => {
            setSuccess(false);
            fetchUserData();
            setSelectedUser(null);
          }}
          buttonOneLabel="View Vaccines"
          buttonTwoLabel="Done"
          title={"Vaccines Assigned Successfully!"}
          type="success"
          message={"The Yellow Fever Vaccine has been assigned to the user."}
        />
      </AppModal>
    </>
  );
};

export default RegistrarVaccines;
