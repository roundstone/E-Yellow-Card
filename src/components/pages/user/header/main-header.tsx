import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center p-6 bg-transparent">
      {/* <Logo /> */}
      <div className="flex gap-1 item-center">
        <img
          src="./Coat_of_arms_of_Nigeria.png"
          width={56}
          height={47}
          alt=""
        />
        <h1 className="text-lg font-medium leading-tight">
          FEDERAL MINISTRY
          <br />
          OF HEALTH
        </h1>
      </div>
      <nav className="space-x-6">
        <Link
          to="#"
          className="text-text hover:text-opacity-75 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="#"
          className="text-text hover:text-opacity-75 transition-colors duration-200"
        >
          Get User Detail
        </Link>
        <Link
          to="#"
          className="text-text hover:text-opacity-75 transition-colors duration-200"
        >
          Port Health Locations
        </Link>
      </nav>
      <Button
        className="text-white"
        onClick={() => navigate(ROUTES.AUTH.REGISTER)}
      >
        Register
      </Button>
    </header>
  );
};

export default MainHeader;
