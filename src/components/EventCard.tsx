import Link from "next/link";
import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="card">
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

      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <div className="meta">📍 {event.location}</div>
      <div className="meta">📅 {formatDate(event.eventDate)}</div>

      <Link href={`/events/${event.id}`} className="btn">
        View Details
      </Link>
    </article>
  );
}
