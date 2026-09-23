"use client";

import Image from "next/image";
import { CalendarDays, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminCategory, AdminEvent, EventFormValues } from "@/lib/adminTypes";
import { getAdminCategories } from "@/services/adminCategoryService";
import { createAdminEvent, deleteAdminEvent, getAdminEvents, updateAdminEvent } from "@/services/adminEventService";
import AdminPageHeader from "@/components/admin/AdminHeader";
import AdminToolbar from "@/components/admin/AdminToolbars";
import AdminModal from "@/components/admin/AdminModal";
import AdminConfirmDialog from "@/components/admin/Admindialog";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminIconButton from "@/components/admin/AdminIcon";
import { AdminField, AdminInput, AdminSelect, AdminTextarea } from "@/components/admin/Adminform";
import { AdminErrorState, AdminTableEmpty, AdminTableLoading } from "@/components/admin/AdminTableStat";

const empty: EventFormValues = { name: "", description: "", categoryName: "", locationName: "", latitude: "", longitude: "", imageUrls: [] };

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<AdminEvent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminEvent | null>(null);
  const [form, setForm] = useState(empty);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const [eventData, categoryData] = await Promise.all([getAdminEvents(), getAdminCategories()]); setEvents(eventData); setCategories(categoryData); }
    catch (err) { setError(err instanceof Error ? err.message : "មិនអាចទាញទិន្នន័យបានទេ"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const filtered = useMemo(() => events.filter((event) => {
    const q = search.trim().toLowerCase();
    return (!q || `${event.name} ${event.description} ${event.categoryName} ${event.locationName}`.toLowerCase().includes(q)) && (filter === "all" || event.categoryName === filter);
  }), [events, search, filter]);

  const openCreate = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (event: AdminEvent) => { setEditing(event); setForm({ name: event.name, description: event.description, categoryName: event.categoryName, locationName: event.locationName, latitude: event.latitude?.toString() ?? "", longitude: event.longitude?.toString() ?? "", imageUrls: event.imageUrls }); setModalOpen(true); };
  const save = async () => {
    if (!form.name.trim()) return toast.error("សូមបញ្ចូលឈ្មោះព្រឹត្តិការណ៍");
    if (!form.categoryName.trim()) return toast.error("សូមជ្រើសប្រភេទកីឡា");
    if (!form.locationName.trim()) return toast.error("សូមបញ្ចូលទីតាំង");
    const latitude = Number(form.latitude); const longitude = Number(form.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return toast.error("សូមបញ្ចូល Latitude និង Longitude ត្រឹមត្រូវ");
    setSaving(true);
    try { if (editing) await updateAdminEvent(editing.uuid, form); else await createAdminEvent(form); toast.success(editing ? "បានកែប្រែព្រឹត្តិការណ៍" : "បានបន្ថែមព្រឹត្តិការណ៍"); setModalOpen(false); await load(); }
    catch (err) { toast.error(err instanceof Error ? err.message : "រក្សាទុកមិនបានទេ"); }
    finally { setSaving(false); }
  };
  const remove = async () => { if (!deleteTarget) return; setDeleting(true); try { await deleteAdminEvent(deleteTarget.uuid); toast.success("បានលុបព្រឹត្តិការណ៍"); setDeleteTarget(null); await load(); } catch (err) { toast.error(err instanceof Error ? err.message : "លុបមិនបានទេ"); } finally { setDeleting(false); } };

  return (
    <div>
      <AdminPageHeader title="ព្រឹត្តិការណ៍" description="បង្កើត និងគ្រប់គ្រងទីតាំងព្រឹត្តិការណ៍កីឡា" action={<button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"><Plus size={15} /> បន្ថែមព្រឹត្តិការណ៍</button>} />
      <AdminToolbar search={search} onSearch={setSearch} placeholder="ស្វែងរកព្រឹត្តិការណ៍..." filter={<select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 rounded-xl border border-slate-700/70 bg-[#101a2b] px-3 text-sm text-slate-300 outline-none focus:border-blue-500/50"><option value="all">គ្រប់ប្រភេទ</option>{categories.map((category) => <option key={category.uuid} value={category.name}>{category.name}</option>)}</select>} />
      <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#111b2c]">
        {loading ? <AdminTableLoading /> : error ? <AdminErrorState message={error} action={<button type="button" onClick={() => void load()} className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200">សាកម្ដងទៀត</button>} /> : filtered.length === 0 ? <AdminTableEmpty label={search || filter !== "all" ? "រកមិនឃើញព្រឹត្តិការណ៍ដែលត្រូវស្វែងរក" : "មិនទាន់មានព្រឹត្តិការណ៍"} /> : (
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left"><thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-600"><tr><th className="px-5 py-3">ព្រឹត្តិការណ៍</th><th className="px-5 py-3">ប្រភេទ</th><th className="px-5 py-3">ទីតាំង</th><th className="px-5 py-3">បង្កើតនៅ</th><th className="px-5 py-3 text-right">សកម្មភាព</th></tr></thead><tbody className="divide-y divide-slate-800">{filtered.map((event) => <tr key={event.uuid} className="hover:bg-[#0d1727]"><td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-slate-800">{event.imageUrls[0] ? <Image src={event.imageUrls[0]} alt={event.name} fill sizes="44px" className="object-cover" /> : <div className="flex h-full items-center justify-center"><CalendarDays size={17} className="text-slate-600" /></div>}</div><div className="min-w-0"><p className="truncate text-sm font-medium text-slate-200">{event.name || "គ្មានឈ្មោះ"}</p><p className="mt-1 max-w-sm truncate text-xs text-slate-600">{event.description || "គ្មានការពិពណ៌នា"}</p></div></div></td><td className="px-5 py-3.5"><span className="rounded-full border border-blue-500/15 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300">{event.categoryName || "មិនបានកំណត់"}</span></td><td className="px-5 py-3.5"><div className="flex max-w-52 items-start gap-2 text-xs text-slate-500"><MapPin size={14} className="mt-0.5 shrink-0 text-slate-600" /><span className="line-clamp-2">{event.locationName || "មិនមានទីតាំង"}</span></div></td><td className="px-5 py-3.5 text-xs text-slate-600">{event.createdAt ? new Date(event.createdAt).toLocaleDateString("km-KH") : "-"}</td><td className="px-5 py-3.5"><div className="flex justify-end gap-1"><AdminIconButton label="កែប្រែ" onClick={() => openEdit(event)}><Pencil size={15} /></AdminIconButton><AdminIconButton label="លុប" tone="danger" onClick={() => setDeleteTarget(event)}><Trash2 size={15} /></AdminIconButton></div></td></tr>)}</tbody></table></div>
        )}
      </div>

      <AdminModal open={modalOpen} onClose={() => !saving && setModalOpen(false)} busy={saving} title={editing ? "កែប្រែព្រឹត្តិការណ៍" : "បន្ថែមព្រឹត្តិការណ៍"}>
        <div className="space-y-4"><AdminField label="ឈ្មោះព្រឹត្តិការណ៍" required><AdminInput value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} /></AdminField><AdminField label="ការពិពណ៌នា"><AdminTextarea value={form.description} onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))} /></AdminField><AdminField label="ប្រភេទកីឡា" required><AdminSelect value={form.categoryName} onChange={(e) => setForm((v) => ({ ...v, categoryName: e.target.value }))}><option value="">ជ្រើសប្រភេទ</option>{categories.map((category) => <option key={category.uuid} value={category.name}>{category.name}</option>)}</AdminSelect></AdminField><AdminField label="ទីតាំង" required><AdminInput value={form.locationName} onChange={(e) => setForm((v) => ({ ...v, locationName: e.target.value }))} placeholder="ឧ. Phnom Penh Riverside Sports Complex" /></AdminField><div className="grid gap-4 sm:grid-cols-2"><AdminField label="Latitude" required><AdminInput type="number" step="any" value={form.latitude} onChange={(e) => setForm((v) => ({ ...v, latitude: e.target.value }))} /></AdminField><AdminField label="Longitude" required><AdminInput type="number" step="any" value={form.longitude} onChange={(e) => setForm((v) => ({ ...v, longitude: e.target.value }))} /></AdminField></div><AdminField label="រូបភាព"><AdminImageUpload value={form.imageUrls} onChange={(urls) => setForm((v) => ({ ...v, imageUrls: urls }))} /></AdminField><div className="flex justify-end gap-2 border-t border-slate-800 pt-4"><button type="button" onClick={() => setModalOpen(false)} disabled={saving} className="rounded-xl bg-slate-800 px-4 py-2.5 text-sm text-slate-300">បោះបង់</button><button type="button" onClick={() => void save()} disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50">{saving ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}</button></div></div>
      </AdminModal>
      <AdminConfirmDialog open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={() => void remove()} busy={deleting} title="លុបព្រឹត្តិការណ៍" message={`តើអ្នកប្រាកដថាចង់លុប «${deleteTarget?.name ?? "ព្រឹត្តិការណ៍នេះ"}» មែនទេ?`} />
    </div>
  );
}
