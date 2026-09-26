"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SportItem } from "@/lib/types";
import SportCard from "./SportCard";

const HIDDEN_STORY_TITLE = "CBF hosts 2nd monthly boxing night with international bouts";

function StoryImage({ item, className = "" }: { item: SportItem; className?: string }) {
  const imgSrc = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : "/placeholder.png";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={item.name || "Sport news"}
      className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${className}`}
    />
  );
}

function SectionTitle({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-2">
      <h2 className="font-display text-base font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-lg">{children}</h2>
      <span className="h-0.5 flex-1 bg-red-600" />
      {action && <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{action}</span>}
    </div>
  );
}

function VideoStory({ item }: { item: SportItem }) {
  return (
    <Link href={`/sports/${item.id}`} className="group block w-[min(78vw,280px)] shrink-0 snap-start sm:w-[280px]">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-md border border-slate-200 dark:border-slate-800">
        <StoryImage item={item} className="opacity-70 group-hover:opacity-90" />
        <span className="absolute inset-0 flex items-center justify-center text-3xl text-white drop-shadow">&#9654;</span>
      </div>
      <h3 className="mt-2 line-clamp-2 text-xs font-bold leading-snug text-slate-800 dark:text-slate-200 transition group-hover:text-red-600 dark:group-hover:text-red-400">{item.name}</h3>
    </Link>
  );
}

interface HomeGridProps {
  items?: SportItem[];
  searchQuery?: string;
}

export default function HomeGrid({ items = [], searchQuery = "" }: HomeGridProps) {
  const query = searchQuery.toLowerCase();
  const [active, setActive] = useState("All");

  const safeItems = Array.isArray(items) ? items : [];
  const visibleItems = safeItems.filter((item) => item?.name !== HIDDEN_STORY_TITLE);

  const filtered = useMemo(() => {
    return visibleItems.filter((item) => {
      const categoryMatch = active === "All" || item?.categoryName === active;
      const queryMatch = !query || `${item?.name || ""} ${item?.description || ""}`.toLowerCase().includes(query);
      return categoryMatch && queryMatch;
    });
  }, [visibleItems, active, query]);

  if (visibleItems.length === 0) {
    return (
      <div className="my-12 text-center text-slate-500 dark:text-slate-400">
        <p className="text-lg font-medium">ពុំមានព័ត៌មានកីឡាបង្ហាញនៅឡើយទេ</p>
      </div>
    );
  }

  const [lead, ...rest] = filtered.length ? filtered : visibleItems;
  const sideStories = rest.slice(0, 4);
  const ranked = (filtered.length ? filtered : visibleItems).slice(0, 5);
  const popularRows = (filtered.length ? filtered : visibleItems).slice(0, 6);
  const latestLimit = (filtered.length > 0 ? filtered : visibleItems).slice(0, 6);
  const videos = visibleItems.slice(0, 5);

  const highlightsRef = useRef<HTMLDivElement>(null);

  function scrollHighlights(direction: number) {
    highlightsRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-50/80 dark:bg-[#121824] px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Decorative Blur Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-red-400/10 dark:bg-red-600/5 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-96 -z-10 h-96 w-96 rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl" />

      {/* 1. Trending News Section */}
      {lead && (
        <section aria-labelledby="trending-heading" className="border-b border-slate-200/80 dark:border-slate-800 pb-8">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" aria-hidden="true" />
              <h2 id="trending-heading" className="text-sm font-black uppercase tracking-[0.08em] text-slate-900 dark:text-white sm:text-base">
                Trending News
              </h2>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Live updates</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)_minmax(210px,0.72fr)]">
            <article className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#1b2735]/90 p-4 shadow-sm backdrop-blur-md">
              <Link href={`/sports/${lead.id}`} className="group block overflow-hidden">
                <div className="relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800">
                  <StoryImage item={lead} className="h-[290px] w-full object-cover sm:h-[360px]" />
                </div>
                <div className="pt-4">
                  <h3 className="max-w-[760px] text-2xl font-black leading-snug tracking-tight text-slate-900 dark:text-white transition group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-3xl">
                    {lead.name}
                  </h3>
                  <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                    {lead.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>Sports Desk</span>
                    <span>•</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{lead.categoryName || "General"}</span>
                  </div>
                </div>
              </Link>
            </article>

            <div className="space-y-4 border-l border-slate-200/80 dark:border-slate-800 pl-4">
              {sideStories.map((item) => (
                <Link key={item.id} href={`/sports/${item.id}`} className="group block border-b border-slate-200/80 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_100px] items-start gap-3">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red-600 dark:text-red-400">{item.categoryName}</p>
                      <h4 className="text-sm font-extrabold leading-snug text-slate-900 dark:text-slate-200 transition group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2">
                        {item.name}
                      </h4>
                    </div>
                    <div className="overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 shadow-sm">
                      <StoryImage item={item} className="h-16 w-full object-cover" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <aside className="border-l border-slate-200/80 dark:border-slate-800 pl-4">
              <div className="mb-3 border-b border-slate-200/80 dark:border-slate-800 pb-2">
                <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-900 dark:text-white">Headlines</h3>
              </div>
              <ol className="space-y-2">
                {ranked.map((item, index) => (
                  <li key={item.id} className="border-b border-slate-200/50 dark:border-slate-800/60 pb-2 last:border-0">
                    <Link href={`/sports/${item.id}`} className="group flex gap-3">
                      <span className="mt-0.5 text-xs font-black text-slate-400">{index + 1}</span>
                      <span className="text-xs font-medium leading-relaxed text-slate-800 dark:text-slate-300 transition group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-2">
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

      {/* 2. Most Popular */}
      {popularRows.length > 0 && (
        <section className="mt-10" aria-labelledby="popular-heading">
          <h2 id="popular-heading" className="mb-6 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Most Popular</h2>
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {popularRows.map((item, index) => (
              <div key={item.id} className="group grid grid-cols-[30px_minmax(0,1fr)_100px] items-center gap-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-[#1b2735]/70 p-3 shadow-sm backdrop-blur-sm transition hover:bg-white dark:hover:bg-[#1b2735]">
                <span className="font-display text-xl font-bold text-slate-400">{index + 1}</span>
                <Link href={`/sports/${item.id}`} className="block min-w-0">
                  <p className="text-xs font-semibold leading-snug text-slate-900 dark:text-slate-200 transition group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-sm line-clamp-2">
                    {item.name}
                  </p>
                </Link>
                <div className="relative h-16 w-[100px] overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                  <StoryImage item={item} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Latest Stories */}
      <section className="mt-12">
        <SectionTitle>Latest Stories</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestLimit.map((item) => (
            <SportCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-[#1b2735] px-8 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:hover:border-red-500 dark:hover:bg-red-600"
          >
            មើលព័ត៌មានទាំងអស់ <span>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* 4. Match Highlights */}
      {videos.length > 0 && (
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">Match Highlights</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollHighlights(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1b2735] text-xs text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm">&larr;</button>
              <button type="button" onClick={() => scrollHighlights(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1b2735] text-xs text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm">&rarr;</button>
            </div>
          </div>
          <div ref={highlightsRef} className="flex snap-x gap-4 overflow-x-auto pb-3 scrollbar-none">
            {videos.map((item) => (
              <VideoStory key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}