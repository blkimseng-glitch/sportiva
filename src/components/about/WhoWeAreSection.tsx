import { CircleCheck } from "lucide-react";

import SportsVisual from "./SportsVisual";
import SectionHeading from "./SectionHeading";
import { whoWeAre, whoWeAreHighlights } from "./data";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-[#0b1322]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading data={whoWeAre} align="left" className="mx-0 max-w-none text-left" />
            <p className="mt-6 text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
              We are a group of people who love sports and technology, building digital solutions
              for sports news and events in Cambodia.
            </p>
            <ul className="mt-8 space-y-3">
              {whoWeAreHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SportsVisual title="All Sports" />
          </div>
        </div>
      </div>
    </section>
  );
}