const API_BASE_URL = "/backend-api";

export class AdminApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function parseResponse(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function adminRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    let message = `សំណើមិនបានជោគជ័យ (${response.status})`;

    if (payload && typeof payload === "object") {
      const data = payload as Record<string, unknown>;
      const error = data.error;
      if (error && typeof error === "object") {
        const reason = (error as Record<string, unknown>).reason;
        if (typeof reason === "string" && reason.trim()) message = reason;
      }
      if (typeof data.message === "string" && data.message.trim()) {
        message = data.message;
      }
    }

    throw new AdminApiError(message, response.status, payload);
  }

  return payload as T;
}

export function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];

  if (!payload || typeof payload !== "object") return [];

  const record = payload as Record<string, unknown>;
  for (const key of ["data", "items", "content", "results"]) {
    const candidate = record[key];
    if (Array.isArray(candidate)) return candidate as T[];

    if (candidate && typeof candidate === "object") {
      const nested = candidate as Record<string, unknown>;
      for (const nestedKey of ["items", "content", "results"] ) {
        if (Array.isArray(nested[nestedKey])) {
          return nested[nestedKey] as T[];
        }
      }
    }
  }

  return [];
}

export function unwrapEntity<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const data = (payload as Record<string, unknown>).data;
    if (data && typeof data === "object") return data as T;
  }
  return payload as T;
}

export function firstString(...values: unknown[]): string {
  return values.find((value) => typeof value === "string" && value.trim()) as string || "";
}

export function firstNumber(...values: unknown[]): number | null {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

export function toImageUrls(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && !!item.trim());
  }
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}
