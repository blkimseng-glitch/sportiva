import { Suspense } from "react";
import HeroBanner from "@/components/layout/HeroBanner";
import HomeGrid from "@/components/layout/HomeGrid";


export default function Home() {
  return (
    <>
      <HeroBanner />
      <Suspense fallback={null}>
        <HomeGrid items={[]} />
      </Suspense>

      <section id="gear" className="border-t   border-line bg-white">
        <div className="mx-auto max-w-content px-5 py-14">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Have something worth covering?
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/60">
            Submit a news item or a piece of gear for editorial review — it
            takes less than a minute.
          </p>
          <a
            href="/admin/create"
            className="  mt-6 inline-flex w-fit items-center gap-2 border border-ink bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Submit an entry
          </a>
        </div>
      </section>
    </>
  );
}
