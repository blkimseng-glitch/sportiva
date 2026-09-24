"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronLeft, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import EventCardComponent from "./EventCardComponent"; 
import { getAllEvents } from "@/services/eventService"; 

export default function EventListComponent() {
  const [events, setEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getAllEvents()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || data.items || [];
        setEvents(list);

        // Dynamic categories extraction from API response
        const extractedCategories = Array.from(
          new Set(
            list
              .map((item: any) => item.categoryName || item.category?.name || item.category)
              .filter(Boolean)
          )
        ) as string[];

        setCategories(extractedCategories);
      })
      .catch((err: any) => {
        console.error("Fetch Error:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  const filteredEvents = events.filter((item) => {
    const q = search.toLowerCase().trim();
    const name = String(item?.name || item?.title || "").toLowerCase();
    const itemCat = String(item?.categoryName || item?.category?.name || item?.category || "");

    const matchesSearch = name.includes(q);
    const matchesCategory =
      selectedCategory === "ALL" || itemCat.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative w-full min-h-screen py-8 bg-slate-50/80 text-slate-800 dark:bg-[#0b1322] dark:text-slate-200 transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/15" />
      <div className="pointer-events-none absolute right-1/4 top-96 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Sports Events
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Explore upcoming sports tournaments and matches
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/80 border-slate-300/80 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-200 dark:placeholder:text-slate-400 text-xs pl-8 h-10 rounded-xl backdrop-blur-md shadow-sm"
            />
          </div>
        </div>

        {/* Main Body Layout: Left Vertical Sidebar + Right Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* --- VERTICAL SIDEBAR --- */}
          <aside className="w-full lg:w-60 shrink-0 lg:sticky lg:top-24">
            <div className="bg-white/80 border border-slate-200/80 dark:bg-[#121c2d] dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-sm backdrop-blur-md transition-colors duration-300">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>Categories</span>
              </div>

              <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedCategory("ALL")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-between whitespace-nowrap ${
                    selectedCategory === "ALL"
                      ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#162235] hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <span>All Events</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    selectedCategory === "ALL"
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}>
                    {events.length}
                  </span>
                </button>

                {categories.map((cat, idx) => {
                  const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                  const count = events.filter(
                    (e) =>
                      String(e?.categoryName || e?.category?.name || e?.category || "").toLowerCase() ===
                      cat.toLowerCase()
                  ).length;

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-between whitespace-nowrap capitalize ${
                        isActive
                          ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#162235] hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* --- CONTENT SECTION --- */}
          <main className="flex-1 w-full space-y-6">
            {loading ? (
              <div className="text-center py-20 text-slate-500 dark:text-slate-400 text-xs">
                Loading events...
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-[#121c2d] rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs shadow-sm">
                No events found.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentEvents.map((item, index) => (
                    <EventCardComponent key={item.uuid || item.id || index} item={item} index={index} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-white border border-slate-300/80 text-slate-700 hover:bg-slate-100 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                          currentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white border border-slate-300/80 text-slate-700 hover:bg-slate-100 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-white border border-slate-300/80 text-slate-700 hover:bg-slate-100 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}