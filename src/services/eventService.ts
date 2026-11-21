import type {
  Event,
  Session,
  PaginatedEvents,
  EventQuery,
  CreateEventInput,
} from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

/* ---------- Helpers ---------- */

// Wrapper around fetch that adds the auth token to every request.
async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (API_TOKEN) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: missing or invalid API token");
  }

  if (response.status === 400) {
    const body = await response.json().catch(() => null);
    const detail = Array.isArray(body?.message)
      ? body.message.join(", ")
      : body?.message;
    throw new Error(`Bad request: ${detail ?? "invalid parameters"}`);
  }

  return response;
}

// Turns { category: "technology", page: 1 } into "?category=technology&page=1"
function buildQueryString(query: EventQuery = {}): string {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

// Handles both a plain array and a { items: [...] } wrapper.
function toArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["items", "data", "sessions"]) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
}

/* ---------- Events ---------- */

export async function getEvents(
  query: EventQuery = {},
): Promise<PaginatedEvents> {
  const response = await apiFetch(`/events${buildQueryString(query)}`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const response = await apiFetch(`/events/upcoming`);
  if (!response.ok) throw new Error("Failed to fetch upcoming events");
  return toArray<Event>(await response.json());
}

// Returns null on 404 so the page can show a "not found" message.
export async function getEventById(id: string): Promise<Event | null> {
  const response = await apiFetch(`/events/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch event");
  return response.json();
}

export async function createEvent(event: CreateEventInput): Promise<Event> {
  const response = await apiFetch(`/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!response.ok) throw new Error("Failed to create event");
  return response.json();
}

/* ---------- Sessions ---------- */

export async function getEventSessions(id: string): Promise<Session[]> {
  const response = await apiFetch(`/events/${id}/sessions`);
  //   console.log("SESSIONS STATUS:", response.status);
  if (!response.ok) throw new Error("Failed to fetch sessions");
  const data = await response.json();
  //   console.log("SESSIONS RAW:", JSON.stringify(data));
  return toArray<Session>(data);
}

// Returns null on 404.
export async function getSessionById(
  eventId: string,
  sessionId: string,
): Promise<Session | null> {
  const response = await apiFetch(`/events/${eventId}/sessions/${sessionId}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch session");
  return response.json();
}
