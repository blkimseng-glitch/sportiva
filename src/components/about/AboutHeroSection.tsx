import Link from "next/link";
import { ArrowDown, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import SportsVisual from "./SportsVisual";
import { aboutHero } from "./data";

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 dark:border-slate-800/80 dark:bg-[#0b1322]">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full border border-slate-700/50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            {aboutHero.label}
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {aboutHero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400">
            {aboutHero.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-10 rounded-full bg-blue-600 px-6 text-white shadow-md shadow-blue-600/25 hover:bg-blue-500"
            >
              <a href="#who-we-are">
                Explore More <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-10 rounded-full border-slate-300 bg-white px-6 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-[#162235] dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Link href="/events">
                <CalendarDays className="size-4" aria-hidden="true" /> Sports Events
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <SportsVisual title="Sportiva" />
        </div>
      </div>
    </section>
  );
}