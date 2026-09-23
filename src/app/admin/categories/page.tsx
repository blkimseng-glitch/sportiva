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
    try { setData(await getAdminCategories()); } catch (err) { setError(err instanceof Error ? err.message : "មិនអាចទាញទិន្នន័យបានទេ"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => data.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(search.trim().toLowerCase())), [data, search]);

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (item: AdminCategory) => { setEditing(item); setForm({ name: item.name, description: item.description }); setModalOpen(true); };
  const save = async () => {
    if (!form.name.trim()) return toast.error("សូមបញ្ចូលឈ្មោះប្រភេទ");
    setSaving(true);
    try { if (editing) await updateAdminCategory(editing.uuid, form); else await createAdminCategory(form); toast.success(editing ? "បានកែប្រែប្រភេទ" : "បានបន្ថែមប្រភេទ"); setModalOpen(false); await load(); }
    catch (err) { toast.error(err instanceof Error ? err.message : "រក្សាទុកមិនបានទេ"); }
    finally { setSaving(false); }
  };
  const remove = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await deleteAdminCategory(deleteTarget.uuid); toast.success("បានលុបប្រភេទ"); setDeleteTarget(null); await load(); }
    catch (err) { toast.error(err instanceof Error ? err.message : "លុបមិនបានទេ"); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <AdminPageHeader title="ប្រភេទកីឡា" description="រៀបចំកីឡាជាក្រុមដែលអាចជ្រើសនៅពេលបង្កើតមាតិកា" action={<button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"><Plus size={15} /> បន្ថែមប្រភេទ</button>} />
      <AdminToolbar search={search} onSearch={setSearch} placeholder="ស្វែងរកប្រភេទ..." />
      <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#111b2c]">
        {loading ? <AdminTableLoading /> : error ? <AdminErrorState message={error} action={<button type="button" onClick={() => void load()} className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200">សាកម្ដងទៀត</button>} /> : filtered.length === 0 ? <AdminTableEmpty label="មិនមានប្រភេទកីឡា" /> : (
          <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left"><thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-600"><tr><th className="px-5 py-3">ឈ្មោះ</th><th className="px-5 py-3">ការពិពណ៌នា</th><th className="px-5 py-3 text-right">សកម្មភាព</th></tr></thead><tbody className="divide-y divide-slate-800">{filtered.map((item) => <tr key={item.uuid} className="hover:bg-[#0d1727]"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"><Tags size={16} /></div><div><p className="text-sm font-medium text-slate-200">{item.name}</p><p className="mt-0.5 text-[10px] text-slate-600">{item.slug || item.uuid}</p></div></div></td><td className="px-5 py-4"><p className="max-w-2xl text-sm text-slate-500">{item.description || "គ្មានការពិពណ៌នា"}</p></td><td className="px-5 py-4"><div className="flex justify-end gap-1"><AdminIconButton label="កែប្រែ" onClick={() => openEdit(item)}><Pencil size={15} /></AdminIconButton><AdminIconButton label="លុប" tone="danger" onClick={() => setDeleteTarget(item)}><Trash2 size={15} /></AdminIconButton></div></td></tr>)}</tbody></table></div>
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => !saving && setModalOpen(false)} busy={saving} title={editing ? "កែប្រែប្រភេទ" : "បន្ថែមប្រភេទ"}>
        <div className="space-y-4"><AdminField label="ឈ្មោះ" required><AdminInput value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="ឧ. បាល់ទាត់" /></AdminField><AdminField label="ការពិពណ៌នា"><AdminTextarea value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} placeholder="ពិពណ៌នាអំពីប្រភេទ..." /></AdminField><div className="flex justify-end gap-2 border-t border-slate-800 pt-4"><button type="button" onClick={() => setModalOpen(false)} disabled={saving} className="rounded-xl bg-slate-800 px-4 py-2.5 text-sm text-slate-300">បោះបង់</button><button type="button" onClick={() => void save()} disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50">{saving ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}</button></div></div>
      </AdminModal>
      <AdminConfirmDialog open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={() => void remove()} busy={deleting} title="លុបប្រភេទ" message={`តើអ្នកប្រាកដថាចង់លុប «${deleteTarget?.name ?? "ប្រភេទនេះ"}» មែនទេ?`} />
    </div>
  );
}
