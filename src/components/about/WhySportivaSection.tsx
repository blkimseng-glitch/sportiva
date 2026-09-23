import SectionHeading from "./SectionHeading";
import { whySportiva } from "./data";

export default function WhySportivaSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 dark:bg-[#0b1322]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading data={whySportiva.heading} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whySportiva.cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-slate-200 dark:border-slate-800 dark:bg-[#121c2d] dark:hover:shadow-blue-950/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 ring-1 ring-blue-500/25 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-600/15 dark:text-blue-400">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{card.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}