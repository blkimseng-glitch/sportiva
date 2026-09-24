import { adminRequest, firstString, toImageUrls, unwrapEntity, unwrapList } from "@/services/adminApi";
import type { AdminSport, SportFormValues } from "@/lib/adminTypes";

function normalizeSport(input: unknown): AdminSport {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    uuid: firstString(data.uuid, data.id),
    name: firstString(data.name, data.title),
    description: firstString(data.description),
    categoryName: firstString(data.categoryName, data.category),
    imageUrls: toImageUrls(data.imageUrls ?? data.images ?? data.imageUrl ?? data.image),
  };
}

export async function getAdminSports() {
  const payload = await adminRequest<unknown>("/sports");
  return unwrapList<unknown>(payload).map(normalizeSport).filter((item) => item.uuid || item.name);
}

export async function createAdminSport(values: SportFormValues) {
  const payload = await adminRequest<unknown>("/sports", {
    method: "POST",
    body: JSON.stringify(values),
  });
  return normalizeSport(unwrapEntity<unknown>(payload));
}

export async function updateAdminSport(uuid: string, values: SportFormValues) {
  const payload = await adminRequest<unknown>(`/sports/${encodeURIComponent(uuid)}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
  return normalizeSport(unwrapEntity<unknown>(payload));
}

export async function deleteAdminSport(uuid: string) {
  await adminRequest<unknown>(`/sports/${encodeURIComponent(uuid)}`, {
    method: "DELETE",
  });
}
