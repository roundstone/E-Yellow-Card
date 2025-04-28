import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useEffect, useState } from "react";
import DashboardStats from "../admin/dashboard/stats-card";
import AppModal from "@/components/common/modal";
import EditProfile from "./modal";
import { apiFetch } from "@/utils/api";
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import Loading from "@/components/loading";

type Props = {};

const SharedProfile = (props: Props) => {
  useDashboardTitle("Profile");
  const [isOpen, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleEditUser = async (data) => {
    setIsLoading(true);
    const userId = userData.id;

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
          phone: data.phoneNumber
        }),
      });

      console.log(response);

      if (response.statusCode == 200) {
        toast.success("Profile updated!");
        setOpen(false);
        fetchData();
      }

      return response;
    } catch (error) {
      toast.error(error.message || "Failed to create account.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchData = async () => {
      setLoading(true);
    try {
      const response = await apiFetch("auth/user", {
        method: "GET",
      }, true);

      if (response.statusCode !== 200) {
        throw new Error(response.message || "Something went wrong");
      }

      setUserData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
      fetchData();
    }, []);
  
  if (loading) return <Spinner text="Loading Profile..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="space-y-6">
        { isLoading ? <Loading /> : '' }

        {/* Profile Header */}
        <div className="bg-primary text-white p-6 rounded-lg flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userData.photo ? userData.photo : '/passport.png'} // Replace with actual profile image
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-2xl font-bold">{userData.firstName +" "+userData.surName}</h2>
              <p className="text-sm">{(userData.userType == 'Director') ? 'PORT HEALTH DIRECTOR' : (userData.userType == 'Registrar') ? 'PORT HEALTH OFFICER' : 'SUPER ADMIN' }</p>
              <p className="text-xs">
                {userData.phsLocation}, {userData.city}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-white text-primary  hover:bg-gray-200"
          >
            Edit Profile
          </Button>
        </div>

        {/* Personal Information */}
        <Card className="bg-white py-5">
          <CardHeader className="border-b">
            <h3 className="font-semibold">Personal Information</h3>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pb5">
            <InfoItem label="First Name" value={userData.firstName} />
            <InfoItem label="Last Name" value={userData.surName} />
            <InfoItem label="ID" value={userData.id} />
            <InfoItem
              label="Port Health Service Centre"
              value={userData.phsLocation +", "+userData.city }
            />
            <InfoItem label="Email" value={userData.email} />
            <InfoItem label="Phone Number" value={userData.phone} />
            <InfoItem label="User Role" value={(userData.userType == 'Director') ? 'PORT HEALTH DIRECTOR' : (userData.userType == 'Registrar') ? 'PORT HEALTH OFFICER' : 'SUPER ADMIN' } />
            <InfoItem label="Zone" value={userData.zone} />
          </CardContent>
        </Card>

        {/* Statistics Section */}
        {userData.userType == 'Admin2' && (
        <Card className="bg-white">
          <CardHeader>
            <h3 className=" font-semibold">My Stats</h3>
          </CardHeader>
          <CardContent className="">
            <DashboardStats />
          </CardContent>
        </Card>)}
      </div>

      <AppModal
        open={isOpen}
        setOpen={setOpen}
        title="Edit Profile"
        className="sm:max-w-[790px] bg-white"
      >
        <EditProfile onSubmitData={handleEditUser} initialValues={userData} onClose={() => setOpen(false)} />
      </AppModal>
    </>
  );
};

export default SharedProfile;

// 📌 Reusable Component for Information Items
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

// 📌 Reusable Component for Stat Cards
const StatCard = ({
  title,
  value,
  trend,
  isNegative,
}: {
  title: string;
  value: string;
  trend: string;
  isNegative: boolean;
}) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center shadow-sm">
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
    <p
      className={`text-sm flex items-center justify-center ${
        isNegative ? "text-danger" : "text-primary"
      }`}
    >
      {trend} vs last month
    </p>
  </div>
);
