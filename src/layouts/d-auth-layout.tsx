import IMAGES from "@/assets/images";
import React from "react";

interface DirectorAuthLayoutProps {
  children: React.ReactNode;
  hasHeader?: boolean;
}

const DirectorAuthLayout = ({
  children
}: DirectorAuthLayoutProps) => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div
        className="hidden lg:flex w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url("${IMAGES.dAuthBg}")` }}
      ></div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
        {children}
      </div>
    </div>
  );
};

export default DirectorAuthLayout;
