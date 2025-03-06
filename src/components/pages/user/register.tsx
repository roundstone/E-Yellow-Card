import React, { useState } from "react";
import { Form } from "react-hook-form";
import CreateAccountForm from "./forms/create-account-form";

const RegisterPage = () => {
  const [nin, setNin] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen app-container">
      <div className="bg-white p-10 rounded-lg shadow-sm md:w-[566px] w-full border">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className=" text-base mb-4">
          Please enter your NIN and phone number:
        </p>

        <CreateAccountForm />
      </div>
    </div>
  );
};

export default RegisterPage;
