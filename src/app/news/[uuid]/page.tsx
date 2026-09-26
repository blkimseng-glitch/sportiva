
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Image as ImageIcon } from "lucide-react";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const uuid = params?.uuid; 

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uuid) {
      
      fetch(`/api/news/${uuid}`)
        .then((res) => res.json())
        .then((data) => setNews(data?.data || data))
        .catch(() => setNews(null))
        .finally(() => setLoading(false));
    }
  }, [uuid]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1322] flex items-center justify-center text-slate-400 text-xs">
        កំពុងទាញយកព័ត៌មាន...
      </div>
    );
  }

  const imageUrl = Array.isArray(news?.imageUrls) && news.imageUrls.length > 0 
    ? news.imageUrls[0] 
    : (news?.image || news?.imageUrl);

  return (
    <div className="w-full bg-[#0b1322] min-h-screen py-8 text-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#162235] border border-slate-700/60 text-xs text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> ត្រឡប់ក្រោយ
        </button>

        <div className="bg-[#121c2d] border border-slate-800 rounded-2xl overflow-hidden p-6 space-y-6">
          <div className="relative aspect-[16/9] w-full bg-[#0a101d] rounded-xl overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt={news?.name || news?.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-600">
                <ImageIcon className="w-10 h-10 opacity-40 mb-2" />
                <span className="text-xs text-slate-500">គ្មានរូបភាព</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs">
              {news?.categoryName && (
                <span className="inline-flex items-center gap-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-md font-medium">
                  <Tag className="w-3 h-3" /> {news.categoryName}
                </span>
              )}
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" /> 2026
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {news?.name || news?.title || "ព័ត៌មានកីឡា"}
            </h1>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-sm text-slate-300 leading-relaxed space-y-4">
            <p>{news?.description || news?.content || "មិនមានការបរិយាយបន្ថែមសម្រាប់ព័ត៌មាននេះទេ។"}</p>
          </div>
        </div>

      </div>
    </div>
  );
}