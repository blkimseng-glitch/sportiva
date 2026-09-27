import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0b1322] text-slate-100 antialiased overflow-x-hidden">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}