import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/route";
import IMAGES from "@/assets/images";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD.DIRECTOR,
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Range Distribution",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Range List",
    url: "#",
    icon: Search,
  },
  {
    title: "Card Distribution History",
    url: "#",
    icon: Settings,
  },
  {
    title: "Reports",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="p-6">
      <SidebarContent>
        <AppSidebarHeader />
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <React.Suspense fallback={<SidebarSkeleton />}>
              <SidebarMenu className="space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={window.location.pathname === item.url}
                      className={`px-3 py-5 ${
                        window.location.pathname === item.url
                          ? "bg-primary/90 text-white rounded-lg"
                          : ""
                      }`}
                      asChild
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const AppSidebarHeader: React.FC = () => {
  return (
    <div className="p-4">
      <Link to={ROUTES.HOME} className="flex gap-1 item-center">
        <img src={IMAGES.logo} alt="" />
        <h1 className="text-sm font-bold self-center leading-tight">
          FEDERAL MINISTRY
          <br />
          OF HEALTH
        </h1>
      </Link>
    </div>
  );
};

const SidebarSkeleton: React.FC = () => {
  return (
    <SidebarMenu>
      {items.map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
