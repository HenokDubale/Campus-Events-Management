"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/services/eventService";

const CATEGORIES = ["technology", "career", "sports", "cultural", "general"];

interface FormState {
  title: string;
  description: string;
  location: string;
  eventDate: string;
  category: string;
  isPublished: boolean;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  location: "",
  eventDate: "",
  category: "",
  isPublished: false,
};

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.description.trim()) next.description = "Description is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.eventDate) next.eventDate = "Event date and time are required.";
    if (!form.category.trim()) next.category = "Please choose a category.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser's default form submission
    setServerError(null);
    setSuccess(false);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const created = await createEvent({
        title: form.title.trim(),
        description: form.description.trim(),
        location: form.location.trim(),
        eventDate: new Date(form.eventDate).toISOString(),
        category: form.category.trim().toLowerCase(),
        isPublished: form.isPublished,
      });

      setSuccess(true);
      setForm(EMPTY_FORM);

      // Refresh cached data, then go to the new event's page.
      router.refresh();
      setTimeout(() => router.push(`/events/${created.id}`), 1200);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Could not create the event.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h1 className="section-title" style={{ textAlign: "center" }}>
        Create Event
      </h1>

      <form className="form" onSubmit={handleSubmit} noValidate>
        {success && (
          <div className="alert alert-success">
            ✅ Event created successfully! Redirecting...
          </div>
        )}
        {serverError && (
          <div className="alert alert-error">⚠️ {serverError}</div>
        )}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
          />
          {errors.location && (
            <span className="field-error">{errors.location}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event date and time</label>
          <input
            id="eventDate"
            type="datetime-local"
            value={form.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
          />
          {errors.eventDate && (
            <span className="field-error">{errors.eventDate}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <input
            id="isPublished"
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => update("isPublished", e.target.checked)}
          />
          <label htmlFor="isPublished">Publish this event</label>
        </div>

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </>
  );
}
