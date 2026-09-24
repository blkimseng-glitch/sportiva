"use client";

import Link from "next/link";
import { Clock, MessageSquare, Image as ImageIcon } from "lucide-react";
import { Event } from "@/lib/types";

interface EventCardProps {
  item: Event | any;
  index?: number;
}

export default function EventCardComponent({ item, index = 0 }: EventCardProps) {
  // Helper for text safety
  const safeText = (value: any, fallback: string = ""): string => {
    if (!value) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (typeof value === "object" && value.name) return String(value.name);
    return fallback;
  };

  // Helper for formatting ISO Date string to English
  const formatDate = (dateStr: any): string => {
    if (!dateStr) return "Recently";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return String(dateStr).slice(0, 10);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  const titleText = safeText(item.name || item.title, "Sports Event");
  const descText = safeText(item.description, "No details available for this event...");
  const categoryText = safeText(item.categoryName || item.category, "Sports");

  const imageUrl =
    Array.isArray(item.imageUrls) && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : item.image || item.imageUrl;

  const itemUuid = item.uuid || item.id || index;
  const formattedDate = formatDate(item.date || item.createdAt || item.startDate);
  const commentsCount = item.commentsCount || (Array.isArray(item.comments) ? item.comments.length : 0);

  return (
    <Link href={`/events/${itemUuid}`} className="block h-full">
      <article className="group relative bg-white/90 hover:bg-white dark:bg-[#131d31] dark:hover:bg-[#18253d] border border-slate-200/80 hover:border-indigo-500/50 dark:border-slate-800/80 dark:hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-500/10 flex flex-col h-full backdrop-blur-md">
        
        {/* Image Container */}
        <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-[#0d1527] overflow-hidden">
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
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
              <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
              <span className="text-xs text-slate-400 dark:text-slate-500">No Image</span>
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-[#131d31] dark:via-transparent dark:to-transparent opacity-80" />

          {/* Badge Category */}
          {categoryText && (
            <span className="absolute top-3 right-3 bg-indigo-50 dark:bg-indigo-500/20 backdrop-blur-md border border-indigo-200/80 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {categoryText}
            </span>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
              {titleText}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {descText}
            </p>
          </div>

          {/* Footer Info */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>{commentsCount} {commentsCount === 1 ? "comment" : "comments"}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}