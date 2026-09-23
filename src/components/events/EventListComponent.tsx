"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import EventCardComponent from "./EventCardComponent"; 
import { getAllEvents } from "@/services/eventService"; 
export default function EventListComponent() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Call via service Function
    getAllEvents()
      .then((data) => {
        setEvents(Array.isArray(data) ? data : data.data || data.items || []);
      })
      .catch((err: any) => {
        console.error("Fetch Error:", err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredEvents = events.filter((item) => {
    const q = search.toLowerCase().trim();
    const name = String(item?.name || item?.title || "").toLowerCase();
    return name.includes(q);
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b1322] min-h-screen py-8 text-slate-800 dark:text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Sports Events</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Programs and upcoming sports competitions</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border-slate-300 text-xs pl-8 h-9 text-slate-800 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-600 rounded-lg dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-200 dark:focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 text-xs">Loading data...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 bg-white dark:bg-[#121c2d] rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            No events to display
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentEvents.map((item, index) => (
                <EventCardComponent key={item.uuid || index} item={item} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800/80">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-all dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-all dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800"
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