import { useState, useEffect } from "react";

export default function AttributeOptionForm({
  onSubmit,
  editingOption,
  onCancel,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (editingOption) {
      setValue(editingOption.value || "");
    } else {
      setValue("");
    }
  }, [editingOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    onSubmit({ 
      value: value.trim()
    });
    
    if (!editingOption) {
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Attribute value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!value.trim()}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {editingOption ? "Update" : "Create"}
        </button>
        {editingOption && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
