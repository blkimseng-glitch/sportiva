"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Search, Pencil, Trash2, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { getAdminEvents, deleteAdminEvent, createAdminEvent, updateAdminEvent } from "@/services/adminEventService";
import { getAdminCategories } from "@/services/adminCategoryService";
import type { AdminEvent, AdminCategory, EventFormValues } from "@/lib/adminTypes";
import AdminPageHeader from "@/components/admin/AdminHeader";
import AdminModal from "@/components/admin/AdminModal";
import AdminConfirmDialog from "@/components/admin/Admindialog";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import { AdminField, AdminInput, AdminSelect, AdminTextarea } from "@/components/admin/Adminform";
import AdminIconButton from "@/components/admin/AdminIcon";
import { AdminTableLoading } from "@/components/admin/AdminTableStat";

const emptyForm: EventFormValues = {
  name: "",
  description: "",
  categoryName: "",
  locationName: "",
  latitude: "",
  longitude: "",
  imageUrls: [],
};

export default function AdminEventsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allEvents, setAllEvents] = useState<AdminEvent[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  // Filtering & Pagination States
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 5;

  // Form & Action States
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminEvent | null>(null);
  const [form, setForm] = useState<EventFormValues>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminEvent | null>(null);

  // Fetch Categories
  useEffect(() => {
    getAdminCategories()
      .then((data) => setCategories(data || []))
      .catch(() => console.error("Failed to fetch categories"));
  }, []);

  // Fetch All Events from API
  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminEvents();
      const rawEvents = Array.isArray(res) ? res : res && Array.isArray(res.data) ? res.data : [];

      // Normalize data to avoid missing category properties
      const normalizedEvents: AdminEvent[] = rawEvents.map((item: any) => ({
        uuid: item.uuid || item.id || "",
        name: item.name || "",
        description: item.description || "",
        categoryName: item.categoryName || item.category_name || item.category?.name || item.category || "",
        locationName: item.locationName || item.location_name || item.location || "",
        latitude: item.latitude ?? null,
        longitude: item.longitude ?? null,
        imageUrls: item.imageUrls || item.images || [],
        createdAt: item.createdAt || item.created_at || null,
      }));

      setAllEvents(normalizedEvents);
    } catch (err) {
      setError("មិនអាចទាញយកទិន្នន័យព្រឹត្តិការណ៍បានទេ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  // 1. Flexible Matching Filter (Matches categoryName & fallback event name)
  const filteredEvents = useMemo(() => {
    return allEvents.filter((item) => {
      const needle = search.trim().toLowerCase();
      const matchesSearch =
        !needle ||
        item.name?.toLowerCase().includes(needle) ||
        item.locationName?.toLowerCase().includes(needle) ||
        item.description?.toLowerCase().includes(needle);

      if (categoryFilter === "all") return matchesSearch;

      const selected = categoryFilter.trim().toLowerCase();
      const itemCat = (item.categoryName || "").trim().toLowerCase();

      const matchesCategory =
        itemCat === selected ||
        itemCat.includes(selected) ||
        (item.name || "").toLowerCase().includes(selected);

      return matchesSearch && matchesCategory;
    });
  }, [allEvents, search, categoryFilter]);

  // 2. Pagination Calculations
  const totalItems = filteredEvents.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  // 3. Paginate
  const displayedEvents = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredEvents.slice(start, start + limit);
  }, [filteredEvents, page, limit]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (evt: AdminEvent) => {
    setEditing(evt);
    setForm({
      name: evt.name,
      description: evt.description,
      categoryName: evt.categoryName,
      locationName: evt.locationName,
      latitude: evt.latitude !== null ? String(evt.latitude) : "",
      longitude: evt.longitude !== null ? String(evt.longitude) : "",
      imageUrls: evt.imageUrls,
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error("Please enter event name");
    if (!form.categoryName.trim()) return toast.error("Please select a category");
    setSaving(true);
    try {
      if (editing) await updateAdminEvent(editing.uuid, form);
      else await createAdminEvent(form);
      toast.success(editing ? "Event updated successfully" : "Event added successfully");
      setModalOpen(false);
      await loadEvents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdminEvent(deleteTarget.uuid);
      toast.success("Event deleted successfully");
      setDeleteTarget(null);
      await loadEvents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Events Management"
        description="Create, edit, sort, and manage sport events locations"
        action={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <Plus size={16} /> Add New Event
          </button>
        }
      />

      {/* Filter and Search Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search events..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.uuid || cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Events Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <AdminTableLoading label="Loading Events..." />
        ) : (
          <>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedEvents.length > 0 ? (
                  displayedEvents.map((item) => (
                    <tr key={item.uuid} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          {item.imageUrls?.[0] ? (
                            <img
                              src={item.imageUrls[0]}
                              alt={item.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                              <Calendar size={16} />
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-800">{item.name}</div>
                            <div className="text-xs text-slate-400 line-clamp-1">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                          {item.categoryName || "Unassigned"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <MapPin size={14} className="text-slate-400 shrink-0" />
                          <span>{item.locationName || "-"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <AdminIconButton label="Edit" onClick={() => openEdit(item)}>
                            <Pencil size={16} />
                          </AdminIconButton>
                          <AdminIconButton label="Delete" tone="danger" onClick={() => setDeleteTarget(item)}>
                            <Trash2 size={16} />
                          </AdminIconButton>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Bar */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <span className="text-xs font-medium text-slate-500">
                Showing Page {page} of {totalPages} ({totalItems} total events)
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Form Modal (Add / Edit Event) */}
      <AdminModal
        open={modalOpen}
        onClose={() => !saving && setModalOpen(false)}
        busy={saving}
        title={editing ? "Edit Event" : "Add New Event"}
      >
        <div className="space-y-4 text-slate-800">
          <AdminField label="Event Name" required>
            <AdminInput
              value={form.name}
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
              placeholder="e.g. Cambodian Boxing Championship"
            />
          </AdminField>

          <AdminField label="Description">
            <AdminTextarea
              value={form.description}
              onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
              placeholder="Describe the event details..."
            />
          </AdminField>

          <AdminField label="Category" required>
            <AdminSelect
              value={form.categoryName}
              onChange={(e) => setForm((v) => ({ ...v, categoryName: e.target.value }))}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.uuid || cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </AdminSelect>
          </AdminField>

          <AdminField label="Location Name">
            <AdminInput
              value={form.locationName}
              onChange={(e) => setForm((v) => ({ ...v, locationName: e.target.value }))}
              placeholder="e.g. Olympic Stadium, Phnom Penh"
            />
          </AdminField>

          <div className="grid grid-cols-2 gap-3">
            <AdminField label="Latitude">
              <AdminInput
                value={form.latitude}
                onChange={(e) => setForm((v) => ({ ...v, latitude: e.target.value }))}
                placeholder="e.g. 11.5564"
              />
            </AdminField>

            <AdminField label="Longitude">
              <AdminInput
                value={form.longitude}
                onChange={(e) => setForm((v) => ({ ...v, longitude: e.target.value }))}
                placeholder="e.g. 104.9282"
              />
            </AdminField>
          </div>

          <AdminField label="Images">
            <AdminImageUpload
              value={form.imageUrls}
              onChange={(urls) => setForm((v) => ({ ...v, imageUrls: urls }))}
            />
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
              {saving ? "Saving..." : "Save Event"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Confirm Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void confirmDelete()}
        busy={deleting}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.name ?? "this event"}"?`}
      />
    </div>
  );
}