import IMAGES from "@/assets/images";
import React from "react";
import ChangePasswordForm from "./forms/change-password-form";

const ChangePassword = () => {
  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-20">
        <img
          src={IMAGES.logo}
          alt="Coat of Arms"
          className="w-16 mx-auto mb-2"
        />
        <h1 className="text-xl font-bold">FEDERAL MINISTRY OF HEALTH</h1>
        <p className="text-gray-500">...Securing the health of the nation</p>
      </div>

      <h2 className="text-lg font-semibold text-center mb-4">
        Change Your Password
      </h2>

      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
