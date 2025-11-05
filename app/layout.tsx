import type { Metadata } from "next";
import "./globals.css";
import { UserStoreProvider } from "@/stores/user-store-provider";
import { Toaster } from "sonner";
import TanstackQueryProvider from "@/components/TanstackQueryProvider";
import { Lora, Fira_Code } from "next/font/google";

const _lora = Lora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const _firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CCARecruit Admin",
  description: "Strategic hiring solutions powered by PersonaScience",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body
        className={`${_lora.variable} ${_firaCode.variable} font-sans antialiased min-h-screen`}
      >
        <UserStoreProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </UserStoreProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
