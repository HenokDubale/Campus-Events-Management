import Link from "next/link";
import { getUpcomingEvents } from "@/services/eventService";
import EventCard from "@/components/EventCard";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import type { Event } from "@/types/event";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let events: Event[] = [];
  let error: string | null = null;

  try {
    events = await getUpcomingEvents();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load events.";
  }

  return (
    <>
      <section className="hero">
        <h1>Discover What&apos;s Happening on Campus</h1>
        <p>Find workshops, technology events and activities.</p>
        <Link href="/events" className="btn">
          Explore Events
        </Link>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Upcoming Events</h2>
          <Link href="/events" className="btn btn-outline">
            View All Events
          </Link>
        </div>

        {error ? (
          <ErrorMessage
            message={`${error}. Make sure the backend is running on port 3000.`}
          />
        ) : events.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
