"use client";

import Image from "next/image";
import { Pencil, Plus, Trash2, Trophy } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminCategory, AdminSport, SportFormValues } from "@/lib/adminTypes";
import { getAdminCategories } from "@/services/adminCategoryService";
import { createAdminSport, deleteAdminSport, getAdminSports, updateAdminSport } from "@/services/adminSportService"
import AdminPageHeader from "@/components/admin/AdminHeader";
import AdminToolbar from "@/components/admin/AdminToolbars";
import AdminModal from "@/components/admin/AdminModal";
import AdminConfirmDialog from "@/components/admin/Admindialog";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import { AdminField, AdminInput, AdminSelect, AdminTextarea } from "@/components/admin/Adminform";
import AdminIconButton from "@/components/admin/AdminIcon";
import { AdminErrorState, AdminTableEmpty, AdminTableLoading } from "@/components/admin/AdminTableStat";

const emptyForm: SportFormValues = { name: "", description: "", categoryName: "", imageUrls: [] };

export default function AdminSportsPage() {
  const [sports, setSports] = useState<AdminSport[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState<SportFormValues>(emptyForm);
  const [editing, setEditing] = useState<AdminSport | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminSport | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [sportsData, categoryData] = await Promise.all([getAdminSports(), getAdminCategories()]);
      setSports(sportsData); setCategories(categoryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "មិនអាចទាញទិន្នន័យបានទេ");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => sports.filter((sport) => {
    const needle = search.trim().toLowerCase();
    const matchesSearch = !needle || `${sport.name} ${sport.description} ${sport.categoryName}`.toLowerCase().includes(needle);
    const matchesFilter = filter === "all" || sport.categoryName === filter;
    return matchesSearch && matchesFilter;
  }), [sports, search, filter]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (sport: AdminSport) => {
    setEditing(sport);
    setForm({ name: sport.name, description: sport.description, categoryName: sport.categoryName, imageUrls: sport.imageUrls });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error("សូមបញ្ចូលឈ្មោះកីឡា");
    if (!form.categoryName.trim()) return toast.error("សូមជ្រើសប្រភេទកីឡា");
    setSaving(true);
    try {
      if (editing) await updateAdminSport(editing.uuid, form);
      else await createAdminSport(form);
      toast.success(editing ? "បានកែប្រែកីឡា" : "បានបន្ថែមកីឡា");
      setModalOpen(false); await load();
    } catch (err) { toast.error(err instanceof Error ? err.message : "រក្សាទុកមិនបានទេ"); }
    finally { setSaving(false); }
  };

  const remove = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try { await deleteAdminSport(deleteTarget.uuid); toast.success("បានលុបកីឡា"); setDeleteTarget(null); await load(); }
    catch (err) { toast.error(err instanceof Error ? err.message : "លុបមិនបានទេ"); }
    finally { setDeleting(false); }
  };

  return (
    <div>
      <AdminPageHeader title="កីឡា" description="គ្រប់គ្រងធាតុកីឡាដែលបង្ហាញនៅលើ Sportiva" action={<button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"><Plus size={15} /> បន្ថែមកីឡា</button>} />
      <AdminToolbar search={search} onSearch={setSearch} placeholder="ស្វែងរកឈ្មោះកីឡា..." filter={<select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 rounded-xl border border-slate-700/70 bg-[#101a2b] px-3 text-sm text-slate-300 outline-none focus:border-blue-500/50"><option value="all">គ្រប់ប្រភេទ</option>{categories.map((category) => <option key={category.uuid} value={category.name}>{category.name}</option>)}</select>} />
      <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#111b2c]">
        {loading ? <AdminTableLoading /> : error ? <AdminErrorState message={error} action={<button type="button" onClick={() => void load()} className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200">សាកម្ដងទៀត</button>} /> : filtered.length === 0 ? <AdminTableEmpty label={search || filter !== "all" ? "រកមិនឃើញកីឡាដែលត្រូវស្វែងរក" : "មិនទាន់មានកីឡា"} /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-600"><tr><th className="px-5 py-3">កីឡា</th><th className="px-5 py-3">ការពិពណ៌នា</th><th className="px-5 py-3">ប្រភេទ</th><th className="px-5 py-3 text-right">សកម្មភាព</th></tr></thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((sport) => <tr key={sport.uuid} className="transition-colors hover:bg-[#0d1727]">
                  <td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="relative h-10 w-10 overflow-hidden rounded-xl bg-slate-800">{sport.imageUrls[0] ? <Image src={sport.imageUrls[0]} alt={sport.name} fill sizes="40px" className="object-cover" /> : <div className="flex h-full items-center justify-center"><Trophy size={16} className="text-slate-600" /></div>}</div><span className="font-medium text-slate-200">{sport.name || "គ្មានឈ្មោះ"}</span></div></td>
                  <td className="max-w-md px-5 py-3.5"><p className="line-clamp-2 text-sm text-slate-500">{sport.description || "គ្មានការពិពណ៌នា"}</p></td>
                  <td className="px-5 py-3.5"><span className="rounded-full border border-blue-500/15 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300">{sport.categoryName || "មិនបានកំណត់"}</span></td>
                  <td className="px-5 py-3.5"><div className="flex justify-end gap-1"><AdminIconButton label="កែប្រែ" onClick={() => openEdit(sport)}><Pencil size={15} /></AdminIconButton><AdminIconButton label="លុប" tone="danger" onClick={() => setDeleteTarget(sport)}><Trash2 size={15} /></AdminIconButton></div></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => !saving && setModalOpen(false)} busy={saving} title={editing ? "កែប្រែកីឡា" : "បន្ថែមកីឡា"}>
        <div className="space-y-4">
          <AdminField label="ឈ្មោះកីឡា" required><AdminInput value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="ឧ. បាល់ទាត់" /></AdminField>
          <AdminField label="ការពិពណ៌នា"><AdminTextarea value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} placeholder="ពិពណ៌នាអំពីកីឡា..." /></AdminField>
          <AdminField label="ប្រភេទកីឡា" required><AdminSelect value={form.categoryName} onChange={(e) => setForm((v) => ({ ...v, categoryName: e.target.value }))}><option value="">ជ្រើសប្រភេទ</option>{categories.map((category) => <option key={category.uuid} value={category.name}>{category.name}</option>)}</AdminSelect></AdminField>
          <AdminField label="រូបភាព"><AdminImageUpload value={form.imageUrls} onChange={(urls) => setForm((v) => ({ ...v, imageUrls: urls }))} /></AdminField>
          <div className="flex justify-end gap-2 border-t border-slate-800 pt-4"><button type="button" onClick={() => setModalOpen(false)} disabled={saving} className="rounded-xl bg-slate-800 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700">បោះបង់</button><button type="button" onClick={() => void save()} disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50">{saving ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}</button></div>
        </div>
      </AdminModal>

      <AdminConfirmDialog open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={() => void remove()} busy={deleting} title="លុបកីឡា" message={`តើអ្នកប្រាកដថាចង់លុប «${deleteTarget?.name ?? "កីឡានេះ"}» មែនទេ?`} />
    </div>
  );
}