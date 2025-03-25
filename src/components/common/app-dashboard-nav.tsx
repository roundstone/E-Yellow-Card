import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Lock,
  Settings,
  UserCircle,
} from "lucide-react";

import React from "react";
import IMAGES from "@/assets/images";
import { useAtom } from "jotai";
import { appAtom } from "@/stores/app";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/config/route";

const data = [
  [
    {
      label: "Profile",
      icon: UserCircle,
      route: ROUTES.PROFILE,
    },
    {
      label: "Password Manager",
      icon: Lock,
      route: "#",
    },
  ],
  [
    {
      label: "Import",
      icon: ArrowUp,
      route: "#",
    },
    {
      label: "Export",
      icon: ArrowDown,
      route: "#",
    },
  ],
];

export function AppDashboardNav() {
  const [app] = useAtom(appAtom);

  const location = useLocation();

  return (
    <nav className="flex justify-between pb10 p-6 border-b">
      <div className="text-lg font-normal">
        {app.dashboardTitle || "Dashboard"}
      </div>

      <div className="space-x-3 flex">
        <Popover>
          <PopoverTrigger className="flex gap-3 items-center">
            <img
              src={IMAGES.profileIcon}
              alt=""
              className="w-6 h-6 rounded-full"
            />
            {/* For test: a proper middleware or authorization logic to handle this */}
            <span className="">
              {location.pathname.includes("director")
                ? "Port Health Director"
                : location.pathname.includes("admin")
                ? "Admin"
                : location.pathname.includes("registrar")
                ? "Registrar"
                : ""}
            </span>
            <ChevronDown className="w-5 h-5 self-center" />
          </PopoverTrigger>
          <PopoverContent
            className="w-56 overflow-hidden rounded-lg p-0"
            align="end"
          >
            <Sidebar collapsible="none" className="bg-white">
              <SidebarContent>
                {data.map((group, index) => (
                  <SidebarGroup
                    key={index}
                    className="border-b last:border-none"
                  >
                    <SidebarGroupContent className="gap-0">
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                              <item.icon />{" "}
                              <Link to={item.route}>{item.label}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>

        <Settings className="cursor-pointer" />
      </div>
    </nav>
  );
}
