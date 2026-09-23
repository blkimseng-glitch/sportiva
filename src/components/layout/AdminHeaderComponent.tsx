"use client";

import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  subtitle: string;
  onMenuClick: () => void;
}

export default function AdminHeaderComponent({ title, subtitle, onMenuClick }: Props) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-[#0b1322]/90 px-4 py-3 backdrop-blur-xl lg:px-6">
      <div className="flex min-h-11 items-center gap-3">
        <button type="button" onClick={onMenuClick} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden" aria-label="បើកម៉ឺនុយ">
          <Menu size={19} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold text-white sm:text-base">{title}</h1>
          <p className="hidden truncate text-xs text-slate-500 sm:block">{subtitle}</p>
        </div>


        <div className="relative">
          <button type="button" onClick={() => setProfileOpen((open) => !open)} className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-800" aria-expanded={profileOpen}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-bold text-white">A</div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-slate-200">Admin</p>
              <p className="text-[10px] text-slate-500">អ្នកគ្រប់គ្រង</p>
            </div>
          </button>
          {profileOpen ? (
            <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-slate-700 bg-[#101a2b] p-1.5 shadow-2xl">
              <Link href="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white" onClick={() => setProfileOpen(false)}>
                <ExternalLink size={14} /> មើលគេហទំព័រ
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
