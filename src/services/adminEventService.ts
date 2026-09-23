import {
  adminRequest,
  firstNumber,
  firstString,
  toImageUrls,
  unwrapEntity,
  unwrapList,
} from "@/services/adminApi";
import type { AdminEvent, EventFormValues } from "@/lib/adminTypes";

function normalizeEvent(input: unknown): AdminEvent {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    uuid: firstString(data.uuid, data.id),
    name: firstString(data.name, data.title),
    description: firstString(data.description),
    categoryName: firstString(data.categoryName, data.category),
    locationName: firstString(data.locationName, data.location),
    latitude: firstNumber(data.latitude, data.lat),
    longitude: firstNumber(data.longitude, data.lng, data.lon),
    imageUrls: toImageUrls(data.imageUrls ?? data.images ?? data.imageUrl ?? data.image),
    createdAt: firstString(data.createdAt, data.created_at, data.updatedAt) || null,
  };
}

export async function getAdminEvents() {
  const payload = await adminRequest<unknown>("/events");
  return unwrapList<unknown>(payload).map(normalizeEvent).filter((item) => item.uuid || item.name);
}

export async function createAdminEvent(values: EventFormValues) {
  const body = {
    name: values.name,
    description: values.description,
    imageUrls: values.imageUrls,
    locationName: values.locationName,
    latitude: Number(values.latitude),
    longitude: Number(values.longitude),
    categoryName: values.categoryName,
  };
  const payload = await adminRequest<unknown>("/events", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return normalizeEvent(unwrapEntity<unknown>(payload));
}

export async function updateAdminEvent(uuid: string, values: EventFormValues) {
  const body = {
    name: values.name,
    description: values.description,
    imageUrls: values.imageUrls,
    locationName: values.locationName,
    latitude: Number(values.latitude),
    longitude: Number(values.longitude),
    categoryName: values.categoryName,
  };
  const payload = await adminRequest<unknown>(`/events/${encodeURIComponent(uuid)}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return normalizeEvent(unwrapEntity<unknown>(payload));
}

export async function deleteAdminEvent(uuid: string) {
  await adminRequest<unknown>(`/events/${encodeURIComponent(uuid)}`, {
    method: "DELETE",
  });
}
