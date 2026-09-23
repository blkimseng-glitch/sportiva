"use client";

import { MessageSquare, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminComment } from "@/lib/adminTypes";
import { deleteAdminComment, getAdminComments } from "@/services/adminCommentService";
import AdminPageHeader from "@/components/admin/AdminHeader";
import AdminToolbar from "@/components/admin/AdminToolbars";
import AdminConfirmDialog from "@/components/admin/Admindialog";
import AdminIconButton from "@/components/admin/AdminIcon";
import { AdminErrorState, AdminTableEmpty, AdminTableLoading } from "@/components/admin/AdminTableStat";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<AdminComment | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setComments(await getAdminComments());
    } catch (err) {
      setError(err instanceof Error ? err.message : "មិនអាចទាញមតិយោបល់បានទេ");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const filtered = useMemo(() => comments.filter((item) => `${item.comment} ${item.userName} ${item.eventUuid}`.toLowerCase().includes(search.trim().toLowerCase())), [comments, search]);

  const remove = async () => { if (!deleteTarget) return; setDeleting(true); try { await deleteAdminComment(deleteTarget.uuid); toast.success("បានលុបមតិយោបល់"); setDeleteTarget(null); await load(); } catch (err) { toast.error(err instanceof Error ? err.message : "លុបមិនបានទេ"); } finally { setDeleting(false); } };

  return (
    <div>
      <AdminPageHeader title="មតិយោបល់" description="មើល និងលុបមតិយោបល់ដែលបានផ្ញើតាម API" />
      <AdminToolbar search={search} onSearch={setSearch} placeholder="ស្វែងរកអ្នកប្រើប្រាស់ ឬមតិយោបល់..." />
      <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#111b2c]">
        {loading ? <AdminTableLoading /> : error ? <AdminErrorState message={error} action={<button type="button" onClick={() => void load()} className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200">សាកម្ដងទៀត</button>} /> : filtered.length === 0 ? <AdminTableEmpty label="មិនមានមតិយោបល់" /> : (
          <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left"><thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-600"><tr><th className="px-5 py-3">អ្នកប្រើប្រាស់</th><th className="px-5 py-3">មតិយោបល់</th><th className="px-5 py-3">Event UUID</th><th className="px-5 py-3">កាលបរិច្ឆេទ</th><th className="px-5 py-3 text-right">សកម្មភាព</th></tr></thead><tbody className="divide-y divide-slate-800">{filtered.map((item) => <tr key={item.uuid} className="hover:bg-[#0d1727]"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-400"><MessageSquare size={15} /></div><span className="text-sm font-medium text-slate-200">{item.userName}</span></div></td><td className="px-5 py-4"><p className="max-w-lg line-clamp-2 text-sm leading-6 text-slate-500">{item.comment || "គ្មានអត្ថបទ"}</p></td><td className="px-5 py-4"><code className="text-[11px] text-slate-600">{item.eventUuid || "-"}</code></td><td className="px-5 py-4 text-xs text-slate-600">{item.createdAt ? new Date(item.createdAt).toLocaleString("km-KH") : "-"}</td><td className="px-5 py-4"><div className="flex justify-end"><AdminIconButton label="លុប" tone="danger" onClick={() => setDeleteTarget(item)}><Trash2 size={15} /></AdminIconButton></div></td></tr>)}</tbody></table></div>
        )}
      </div>
      <AdminConfirmDialog open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={() => void remove()} busy={deleting} title="លុបមតិយោបល់" message="តើអ្នកប្រាកដថាចង់លុបមតិយោបល់នេះមែនទេ?" />
    </div>
  );
}
