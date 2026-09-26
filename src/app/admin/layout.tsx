import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b1322] text-slate-100 antialiased">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}