
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Image as ImageIcon } from "lucide-react";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const uuid = params?.uuid; // Retrieve uuid from URL parameter

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uuid) {
      // Change API endpoint to match your News API
      fetch(`/api/news/${uuid}`)
        .then((res) => res.json())
        .then((data) => setNews(data?.data || data))
        .catch(() => setNews(null))
        .finally(() => setLoading(false));
    }
  }, [uuid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1322] flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs">
        Loading news...
      </div>
    );
  }

  const imageUrl = Array.isArray(news?.imageUrls) && news.imageUrls.length > 0 
    ? news.imageUrls[0] 
    : (news?.image || news?.imageUrl);

  return (
    <div className="w-full bg-slate-50 dark:bg-[#0b1322] min-h-screen py-8 text-slate-800 dark:text-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-600 hover:bg-slate-100 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>

        <div className="bg-white dark:bg-[#121c2d] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-6 space-y-6">
          <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-[#0a101d] rounded-xl overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt={news?.name || news?.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                <ImageIcon className="w-10 h-10 opacity-40 mb-2" />
                <span className="text-xs text-slate-400 dark:text-slate-500">No Image</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs">
              {news?.categoryName && (
                <span className="inline-flex items-center gap-1 bg-blue-600/10 text-blue-600 border border-blue-500/30 px-2.5 py-1 rounded-md font-medium dark:bg-blue-600/20 dark:text-blue-400">
                  <Tag className="w-3 h-3" /> {news.categoryName}
                </span>
              )}
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> 2026
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug dark:text-white">
              {news?.name || news?.title || "Sports News"}
            </h1>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 text-sm text-slate-600 leading-relaxed space-y-4 dark:text-slate-300">
            <p>{news?.description || news?.content || "No additional description is available for this news."}</p>
          </div>
        </div>

      </div>
    </div>
  );
}