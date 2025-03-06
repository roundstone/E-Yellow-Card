import IMAGES from "@/assets/images";
import React from "react";
import LoginForm from "./forms/login-form";

const Login = () => {
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

      <h2 className="text-lg font-semibold text-center mb-4">Welcome back</h2>

      <LoginForm />
    </div>
  );
};

export default Login;
