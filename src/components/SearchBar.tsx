"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="filters" style={{ gridTemplateColumns: "1fr" }}>
      <div>
        <label htmlFor="search">Search by title</label>
        <input
          id="search"
          type="text"
          placeholder="🔍 Search events..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
