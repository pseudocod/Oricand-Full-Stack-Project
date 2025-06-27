export default function AdminRow({ label, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <span>{label}</span>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-600 text-sm cursor-pointer hover:underline hover:text-blue-800 transition-all"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 text-sm cursor-pointer hover:underline hover:text-red-800 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
