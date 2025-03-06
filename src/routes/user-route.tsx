import PaymentSuccess from "@/components/pages/user/payment-success";
import { ROUTES } from "@/config/route";
import Register from "@/features/auth/user/register";
import SetProfilePage from "@/features/auth/user/set-profile";
import PaymentPage from "@/features/payment";
import PaymentFailedPage from "@/features/payment/failed";
import PaymentInvoicePage from "@/features/payment/invoice";
import PaymentSuccessPage from "@/features/payment/success";
import HomePage from "@/features/website/home";
import UserAuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import React from "react";

interface CustomRouteObject {
  path: string;
  element: React.ReactNode;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  layoutProps?: Record<string, any>;
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
    element: <SetProfilePage />,
    layout: UserAuthLayout,
    layoutProps: { hasHeader: true },
  },
  {
    path: ROUTES.PAYMENT,
    element: <PaymentPage />,
    layout: UserAuthLayout,
    layoutProps: { hasHeader: true },
  },
  {
    path: ROUTES.PAYMENT_SUCCESS,
    element: <PaymentSuccessPage />,
    layout: UserAuthLayout,
    layoutProps: { hasHeader: true },
  },
  {
    path: ROUTES.PAYMENT_FAILED,
    element: <PaymentFailedPage />,
    layout: UserAuthLayout,
    layoutProps: { hasHeader: true },
  },
  {
    path: ROUTES.PAYMENT_INVOICE,
    element: <PaymentInvoicePage />,
    layout: UserAuthLayout,
    layoutProps: { hasHeader: true },
  },
];
