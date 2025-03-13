import React from "react";
import SetProfileForm from "./forms/set-profile-form";
import IMAGES from "@/assets/images";
import useQueryParam from "@/hooks/use-query-param";

const SetProfile: React.FC = () => {
  const type = useQueryParam("type");
  return (
    <div className="flex flex-row-reverse min-h-scr app-container pt-10 pb-32 gap-x-20">
      <div className="w-full w1/2 pr-6 hidden md:block">
        <img
          src={IMAGES.vaccine}
          alt="Vaccination"
          className="w-full h-full rounded-[30px] object-cover"
        />
      </div>
      <div className="w-full mdw-1/2 pt-0 lg:pt-20">
        <h1 className="text-2xl font-bold">
          {type === "child"
            ? "Please input the child’s details"
            : "Let’s get to know you"}
        </h1>
        <p className="text-gray-600 mb-8">
        {type === "child"
            ? "Enter the child’s required data to get started"
            : "Enter the required data to get started"}
        
        </p>
        <SetProfileForm />
      </div>
    </div>
  );
};

export default SetProfile;
