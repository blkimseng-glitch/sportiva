import Link from "next/link";

import { aboutFooterCapabilities, aboutFooterLinks } from "./data";

export default function AboutFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800/80 dark:bg-[#0b1322]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-wide text-slate-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                🏃
              </span>
              Sportiva
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A digital platform for sports news and events in Cambodia, in Khmer.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Explore the Site</h3>
            <ul className="mt-4 space-y-2.5">
              {aboutFooterLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Platform Capabilities</h3>
            <ul className="mt-4 space-y-2.5">
              {aboutFooterCapabilities.map((capability) => (
                <li key={capability} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800/80">
          © {new Date().getFullYear()} Sportiva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}