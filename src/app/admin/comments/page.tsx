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
      setError(err instanceof Error ? err.message : "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () =>
      comments.filter((item) =>
        `${item.comment} ${item.userName} ${item.eventUuid}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      ),
    [comments, search]
  );

  const remove = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdminComment(deleteTarget.uuid);
      toast.success("Comment deleted successfully");
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete comment");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="User Comments"
        description="View and manage user comments submitted via API"
      />
      <AdminToolbar
        search={search}
        onSearch={setSearch}
        placeholder="Search user, comment, or event UUID..."
      />

      {/* Light Theme Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <AdminTableLoading label="Loading comments..." />
        ) : error ? (
          <AdminErrorState
            message={error}
            action={
              <button
                type="button"
                onClick={() => void load()}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
              >
                Try Again
              </button>
            }
          />
        ) : filtered.length === 0 ? (
          <AdminTableEmpty label="No comments found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Comment</th>
                  <th className="px-5 py-3.5">Event UUID</th>
                  <th className="px-5 py-3.5">Created At</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.uuid} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0">
                          <MessageSquare size={15} />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {item.userName || "Anonymous"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="max-w-lg line-clamp-2 text-sm leading-6 text-slate-600">
                        {item.comment || "No text"}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <code className="rounded bg-slate-100 px-2 py-1 text-[11px] text-slate-500">
                        {item.eventUuid || "-"}
                      </code>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <AdminIconButton
                          label="Delete"
                          tone="danger"
                          onClick={() => setDeleteTarget(item)}
                        >
                          <Trash2 size={15} />
                        </AdminIconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void remove()}
        busy={deleting}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
      />
    </div>
  );
}