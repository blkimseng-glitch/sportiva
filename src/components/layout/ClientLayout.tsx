"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NavbarComponent from "@/components/layout/NavbarComponent";
import FooterComponent from "@/components/layout/FooterComponent";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ពិនិត្យមើលជាប្រចាំថាតើទំព័របច្ចុប្បន្នមានបង្ហាញអត្ថបទ 404 ឬ "Looks Like You're Lost" ដែរឬទេ
  useEffect(() => {
    const checkIs404 = () => {
      // ឆែកមើលថាតើមាន Component របស់ not-found កំពុង render ដែរឬអត់
      const notFoundElement = document.querySelector("h1")?.textContent;
      if (notFoundElement && notFoundElement.includes("Looks Like You're Lost")) {
        setIsNotFoundPage(true);
      } else {
        setIsNotFoundPage(false);
      }
    };

    // רץឆែកពេល pathname ឬ DOM ផ្លាស់ប្តូរ
    checkIs404();
    const timer = setTimeout(checkIs404, 50);
    return () => clearTimeout(timer);
  }, [pathname, children]);

  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute = pathname?.startsWith("/auth") || pathname?.startsWith("/login");
  
  // បើស្ថិតក្នុង Admin, Auth ឬទំព័រ 404 គឺត្រូវលាក់ Navbar និង Footer
  const hideLayout = isAdminRoute || isAuthRoute || isNotFoundPage;

  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <NavbarComponent />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <FooterComponent />}
    </div>
  );
}