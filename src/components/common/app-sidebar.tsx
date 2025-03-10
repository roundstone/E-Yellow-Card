import {
  BadgeCheck,
  BookOpen,
  ClipboardList,
  CreditCard,
  ExternalLink,
  FileChartColumn,
  FileChartColumnIncreasingIcon,
  FileText,
  LayoutGrid,
  LockIcon,
  Maximize2,
  Menu,
  RefreshCcw,
  Syringe,
  Users,
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
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/config/route";
import IMAGES from "@/assets/images";
import AppModal from "./modal";
import ResetPassword from "../pages/director/dashboard/modal/rest-password";
import { cn } from "@/lib/utils";
import { getUserRoleFromPath } from "@/utils/navigation";

// Menu items.
const items = {
  DIRECTOR: [
    {
      title: "Dashboard",
      url: ROUTES.DASHBOARD.DIRECTOR.HOME,
      icon: LayoutGrid,
    },
    {
      title: "Range Distribution",
      url: ROUTES.DASHBOARD.DIRECTOR.RANGE_DISTRIBUTION,
      icon: ExternalLink,
    },
    {
      title: "Range List",
      url: ROUTES.DASHBOARD.DIRECTOR.RANGE_LIST,
      icon: FileText,
    },
    {
      title: "Reports",
      url: "#",
      icon: FileChartColumnIncreasingIcon,
    },
  ],
  REGISTRAR: [
    {
      title: "Dashboard",
      url: ROUTES.DASHBOARD.REGISTRAR.HOME,
      icon: LayoutGrid,
    },
    {
      title: "Manage Vaccines",
      url: ROUTES.DASHBOARD.REGISTRAR.MANAGE_VACCINES,
      icon: Syringe,
    },
    {
      title: "Assign Yellow Card",
      url: ROUTES.DASHBOARD.REGISTRAR.ASSIGN_YELLOW_CARD,
      icon: BookOpen,
    },
    {
      title: "User List",
      url: ROUTES.DASHBOARD.REGISTRAR.USER_LIST,
      icon: FileText,
    },
    {
      title: "Activity Log",
      url: ROUTES.DASHBOARD.REGISTRAR.ACTIVITY_LOG,
      icon: Menu,
    },
  ],
  ADMIN: [
    {
      title: "Dashboard",
      url: ROUTES.DASHBOARD.SUPERADMIN.HOME,
      icon: LayoutGrid,
    },
    {
      title: "Import Applications",
      url: ROUTES.DASHBOARD.SUPERADMIN.IMPORT_APPLICATIONS,
      icon: ExternalLink,
    },
    {
      title: "Local Govt List",
      url: ROUTES.DASHBOARD.SUPERADMIN.LOCAL_GOVT_LIST,
      icon: ClipboardList,
    },
    {
      title: "Remita Transactions",
      url: ROUTES.DASHBOARD.SUPERADMIN.REMITA_TRANSACTIONS,
      icon: CreditCard,
    },
    {
      title: "State List",
      url: ROUTES.DASHBOARD.SUPERADMIN.STATE_LIST,
      icon: FileText,
    },
    {
      title: "Manage Ports",
      url: ROUTES.DASHBOARD.SUPERADMIN.MANAGE_PORTS,
      icon: FileChartColumn,
    },
    {
      title: "Vaccines",
      url: ROUTES.DASHBOARD.SUPERADMIN.VACCINES,
      icon: Syringe,
    },
    {
      title: "Update Vaccine Inventory",
      url: ROUTES.DASHBOARD.SUPERADMIN.UPDATE_VACCINE_INVENTORY,
      icon: RefreshCcw,
    },
    {
      title: "Users",
      url: ROUTES.DASHBOARD.SUPERADMIN.USERS,
      icon: Users,
    },
    {
      title: "Yellow Card Range",
      url: ROUTES.DASHBOARD.SUPERADMIN.YELLOW_CARD_RANGE,
      icon: Maximize2,
    },
    {
      title: "All Events History",
      url: ROUTES.DASHBOARD.SUPERADMIN.ALL_EVENTS_HISTORY,
      icon: Menu,
    },
    {
      title: "Verify Yellow Cards",
      url: ROUTES.DASHBOARD.SUPERADMIN.VERIFY_YELLOW_CARDS,
      icon: BadgeCheck,
    },
  ],
};

export function AppSidebar() {
  const location = useLocation();
  const userRole = getUserRoleFromPath(location.pathname, items); // Extract the role dynamically
  const menuItems = items[userRole] || []; // Get the menu for the role

  const navIsActive = (url: string) => window.location.pathname === url;
  return (
    <Sidebar className="p-6">
      <SidebarContent>
        <AppSidebarHeader />
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent className="w-[221px]">
            <React.Suspense
              fallback={<SidebarSkeleton menuItems={menuItems} />}
            >
              <SidebarMenu className="space-y-2">
                {menuItems.length > 0 ? (
                  menuItems.map((item: any) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={navIsActive(item.url)}
                        className={cn(
                          "px-3 py-5",
                          navIsActive(item.url) &&
                            "bg-primary/90 text-white rounded-lg"
                        )}
                        asChild
                      >
                        <Link to={item.url}>
                          <item.icon
                            className={cn(
                              "text-primary/90",
                              navIsActive(item.url) && "text-white"
                            )}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <p className="text-gray-500">No menu available</p>
                )}
              </SidebarMenu>
              {userRole.toLocaleLowerCase() !== "admin" && <SecurityAlertCard />}
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

const SidebarSkeleton: React.FC<{ menuItems: any[] }> = ({ menuItems }) => {
  return (
    <SidebarMenu>
      {menuItems.map((_, index) => (
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
