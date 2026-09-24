import { Target } from "lucide-react";

import SectionHeading, { SectionIcon } from "./SectionHeading";
import { missionFeatures, missionSection } from "./data";

function MissionFeatureCard({ item }: { item: (typeof missionFeatures)[number] }) {
  const { icon: Icon, title, description } = item;
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-slate-200 dark:border-slate-800 dark:bg-[#121c2d] dark:hover:shadow-blue-950/40">
      <SectionIcon icon={Icon} />
      <h3 className="mt-5 text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
    </article>
  );
}

export default function MissionSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-100 py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0e1826]">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-3">
          <SectionIcon icon={Target} />
          <SectionHeading data={missionSection} className="mt-1" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missionFeatures.map((feature) => (
            <MissionFeatureCard key={feature.title} item={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}