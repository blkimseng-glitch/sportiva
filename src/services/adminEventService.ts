import {
  adminRequest,
  firstNumber,
  firstString,
  toImageUrls,
  unwrapEntity,
  unwrapList,
} from "@/services/adminApi";
import type { AdminEvent, EventFormValues } from "@/lib/adminTypes";

export interface GetEventsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedEventsResponse {
  data: AdminEvent[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

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

export async function getAdminEvents(params?: GetEventsParams): Promise<AdminEvent[] | PaginatedEventsResponse> {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.search) query.append("search", params.search);
  if (params?.category) query.append("category", params.category);
  if (params?.sortBy) query.append("sortBy", params.sortBy);
  if (params?.sortOrder) query.append("sortOrder", params.sortOrder);

  const queryString = query.toString();
  const endpoint = `/events${queryString ? `?${queryString}` : ""}`;

  const payload = await adminRequest<unknown>(endpoint);

  // If the backend returns a paginated wrapper like { data: [...], total: 100 }
  if (payload && typeof payload === "object" && "data" in payload && Array.isArray((payload as Record<string, unknown>).data)) {
    const rawObj = payload as Record<string, unknown>;
    const rawList = rawObj.data as unknown[];
    return {
      data: rawList.map(normalizeEvent).filter((item) => item.uuid || item.name),
      total: typeof rawObj.total === "number" ? rawObj.total : undefined,
      page: typeof rawObj.page === "number" ? rawObj.page : params?.page,
      limit: typeof rawObj.limit === "number" ? rawObj.limit : params?.limit,
      totalPages: typeof rawObj.totalPages === "number" ? rawObj.totalPages : undefined,
    };
  }

  // Fallback for direct array responses
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