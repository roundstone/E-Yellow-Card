import { Settings } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import IMAGES from "@/assets/images";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { appAtom } from "@/stores/app";

export function AppDashboardNav() {
  const [app] = useAtom(appAtom);
  return (
    <nav className="flex justify-between pb-10">
      <div className="text-lg font-normal">
        {app.dashboardTitle || "Dashboard"}
      </div>

      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="gap-3 bg-transparent">
              <img
                src={IMAGES.profileIcon}
                alt=""
                className="w-6 h-6 rounded-full"
              />{" "}
              Port Health Director
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-full">
                <ListItem href="/docs" title="Profile"></ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Settings />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
