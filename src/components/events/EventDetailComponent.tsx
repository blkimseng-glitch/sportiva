"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Image as ImageIcon,
  MapPin,
  Share2,
  ChevronRight,
  Flame,
} from "lucide-react";
import { getEventByUuid, getAllEvents } from "@/services/eventService";
import CommentSectionComponent from "@/components/comments/CommentSectionComponent";

interface EventDetailComponentProps {
  uuid: string;
}

export default function EventDetailComponent({ uuid }: EventDetailComponentProps) {
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uuid) return;

    setLoading(true);

    getEventByUuid(uuid)
      .then((data) => {
        const eventData = data?.data || data;
        setEvent(eventData);

        return getAllEvents().then((allData) => {
          const list = Array.isArray(allData)
            ? allData
            : allData?.data || allData?.items || [];

          const currentCat =
            eventData?.categoryName ||
            eventData?.category?.name ||
            eventData?.category;

          const filtered = list
            .filter((item: any) => {
              const itemCat =
                item?.categoryName || item?.category?.name || item?.category;
              const itemUuid = item?.uuid || item?.id;
              return (
                String(itemUuid) !== String(uuid) &&
                String(itemCat).toLowerCase() === String(currentCat).toLowerCase()
              );
            })
            .slice(0, 4);

          if (filtered.length === 0) {
            setRelatedEvents(
              list.filter((item: any) => String(item?.uuid || item?.id) !== String(uuid)).slice(0, 4)
            );
          } else {
            setRelatedEvents(filtered);
          }
        });
      })
      .catch((err) => {
        console.error("Fetch Event Error:", err);
        setEvent(null);
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  const safeText = (value: any, fallback: string = ""): string => {
    if (!value) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (typeof value === "object") {
      return value.name || value.title || value.label || fallback;
    }
    return fallback;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1322] flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs transition-colors duration-300">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1322] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 text-xs gap-4 transition-colors duration-300">
        <p>Event details not found.</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all text-xs font-medium shadow-sm"
        >
          Go Back
        </button>
      </div>
    );
  }

  const title = safeText(event.name || event.title, "Sports Event");
  const description = safeText(
    event.description,
    "No details available for this event."
  );
  const category = safeText(event.categoryName || event.category, "Event");
  const eventDate = safeText(event.date || event.eventDate, "TBA");
  const location = safeText(event.location || event.stadium, "Location not specified");

  const imageUrl =
    Array.isArray(event.imageUrls) && event.imageUrls.length > 0
      ? event.imageUrls[0]
      : event.image || event.imageUrl;

  return (
    <div className="relative min-h-screen bg-slate-50/80 text-slate-800 dark:bg-[#0b1322] dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/15" />
      <div className="pointer-events-none absolute right-1/4 top-96 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Button */}
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors bg-white/80 dark:bg-[#162235] px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ================= LEFT SECTION (MAIN CONTENT) ================= */}
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 dark:bg-[#121c2d] border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm backdrop-blur-md transition-colors duration-300">
              <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-[#0a101d] flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-400 dark:text-slate-600">
                    <ImageIcon className="w-12 h-12 opacity-40 mb-2" />
                    <span className="text-xs">No Image</span>
                  </div>
                )}
                {category && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    <Tag className="w-3 h-3" /> {category}
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {title}
                  </h1>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-500" /> {eventDate}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-6 space-y-3">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">About This Event</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <CommentSectionComponent eventUuid={uuid} />
          </main>

          {/* ================= RIGHT SECTION (FIXED SIDEBAR) ================= */}
          <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. Quick Info Box */}
            <div className="bg-white/90 dark:bg-[#121c2d] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm backdrop-blur-md transition-colors duration-300">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-blue-500" /> Event Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-400 dark:text-slate-500 font-medium">Date</span>
                    <span>{eventDate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-400 dark:text-slate-500 font-medium">Location</span>
                    <span>{location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-[#162235] border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-500" />
                  Share Event
                </button>
              </div>
            </div>

            {/* 2. Related Events Card */}
            <div className="bg-white/90 dark:bg-[#121c2d] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm backdrop-blur-md transition-colors duration-300">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Related Events</h3>
                <Link href="/events" className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center font-medium">
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {relatedEvents.length === 0 ? (
                  <p className="text-xs text-slate-400 py-2">No related events found.</p>
                ) : (
                  relatedEvents.map((item, idx) => {
                    const itemUuid = item.uuid || item.id;
                    const itemTitle = safeText(item.name || item.title, "Event");
                    const itemImage =
                      Array.isArray(item.imageUrls) && item.imageUrls.length > 0
                        ? item.imageUrls[0]
                        : item.image || item.imageUrl;

                    return (
                      <Link
                        key={itemUuid || idx}
                        href={`/events/${itemUuid}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#162235]/60 hover:bg-slate-100 dark:hover:bg-[#162235] border border-slate-200/80 dark:border-slate-800/80 transition-all group shadow-sm"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-900 relative">
                          {itemImage ? (
                            <img
                              src={itemImage}
                              alt={itemTitle}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-700">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {itemTitle}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                            {safeText(item.date || item.eventDate, "TBA")}
                          </p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}