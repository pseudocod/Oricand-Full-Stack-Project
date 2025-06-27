export default function CategoryRow({ category, onEdit, onDelete }) {
  return (
    <div className="flex items-end justify-between border-b py-3">
      <div>
        <div className="font-semibold">{category.name}</div>
        <div className="text-sm text-gray-500">{category.description}</div>
        {category.coverImageUrl && (
          <img
            src={import.meta.env.VITE_MEDIA_URL + category.coverImageUrl}
            alt="Cover"
            className="h-50 w-auto mt-2 shadow"
          />
        )}
        {category.teaserVideoUrl && (
          <video
            src={import.meta.env.VITE_MEDIA_URL + category.teaserVideoUrl}
            controls
            className="w-48 mt-2 shadow"
          />
        )}
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-black text-white rounded-xs hover:bg-gray-600 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-xs hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
