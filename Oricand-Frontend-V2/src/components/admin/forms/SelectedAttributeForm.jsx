import { useState, useEffect } from "react";

export default function SelectedAttributeForm({
  onSubmit,
  editingItem,
  onCancel,
  attributeTypes,
  attributeOptions,
}) {
  const [attributeId, setAttributeId] = useState("");
  const [valueId, setValueId] = useState("");

  useEffect(() => {
    if (editingItem) {
      setAttributeId(editingItem.attributeId);
      setValueId(editingItem.valueId);
    } else {
      setAttributeId("");
      setValueId("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!attributeId || !valueId) return;

    onSubmit({
      attributeId: Number(attributeId),
      valueId: Number(valueId),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex gap-4">
        <select
          value={attributeId}
          onChange={(e) => setAttributeId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="">Select Attribute Type</option>
          {attributeTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <select
          value={valueId}
          onChange={(e) => setValueId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="">Select Attribute Option</option>
          {attributeOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.value}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {editingItem ? "Update" : "Create"}
        </button>
        {editingItem && (
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
