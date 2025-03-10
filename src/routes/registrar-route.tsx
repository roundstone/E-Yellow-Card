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
import DirectorMainLayout from "@/layouts/d-main-layout";
import RegistrarDashboardPage from "@/features/dashboard/registrar";
import RegistrarActivityLogPage from "@/features/dashboard/registrar/activity-log";
import RegistrarAssignYellowCardPage from "@/features/dashboard/registrar/assign-yellow-card";
import RegistrarManageVaccinesPage from "@/features/dashboard/registrar/vaccines";
import RegistrarVaccinationHistoryPage from "@/features/dashboard/registrar/vaccines-history";
import RegistrarUserListPage from "@/features/dashboard/registrar/user-list";


export const registrarRoutes: CustomRouteObject[] = [
  {
    path: ROUTES.AUTH.DIRECTOR.LOGIN,
    element: <DirectorLoginPage />,
    layout: DirectorAuthLayout,
  },
  {
    path: ROUTES.AUTH.DIRECTOR.FORGET_PASSWORD,
    element: <DirectorForgotPasswordPage />,
    layout: DirectorAuthLayout,
  },
  {
    path: ROUTES.AUTH.DIRECTOR.CHANGE_PASSWORD,
    element: <DirectorChangePasswordPage />,
    layout: DirectorAuthLayout,
  },
  // Auth
  {
    path: ROUTES.DASHBOARD.REGISTRAR.HOME,
    element: <RegistrarDashboardPage />,
    layout: DirectorMainLayout,
  },
  {
    path: ROUTES.DASHBOARD.REGISTRAR.MANAGE_VACCINES,
    element: <RegistrarManageVaccinesPage />,
    layout: DirectorMainLayout,
  },
  {
    path: ROUTES.DASHBOARD.REGISTRAR.MANAGE_VACCINES_HISTORY,
    element: <RegistrarVaccinationHistoryPage />,
    layout: DirectorMainLayout,
  },
  {
    path: ROUTES.DASHBOARD.REGISTRAR.ASSIGN_YELLOW_CARD,
    element: <RegistrarAssignYellowCardPage />,
    layout: DirectorMainLayout,
  },
  {
    path: ROUTES.DASHBOARD.REGISTRAR.USER_LIST,
    element: <RegistrarUserListPage />,
    layout: DirectorMainLayout,
  },
  {
    path: ROUTES.DASHBOARD.REGISTRAR.ACTIVITY_LOG,
    element: <RegistrarActivityLogPage />,
    layout: DirectorMainLayout,
  },
];