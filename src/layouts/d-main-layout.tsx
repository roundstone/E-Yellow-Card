import { AppDashboardNav } from "@/components/common/app-dashboard-nav";
import { AppSidebar } from "@/components/common/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

interface DirectorMainLayoutProps {
  children: React.ReactNode;
  hasHeader?: boolean;
}

const DirectorMainLayout = ({ children }: DirectorMainLayoutProps) => {
  return (
    <SidebarProvider className="flex gap-[285px] bg-[#F6F7F6]">
      <AppSidebar />
      <SidebarInset className="bg-white flex-1 overflow-auto">
        {/* <SidebarTrigger /> */}
        <AppDashboardNav />
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DirectorMainLayout;
