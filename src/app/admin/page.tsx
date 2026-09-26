"use client";

import Link from "next/link";
import { Activity, CalendarDays, MessageSquare, Tags, Trophy, ArrowUpRight, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAdminSports } from "@/services/adminSportService";
import { getAdminEvents } from "@/services/adminEventService";
import { getAdminCategories } from "@/services/adminCategoryService";
import { getAdminComments } from "@/services/adminCommentService";
import type { AdminCategory, AdminComment, AdminEvent, AdminSport } from "@/lib/adminTypes";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { AdminTableLoading } from "@/components/admin/AdminTableStat";
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
    if (failed) setError("Failed to load dashboard data. Please check the API and try again.");

    if (results[0].status === "fulfilled") setSports(results[0].value);

    // Safely extract array from either paginated object or direct array
    if (results[1].status === "fulfilled") {
      const res = results[1].value;
      setEvents(Array.isArray(res) ? res : res?.data || []);
    }

    if (results[2].status === "fulfilled") setCategories(results[2].value);
    if (results[3].status === "fulfilled") setComments(results[3].value);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const categorySummary = useMemo(() => {
    const counts = new Map<string, number>();
    sports.forEach((sport) =>
      counts.set(sport.categoryName || "Unassigned", (counts.get(sport.categoryName || "Unassigned") ?? 0) + 1)
    );
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [sports]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Welcome back 👋"
        description="Overview of Sportiva content status and quick management actions."
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/sports"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Plus size={16} /> Add Sport
            </Link>
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <CalendarDays size={16} /> Events
            </Link>
          </div>
        }
      />

      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
          {error}
        </div>
      ) : null}

      {loading ? (
        <AdminTableLoading label="Loading Dashboard..." />
      ) : (
        <>
          {/* Stat Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard label="Sports" value={sports.length} helper="Total Sports Items" icon={Trophy} />
            <AdminStatCard label="Events" value={events.length} helper="Total Events" icon={CalendarDays} />
            <AdminStatCard label="Categories" value={categories.length} helper="Total Sport Categories" icon={Tags} />
            <AdminStatCard label="Comments" value={comments.length} helper="Total API Comments" icon={MessageSquare} />
          </div>

          {/* Main Sections Grid */}
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            {/* Left Box: Chart / Progress */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Sports Distribution by Category</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Calculated from fetched sports data</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <Activity size={18} />
                </div>
              </div>

              <div className="space-y-4">
                {categorySummary.length ? (
                  categorySummary.map(([name, count]) => {
                    const max = categorySummary[0]?.[1] || 1;
                    return (
                      <div key={name}>
                        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-700">{name}</span>
                          <span className="text-slate-400">{count}</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${Math.max(8, Math.round((count / max) * 100))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="py-12 text-center text-sm text-slate-400">No sports category data available</p>
                )}
              </div>
            </section>

            {/* Right Box: Recent Events */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Events</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Latest entries with timestamp</p>
                </div>
                <Link
                  href="/admin/events"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {[...events]
                  .filter((event) => event.createdAt)
                  .sort((a, b) => Date.parse(b.createdAt ?? "") - Date.parse(a.createdAt ?? ""))
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.uuid}
                      className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 transition-colors hover:bg-slate-100/80"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                        <CalendarDays size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">{event.name || "Untitled"}</p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {event.categoryName || "Unassigned"} · {event.locationName || "No location"}
                        </p>
                      </div>
                    </div>
                  ))}

                {!events.some((event) => event.createdAt) ? (
                  <p className="py-12 text-center text-sm text-slate-400">
                    No timestamp provided for recent events preview
                  </p>
                ) : null}
              </div>
            </section>
          </div>

          {/* Bottom Quick Links */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/admin/sports"
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <Trophy size={20} />
                </div>
                <ArrowUpRight size={18} className="text-slate-400 transition-colors group-hover:text-blue-600" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Manage Sports</h3>
              <p className="mt-0.5 text-xs text-slate-500">Add, edit, search, and manage sports entries</p>
            </Link>

            <Link
              href="/admin/comments"
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <MessageSquare size={20} />
                </div>
                <ArrowUpRight size={18} className="text-slate-400 transition-colors group-hover:text-blue-600" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Moderate Comments</h3>
              <p className="mt-0.5 text-xs text-slate-500">Review and delete inappropriate user comments</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}