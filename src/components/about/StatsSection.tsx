import SectionHeading from "./SectionHeading";
import { statsSection } from "./data";

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-100 py-16 sm:py-24 dark:border-slate-800/80 dark:bg-[#0e1826]">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading data={statsSection.heading} />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {statsSection.items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 dark:border-slate-800 dark:bg-[#121c2d]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 ring-1 ring-blue-500/25 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-600/15 dark:text-blue-400">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-5 text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                  {item.value === null ? "—" : item.value.toLocaleString()}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</div>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">
          Actual figures will be displayed once connected to the API.
        </p>
      </div>
    </section>
  );
}