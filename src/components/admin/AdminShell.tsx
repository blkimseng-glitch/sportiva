"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import AdminHeaderComponent from "@/components/layout/AdminHeaderComponent";
import AdminSidebarComponent from "@/components/layout/AdminSidebarComponent";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function AdminShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    /* 💡 កំណត់ h-screen និង overflow-hidden លើ Container ធំ */
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-900 antialiased">
      
      {/* Sidebar - នឹងនៅស្ងៀមមួយកន្លែង */}
      <AdminSidebarComponent open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area - កំណត់ h-full និង overflow-y-auto ដើម្បីឱ្យ scroll តែផ្នែកនេះ */}
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto">
        <AdminHeaderComponent onMenuClick={() => setSidebarOpen(true)} title={""} subtitle={""} />
        
        <main className="flex-1 px-4 py-5 lg:px-6 lg:py-6">
          <div className="mx-auto w-full max-w-[1500px]">
            {children}
          </div>
        </main>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}