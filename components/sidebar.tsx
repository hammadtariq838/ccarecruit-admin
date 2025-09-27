"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Settings, BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import signOut from "@/actions/logoutAction";
import { APP_ROUTES } from "@/utils/appRoutes";
import { useUserStore } from "@/stores/user-store-provider";
import { useEffect } from "react";
import { getUserProfile } from "@/requests/client/user";
import { toast } from "sonner";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { updateUser } = useUserStore((state) => state);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  useEffect(() => {
    getUserProfile()
      .then((user) => {
        updateUser(user);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error((error as Error).message);
      });
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-3">
          <Link href={APP_ROUTES.DASHBOARD}>
            <img src="/logo.svg" alt="Logo" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="pl-4 pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive(APP_ROUTES.DASHBOARD)}
            >
              <Link href={APP_ROUTES.DASHBOARD}>
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(APP_ROUTES.SETTINGS)}>
              <Link href={APP_ROUTES.SETTINGS}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pl-4">
        <form action={signOut}>
          <SidebarMenuButton asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarMenuButton>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
