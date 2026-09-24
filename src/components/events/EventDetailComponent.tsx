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
      <div className="min-h-screen bg-[#0b1322] flex items-center justify-center text-slate-400 text-xs">
        កំពុងទាញយកព័ត៌មានលម្អិត...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0b1322] flex flex-col items-center justify-center text-slate-400 text-xs gap-4">
        <p>រកមិនឃើញព័ត៌មានព្រឹត្តិការណ៍នេះទេ</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all text-xs"
        >
          ត្រឡប់ក្រោយ
        </button>
      </div>
    );
  }

  const title = safeText(event.name || event.title, "ព្រឹត្តិការណ៍កីឡា");
  const description = safeText(
    event.description,
    "គ្មានព័ត៌មានលម្អិតសម្រាប់ព្រឹត្តិការណ៍នេះទេ។"
  );
  const category = safeText(event.categoryName || event.category, "Event");
  const eventDate = safeText(event.date || event.eventDate, "2026");
  const location = safeText(event.location || event.stadium, "មិនទាន់កំណត់ទីតាំង");

  const imageUrl =
    Array.isArray(event.imageUrls) && event.imageUrls.length > 0
      ? event.imageUrls[0]
      : event.image || event.imageUrl;

  return (
    <div className="min-h-screen bg-[#0b1322] text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Button */}
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors bg-[#162235] px-3.5 py-2 rounded-lg border border-slate-700/60"
          >
            <ArrowLeft className="w-4 h-4" /> ត្រឡប់ក្រោយ
          </button>
        </div>

        {/* Layout Fix: items-start ការពារ Stretch និង Overlap */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ================= ផ្នែកខាងឆ្វេង (MAIN CONTENT) ================= */}
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-[#121c2d] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative aspect-[16/9] w-full bg-[#0a101d] flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-600">
                    <ImageIcon className="w-12 h-12 opacity-40 mb-2" />
                    <span className="text-xs">គ្មានរូបភាព</span>
                  </div>
                )}
                {category && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-slate-950/80 backdrop-blur-md border border-slate-700/50 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                    <Tag className="w-3 h-3" /> {category}
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {title}
                  </h1>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-500" /> {eventDate}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-6 space-y-3">
                  <h3 className="text-sm font-semibold text-slate-200">អំពីព្រឹត្តិការណ៍នេះ</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <CommentSectionComponent eventUuid={uuid} />
          </main>

          {/* ================= ផ្នែកខាងស្តាំ (FIXED SIDEBAR) ================= */}
          <aside className="lg:col-span-1 space-y-6 sticky top-6">
            
            {/* 1. Quick Info Box */}
            <div className="bg-[#121c2d] border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-blue-500" /> ព័ត៌មានសង្ខេប
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 text-slate-300">
                  <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-400 font-medium">កាលបរិច្ឆេទ</span>
                    <span>{eventDate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-slate-400 font-medium">ទីតាំង</span>
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
                      alert("បានចម្លង Link រួចរាល់!");
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#162235] border border-slate-700/60 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-400" />
                  ចែករំលែក (Share)
                </button>
              </div>
            </div>

            {/* 2. Related Events Card */}
            <div className="bg-[#121c2d] border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">ព្រឹត្តិការណ៍ពាក់ព័ន្ធ</h3>
                <Link href="/events" className="text-[11px] text-blue-400 hover:underline flex items-center">
                  មើលទាំងអស់ <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {relatedEvents.length === 0 ? (
                  <p className="text-xs text-slate-500 py-2">មិនមានព័ត៌មានពាក់ព័ន្ធទេ</p>
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
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-[#162235]/60 hover:bg-[#162235] border border-slate-800/80 transition-all group"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-900 relative">
                          {itemImage ? (
                            <img
                              src={itemImage}
                              alt={itemTitle}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-700">
                              <ImageIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
                            {itemTitle}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-1 truncate">
                            {safeText(item.date || item.eventDate, "2026")}
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