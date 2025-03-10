import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import { Search } from "lucide-react";
import React, { useState } from "react";
import VaccinationForm from "../form/vaccination-form";
import AppModal from "@/components/common/modal";
import Confirm from "../../director/dashboard/modal/confirm";
import { toast } from "sonner";
import { useNavigation } from "@/utils/navigation";
import { ROUTES } from "@/config/route";

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

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    yellowCardNumber: string;
  } | null>(null);
  const [isOpenAssignVForm, setIsOpenAssignVForm] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex ">
        {/* Left Side - User List */}
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
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-4 cursor-pointer ${
                  selectedUser?.id === user.id
                    ? "bg-green-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                {user.name}
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
                {selectedUser.name}{" "}
                <span className=" pl-5">
                  Yellow Card Number: {selectedUser.yellowCardNumber || "Nil"}
                </span>
              </h3>

              <Card className="mt-10 bg-white p-0 pb-5 border-0 shadow-none h-[715px]">
                <CardHeader className="border-b py-5">
                  <CardTitle>Vaccines Assigned</CardTitle>
                </CardHeader>
                <CardContent>
                  {!isOpenAssignVForm ? (
                    <div className="fle items-center justify-center text-center text-gray-500">
                      <img
                        src={IMAGES.pendingBlock}
                        alt="No User Selected"
                        className="h-16 mx-auto mb-4"
                      />
                      <h2 className="text-lg font-medium">No record found</h2>
                      <p>This user currently has no assigned vaccine.</p>

                      <Button
                        onClick={() => setIsOpenAssignVForm(true)}
                        className="mt-4 text-white"
                      >
                        Assign vaccine(s)
                      </Button>
                    </div>
                  ) : (
                    <VaccinationForm
                      onSuccess={() => setOpenStatusInfo(true)}
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
            setSuccess(true);
            toast.success("Yellow Card Assigned Successfully!");
          }}
          title={"CConfirm Assign Vaccine"}
          message={
            "Are you sure you want to assign the Yellow Fever Vaccine this user?"
          }
          //   type="success"
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
            // onClose();
            setSuccess(false);
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
