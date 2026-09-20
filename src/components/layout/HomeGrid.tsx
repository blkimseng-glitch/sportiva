"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SportItem } from "@/lib/types";

import SportCard from "./SportCard";

const HIDDEN_STORY_TITLE = "CBF hosts 2nd monthly boxing night with international bouts";

function StoryImage({ item, className = "" }: { item: SportItem; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.imageUrls[0]} alt={item.name} className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${className}`} />
  );
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-2">
      <h2 className="font-display text-base font-extrabold tracking-tight text-ink sm:text-lg">{children}</h2>
      <span className="h-0.5 flex-1 bg-flare" />
      {action && <span className="text-[9px] font-bold uppercase tracking-widest text-ink/40">{action}</span>}
    </div>
  );
}

function MiniStory({ item }: { item: SportItem }) {
  return (
    <Link href={`/sports/${item.id}`} className="group grid grid-cols-[112px_1fr] gap-3 border-b border-slate-200 pb-3 last:border-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        <StoryImage item={item} />
        <span className="absolute bottom-1 left-1 bg-flare px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">{item.categoryName}</span>
      </div>
      <div>
        <h3 className="line-clamp-3 text-xs font-bold leading-snug text-ink transition group-hover:text-flare-dark">{item.name}</h3>
        <p className="mt-1 text-[9px] text-ink/40">5 min read</p>
      </div>
    </Link>
  );
}

function VideoStory({ item }: { item: SportItem }) {
  return (
    <Link href={`/sports/${item.id}`} className="group block w-[min(78vw,280px)] shrink-0 snap-start sm:w-[280px]">
      <div className="relative aspect-video overflow-hidden bg-ink">
        <StoryImage item={item} className="opacity-70" />
        <span className="absolute inset-0 flex items-center justify-center text-3xl text-white drop-shadow">&#9654;</span>
      </div>
      <h3 className="mt-2 line-clamp-2 text-xs font-bold leading-snug text-ink transition group-hover:text-flare-dark">{item.name}</h3>
    </Link>
  );
}

export default function HomeGrid({ items }: { items: SportItem[] }) {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase();
  const [active, setActive] = useState("All");
  const visibleItems = items.filter((item) => item.name !== HIDDEN_STORY_TITLE);

  const filtered = useMemo(() => visibleItems.filter((item) => {
    const categoryMatch = active === "All" || item.categoryName === active;
    const queryMatch = !query || `${item.name} ${item.description}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  }), [visibleItems, active, query]);

  const [lead, ...rest] = filtered.length ? filtered : visibleItems;
  const sideStories = rest.slice(0, 4);
  const ranked = [...filtered, ...visibleItems].filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id) === index).slice(0, 5);
  const popularItems = (filtered.length ? filtered : visibleItems).slice(0, 8);
  const popularRows = popularItems.slice(0, 8);
  const latest = filtered.slice(0, 6);
  const videos = visibleItems.slice(6, 10);
  const sports = visibleItems.slice(10, 16);
  const highlightsRef = useRef<HTMLDivElement>(null);

  function scrollHighlights(direction: number) {
    highlightsRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  }

  return (
    <main className="mx-auto max-w-[1260px] px-3 py-7 sm:px-5 sm:py-10">
      {lead && (
        <section aria-labelledby="trending-heading" className="border-b border-slate-200 pb-6">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-2">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" aria-hidden="true" />
              <h2 id="trending-heading" className="text-sm font-black uppercase tracking-[0.08em] text-ink sm:text-base">
                Trending News
              </h2>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">Live updates</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)_minmax(210px,0.72fr)]">
            <article className="bg-white">
              <Link href={`/sports/${lead.id}`} className="group block overflow-hidden">
                <div className="relative overflow-hidden bg-slate-200">
                  <StoryImage item={lead} className="h-[290px] w-full object-cover sm:h-[360px]" />
                </div>
                <div className="pt-4">
                  <h3 className="max-w-[760px] text-[clamp(2rem,2.4vw,3rem)] font-black leading-[0.96] tracking-[-0.04em] text-ink transition group-hover:text-flare-dark">
                    {lead.name}
                  </h3>

                  <p className="mt-4 max-w-[680px] text-base leading-relaxed text-ink/70">
                    {lead.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-sm text-ink/60">
                    <span>Sports Desk</span>
                    <span>•</span>
                    <span>{lead.categoryName}</span>
                    <span className="ml-auto text-ink/50">5 min read</span>
                  </div>
                </div>
              </Link>
            </article>

            <div className="space-y-4 border-l border-slate-200 pl-4">
              {sideStories.map((item) => (
                <Link key={item.id} href={`/sports/${item.id}`} className="group block border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_120px] items-start gap-3">
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">{item.categoryName}</p>
                      <h4 className="text-[1.05rem] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink transition group-hover:text-flare-dark">
                        {item.name}
                      </h4>
                    </div>
                    <div className="overflow-hidden rounded-sm bg-slate-200">
                      <StoryImage item={item} className="h-20 w-full object-cover" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-ink/50">
                    <span>Staff</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                </Link>
              ))}
            </div>

            <aside className="border-l border-slate-200 pl-4" aria-label="Trending now">
              <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-ink">Headlines</h3>
                <button type="button" className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/60 transition hover:text-flare-dark">
                  See all
                </button>
              </div>

              <ol className="space-y-1">
                {ranked.map((item, index) => (
                  <li key={item.id} className="border-b border-slate-100 py-2 last:border-0">
                    <Link href={`/sports/${item.id}`} className="group flex gap-3">
                      <span className="mt-0.5 text-[12px] font-black text-slate-300">{index + 1}</span>
                      <span className="text-[1.05rem] font-medium leading-[1.35] text-ink transition group-hover:text-flare-dark">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>
      )}

      {popularRows.length > 0 && (
        <section className="mt-10" aria-labelledby="popular-heading">
          <h2 id="popular-heading" className="mb-6 font-display text-3xl font-bold leading-none tracking-tight text-ink sm:text-xl">Most Popular</h2>

          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {popularRows.map((item, index) => (
              <div key={item.id} className="group grid grid-cols-[40px_minmax(0,1fr)_110px] items-center gap-4 border-t border-slate-200 py-4 first:border-t-0 md:gap-5">
                <span className="font-display text-xl leading-none tracking-tight text-slate-300 sm:text-2xl">{index + 1}</span>

                <Link href={`/sports/${item.id}`} className="block min-w-0">
                  <p className="text-s font-medium leading-snug text-ink transition group-hover:text-flare-dark sm:text-[1rem] sm:leading-[1]">
                    {item.name}
                  </p>
                </Link>

                <div className="relative h-20 w-[110px] overflow-hidden bg-slate-200 sm:h-24 sm:w-[130px]">
                  <StoryImage item={item} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="mt-8" aria-labelledby="videos-heading">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-200 pb-2">
            <div>
              <h2 id="videos-heading" className="font-display text-base font-extrabold tracking-tight text-ink sm:text-lg">Match Highlights</h2>
              <p className="mt-1 text-[10px] text-ink/45">Watch the best moments from last night</p>
            </div>
            <span className="h-0.5 flex-1 bg-flare" />
            <div className="flex gap-1">
              <button type="button" onClick={() => scrollHighlights(-1)} aria-label="Previous highlights" className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm text-ink/60 transition hover:border-flare hover:text-flare">&larr;</button>
              <button type="button" onClick={() => scrollHighlights(1)} aria-label="Next highlights" className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm text-ink/60 transition hover:border-flare hover:text-flare">&rarr;</button>
            </div>
          </div>
          <div ref={highlightsRef} className="flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {videos.map((item) => <VideoStory key={item.id} item={item} />)}
          </div>
        </section>
      )}

      <section className="mt-9" aria-labelledby="latest-heading">
        <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-flare">The newsroom</p>
            <h2 id="latest-heading" className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Latest stories</h2>
          </div>
          
        </div>
        <div className="grid gap-x-4 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((item) => <SportCard key={item.id} item={item} />)}
        </div>
        {latest.length === 0 && <p className="border border-dashed border-slate-300 p-10 text-center text-sm text-ink/60">No stories match your search.</p>}
      </section>

      {sports.length > 0 && (
        <section className="mt-9" aria-labelledby="sports-heading">
          <SectionTitle action="More sports">Sports</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sports.map((item) => (
              <Link key={item.id} href={`/sports/${item.id}`} className="group relative min-h-[170px] overflow-hidden bg-ink">
                <StoryImage item={item} className="absolute inset-0 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="absolute bottom-0 p-3 text-white"><span className="text-[8px] font-bold uppercase text-flare">{item.categoryName}</span><h3 className="mt-1 line-clamp-2 text-xs font-bold leading-tight">{item.name}</h3></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-9 overflow-hidden rounded-xl border border-ink/10 bg-ink px-5 py-6 text-white sm:px-8" aria-labelledby="pro-heading">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><span className="bg-flare px-2 py-1 text-[8px] font-bold uppercase tracking-widest">SportHub Pro</span><h2 id="pro-heading" className="mt-3 font-display text-xl font-bold sm:text-2xl">Zero ads. Real-time stats.</h2><p className="mt-1 text-xs text-white/55">Sharper analysis and ad-free reading across every device.</p></div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3"><div className="border border-white/10 px-4 py-3"><strong className="block text-xl text-flare">98%</strong><span className="text-[9px] uppercase text-white/45">Satisfaction</span></div><div className="border border-white/10 px-4 py-3"><strong className="block text-xl text-flare">2.4M</strong><span className="text-[9px] uppercase text-white/45">Readers</span></div><Link href="/admin/create" className="col-span-2 border border-white bg-white px-4 py-3 text-center text-[10px] font-bold uppercase text-ink transition hover:bg-flare hover:text-white sm:col-span-1">Try Pro</Link></div>
        </div>
      </section>
    </main>
  );
}
