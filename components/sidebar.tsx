"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Settings,
  LayoutDashboard,
  Users,
  Zap,
  Search,
  FileText,
  Workflow,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import signOut from "@/actions/logoutAction";
import { APP_ROUTES } from "@/utils/appRoutes";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      label: "Users",
      icon: Users,
      id: "users",
    },
    {
      label: "Job Discovery",
      icon: Search,
      id: "discovery",
      submenu: [{ label: "Scraping Sources", id: "scraping-sources" }],
    },
    {
      label: "Enrichment",
      icon: Zap,
      id: "enrichment",
      submenu: [
        { label: "Workflows", id: "workflows" },
        { label: "Job Title Mappings", id: "title-mappings" },
        { label: "Contacts", id: "contacts" },
      ],
    },
    {
      label: "Outreach",
      icon: Users,
      id: "outreach",
      submenu: [
        { label: "Campaigns", id: "campaigns" },
        { label: "Templates", id: "templates" },
      ],
    },
    {
      label: "Reports",
      icon: FileText,
      id: "reports",
    },
    {
      label: "Monitoring",
      icon: Workflow,
      id: "monitoring",
    },
    {
      label: "Settings",
      icon: Settings,
      id: "settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b-2 border-b-primary/20 bg-background">
        <div className="flex items-center pl-4 gap-2.5">
          <Link href={APP_ROUTES.DASHBOARD}>
            <img src="/logo.png" alt="Logo" className="h-28 w-28" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="pl-4 pt-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              {item.submenu ? (
                <Collapsible defaultOpen className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "data-[active=true]:bg-transparent hover:bg-transparent bg-transparent active:bg-transparent text-primary",
                        pathname.startsWith(`/${item.id}`) && "font-semibold"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.submenu.map((subitem) => (
                        <SidebarMenuSubItem key={subitem.id}>
                          <SidebarMenuSubButton
                            className={cn(
                              "hover:text-primary hover:bg-transparent text-primary",
                              pathname === `/${item.id}/${subitem.id}` &&
                                "font-bold"
                            )}
                            asChild
                          >
                            <Link href={`/${item.id}/${subitem.id}`}>
                              {subitem.label}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  className={cn(
                    "data-[active=true]:bg-transparent hover:bg-transparent hover:text-primary",
                    pathname === `/${item.id}` && "text-primary font-semibold"
                  )}
                  asChild
                >
                  <Link href={`/${item.id}`}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pl-4 border-t">
        <form action={signOut}>
          <SidebarMenuButton asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive/70 hover:bg-transparent font-semibold"
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
