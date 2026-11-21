export default function Loading({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="state-box">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}
