import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="">{children}</main>;
};

export default MainLayout;
