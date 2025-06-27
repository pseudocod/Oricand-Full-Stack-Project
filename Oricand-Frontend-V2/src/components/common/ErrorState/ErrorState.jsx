export default function ErrorState({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-red-500">{error}</p>
    </div>
  );
}
``