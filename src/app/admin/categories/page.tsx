"use client";

import { Pencil, Plus, Tags, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminCategory, CategoryFormValues } from "@/lib/adminTypes";
import { createAdminCategory, deleteAdminCategory, getAdminCategories, updateAdminCategory } from "@/services/adminCategoryService";
import AdminPageHeader from "@/components/admin/AdminHeader";
import AdminToolbar from "@/components/admin/AdminToolbars";
import AdminModal from "@/components/admin/AdminModal";
import AdminConfirmDialog from "@/components/admin/Admindialog";
import AdminIconButton from "@/components/admin/AdminIcon";
import { AdminField, AdminInput, AdminTextarea } from "@/components/admin/Adminform";
import { AdminErrorState, AdminTableEmpty, AdminTableLoading } from "@/components/admin/AdminTableStat";

const empty: CategoryFormValues = { name: "", description: "" };

export default function AdminCategoriesPage() {
  const [data, setData] = useState<AdminCategory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategory | null>(null);
  const [form, setForm] = useState(empty);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { setData(await getAdminCategories()); } catch (err) { setError(err instanceof Error ? err.message : "Failed to fetch categories"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => data.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(search.trim().toLowerCase())), [data, search]);

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (item: AdminCategory) => { setEditing(item); setForm({ name: item.name, description: item.description }); setModalOpen(true); };
  const save = async () => {
    if (!form.name.trim()) return toast.error("Please enter category name");
    setSaving(true);
    try { if (editing) await updateAdminCategory(editing.uuid, form); else await createAdminCategory(form); toast.success(editing ? "Category updated successfully" : "Category created successfully"); setModalOpen(false); await load(); }
    catch (err) { toast.error(err instanceof Error ? err.message : "Failed to save category"); }
    finally { setSaving(false); }
  };
  const remove = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await deleteAdminCategory(deleteTarget.uuid); toast.success("Category deleted successfully"); setDeleteTarget(null); await load(); }
    catch (err) { toast.error(err instanceof Error ? err.message : "Failed to delete category"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader 
        title="Sports Categories" 
        description="Organize sports into groups that can be selected when creating content" 
        action={
          <button 
            type="button" 
            onClick={openCreate} 
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Add Category
          </button>
        } 
      />
      <AdminToolbar search={search} onSearch={setSearch} placeholder="Search categories..." />
      
      {/* Light Theme Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <AdminTableLoading label="Loading categories..." />
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
          <AdminTableEmpty label="No categories found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Description</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.uuid} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                          <Tags size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                          <p className="mt-0.5 text-[10px] text-slate-400">{item.slug || item.uuid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="max-w-2xl text-sm text-slate-500 line-clamp-2">{item.description || "No description available"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <AdminIconButton label="Edit" onClick={() => openEdit(item)}>
                          <Pencil size={15} />
                        </AdminIconButton>
                        <AdminIconButton label="Delete" tone="danger" onClick={() => setDeleteTarget(item)}>
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

      {/* Modal Light Theme */}
      <AdminModal open={modalOpen} onClose={() => !saving && setModalOpen(false)} busy={saving} title={editing ? "Edit Category" : "Add Category"}>
        <div className="space-y-4 text-slate-800">
          <AdminField label="Category Name" required>
            <AdminInput value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="e.g. Football" />
          </AdminField>
          <AdminField label="Description">
            <AdminTextarea value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} placeholder="Describe the category..." />
          </AdminField>
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button 
              type="button" 
              onClick={() => setModalOpen(false)} 
              disabled={saving} 
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={() => void save()} 
              disabled={saving} 
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </AdminModal>

      <AdminConfirmDialog open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={() => void remove()} busy={deleting} title="Delete Category" message={`Are you sure you want to delete "${deleteTarget?.name ?? "this category"}"?`} />
    </div>
  );
}