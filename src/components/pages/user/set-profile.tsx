import React from "react";
import SetProfileForm from "./forms/set-profile-form";
import IMAGES from "@/assets/images";

const SetProfile: React.FC = () => {
  return (
    <div className="flex flex-row-reverse app-container pt-10 gap-x-20">
      
      <div className="w-full w1/2 pr-6 hidden md:block">
        <img
          src={IMAGES.vaccine}
          alt="Vaccination"
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="w-full mdw-1/2 pt-0 lg:pt-20">
        <h1 className="text-2xl font-bold">Let’s get to know you</h1>
        <p className="text-gray-600 mb-4">
          Enter the required data to get started
        </p>
        <SetProfileForm />
      </div>
    </div>
  );
};

export default SetProfile;
