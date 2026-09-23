"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Image as ImageIcon } from "lucide-react";
import { getEventByUuid } from "@/services/eventService";
interface EventDetailComponentProps {
  uuid: string;
}

export default function EventDetailComponent({ uuid }: EventDetailComponentProps) {
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uuid) return;

    getEventByUuid(uuid)
      .then((data) => {
        setEvent(data?.data || data);
      })
      .catch((err) => {
        console.error("Fetch Event Error:", err);
        setEvent(null);
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  // Safe Text Helper
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
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1322] flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1322] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 text-xs gap-4">
        <p>Event not found</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all text-xs"
        >
          Go Back
        </button>
      </div>
    );
  }

  const title = safeText(event.name || event.title, "Sports Event");
  const description = safeText(event.description, "No additional details available for this event.");
  const category = safeText(event.categoryName || event.category, "Event");

  const imageUrl = Array.isArray(event.imageUrls) && event.imageUrls.length > 0 
    ? event.imageUrls[0] 
    : (event.image || event.imageUrl);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1322] text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-900 transition-colors bg-white hover:bg-slate-100 px-3.5 py-2 rounded-lg border border-slate-300 dark:text-slate-400 dark:hover:text-white dark:bg-[#162235] dark:hover:bg-slate-800 dark:border-slate-700/60"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>

        {/* Detail Card */}
        <div className="bg-white dark:bg-[#121c2d] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-[#0a101d] flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-slate-400 dark:text-slate-600">
                <ImageIcon className="w-12 h-12 opacity-40 mb-2" />
                <span className="text-xs">No Image</span>
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
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">{title}</h1>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-500" /> 2026</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800/80 pt-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">About this event</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}