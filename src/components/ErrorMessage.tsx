export default function ErrorMessage({
  message = "Something went wrong. Please try again.",
}: {
  message?: string;
}) {
  return (
    <div className="state-box state-error">
      <h3>⚠️ Oops!</h3>
      <p>{message}</p>
    </div>
  );
}
