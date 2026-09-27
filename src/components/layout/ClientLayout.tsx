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
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  

  const isOnline = useNetwork();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkIs404 = () => {
      const notFoundElement = document.querySelector("h1")?.textContent;
      if (
        notFoundElement &&
        (notFoundElement.includes("Looks Like You're Lost") || 
         notFoundElement.includes("404"))
      ) {
        setIsNotFoundPage(true);
      } else {
        setIsNotFoundPage(false);
      }
    };

    checkIs404();
    const timer = setTimeout(checkIs404, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute =
    pathname?.startsWith("/auth") || pathname?.startsWith("/login");
  const hideLayout = isAdminRoute || isAuthRoute || isNotFoundPage || !isOnline;

  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

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