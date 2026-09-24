"use client";

import Link from "next/link";
import { Activity, CalendarDays, MessageSquare, Tags, Trophy, ArrowUpRight, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getAdminSports } from "@/services/adminSportService";
import { getAdminEvents } from "@/services/adminEventService";
import { getAdminCategories } from "@/services/adminCategoryService";
import { getAdminComments } from "@/services/adminCommentService";
import type { AdminCategory, AdminComment, AdminEvent, AdminSport } from "@/lib/adminTypes";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { AdminErrorState, AdminTableLoading } from "@/components/admin/AdminTableStat";
import AdminPageHeader from "@/components/admin/AdminHeader";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sports, setSports] = useState<AdminSport[]>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [comments, setComments] = useState<AdminComment[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const results = await Promise.allSettled([
      getAdminSports(),
      getAdminEvents(),
      getAdminCategories(),
      getAdminComments(),
    ]);

    const failed = results.some((result) => result.status === "rejected");
    if (failed) setError("មិនអាចទាញទិន្នន័យគ្រប់ផ្នែកបានទេ។ សូមពិនិត្យ API ហើយសាកម្ដងទៀត។");

    if (results[0].status === "fulfilled") setSports(results[0].value);
    if (results[1].status === "fulfilled") setEvents(results[1].value);
    if (results[2].status === "fulfilled") setCategories(results[2].value);
    if (results[3].status === "fulfilled") setComments(results[3].value);
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  const categorySummary = useMemo(() => {
    const counts = new Map<string, number>();
    sports.forEach((sport) => counts.set(sport.categoryName || "មិនបានកំណត់", (counts.get(sport.categoryName || "មិនបានកំណត់") ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [sports]);

  return (
    <div>
      <AdminPageHeader
        title="សួស្តី 👋"
        description="មើលស្ថានភាពមាតិកា Sportiva និងចូលទៅកាន់ការគ្រប់គ្រងដែលត្រូវការ។"
        action={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/sports" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-950/25 transition-colors hover:bg-blue-500"><Plus size={15} /> បន្ថែមកីឡា</Link>
            <Link href="/admin/events" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#101a2b] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"><CalendarDays size={15} /> ព្រឹត្តិការណ៍</Link>
          </div>
        }
      />

      {error ? <div className="mb-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-300">{error}</div> : null}

      {loading ? <AdminTableLoading label="កំពុងរៀបចំ Dashboard..." /> : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard label="កីឡា" value={sports.length} helper="ធាតុកីឡាសរុប" icon={Trophy} />
            <AdminStatCard label="ព្រឹត្តិការណ៍" value={events.length} helper="ព្រឹត្តិការណ៍សរុប" icon={CalendarDays} />
            <AdminStatCard label="ប្រភេទ" value={categories.length} helper="ប្រភេទកីឡាសរុប" icon={Tags} />
            <AdminStatCard label="មតិយោបល់" value={comments.length} helper="មតិយោបល់ដែលមានក្នុង API" icon={MessageSquare} />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-2xl border border-slate-700/70 bg-[#111b2c] p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">ការចែកចាយកីឡាតាមប្រភេទ</h3>
                  <p className="mt-1 text-xs text-slate-500">គណនាពីទិន្នន័យកីឡាដែលបានទាញមកពី API</p>
                </div>
                <Activity size={17} className="text-blue-400" />
              </div>
              <div className="space-y-4">
                {categorySummary.length ? categorySummary.map(([name, count]) => {
                  const max = categorySummary[0]?.[1] || 1;
                  return (
                    <div key={name}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-slate-300">{name}</span>
                        <span className="text-slate-500">{count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.max(8, Math.round((count / max) * 100))}%` }} />
                      </div>
                    </div>
                  );
                }) : <p className="py-12 text-center text-sm text-slate-600">មិនមានទិន្នន័យប្រភេទកីឡា</p>}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-700/70 bg-[#111b2c] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">ព្រឹត្តិការណ៍ថ្មីៗ</h3>
                  <p className="mt-1 text-xs text-slate-500">ធាតុចុងក្រោយដែលមាន timestamp</p>
                </div>
                <Link href="/admin/events" className="text-xs text-blue-400 hover:text-blue-300">មើលទាំងអស់</Link>
              </div>
              <div className="space-y-3">
                {[...events].filter((event) => event.createdAt).sort((a, b) => Date.parse(b.createdAt ?? "") - Date.parse(a.createdAt ?? "")).slice(0, 5).map((event) => (
                  <div key={event.uuid} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0d1727] p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"><CalendarDays size={16} /></div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-200">{event.name || "គ្មានឈ្មោះ"}</p>
                      <p className="mt-1 truncate text-xs text-slate-600">{event.categoryName || "មិនបានកំណត់"} · {event.locationName || "មិនមានទីតាំង"}</p>
                    </div>
                  </div>
                ))}
                {!events.some((event) => event.createdAt) ? <p className="py-12 text-center text-sm text-slate-600">API មិនបានផ្តល់ createdAt សម្រាប់បង្ហាញ recent list ទេ</p> : null}
              </div>
            </section>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link href="/admin/sports" className="group rounded-2xl border border-slate-700/70 bg-[#111b2c] p-5 transition-colors hover:border-blue-500/30 hover:bg-[#121f33]">
              <div className="flex items-start justify-between"><Trophy className="text-blue-400" size={20} /><ArrowUpRight size={17} className="text-slate-600 transition-colors group-hover:text-blue-400" /></div>
              <h3 className="mt-5 text-sm font-semibold text-white">គ្រប់គ្រងកីឡា</h3>
              <p className="mt-1 text-xs text-slate-500">បន្ថែម កែប្រែ ស្វែងរក និងលុបកីឡា</p>
            </Link>
            <Link href="/admin/comments" className="group rounded-2xl border border-slate-700/70 bg-[#111b2c] p-5 transition-colors hover:border-blue-500/30 hover:bg-[#121f33]">
              <div className="flex items-start justify-between"><MessageSquare className="text-blue-400" size={20} /><ArrowUpRight size={17} className="text-slate-600 transition-colors group-hover:text-blue-400" /></div>
              <h3 className="mt-5 text-sm font-semibold text-white">ពិនិត្យមតិយោបល់</h3>
              <p className="mt-1 text-xs text-slate-500">មើល និងលុបមតិយោបល់ដែលមិនសមរម្យ</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}