"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/services/eventService";
import type { PaginatedEvents } from "@/types/event";
import EventCard from "@/components/EventCard";
import EventFilters, { type FilterValues } from "@/components/EventFilters";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";

const PAGE_SIZE = 6;

export default function EventsPage() {
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    location: "",
    isPublished: "",
    sortBy: "eventDate",
    order: "asc",
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<PaginatedEvents | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from the API whenever the filters or the page change.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Small delay so we don't call the API on every keystroke in "location".
    const timer = setTimeout(async () => {
      try {
        const result = await getEvents({ ...filters, page, limit: PAGE_SIZE });
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load events.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filters, page]);

  function handleFilterChange(next: FilterValues) {
    setFilters(next);
    setPage(1); // go back to page 1 when a filter changes
  }

  // Frontend-only title search on the events already fetched.
  const visibleEvents =
    data?.items.filter((e) =>
      e.title.toLowerCase().includes(search.trim().toLowerCase()),
    ) ?? [];

  return (
    <>
      <h1 className="section-title">All Events</h1>

      <SearchBar value={search} onChange={setSearch} />
      <EventFilters filters={filters} onChange={handleFilterChange} />

      {loading ? (
        <Loading message="Loading events..." />
      ) : error ? (
        <ErrorMessage
          message={`${error}. Make sure the backend is running on port 3000.`}
        />
      ) : visibleEvents.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid">
            {visibleEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Pagination
            page={data?.page ?? 1}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
}
