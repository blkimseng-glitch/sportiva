import { Eye } from "lucide-react";

import SportsVisual from "./SportsVisual";
import SectionHeading from "./SectionHeading";
import { visionSection, visionValues } from "./data";

export default function VisionSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-[#0b1322]">
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SportsVisual image="/vision.png" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {visionSection.label}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {visionSection.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
              {visionSection.description}
            </p>
            <ul className="mt-8 space-y-3">
              {visionValues.map((value) => (
                <li
                  key={value}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-[#121c2d] dark:text-slate-200"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}