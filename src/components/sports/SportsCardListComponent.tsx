"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, ChevronRight, ChevronLeft, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SportsCardListComponent() {
  const [sports, setSports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Show 8 cards per page

  useEffect(() => {
    fetch("/api/sports")
      .then((res) => res.json())
      .then((data) => setSports(Array.isArray(data) ? data : data.data || []))
      .catch(() => setSports([]))
      .finally(() => setLoading(false));
  }, []);

  // Reset to page 1 when searching or changing category
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const safeText = (value: any, fallback: string = ""): string => {
    if (!value) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (typeof value === "object" && value.name) return String(value.name);
    return fallback;
  };

  const filteredSports = sports.filter((sport) => {
    const q = search.toLowerCase().trim();
    const name = safeText(sport?.name || sport?.title).toLowerCase();
    const matchesSearch = name.includes(q);
    if (category === "All") return matchesSearch;
    const catName = safeText(sport?.categoryName || sport?.category);
    return matchesSearch && `${name} ${catName}`.toLowerCase().includes(category.toLowerCase());
  });

  // Calculate total pages and slice data per page
  const totalPages = Math.ceil(filteredSports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSports = filteredSports.slice(indexOfFirstItem, indexOfLastItem);

  const categories = ["All", "Football", "Martial Arts", "Basketball", "Tennis", "Esports"];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b1322] min-h-screen py-8 text-slate-800 dark:text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map((item) => {
              const active = category === item;
              return (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-300 dark:bg-[#162235] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:border-slate-700/50"
                  }`}
                >
                  {item === "All" ? "All" : item}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search information..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border-slate-300 text-xs pl-8 h-9 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-600 rounded-lg dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-200 dark:focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 text-xs">Loading information...</div>
        ) : filteredSports.length === 0 ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121c2d] rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            No information to display
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentSports.map((item, index) => {
                const titleText = safeText(item.name || item.title, "Sports News");
                const descText = safeText(item.description || item.synopsis, "Sports news and latest updates");
                const categoryText = safeText(item.categoryName || item.category, "Sports");
                
                const imageUrl = Array.isArray(item.imageUrls) && item.imageUrls.length > 0 
                  ? item.imageUrls[0] 
                  : (item.image || item.imageUrl || item.image_url);

                return (
                  <Link key={item.id || item.slug || index} href={`/events?category=${item.slug || item.id || ""}`}>
                    <article className="group bg-white dark:bg-[#121c2d] border border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
                      
                      <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-[#0a101d] overflow-hidden flex items-center justify-center">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={titleText}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                            <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">No Image</span>
                          </div>
                        )}
                        
                        {categoryText && (
                          <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded">
                            {categoryText}
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug dark:text-slate-100 dark:group-hover:text-blue-400">
                            {titleText}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed dark:text-slate-400">
                            {descText}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                            <Calendar className="w-3 h-3" />
                            <span>2026</span>
                          </div>
                          <span className="text-blue-600 font-medium inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform dark:text-blue-400">
                            View More <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Pagination Controls Component */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800/80">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800"
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
                        : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}