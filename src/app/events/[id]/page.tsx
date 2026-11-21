import Link from "next/link";
import { getEventById, getEventSessions } from "@/services/eventService";
import { formatDate } from "@/components/EventCard";
import ErrorMessage from "@/components/ErrorMessage";
import NotFound from "@/components/NotFound";
import type { Event, Session } from "@/types/event";

export const dynamic = "force-dynamic";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let event: Event | null = null;
  let sessions: Session[] = [];
  let error: string | null = null;

  try {
    event = await getEventById(id);
    if (event) {
      sessions = await getEventSessions(id);
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load the event.";
  }

  if (error) {
    return (
      <>
        <Link href="/events" className="back-link">
          ← Back to events
        </Link>
        <ErrorMessage
          message={`${error}. Make sure the backend is running on port 3000.`}
        />
      </>
    );
  }

  if (!event) {
    return <NotFound message={`No event exists with the ID "${id}".`} />;
  }

  return (
    <>
      <Link href="/events" className="back-link">
        ← Back to events
      </Link>

      <section className="detail-card">
        <div className="badges">
          <span className="badge">{event.category}</span>
          <span
            className={`badge ${
              event.isPublished ? "badge-published" : "badge-draft"
            }`}
          >
            {event.isPublished ? "Published" : "Draft"}
          </span>
        </div>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <p>📍 {event.location}</p>
        <p>📅 {formatDate(event.eventDate)}</p>
      </section>

      <section>
        <h2 className="section-title">Sessions</h2>
        {sessions.length === 0 ? (
          <div className="state-box">
            <p>No sessions have been scheduled for this event yet.</p>
          </div>
        ) : (
          <div className="session-list">
            {sessions.map((session) => (
              <div className="card" key={session.id}>
                <h3>{session.title}</h3>
                <div className="meta">
                  🕒 {formatDate(session.startsAt)} →{" "}
                  {formatDate(session.endsAt)}
                </div>
                <div className="meta">🚪 Room: {session.room}</div>
                <Link
                  href={`/events/${event.id}/sessions/${session.id}`}
                  className="btn"
                >
                  View Session
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
