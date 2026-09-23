
"use client";

import Link from "next/link";
import { Calendar, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Event } from "@/lib/types"; // or your existing Interface

interface EventCardProps {
  item: Event | any;
  index: number;
}

export default function EventCardComponent({ item, index }: EventCardProps) {
  const safeText = (value: any, fallback: string = ""): string => {
    if (!value) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
    if (typeof value === "object" && value.name) return String(value.name);
    return fallback;
  };

  const titleText = safeText(item.name || item.title, "Sports Event");
  const descText = safeText(item.description, "Event details");
  const categoryText = safeText(item.categoryName || item.category, "Event");
  const imageUrl =
    Array.isArray(item.imageUrls) && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : item.image || item.imageUrl;

  const itemUuid = item.uuid || item.id || index;

  return (
    <Link href={`/events/${itemUuid}`}>
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
}