import React, { useState } from "react";
import CreateAccountForm from "./forms/create-account-form";
import useQueryParam from "@/hooks/use-query-param";

const RegisterPage = () => {
  const type = useQueryParam("type");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-sm md:w-[566px] w-full border">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className=" text-base mb-8">
          {type == "child"
            ? "Please enter the NIN and phone number of the child’s parent/guardian"
            : "Please enter your NIN and phone number"}
        </p>

        <CreateAccountForm />
      </div>
    </div>
  );
};

export default RegisterPage;
