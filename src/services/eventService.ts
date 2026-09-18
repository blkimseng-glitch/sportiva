const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/backend-api";

export async function getAllEvents() {
  const res = await fetch(`${API_BASE_URL}/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  return res.json();
}

export async function getEventByUuid(uuid: string) {
  const res = await fetch(`${API_BASE_URL}/events/${uuid}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch event: ${res.status}`);
  }

  return res.json();
}