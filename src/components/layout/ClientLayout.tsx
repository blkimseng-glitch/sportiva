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

  // ប្រសិនបើស្ថិតក្នុងទំព័រ Login, Admin ឬ 404 គឺបង្ហាញពេញអេក្រង់ដោយគ្មាន Navbar និង Footer
  if (hideLayout) {
    return (
      <div className="relative w-screen h-screen overflow-hidden m-0 p-0">
        <NetworkStatusProvider>{children}</NetworkStatusProvider>
      </div>
    );
  }

  // សម្រាប់ទំព័រធម្មតាដែលមាន Navbar និង Footer
  return (
    <div className="flex flex-col w-full min-h-screen">
      <NavbarComponent />

      <main className="flex-grow w-full">
        <NetworkStatusProvider>{children}</NetworkStatusProvider>
      </main>

      <FooterComponent />
    </div>
  );
}