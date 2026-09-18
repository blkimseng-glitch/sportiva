"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Moon, Bell, User, ChevronDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// បង្កើតរចនាសម្ព័ន្ធ Nav Links ឱ្យស្រួលផ្លាស់ប្តូរតាមក្រោយ
const mainNavLinks = [
  { label: "ទំព័រដើម", href: "/" },
  { label: "បាល់បោះ", href: "/sports" },
  { label: "ប្រដាល់", href: "/events" },
  { label: "ពិន្ទុផ្ទាល់", href: "/live-score" },
  { label: "ទោចក្រយានយន្ត", href: "/motorsport" },
];

export default function NavbarComponent() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-[#1b2735] text-white sticky top-0 z-50">
      {/* Top Section */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 border-b border-slate-700/60">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            🏃
          </div>
          <span>កីឡាប្រចាំថ្ងៃ</span>
        </Link>

        {/* Search Input */}
        <div className="relative hidden md:block w-full max-w-md mx-6">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="ស្វែងរកព័ត៌មាន, កីឡាករ, ឬក្រុម..."
            className="w-full bg-[#2a384b] pl-10 text-slate-100 placeholder:text-slate-400 border-none rounded-full focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            type="button" 
            className="rounded-full p-2 hover:bg-slate-700/60 text-slate-300 transition-colors"
            aria-label="Toggle Theme"
          >
            <Moon className="h-5 w-5" />
          </button>

          <div className="relative">
            <button 
              type="button" 
              className="rounded-full p-2 hover:bg-slate-700/60 text-slate-300 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <Badge className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-0 text-[10px] font-bold">
              3
            </Badge>
          </div>

          <div className="h-4 w-[1px] bg-slate-700 mx-1 hidden sm:block" />

          {/* User Profile */}
          <Link 
            href="/login" 
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <Avatar className="h-8 w-8 border border-slate-600">
              <AvatarImage src="" />
              <AvatarFallback className="bg-slate-700 text-slate-200">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:inline">ចូលប្រើប្រាស់</span>
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
              ? "text-blue-400 font-semibold border-b-2 border-blue-500 rounded-b-none" 
              : "text-slate-300 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          ទំព័រដើម
        </Link>

        {/* Dropdown 1: បាល់ទាត់ */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/50 outline-none transition-colors whitespace-nowrap cursor-pointer">
            បាល់ទាត់ <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2a384b] text-slate-200 border-slate-700 shadow-xl">
            <DropdownMenuItem asChild className="hover:bg-slate-700/80 focus:bg-slate-700/80 cursor-pointer">
              <Link href="/football/cpl">លីគកំពូលកម្ពុជា</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-slate-700/80 focus:bg-slate-700/80 cursor-pointer">
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
                  ? "text-blue-400 font-semibold border-b-2 border-blue-500 rounded-b-none" 
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Dropdown 2: ប្រភេទកីឡាផ្សេងៗ */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/50 outline-none transition-colors whitespace-nowrap cursor-pointer">
            ប្រភេទកីឡាផ្សេងៗ <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2a384b] text-slate-200 border-slate-700 shadow-xl">
            <DropdownMenuItem asChild className="hover:bg-slate-700/80 focus:bg-slate-700/80 cursor-pointer">
              <Link href="/sports/tennis">វាយកូនបាល់</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:bg-slate-700/80 focus:bg-slate-700/80 cursor-pointer">
              <Link href="/sports/chess">អុក</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </nav>
    </header>
  );
}