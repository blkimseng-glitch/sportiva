"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, ChevronRight, CircleHelp, ExternalLink, LayoutDashboard, MessageSquare, Tags, Trophy, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    title: "General",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Content Management",
    items: [
      { label: "Sports", href: "/admin/sports", icon: Trophy },
      { label: "Events", href: "/admin/events", icon: CalendarDays },
      { label: "Categories", href: "/admin/categories", icon: Tags },
      { label: "Comments", href: "/admin/comments", icon: MessageSquare },
    ],
  },
];

export default function AdminSidebarComponent({ open, onClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex h-screen w-[250px] shrink-0 flex-col border-r border-slate-200/80 bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 shrink-0">
          <Link href="/admin" onClick={onClose} className="flex items-center">
            <Image
              src="/logo-sportiva.png" 
              alt="Sportiva Logo"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="px-3 pb-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map(({ label, href, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                        active
                          ? "bg-blue-50 text-blue-600 shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          active
                            ? "text-blue-600"
                            : "text-slate-400 transition-colors group-hover:text-slate-600"
                        }
                      />
                      <span>{label}</span>
                      {active ? <ChevronRight size={15} className="ml-auto text-blue-600" /> : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Area */}
        <div className="border-t border-slate-100 p-3 space-y-2 shrink-0">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ExternalLink size={18} className="text-slate-400" />
            <span>View Website</span>
          </Link>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <BarChart3 size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800">Admin Control</p>
              <p className="truncate text-[10px] text-slate-500">Sportiva Content Center</p>
            </div>
            <CircleHelp size={16} className="text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
}