import { AppDashboardNav } from "@/components/common/app-dashboard-nav";
import { AppSidebar } from "@/components/common/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/config/route";
import { useNavigation } from "@/utils/navigation";
import { useAtomValue } from "jotai";
import React from "react";
import { toast } from "sonner";
import { defaultUser, userAtom } from "@/stores/user";
import { useSetAtom } from "jotai";

interface DirectorMainLayoutProps {
  children: React.ReactNode;
  hasHeader?: boolean;
}

const DirectorMainLayout = ({ children }: DirectorMainLayoutProps) => {
  const { goTo } = useNavigation();

  const setUser = useSetAtom(userAtom);

  if (!localStorage.getItem("token")) {
    setUser(defaultUser);
  }

  const user = useAtomValue(userAtom);

  if (!user.authenticated) {
    goTo(ROUTES.AUTH.ADMIN.LOGIN);
    return;
  }

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
