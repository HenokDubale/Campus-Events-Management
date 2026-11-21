"use client";

export interface FilterValues {
  category: string;
  location: string;
  isPublished: string; // "" | "true" | "false"
  sortBy: "eventDate" | "title";
  order: "asc" | "desc";
}

interface EventFiltersProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
}

const CATEGORIES = ["technology", "career", "sports", "cultural"];

export default function EventFilters({ filters, onChange }: EventFiltersProps) {
  function update<K extends keyof FilterValues>(
    key: K,
    value: FilterValues[K],
  ) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="filters">
      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          placeholder="e.g. Sports Hall"
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.isPublished}
          onChange={(e) => update("isPublished", e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>
      </div>

      <div>
        <label htmlFor="sortBy">Sort by</label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(e) =>
            update("sortBy", e.target.value as FilterValues["sortBy"])
          }
        >
          <option value="eventDate">Event date</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div>
        <label htmlFor="order">Order</label>
        <select
          id="order"
          value={filters.order}
          onChange={(e) =>
            update("order", e.target.value as FilterValues["order"])
          }
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
