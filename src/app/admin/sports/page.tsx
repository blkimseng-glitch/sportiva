"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2, Trophy } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminCategory, AdminSport, SportFormValues } from "@/lib/adminTypes";
import { getAdminCategories } from "@/services/adminCategoryService";
import { createAdminSport, deleteAdminSport, getAdminSports, updateAdminSport } from "@/services/adminSportService";
import AdminPageHeader from "@/components/admin/AdminHeader";
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [form, setForm] = useState<SportFormValues>(emptyForm);
  const [editing, setEditing] = useState<AdminSport | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminSport | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Pagination States
  const [page, setPage] = useState(1);
  const limit = 5;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [sportsData, categoryData] = await Promise.all([getAdminSports(), getAdminCategories()]);
      
      const normalizedSports: AdminSport[] = (sportsData || []).map((item: any) => ({
        uuid: item.uuid || item.id || "",
        name: item.name || "",
        description: item.description || "",
        categoryName: item.categoryName || item.category_name || item.category?.name || item.category || "",
        imageUrls: item.imageUrls || item.images || [],
      }));

      setSports(normalizedSports);
      setCategories(categoryData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch sports data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    return sports.filter((sport) => {
      const needle = search.trim().toLowerCase();
      const nameMatch = (sport.name || "").toLowerCase().includes(needle);
      const descMatch = (sport.description || "").toLowerCase().includes(needle);
      const matchesSearch = !needle || nameMatch || descMatch;

      if (selectedCategory === "all") return matchesSearch;

      const targetCat = selectedCategory.trim().toLowerCase();
      const itemCat = (sport.categoryName || "").trim().toLowerCase();

      const matchesCategory =
        itemCat === targetCat ||
        itemCat.includes(targetCat) ||
        (sport.name || "").toLowerCase().includes(targetCat);

      return matchesSearch && matchesCategory;
    });
  }, [sports, search, selectedCategory]);

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  const paginatedSports = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (sport: AdminSport) => {
    setEditing(sport);
    setForm({
      name: sport.name,
      description: sport.description,
      categoryName: sport.categoryName,
      imageUrls: sport.imageUrls,
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error("Please enter a sport name");
    if (!form.categoryName.trim()) return toast.error("Please select a category");
    setSaving(true);
    try {
      if (editing) await updateAdminSport(editing.uuid, form);
      else await createAdminSport(form);
      toast.success(editing ? "Sport updated successfully" : "Sport added successfully");
      setModalOpen(false);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save sport");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdminSport(deleteTarget.uuid);
      toast.success("Sport deleted successfully");
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete sport");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6 text-slate-800">
      <AdminPageHeader
        title="Sports Management"
        description="Manage all sports items displayed on Sportiva"
        action={
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus size={16} /> Add Sport
          </button>
        }
      />

      {/* Filter Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search sports..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={handleFilterChange}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.uuid} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <AdminTableLoading label="Loading Sports..." />
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
          <AdminTableEmpty
            label={search || selectedCategory !== "all" ? "No sports found matching your query" : "No sports available"}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Sport</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedSports.map((sport) => (
                    <tr key={sport.uuid} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {sport.imageUrls?.[0] ? (
                              <Image
                                src={sport.imageUrls[0]}
                                alt={sport.name || "Sport"}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <Trophy size={16} className="text-slate-400" />
                              </div>
                            )}
                          </div>
                          <span className="font-semibold text-slate-800">{sport.name || "Unnamed"}</span>
                        </div>
                      </td>
                      <td className="max-w-xs px-6 py-4">
                        <p className="line-clamp-2 text-xs text-slate-500">{sport.description || "-"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                          {sport.categoryName || "Unassigned"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <AdminIconButton label="Edit" onClick={() => openEdit(sport)}>
                            <Pencil size={16} />
                          </AdminIconButton>
                          <AdminIconButton label="Delete" tone="danger" onClick={() => setDeleteTarget(sport)}>
                            <Trash2 size={16} />
                          </AdminIconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
              <span className="font-medium">
                Showing Page {page} of {totalPages} ({totalItems} total sports)
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Light Theme Modal Add/Edit */}
      <AdminModal
        open={modalOpen}
        onClose={() => !saving && setModalOpen(false)}
        busy={saving}
        title={editing ? "Edit Sport" : "Add Sport"}
      >
        <div className="space-y-4 text-slate-800">
          <AdminField label="Sport Name" required>
            <AdminInput
              value={form.name}
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
              placeholder="e.g. Football"
              className="bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500"
            />
          </AdminField>
          <AdminField label="Description">
            <AdminTextarea
              value={form.description}
              onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
              placeholder="Describe the sport..."
              className="bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500"
            />
          </AdminField>
          <AdminField label="Category" required>
            <AdminSelect
              value={form.categoryName}
              onChange={(e) => setForm((v) => ({ ...v, categoryName: e.target.value }))}
              className="bg-white border-slate-200 text-slate-800 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.uuid} value={category.name}>
                  {category.name}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
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
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </AdminModal>

      {/* Confirmation Dialog */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void remove()}
        busy={deleting}
        title="Delete Sport"
        message={`Are you sure you want to delete "${deleteTarget?.name ?? "this sport"}"?`}
      />
    </div>
  );
}