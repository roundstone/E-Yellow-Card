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
import SuperadminDashboardPage from "@/features/dashboard/superadmin";
import SuperadminImportApplicationsPage from "@/features/dashboard/superadmin/import-app";
import SuperadminLocalGovtListPage from "@/features/dashboard/superadmin/local-gov-list";
import SuperadminRemitaTransactionsPage from "@/features/dashboard/superadmin/remita-transaction";
import SuperadminStateListPage from "@/features/dashboard/superadmin/state-list";
import SuperadminManagePortsPage from "@/features/dashboard/superadmin/manage-ports";
import SuperadminVaccinesPage from "@/features/dashboard/superadmin/vaccince";
import SuperadminUpdateVaccineInventoryPage from "@/features/dashboard/superadmin/update-vaccince-inventory";
import SuperadminUsersPage from "@/features/dashboard/superadmin/users";
import SuperadminYellowCardRangePage from "@/features/dashboard/superadmin/y-card-range";
import SuperadminAllEventsHistoryPage from "@/features/dashboard/superadmin/all-event-history";
import SuperadminVerifyYellowCardsPage from "@/features/dashboard/superadmin/verify-yellow-card";
import SetProfilePage from "@/features/auth/admin/set-profile";
import UserAuthLayout from "@/layouts/auth-layout";

export const superadminRoutes: CustomRouteObject[] = [
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
    {
      path: ROUTES.AUTH.ADMIN.SET_PROFILE,
      element: <SetProfilePage />,
      layout: UserAuthLayout,
      layoutProps: { hasHeader: true },
    },
    // Dashboard
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.HOME,
      element: <SuperadminDashboardPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.IMPORT_APPLICATIONS,
      element: <SuperadminImportApplicationsPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.LOCAL_GOVT_LIST,
      element: <SuperadminLocalGovtListPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.REMITA_TRANSACTIONS,
      element: <SuperadminRemitaTransactionsPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.STATE_LIST,
      element: <SuperadminStateListPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.MANAGE_PORTS,
      element: <SuperadminManagePortsPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.VACCINES,
      element: <SuperadminVaccinesPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.UPDATE_VACCINE_INVENTORY,
      element: <SuperadminUpdateVaccineInventoryPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.USERS,
      element: <SuperadminUsersPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.YELLOW_CARD_RANGE,
      element: <SuperadminYellowCardRangePage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.ALL_EVENTS_HISTORY,
      element: <SuperadminAllEventsHistoryPage />,
      layout: DirectorMainLayout,
    },
    {
      path: ROUTES.DASHBOARD.SUPERADMIN.VERIFY_YELLOW_CARDS,
      element: <SuperadminVerifyYellowCardsPage />,
      layout: DirectorMainLayout,
    },
  ];