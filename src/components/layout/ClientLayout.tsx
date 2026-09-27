"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NavbarComponent from "@/components/layout/NavbarComponent";
import FooterComponent from "@/components/layout/FooterComponent";
import NetworkStatusProvider from "@/components/network/NetworkStatusProvider";
import useNetwork from "../hooks/useNetwork";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isOnline = useNetwork();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute = pathname?.startsWith("/auth") || pathname?.startsWith("/login");

  const isHomePage = pathname === "/";
  const isAboutPage = pathname?.startsWith("/about");
  const isNewsPage = pathname?.startsWith("/news");
  const isEventPage = pathname?.startsWith("/event");
  const isContactPage = pathname === "/contact";

 
  const isAllowedMainRoute = isHomePage || isAboutPage || isNewsPage || isEventPage || isContactPage;

  const hideLayout = isAdminRoute || isAuthRoute || !isAllowedMainRoute || (mounted && !isOnline);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <NavbarComponent />}

      <main className="flex-grow">
        <NetworkStatusProvider>{children}</NetworkStatusProvider>
      </main>

      {!hideLayout && <FooterComponent />}
    </div>
  );
}