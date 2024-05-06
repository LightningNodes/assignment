"use client";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/store/auth";
import { Navigation } from "@/components/NavigationMenu";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const workSans = Work_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(workSans.className, "p-4")}>
        <AuthContextProvider>
          <Navigation />
          {children}
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}
