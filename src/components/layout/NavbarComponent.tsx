"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Moon, Sun, Bell, User, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Create Nav Links structure for easy changes later
const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "Basketball", href: "/sports" },
  { label: "Boxing", href: "/events" },
  { label: "Live Score", href: "/live-score" },
  { label: "Motorsport", href: "/motorsport" },
];

export default function NavbarComponent() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <header className="w-full bg-white text-slate-900 border-b border-slate-200 dark:bg-[#1b2735] dark:text-white dark:border-slate-700/60 sticky top-0 z-50">
      {/* Top Section */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            🏃
          </div>
          <span>Daily Sports</span>
        </Link>

        {/* Search Input */}
        <div className="relative hidden md:block w-full max-w-md mx-6">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search news, athletes, or teams..."
            className="w-full bg-slate-100 pl-10 text-slate-800 placeholder:text-slate-500 border-none rounded-full focus-visible:ring-1 focus-visible:ring-blue-500 dark:bg-[#2a384b] dark:text-slate-100 dark:placeholder:text-slate-400"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-slate-200 text-slate-600 dark:hover:bg-slate-700/60 dark:text-slate-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {mounted && isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button 
              type="button" 
              className="rounded-full p-2 hover:bg-slate-200 text-slate-600 dark:hover:bg-slate-700/60 dark:text-slate-300 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <Badge className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-0 text-[10px] font-bold">
              3
            </Badge>
          </div>

          <div className="h-4 w-[1px] bg-slate-300 mx-1 hidden sm:block dark:bg-slate-700" />

          {/* User Profile */}
          <Link 
            href="/login" 
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <Avatar className="h-8 w-8 border border-slate-300 dark:border-slate-600">
              <AvatarImage src="" />
              <AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:inline">Sign In</span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="mx-auto flex max-w-7xl items-center gap-1 sm:gap-2 px-4 py-1.5 text-sm font-medium overflow-x-auto scrollbar-none">
        
        {/* Home Link */}
        <Link
          href="/"
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
            pathname === "/" 
              ? "text-blue-600 font-semibold border-b-2 border-blue-600 rounded-b-none dark:text-blue-400 dark:border-blue-500" 
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50"
          }`}
        >
          Home
        </Link>

        {/* Dropdown 1: Football */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 outline-none transition-colors whitespace-nowrap cursor-pointer">
            Football <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-slate-800 border-slate-200 shadow-xl dark:bg-[#2a384b] dark:text-slate-200 dark:border-slate-700">
            <DropdownMenuItem asChild className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer dark:hover:bg-slate-700/80 dark:focus:bg-slate-700/80">
              <Link href="/football/cpl">Cambodian Premier League</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer dark:hover:bg-slate-700/80 dark:focus:bg-slate-700/80">
              <Link href="/football/epl">Premier League</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Other Main Links */}
        {mainNavLinks.slice(1).map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                isActive 
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 rounded-b-none dark:text-blue-400 dark:border-blue-500" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Dropdown 2: Other Sports */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50 outline-none transition-colors whitespace-nowrap cursor-pointer">
            Other Sports <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-slate-800 border-slate-200 shadow-xl dark:bg-[#2a384b] dark:text-slate-200 dark:border-slate-700">
            <DropdownMenuItem asChild className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer dark:hover:bg-slate-700/80 dark:focus:bg-slate-700/80">
              <Link href="/sports/tennis">Tennis</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer dark:hover:bg-slate-700/80 dark:focus:bg-slate-700/80">
              <Link href="/sports/chess">Chess</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </nav>
    </header>
  );
}