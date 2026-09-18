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
    // ហៅតាម service Function
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
    <div className="w-full bg-[#0b1322] min-h-screen py-8 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h1 className="text-xl font-bold text-white">ព្រឹត្តិការណ៍កីឡា (Events)</h1>
            <p className="text-xs text-slate-400 mt-1">កម្មវិធី និងព្រឹត្តិការណ៍ប្រកួតកីឡាថ្មីៗ</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="ស្វែងរកព្រឹត្តិការណ៍..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#162235] border-slate-700/60 text-xs pl-8 h-9 text-slate-200 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-lg"
            />
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-xs">កំពុងទាញយកទិន្នន័យ...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 text-slate-400 bg-[#121c2d] rounded-xl border border-slate-800 text-xs">
            មិនមានព្រឹត្តិការណ៍បង្ហាញទេ
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
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-800/80">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-[#162235] border border-slate-700/60 text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-all"
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
                        : "bg-[#162235] border border-slate-700/60 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-[#162235] border border-slate-700/60 text-slate-300 hover:bg-slate-800 disabled:opacity-40 transition-all"
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