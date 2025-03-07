import {
  Calendar,
  Home,
  Inbox,
  LockIcon,
  Search,
  Settings,
} from "lucide-react";

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
import AppModal from "./modal";
import ResetPassword from "../pages/director/dashboard/modal/rest-password";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD.DIRECTOR.HOME,
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Range Distribution",
    url: ROUTES.DASHBOARD.DIRECTOR.RANGE_DISTRIBUTION,
    icon: Calendar,
  },
  {
    title: "Range List",
    url: ROUTES.DASHBOARD.DIRECTOR.RANGE_LIST,
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
              <SecurityAlertCard />
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

const SecurityAlertCard = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="border rounded-lg py-6 px-4 shadow-sm bg-white max-w-[221px] space-y-6 mt-20 relative">
        <h2 className="font-bold text-base">Security Alert</h2>
        <p className="text-gray-700 text-sm">
          Your password expires in <span className="font-bold">10 days.</span>{" "}
          Reset now to maintain access
        </p>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-between w-full border border-[#EEF5F0] bg-[#F6F9F7] text-sm py-2 px-4 rounded-lg hover:bg-green-50 transition"
        >
          Reset Password
          <LockIcon className="text-primary" size={20} />
        </button>
        <img src={IMAGES.sBlock} className="absolute -top-5 right-2" alt="" />
      </div>

      <AppModal
        open={open}
        setOpen={setOpen}
        title="Password Reset"
        className="sm:max-w-[416px] bg-white"
      >
        <ResetPassword onClose={() => setOpen(false)} />
      </AppModal>
    </>
  );
};
