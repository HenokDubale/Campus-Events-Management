export default function EmptyState({
  message = "No events found. Check back later!",
}: {
  message?: string;
}) {
  return (
    <div className="state-box">
      <p>{message}</p>
    </div>
  );
}
