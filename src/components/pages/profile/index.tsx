import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDashboardTitle from "@/hooks/use-dashboard-title";
import React, { useState } from "react";
import DashboardStats from "../admin/dashboard/stats-card";
import AppModal from "@/components/common/modal";
import EditProfile from "./modal";

type Props = {};

const SharedProfile = (props: Props) => {
  useDashboardTitle("Profile");
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-primary text-white p-6 rounded-lg flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={IMAGES.jim} // Replace with actual profile image
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h2 className="text-2xl font-bold">Umar Isah</h2>
              <p className="text-sm">PORT HEALTH OFFICER</p>
              <p className="text-xs">
                Murtala Muhammed International Airport, Lagos
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
            <InfoItem label="First Name" value="Umar" />
            <InfoItem label="Last Name" value="Isah" />
            <InfoItem label="ID" value="3" />
            <InfoItem
              label="Port Health Service Centre"
              value="Murtala Muhammed International Airport, Lagos"
            />
            <InfoItem label="Email" value="umaisah01@gmail.com" />
            <InfoItem label="Phone Number" value="+234 910 898 9892" />
            <InfoItem label="User Role" value="PORT HEALTH OFFICER" />
            <InfoItem label="Zone" value="West" />
          </CardContent>
        </Card>

        {/* Statistics Section */}
        <Card className="bg-white">
          <CardHeader>
            <h3 className=" font-semibold">My Stats</h3>
          </CardHeader>
          <CardContent className="">
            <DashboardStats />
          </CardContent>
        </Card>
      </div>

      <AppModal
        open={isOpen}
        setOpen={setOpen}
        title="Edit Profile"
        className="sm:max-w-[790px] bg-white"
      >
        <EditProfile onClose={() => setOpen(false)} />
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
