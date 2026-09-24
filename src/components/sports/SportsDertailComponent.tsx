"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Image as ImageIcon } from "lucide-react";
import { getSportByUuid } from "@/services/sportService";

interface SportsDetailComponentProps {
  uuid: string;
}

export default function SportsDetailComponent({
  uuid,
}: SportsDetailComponentProps) {
  const router = useRouter();
  const [sports, setSports] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uuid) return;

    setLoading(true);

    getSportByUuid(uuid)
      .then((res: any) => {
        console.log("API Response Data:", res);

        const sportData =
          res?.data?.data ||
          res?.data?.sport ||
          res?.data?.item ||
          res?.data ||
          res?.sport ||
          res;

        setSports(sportData);
      })
      .catch((err: any) => {
        console.error("Fetch Sport Detail Error:", err);
        setSports(null);
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
      <div className="min-h-screen bg-slate-50/80 text-slate-500 dark:bg-[#0b1322] dark:text-slate-400 flex items-center justify-center text-xs transition-colors duration-300">
        កំពុងទាញយកព័ត៌មានលម្អិត...
      </div>
    );
  }

  if (!sports) {
    return (
      <div className="min-h-screen bg-slate-50/80 text-slate-600 dark:bg-[#0b1322] dark:text-slate-400 flex flex-col items-center justify-center text-xs gap-4 transition-colors duration-300">
        <p>រកមិនឃើញព័ត៌មានប្រភេទកីឡានេះទេ</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all text-xs shadow-md"
        >
          ត្រឡប់ក្រោយ
        </button>
      </div>
    );
  }

  const title = safeText(
    sports?.name || sports?.title || sports?.sportName,
    "ព័ត៌មានកីឡា"
  );
  const description = safeText(
    sports?.description || sports?.detail || sports?.synopsis,
    "គ្មានព័ត៌មានលម្អិតសម្រាប់ប្រភេទកីឡានេះទេ។"
  );
  const category = safeText(
    sports?.categoryName || sports?.category?.name || sports?.category,
    "Sport"
  );

  const imageUrl =
    Array.isArray(sports?.imageUrls) && sports.imageUrls.length > 0
      ? sports.imageUrls[0]
      : sports?.image || sports?.imageUrl || sports?.image_url;

  return (
    // 1. Background Wrapper គាំទ្រ Light / Dark Mode
    <div className="relative min-h-screen bg-slate-50/80 text-slate-800 dark:bg-[#0b1322] dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Background Ambient Glow Effects */}
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/15" />
      <div className="pointer-events-none absolute right-1/4 top-96 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 bg-white/80 border border-slate-200/80 shadow-sm dark:bg-[#162235] dark:text-slate-400 dark:hover:text-white dark:border-slate-700/60 px-3.5 py-2 rounded-lg transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ក្រោយ
        </button>

        {/* Detail Card Container */}
        <div className="bg-white/90 border border-slate-200/80 dark:bg-[#121c2d] dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md transition-colors duration-300">
          
          {/* Image Section */}
          <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-[#0a101d] flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400 dark:text-slate-600">
                <ImageIcon className="w-12 h-12 opacity-40 mb-2" />
                <span className="text-xs">គ្មានរូបភាព</span>
              </div>
            )}
            
            {/* Category Tag */}
            {category && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/50 text-blue-600 dark:text-blue-400 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                <Tag className="w-3 h-3" /> {category}
              </span>
            )}
          </div>

          {/* Details Content Section */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-500" /> 2026
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                អំពីប្រភេទកីឡានេះ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}