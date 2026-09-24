"use client";

import Link from "next/link";
import { Calendar, ChevronRight, Image as ImageIcon } from "lucide-react";

interface SportCardComponentProps {
  item: any;
  index: number;
  safeText: (value: any, fallback?: string) => string;
}

export default function SportCardComponent({
  item,
  index,
  safeText,
}: SportCardComponentProps) {
  const titleText = safeText(item?.name || item?.title, "ព័ត៌មានកីឡា");
  const descText = safeText(
    item?.description || item?.synopsis,
    "ព័ត៌មាន និងបច្ចុប្បន្នភាពកីឡាថ្មីៗ"
  );
  const categoryText = safeText(item?.categoryName || item?.category, "កីឡា");

  const imageUrl =
    Array.isArray(item?.imageUrls) && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : item?.image || item?.imageUrl || item?.image_url;

  const sportId = item?.uuid || item?.id || item?.slug || index;

  return (
    <Link href={`/sports/${sportId}`}>
      {/* 1. Main Card Container (Light: White bg + subtle border | Dark: #121c2d bg + dark border) */}
      <article className="group bg-white/90 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:bg-[#121c2d] dark:border-slate-800 dark:hover:border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col h-full backdrop-blur-sm">
        
        {/* 2. Image Area Container */}
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
              <span className="text-[10px] text-slate-400 dark:text-slate-500">គ្មានរូបភាព</span>
            </div>
          )}

          {/* Badge លើរូបភាព */}
          {categoryText && (
            <span className="absolute top-2.5 left-2.5 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 text-blue-600 dark:text-blue-400 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
              {categoryText}
            </span>
          )}
        </div>

        {/* 3. Content Area */}
        <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
              {titleText}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {descText}
            </p>
          </div>

          {/* 4. Footer Card (Date & Link) */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>2026</span>
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              មើលបន្ថែម <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}