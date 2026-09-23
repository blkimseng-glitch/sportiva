"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import AdminHeaderComponent from "@/components/layout/AdminHeaderComponent";
import AdminSidebarComponent from "@/components/layout/AdminSidebarComponent";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const meta: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "សង្ខេបស្ថានភាពមាតិកា Sportiva" },
  "/admin/sports": { title: "កីឡា", subtitle: "គ្រប់គ្រងកីឡានៅលើ Sportiva" },
  "/admin/events": { title: "ព្រឹត្តិការណ៍", subtitle: "គ្រប់គ្រងព្រឹត្តិការណ៍កីឡា" },
  "/admin/categories": { title: "ប្រភេទកីឡា", subtitle: "គ្រប់គ្រងប្រភេទកីឡា" },
  "/admin/comments": { title: "មតិយោបល់", subtitle: "ពិនិត្យ និងលុបមតិយោបល់អ្នកប្រើប្រាស់" },
};

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const current = meta[pathname] ?? { title: "Admin", subtitle: "ផ្ទាំងគ្រប់គ្រង Sportiva" };

  return (
    <div className="flex min-h-screen bg-[#0b1322] text-slate-200">
      <AdminSidebarComponent open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <AdminHeaderComponent title={current.title} subtitle={current.subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 py-5 lg:px-6 lg:py-6">
          <div className="mx-auto w-full max-w-[1500px]">{children}</div>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
