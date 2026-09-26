"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllSport } from "@/services/sportService";
import SportCardComponent from "./SportCardComponent";

export default function SportListComponent() {
  const [sports, setSports] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Safe Text Helper
  const safeText = (value: any, fallback: string = ""): string => {
    if (!value) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (typeof value === "object") {
      return value.name || value.title || value.categoryName || fallback;
    }
    return fallback;
  };

  useEffect(() => {
    getAllSport()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || data.items || [];
        setSports(list);

        // ទាញយក Categories ពី API 
        const extractedCategories = new Set<string>();
        list.forEach((sport: any) => {
          const catName = safeText(
            sport?.categoryName || sport?.category || sport?.sportCategory
          );
          if (catName) {
            extractedCategories.add(catName);
          }
        });

        setCategories(["All", ...Array.from(extractedCategories)]);
      })
      .catch((err: any) => {
        console.error("Fetch Error:", err);
        setSports([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  // Dynamic Filter Logic
  const filteredSports = sports.filter((sport) => {
    const q = search.toLowerCase().trim();
    const name = safeText(sport?.name || sport?.title).toLowerCase();
    const catName = safeText(
      sport?.categoryName || sport?.category || sport?.sportCategory
    );

    const matchesSearch = name.includes(q) || catName.toLowerCase().includes(q);

    if (category === "All") return matchesSearch;

    return matchesSearch && catName.toLowerCase() === category.toLowerCase();
  });

  const totalPages = Math.ceil(filteredSports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSports = filteredSports.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative w-full min-h-screen py-8 bg-slate-50/80 text-slate-800 dark:bg-[#0b1322] dark:text-slate-200 transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/15" />
      <div className="pointer-events-none absolute right-1/4 top-96 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/*  1. SIDEBAR (ជួរឈរ) */}
          <aside className="w-full md:w-64 shrink-0 space-y-6 md:sticky md:top-24">
            
            {/* Search  */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="ស្វែងរកព័ត៌មាន..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/80 border-slate-300/80 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-200 dark:placeholder:text-slate-400 text-xs pl-8 h-10 rounded-xl backdrop-blur-md shadow-sm"
              />
            </div>

            {/* Category Navigation Menu */}
            <div className="bg-white/80 border border-slate-200/80 dark:bg-[#121c2d] dark:border-slate-800/80 rounded-2xl p-3 shadow-sm backdrop-blur-md">
              <div className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-blue-500" /> ប្រភេទកីឡា
              </div>
              
              <nav className="flex flex-col gap-1 mt-1">
                {categories.map((item) => {
                  const active = category === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                        active
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      <span>{item === "All" ? "ទាំងអស់" : item}</span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* 2. CONTENT AREA */}
          <main className="flex-1 w-full space-y-6">
            
            {/* Header / Active Category Title */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {category === "All" ? "ព័ត៌មានកីឡាទាំងអស់" : category}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {/* បង្ហាញ {filteredSports.length} លទ្ធផល */}
              </span>
            </div>

            {/* Display Cards Grid */}
            {loading ? (
              <div className="text-center py-20 text-slate-500 dark:text-slate-400 text-xs">
                កំពុងទាញយកព័ត៌មាន...
              </div>
            ) : filteredSports.length === 0 ? (
              <div className="text-center py-16 text-slate-500 bg-white/70 dark:bg-[#121c2d] dark:text-slate-400 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
                មិនមានព័ត៌មានបង្ហាញទេ
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentSports.map((item, index) => (
                    <SportCardComponent
                      key={item?.uuid || item?.id || index}
                      item={item}
                      index={index}
                      safeText={safeText}
                    />
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

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
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
                      )
                    )}

                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
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