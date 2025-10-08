import type { Metadata } from "next";
import "./globals.css";
import { UserStoreProvider } from "@/stores/user-store-provider";
import { Toaster } from "sonner";
import TanstackQueryProvider from "@/components/TanstackQueryProvider";

export const metadata: Metadata = {
  title: "CCARecruit Admin",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="dark">
      <body className="min-h-screen">
        <UserStoreProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </UserStoreProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
