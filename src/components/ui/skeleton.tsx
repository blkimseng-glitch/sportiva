

export default function Skeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading home page"
      className="min-h-screen bg-white text-slate-900 dark:bg-[#121824] dark:text-slate-100"
    >
      <div className="h-[280px] animate-pulse bg-slate-200 dark:bg-slate-800 sm:h-[360px]" />

      <div className="mx-auto max-w-[1400px] space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-2 dark:border-slate-800">
            <div className="h-3 w-3 animate-pulse rounded-full bg-red-200 dark:bg-red-900" />
            <div className="h-5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)_minmax(210px,0.72fr)]">
            <div className="animate-pulse space-y-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="aspect-[16/9] rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-800/70" />
              <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800/70" />
            </div>

            <div className="space-y-4 border-l border-slate-200 pl-4 dark:border-slate-800">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="flex animate-pulse items-center gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-red-100 dark:bg-red-950" />
                    <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-4/5 rounded bg-slate-100 dark:bg-slate-800/70" />
                  </div>
                  <div className="h-16 w-[100px] shrink-0 rounded-lg bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>

            <div className="hidden space-y-4 border-l border-slate-200 pl-4 dark:border-slate-800 lg:block">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="flex animate-pulse gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 flex-1 rounded bg-slate-100 dark:bg-slate-800/70" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="h-7 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-2/5 rounded bg-slate-100 dark:bg-slate-800/70" />
                  <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-4/5 rounded bg-slate-100 dark:bg-slate-800/70" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="h-48 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#1b2735]" />
    </main>
  )
}
