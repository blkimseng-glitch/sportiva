"use client";

import Link from "next/link";
import { SportItem } from "@/lib/types";

const BADGE_COLORS: Record<string, string> = {
  Football: "bg-red-600 text-white",
  Basketball: "bg-amber-500 text-white",
  Training: "bg-slate-700 text-white",
  Running: "bg-emerald-600 text-white",
  Gear: "bg-purple-600 text-white",
};

export default function SportCard({
  item,
  featured = false,
}: {
  item: SportItem | any;
  featured?: boolean;
}) {
  //  ទាញយក UUID ឬ ID (ការពារករណី Backend ផ្ញើឈ្មោះ key ផ្សេងគ្នា)
  const itemUuid = item?.uuid || item?.id || item?._id;

  const categoryName = item?.categoryName || item?.category?.name || "Sports";
  const badgeColor = BADGE_COLORS[categoryName] ?? "bg-red-600 text-white";
  const imgSrc =
    item?.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls[0]
      : item?.image || item?.imageUrl || "/placeholder.png";

  return (
    <Link
      /*  ដូរមក /sports/ វិញឱ្យត្រូវតាម Folder Structure: app/sports/[uuid]/page.tsx */
      href={itemUuid ? `/sports/${itemUuid}` : "#"}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* ផ្នែករូបភាព */}
      <div
        className={`relative overflow-hidden bg-slate-200 ${
          featured ? "aspect-[2/1]" : "aspect-[16/10]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={item?.name || item?.title || "Sport"}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.png";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Category Badge */}
        <span
          className={`absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest shadow-md ${badgeColor}`}
        >
          {categoryName}
        </span>

        {/* Read time overlay */}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
          5 min read
        </span>
      </div>

      {/* ផ្នែកព័ត៌មានអត្ថបទ */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Top metadata */}
          <div className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span className="text-red-600">SportHub</span>
            <span>•</span>
            <span>
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-display font-extrabold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-red-600 ${
              featured ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {item?.name || item?.title || "Untitled Sport"}
          </h3>

          {/* Description */}
          <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-2 sm:text-sm">
            {item?.description || "No description available."}
          </p>
        </div>

        {/* Card Footer Link */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 transition-all duration-200 group-hover:gap-2">
            Open Story
            <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}