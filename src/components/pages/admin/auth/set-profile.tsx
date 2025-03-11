import React from "react";
import IMAGES from "@/assets/images";
import SetProfileForm from "../form/set-profile-form";

const SetProfile: React.FC = () => {
  return (
    <div className="flex flex-row-reverse app-container pt-10 gap-x-20">
      
      <div className="w-full w1/2 pr-6 hidden md:block h-[507px]">
        <img
          src={IMAGES.vaccine}
          alt="Vaccination"
          className="w-full h-full rounded-[28px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="w-full mdw-1/2 pt-0 lg:pt-20">
        <h1 className="text-2xl font-bold">Create your password</h1>
        <p className="text-gray-600 mb-4">
        Use the link sent to your mail  to sign  and input your own password to sign up
        </p>
        <SetProfileForm />
      </div>
    </div>
  );
};

export default SetProfile;
