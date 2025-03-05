import { UserType } from "@/interface/user";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface RoleBasedRouteProps {
  userType: UserType; // The current user's role
  allowedRoles: UserType[]; // List of roles allowed to access the route
}

const RoleBasedRoute = ({ userType, allowedRoles }: RoleBasedRouteProps) => {
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;
