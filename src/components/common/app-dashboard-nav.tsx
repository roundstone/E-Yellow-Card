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
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";

import React from "react";
import IMAGES from "@/assets/images";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { appAtom } from "@/stores/app";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/config/route";
import { defaultUser, userAtom } from "@/stores/user";
import { useNavigation } from "@/utils/navigation";
import { toast } from "sonner";


export function AppDashboardNav() {
  const [app] = useAtom(appAtom);

  const location = useLocation();

  const setUser = useSetAtom(userAtom);

  const user = useAtomValue(userAtom);

  const { goTo } = useNavigation();

  const logout = (setUser) => {
    localStorage.removeItem("token"); // Remove JWT token
    setUser(defaultUser); // Reset user state

    toast.success("You logged out!");

    goTo(ROUTES.AUTH.ADMIN.LOGIN);
  };

  const data = [
    [
      {
        label: "Profile",
        icon: UserCircle,
        route: (user.role == 'Admin') ? ROUTES.PROFILE2 : (user.role == 'Director') ? ROUTES.PROFILE : ROUTES.PROFILE3,
      },
      {
        label: "Password Manager",
        icon: Lock,
        action: () => {
          document.getElementById('passwordResetBtn').click();
        },
      },
    ],
    // [
    //   {
    //     label: "Import",
    //     icon: ArrowUp,
    //     adminOnly: true,
    //     route: ROUTES.DASHBOARD.SUPERADMIN.IMPORT_APPLICATIONS,
    //   },
    //   {
    //     label: "Export",
    //     icon: ArrowDown,
    //     route: ROUTES.DASHBOARD.SUPERADMIN.IMPORT_APPLICATIONS,
    //   },
    // ],
    [
      {
        label: "Logout",
        icon: LogOut,
        action: () => {
          logout(setUser)
        },
      }
    ],
  ];

  return (
    <nav className="flex justify-between pb10 p-6 border-b">
      <div className="text-lg font-normal">
        {app.dashboardTitle || "Dashboard"}
      </div>

      <div className="space-x-3 flex">
        <Popover>
          <PopoverTrigger className="flex gap-3 items-center">
            <img
              src="/passport.png"
              alt=""
              className="w-8 h-8 border rounded-full"
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
                {/* {data.map((group, index) => (
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
                              {item.label !== "Logout" ? (
                                <Link to={item.route}>{item.label}</Link>
                              ) : (
                                <span className="cursor-pointer">{item.label}</span>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))} */}
                {data.map((group, index) => (
                  <SidebarGroup key={index} className="border-b last:border-none">
                    <SidebarGroupContent className="gap-0">
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                              <item.icon />
                              {"route" in item ? (
                                <Link to={item.route} className="ml-2">
                                  {item.label}
                                </Link>
                              ) : (
                                <div onClick={item.action} className="w-full cursor-pointer ml-2">{item.label}</div>
                              )}
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
