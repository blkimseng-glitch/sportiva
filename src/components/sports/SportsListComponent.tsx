"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllSport } from "@/services/sportService";
import SportCardComponent from "./SportCardComponent";

export default function SportListComponent() {
  const [sports, setSports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    "All",
    "Football",
    "Martial Arts",
    "Basketball",
    "Tennis",
    "Esports",
  ];

  useEffect(() => {
    getAllSport()
      .then((data) => {
        setSports(Array.isArray(data) ? data : data.data || data.items || []);
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
    return (
      matchesSearch &&
      `${name} ${catName}`.toLowerCase().includes(category.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredSports.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSports = filteredSports.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full bg-[#0b1322] min-h-screen py-8 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
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
                      : "bg-[#162235] text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                  }`}
                >
                  {item === "All" ? "ទាំងអស់" : item}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="ស្វែងរកព័ត៌មាន..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#162235] border-slate-700/60 text-xs pl-8 h-9 text-slate-200 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-lg"
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-xs">
            កំពុងទាញយកព័ត៌មាន...
          </div>
        ) : filteredSports.length === 0 ? (
          <div className="text-center py-16 text-slate-400 bg-[#121c2d] rounded-xl border border-slate-800 text-xs">
            មិនមានព័ត៌មានបង្ហាញទេ
          </div>
        ) : (
          <>
            {/* Sport Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-800/80">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-[#162235] border border-slate-700/60 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                          : "bg-[#162235] border border-slate-700/60 text-slate-300 hover:bg-slate-800"
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
                  className="p-2 rounded-lg bg-[#162235] border border-slate-700/60 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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