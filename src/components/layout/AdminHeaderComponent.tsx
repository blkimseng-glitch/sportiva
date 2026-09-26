"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Menu, Sparkles } from "lucide-react";
import { useState } from "react";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  adminName?: string;
  adminAvatarUrl?: string; // អាចបញ្ចូល URL រូបភាព Admin បាន
  onMenuClick: () => void;
}

export default function AdminHeaderComponent({
  title = "Sports Categories",
  subtitle,
  adminName = "Admin",
  adminAvatarUrl,
  onMenuClick,
}: AdminHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-xs backdrop-blur-md lg:px-6">
      <div className="flex min-h-[44px] items-center justify-between gap-4">
        
        {/* ផ្នែកខាងឆ្វេង៖ Mobile Menu Button & Welcome Text */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label="Open Menu"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="truncate text-sm font-bold text-slate-800 sm:text-base">
                Welcome back, <span className="text-blue-600">{adminName}</span>!
              </h1>
              <Sparkles size={16} className="text-amber-500 shrink-0 hidden sm:inline-block" />
            </div>
            <p className="hidden truncate text-xs text-slate-400 sm:block">
              {subtitle || title}
            </p>
          </div>
        </div>

        {/* ផ្នែកខាងស្តាំ៖ Admin Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 p-1.5 pr-3 transition-all hover:border-slate-300 hover:bg-slate-100"
            aria-expanded={profileOpen}
          >
            {/* រូបភាព ឬ Avatar Icon */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-600 text-xs font-bold text-white shadow-xs ring-2 ring-white">
              {adminAvatarUrl ? (
                <Image
                  src={adminAvatarUrl}
                  alt={adminName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : (
                adminName.charAt(0).toUpperCase()
              )}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold leading-tight text-slate-800">{adminName}</p>
              <p className="text-[10px] font-medium leading-tight text-slate-400">Super Administrator</p>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 sm:hidden">
                <p className="text-xs font-bold text-slate-800">{adminName}</p>
                <p className="text-[10px] text-slate-400">Super Administrator</p>
              </div>

              <Link
                href="/"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setProfileOpen(false)}
              >
                <ExternalLink size={14} />
                <span>View Website</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}