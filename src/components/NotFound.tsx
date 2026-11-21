import Link from "next/link";

export default function NotFound({
  message = "We could not find what you were looking for.",
}: {
  message?: string;
}) {
  return (
    <div className="state-box">
      <h2>🔍 Not Found</h2>
      <p>{message}</p>
      <Link href="/events" className="btn" style={{ marginTop: "1rem" }}>
        Back to Events
      </Link>
    </div>
  );
}
