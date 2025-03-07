import IMAGES from "@/assets/images";
import AppModal from "@/components/common/modal";
import { ROUTES } from "@/config/route";
import React from "react";
import { Link } from "react-router-dom";
import UserQuery from "../modal(dialog)/query-user";
import { useNavigation } from "@/utils/navigation";

const AuthHeader = () => {
  const { goTo } = useNavigation();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <header className="flex justify-between items-center p-6 mb6 bg-white border-b app-container">
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
            to={ROUTES.HOME}
            className="text-text hover:text-opacity-75 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="#"
            onClick={() => setOpen(true)}
            className="text-text hover:text-opacity-75 transition-colors duration-200 "
          >
            Get User Detail
          </Link>
          <div className="border-l inline-block px-10"> &nbsp;</div>
        </nav>
      </header>538
      <AppModal open={open} setOpen={setOpen} title="QUERY USER" className="sm:max-w-[538px]">
        <UserQuery />
      </AppModal>
      ;
    </>
  );
};

export default AuthHeader;
