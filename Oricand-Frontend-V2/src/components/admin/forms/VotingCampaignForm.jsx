import { useState, useEffect } from "react";

export default function VotingCampaignForm({ onSubmit, editingItem, onCancel }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    options: []
  });

  useEffect(() => {
    if (editingItem) {
      setData({
        title: editingItem.title || "",
        description: editingItem.description || "",
        startDate: editingItem.startDate ? editingItem.startDate.split('T')[0] : "",
        endDate: editingItem.endDate ? editingItem.endDate.split('T')[0] : "",
        options: editingItem.options || []
      });
    } else {
              setData({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          options: []
        });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: data.title,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      options: data.options
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-xl">
      <h2 className="text-2xl font-medium">
        {editingItem ? "✏️ Edit Voting Campaign" : "➕ Add New Voting Campaign"}
      </h2>

      <input
        name="title"
        placeholder="Campaign Title (e.g., 'Choose Our Next Drop')"
        value={data.title}
        onChange={handleChange}
        required
        className="w-full border px-4 py-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Campaign Description"
        value={data.description}
        onChange={handleChange}
        rows={3}
        className="w-full border px-4 py-2 rounded"
      />



      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={data.endDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
      </div>

      {/* Options Management */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Voting Options</h3>
        {data.options.map((option, index) => (
          <div key={index} className="flex gap-2 items-center p-3 border rounded">
            <input
              placeholder="Option name (e.g., TWILIGHT DROP)"
              value={option.name || ""}
              onChange={(e) => {
                const newOptions = [...data.options];
                newOptions[index] = { ...newOptions[index], name: e.target.value };
                setData({ ...data, options: newOptions });
              }}
              className="flex-1 border px-2 py-1 rounded"
            />
            <input
              placeholder="Description"
              value={option.description || ""}
              onChange={(e) => {
                const newOptions = [...data.options];
                newOptions[index] = { ...newOptions[index], description: e.target.value };
                setData({ ...data, options: newOptions });
              }}
              className="flex-1 border px-2 py-1 rounded"
            />
            <button
              type="button"
              onClick={() => {
                const newOptions = data.options.filter((_, i) => i !== index);
                setData({ ...data, options: newOptions });
              }}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setData({
              ...data,
              options: [...data.options, { name: "", description: "", displayOrder: data.options.length }]
            });
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Add Option
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          {editingItem ? "Update Campaign" : "Create Campaign"}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 