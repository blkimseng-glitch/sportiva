import { adminRequest, firstString, unwrapEntity, unwrapList } from "@/services/adminApi";
import type { AdminCategory, CategoryFormValues } from "@/lib/adminTypes";

function normalizeCategory(input: unknown): AdminCategory {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    uuid: firstString(data.uuid, data.id),
    name: firstString(data.name),
    description: firstString(data.description),
    slug: firstString(data.slug) || undefined,
  };
}

export async function getAdminCategories() {
  const payload = await adminRequest<unknown>("/sport_categories");
  return unwrapList<unknown>(payload).map(normalizeCategory).filter((item) => item.uuid || item.name);
}

export async function createAdminCategory(values: CategoryFormValues) {
  const payload = await adminRequest<unknown>("/sport_categories", {
    method: "POST",
    body: JSON.stringify(values),
  });
  return normalizeCategory(unwrapEntity<unknown>(payload));
}

export async function updateAdminCategory(uuid: string, values: CategoryFormValues) {
  const payload = await adminRequest<unknown>(`/sport_categories/${encodeURIComponent(uuid)}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
  return normalizeCategory(unwrapEntity<unknown>(payload));
}

export async function deleteAdminCategory(uuid: string) {
  await adminRequest<unknown>(`/sport_categories/${encodeURIComponent(uuid)}`, {
    method: "DELETE",
  });
}
