"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, ChevronRight, CircleHelp, FolderKanban, LayoutDashboard, MessageSquare, Tags, Trophy, X, Zap } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    title: "ទិដ្ឋភាពទូទៅ",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "គ្រប់គ្រងមាតិកា",
    items: [
      { label: "កីឡា", href: "/admin/sports", icon: Trophy },
      { label: "ព្រឹត្តិការណ៍", href: "/admin/events", icon: CalendarDays },
      { label: "ប្រភេទកីឡា", href: "/admin/categories", icon: Tags },
      { label: "មតិយោបល់", href: "/admin/comments", icon: MessageSquare },
    ],
  },
];

export default function AdminSidebarComponent({ open, onClose }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {open ? <button type="button" className="fixed inset-0 z-50 bg-slate-950/70 lg:hidden" onClick={onClose} aria-label="បិទម៉ឺនុយ" /> : null}
      <aside className={`fixed inset-y-0 left-0 z-[60] flex w-[250px] flex-col border-r border-slate-800 bg-[#080f1c] transition-transform duration-200 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/40"><Zap size={17} /></div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white">Sportiva</div>
              <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">Admin Panel</div>
            </div>
          </Link>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white lg:hidden" aria-label="បិទ">
            <X size={17} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="px-3 pb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-700">{section.title}</p>
              <div className="space-y-1">
                {section.items.map(({ label, href, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link key={href} href={href} onClick={onClose} className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${active ? "border-blue-500/20 bg-blue-500/10 text-blue-300" : "border-transparent text-slate-500 hover:bg-slate-800/80 hover:text-slate-200"}`}>
                      <Icon size={16} className={active ? "text-blue-400" : "text-slate-600 group-hover:text-slate-300"} />
                      <span>{label}</span>
                      {active ? <ChevronRight size={13} className="ml-auto text-blue-500" /> : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <Link href="/" onClick={onClose} className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-800 hover:text-slate-200">
            <FolderKanban size={16} /> មើលគេហទំព័រ
          </Link>
          <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 px-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-400"><BarChart3 size={15} /></div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-300">ផ្ទាំងគ្រប់គ្រង</p>
              <p className="truncate text-[10px] text-slate-600">Sportiva content center</p>
            </div>
            <CircleHelp size={14} className="ml-auto text-slate-700" />
          </div>
        </div>
      </aside>
    </>
  );
}
