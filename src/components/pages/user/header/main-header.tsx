import IMAGES from "@/assets/images";
import AppModal from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/route";
import React from "react";
import { Link } from "react-router-dom";
import UserQuery from "../modal(dialog)/query-user";
import { useNavigation } from "@/utils/navigation";

const MainHeader = () => {
  const { goTo } = useNavigation();
  // const [open, setOpen] = React.useState(false);
  return (
    <>
      <header className="flex justify-between items-center p-6 bg-transparent">
        {/* <Logo /> */}
        <Link to={ROUTES.HOME} className="flex gap-1 item-center">
          <img src={IMAGES.logo} width={56} height={47} alt="" />
          <h1 className="text-lg font-medium leading-tight">
            FEDERAL MINISTRY
            <br />
            OF HEALTH
          </h1>
        </Link>
        <nav className="space-x-6">
          <Link
            to="#"
            className="text-text hover:text-opacity-75 transition-colors duration-200"
          >
            Home
          </Link>
          {/* <Link
            to="#"
            onClick={() => setOpen(true)}
            className="text-text hover:text-opacity-75 transition-colors duration-200"
          >
            Get User Detail
          </Link> */}
          <Link
            to="#"
            className="text-text hover:text-opacity-75 transition-colors duration-200"
          >
            Port Health Locations
          </Link>
        </nav>
        <Button
          className="text-white"
          onClick={() => goTo(ROUTES.AUTH.PROFILE_TYPE)}
        >
          Register
        </Button>
      </header>
    </>
  );
};

export default MainHeader;
