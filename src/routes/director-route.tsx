import { ROUTES } from "@/config/route";
import React from "react";
import DirectorLoginPage from "@/features/auth/director/login";
import DirectorAuthLayout from "@/layouts/d-auth-layout";

interface CustomRouteObject {
  path: string;
  element: React.ReactNode;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  layoutProps?: Record<string, any>;
}

import DirectorForgotPasswordPage from "@/features/auth/director/forgot-password";
import DirectorChangePasswordPage from "@/features/auth/director/change-password";
import DirectorDashboardPage from "@/features/dashboard/director";
import DirectorMainLayout from "@/layouts/d-main-layout";
import DirectorRangeListPage from "@/features/dashboard/director/range/list";
import DirectorRangeDistributionPage from "@/features/dashboard/director/range/distribution";

export const directorRoutes: CustomRouteObject[] = [
  {
    path: ROUTES.AUTH.ADMIN.LOGIN,
    element: <DirectorLoginPage />,
    layout: DirectorAuthLayout,
  },
  {
    path: ROUTES.AUTH.ADMIN.FORGET_PASSWORD,
    element: <DirectorForgotPasswordPage />,
    layout: DirectorAuthLayout,
  },
  {
    path: ROUTES.AUTH.ADMIN.CHANGE_PASSWORD,
    element: <DirectorChangePasswordPage />,
    layout: DirectorAuthLayout,
  },
  // Auth
  {
    path: ROUTES.DASHBOARD.DIRECTOR.HOME,
    element: <DirectorDashboardPage />,
    layout: DirectorMainLayout,
  },
  {
    path: ROUTES.DASHBOARD.DIRECTOR.RANGE_LIST,
    element: <DirectorRangeListPage />,
    layout: DirectorMainLayout,
  },
  {
    path: ROUTES.DASHBOARD.DIRECTOR.RANGE_DISTRIBUTION,
    element: <DirectorRangeDistributionPage />,
    layout: DirectorMainLayout,
  },
];
