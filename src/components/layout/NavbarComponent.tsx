"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, User, LogOut, Shield, Menu, X } from "lucide-react";

import { Input } from "@/components/ui/input";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ឆែកមើល Class dark នៅលើ html tag ពេល Component Load រួច
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_role");
    setCurrentUser(null);
    setIsDropdownOpen(false);
    window.location.href = "/auth/login";
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white dark:bg-[#1b2735] text-slate-800 dark:text-white transition-colors duration-300 shadow-sm">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700/20">
        
        {/* Left: Mobile Menu Button & Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src="/image/logo-sportiva.png" 
              alt="Sportiva Logo"
              width={120}
              height={35}
              className="object-contain transition-all dark:brightness-200 dark:contrast-200 dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.9)]"
              priority
            />
          </Link>
        </div>

        {/* Search Input (Desktop) */}
        

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            type="button" 
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="h-4 w-[1px] mx-1 hidden sm:block bg-slate-200 dark:bg-slate-700" />

          {/* User Profile / Register Section */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 focus:outline-none hover:opacity-85 transition-opacity"
              >
                <Avatar className="h-8 w-8 border border-slate-300 dark:border-slate-600">
                  <AvatarImage src={currentUser.avatar || ""} />
                  <AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">{currentUser.name}</span>
              </button>

              {/* Dropdown Box */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border py-2 z-50 transition-all bg-white border-slate-200 text-slate-800 dark:bg-[#223042] dark:border-slate-700 dark:text-slate-200">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700/20">
                    <p className="text-sm font-bold truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-400 truncate">{currentUser.email || "No email"}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    {currentUser.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50"
                      >
                        <Shield className="h-4 w-4 text-cyan-400" /> Admin Dashboard
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700/20 pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700/50"
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
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Avatar className="h-8 w-8 border border-slate-300 dark:border-slate-600">
                <AvatarFallback className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">Register</span>
            </Link>
          )}
        </div>
      </div>


      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex mx-auto max-w-7xl items-center justify-center gap-3 px-4 py-2 text-sm font-medium">
        {mainNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                isActive 
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500 rounded-b-none" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b px-4 py-3 space-y-2 transition-all bg-white border-slate-200 text-slate-800 dark:bg-[#162235] dark:border-slate-700/50 dark:text-slate-200">
          {mainNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-slate-100 text-slate-700 dark:hover:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}