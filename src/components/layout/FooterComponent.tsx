import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FooterComponent() {
  return (
    <>
      <footer className="w-full bg-white text-slate-600 dark:bg-[#1b2735] dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Grid: 4 Columns on Large screens */}
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-8 gap-12 pt-14 pb-20 max-w-md mx-auto md:max-w-xl lg:max-w-full">
            
            {/* Column 1: Logo Only */}
            <div className="block flex items-start">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo-sportiva.png" 
                  alt="Sports News Logo"
                  width={140}
                  height={40}
                  className="object-contain transition-all dark:brightness-200 dark:contrast-200 dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.9)]"
                  priority
                />
              </Link>
            </div>

            {/* Column 2: Quick Links */}
            <div className="block">
              <h4 className="text-xl text-slate-900 dark:text-white font-bold mb-7">Quick Links</h4>
              <ul className="text-base transition-all duration-500 space-y-4">
                <li>
                  <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    Latest News
                  </Link>
                </li>
                <li>
                  <Link href="/highlights" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    Highlights Video
                  </Link>
                </li>
                <li>
                  <Link href="/trending" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    Trending News
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support Center */}
            <div className="block">
              <h4 className="text-xl text-slate-900 dark:text-white font-bold mb-7">Support Center</h4>
              <ul className="text-base transition-all duration-500 space-y-4">
                <li>
                  <Link href="/about" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    Advertise with Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Extra Column / Logo */}
            <div className="block flex flex-col items-start">
              <h4 className="text-xl text-slate-900 dark:text-white font-bold mb-7">About Sportiva</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                The ultimate platform for all sports news, highlights, and updates in Cambodia.
              </p>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="py-7 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center flex-col lg:space-y-0 space-y-8 lg:justify-between lg:flex-row">
              
              {/* Copyright */}
              <span className="text-slate-500 dark:text-slate-400 text-sm block text-center">
                &copy; 2026 Sports News. All rights reserved.
              </span>

              {/* Social Icons */}
              <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 flex justify-center items-center hover:border-red-600 text-slate-600 dark:text-slate-300 hover:text-white transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                  className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 flex justify-center items-center hover:border-red-600 text-slate-600 dark:text-slate-300 hover:text-white transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.228-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.482-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.331.015.104.03.341.011.529z" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </>
  );
}