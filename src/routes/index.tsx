import HomePage from "@/features/website/home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/main-layout";
import RoleBasedRoute from "./rolebase-route";
import { UserType } from "@/interface/user";
import SuperadminDashboard from "@/features/dashboard/superadmin";
import UnauthorizedPage from "@/features/shared/unauthorized";
import NotFoundPage from "@/features/shared/not-found";
import { ROUTES } from "@/config/route";
import { userRoutes } from "./user-route";
import RouteWrapper from "@/components/route/wrapper";

const AppRoutes = () => {
  const userType = UserType.SUPERADMIN;

  return (
    <Router>
      <Routes>
        {userRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper element={route.element} layout={route.layout} />
            }
          />
        ))}

        {/* Role-Based Route Example */}
        <Route
          element={
            <RoleBasedRoute
              userType={userType}
              allowedRoles={[UserType.SUPERADMIN]}
            />
          }
        >
          <Route
            path={ROUTES.DASHBOARD.SUPERADMIN}
            element={<SuperadminDashboard />}
          />
        </Route>

        {/* Unauthorized Route */}
        <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
