import Link from "next/link";
import { getEventById, getSessionById } from "@/services/eventService";
import { formatDate } from "@/components/EventCard";
import ErrorMessage from "@/components/ErrorMessage";
import NotFound from "@/components/NotFound";
import type { Event, Session } from "@/types/event";

export const dynamic = "force-dynamic";

export default async function SessionDetailsPage({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const { id, sessionId } = await params;

  let event: Event | null = null;
  let session: Session | null = null;
  let error: string | null = null;

  try {
    [event, session] = await Promise.all([
      getEventById(id),
      getSessionById(id, sessionId),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load the session.";
  }

  if (error) {
    return (
      <>
        <Link href={`/events/${id}`} className="back-link">
          ← Back to event
        </Link>
        <ErrorMessage
          message={`${error}. Make sure the backend is running on port 3000.`}
        />
      </>
    );
  }

  if (!event || !session) {
    return <NotFound message="This session could not be found." />;
  }

  return (
    <>
      <Link href={`/events/${event.id}`} className="back-link">
        ← Back to {event.title}
      </Link>

      <section className="detail-card">
        <h1>{session.title}</h1>
        <p>🕒 Starts: {formatDate(session.startsAt)}</p>
        <p>🕔 Ends: {formatDate(session.endsAt)}</p>
        <p>🚪 Room: {session.room}</p>
      </section>

      <section className="detail-card">
        <h2 className="section-title">Related Event</h2>
        <div className="badges">
          <span className="badge">{event.category}</span>
        </div>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>📍 {event.location}</p>
        <p>📅 {formatDate(event.eventDate)}</p>
        <Link
          href={`/events/${event.id}`}
          className="btn"
          style={{ marginTop: "0.75rem" }}
        >
          View Full Event
        </Link>
      </section>
    </>
  );
}
