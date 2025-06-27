import { useState, useEffect } from "react";

export default function AttributeTypeForm({ onSubmit, editingType, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingType) {
      setName(editingType.name);
    } else {
      setName("");
    }
  }, [editingType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {editingType ? "Update" : "Create"}
        </button>
        {editingType && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
