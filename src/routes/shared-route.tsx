import { ROUTES } from "@/config/route";
import React from "react";

interface CustomRouteObject {
  path: string;
  element: React.ReactNode;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  layoutProps?: Record<string, any>;
}

import SharedProfilePage from "@/features/profile";
import DirectorMainLayout from "@/layouts/d-main-layout";

export const sharedRoutes: CustomRouteObject[] = [
  {
    path: ROUTES.PROFILE,
    element: <SharedProfilePage />,
    layout: DirectorMainLayout,
  },
];
