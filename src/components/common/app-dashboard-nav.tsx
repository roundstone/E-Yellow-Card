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

const data = [
  [
    {
      label: "Profile",
      icon: UserCircle,
    },
    {
      label: "Password Manager",
      icon: Lock,
    },
  ],
  [
    {
      label: "Import",
      icon: ArrowUp,
    },
    {
      label: "Export",
      icon: ArrowDown,
    },
  ],
];

export function AppDashboardNav() {
  const [app] = useAtom(appAtom);

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
            <span className=""> Port Health Director </span>
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
                              <item.icon /> <span>{item.label}</span>
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