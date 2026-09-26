"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, Bell, User, LogOut, Settings, Shield } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mainNavLinks = [
  { label: "About", href: "/about" },
  { label: "News", href: "/sports" },
  { label: "Event", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function NavbarComponent() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ទាញយក Theme និង User ពី localStorage ពេល Load ទំព័រ
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.add("dark");
    }

    //check User or Login done 
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      if (nextMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return nextMode;
    });
  };

  // 3. មុខងារ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_role");
    setCurrentUser(null);
    setIsDropdownOpen(false);
    window.location.href = "/auth/login";
  };

  return (
    <header className={`w-full sticky top-0 z-50 transition-colors duration-300 ${isDarkMode ? "bg-[#1b2735] text-white" : "bg-white text-slate-800 shadow-md"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 border-b border-slate-700/20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-sportiva.png" 
            alt="Sportiva Logo"
            width={130}
            height={40}
            className={`object-contain transition-all ${
              isDarkMode 
                ? "brightness-200 contrast-200 drop-shadow-[0_0_2px_rgba(255,255,255,0.9)]" 
                : ""
            }`}
            priority
          />
        </Link>

        {/* Search Input */}
        <div className="relative hidden md:block w-full max-w-md mx-6">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search..."
            className={`w-full pl-10 border-none rounded-full focus-visible:ring-1 focus-visible:ring-blue-500 ${
              isDarkMode 
                ? "bg-[#2a384b] text-slate-100 placeholder:text-slate-400" 
                : "bg-slate-100 text-slate-900 placeholder:text-slate-500"
            }`}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            type="button" 
            onClick={toggleTheme}
            className={`rounded-full p-2 transition-colors ${isDarkMode ? "hover:bg-slate-700/60 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>

          

          <div className={`h-4 w-[1px] mx-1 hidden sm:block ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`} />

          {/* User Profile / Register Section with Dropdown */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 focus:outline-none hover:opacity-85 transition-opacity"
              >
                <Avatar className={`h-8 w-8 border ${isDarkMode ? "border-slate-600" : "border-slate-300"}`}>
                  <AvatarImage src={currentUser.avatar || ""} />
                  <AvatarFallback className={isDarkMode ? "bg-slate-700 text-slate-200" : "bg-slate-200 text-slate-700"}>
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">{currentUser.name}</span>
              </button>

              {/* Dropdown Box */}
              {isDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border py-2 z-50 transition-all ${
                  isDarkMode 
                    ? "bg-[#223042] border-slate-700 text-slate-200" 
                    : "bg-white border-slate-200 text-slate-800"
                }`}>
                  <div className="px-4 py-2 border-b border-slate-700/20">
                    <p className="text-sm font-bold truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-400 truncate">{currentUser.email || "No email"}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        isDarkMode ? "hover:bg-slate-700/50" : "hover:bg-slate-100"
                      }`}
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    {currentUser.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                          isDarkMode ? "hover:bg-slate-700/50" : "hover:bg-slate-100"
                        }`}
                      >
                        <Shield className="h-4 w-4 text-cyan-400" /> Admin Dashboard
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-700/20 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-500 transition-colors ${
                        isDarkMode ? "hover:bg-slate-700/50" : "hover:bg-slate-100"
                      }`}
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/auth/login" 
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <Avatar className={`h-8 w-8 border ${isDarkMode ? "border-slate-600" : "border-slate-300"}`}>
                <AvatarImage src="" />
                <AvatarFallback className={isDarkMode ? "bg-slate-700 text-slate-200" : "bg-slate-200 text-slate-700"}>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">Register</span>
            </Link>
          )}
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-center gap-1 sm:gap-3 px-4 py-2 text-sm font-medium overflow-x-auto scrollbar-none">
        {mainNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                isActive 
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500 rounded-b-none" 
                  : isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-800/50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}