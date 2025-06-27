import { useState, useEffect } from "react";

export default function VotingOptionForm({ onSubmit, editingItem, onCancel }) {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (editingItem) {
      setData({
        name: editingItem.name || "",
        description: editingItem.description || "",
      });
    } else {
      setData({
        name: "",
        description: "",
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3 max-w-lg border-l-4 border-blue-500 pl-4">
      <h3 className="text-lg font-medium">
        {editingItem ? "✏️ Edit Voting Option" : "➕ Add New Voting Option"}
      </h3>

      <input
        name="name"
        placeholder="Option Name (e.g., 'TWILIGHT DROP')"
        value={data.name}
        onChange={handleChange}
        required
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <textarea
        name="description"
        placeholder="Option Description"
        value={data.description}
        onChange={handleChange}
        rows={2}
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 cursor-pointer"
        >
          {editingItem ? "Update Option" : "Add Option"}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 