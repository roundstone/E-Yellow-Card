import { ROUTES } from "@/config/route";
import Register from "@/features/auth/register";
import HomePage from "@/features/website/home";
import UserAuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import React from "react";

interface CustomRouteObject {
  path: string;
  element: React.ReactNode;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
}

export const userRoutes: CustomRouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    layout: MainLayout,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <Register />,
    layout: UserAuthLayout,
  },
  {
    path: ROUTES.AUTH.SET_PROFILE,
    element: <Register />,
    layout: UserAuthLayout,
  },
];
