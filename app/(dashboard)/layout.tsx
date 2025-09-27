import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-auto w-full">
          <div className="pt-4 pl-4">
            <SidebarTrigger className="ml-auto md:hidden" />
          </div>
          <main className="px-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
