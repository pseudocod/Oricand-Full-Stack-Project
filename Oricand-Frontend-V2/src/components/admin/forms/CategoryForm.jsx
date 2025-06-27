import { useState, useEffect, useRef } from "react";

export default function CategoryForm({ onSubmit, editingItem, onCancel }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    theme: "",
    releaseDate: "",
    label: "",
    phrase: "",
    coverImage: null,
    teaserVideo: null,
  });

  const imageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (editingItem) {
      setData({
        name: editingItem.name,
        description: editingItem.description,
        theme: editingItem.theme || "",
        releaseDate: editingItem.releaseDate || "",
        label: editingItem.label || "",
        phrase: editingItem.phrase || "",
        coverImage: null,
        teaserVideo: null,
      });
    } else {
      setData({
        name: "",
        description: "",
        theme: "",
        releaseDate: "",
        label: "",
        phrase: "",
        coverImage: null,
        teaserVideo: null,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("theme", data.theme);
    formData.append("releaseDate", data.releaseDate);
    formData.append("label", data.label);
    formData.append("phrase", data.phrase);

    if (data.coverImage) formData.append("coverImage", data.coverImage);
    if (data.teaserVideo) formData.append("teaserVideo", data.teaserVideo);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-xl">
      <h2 className="text-2xl font-medium">
        {editingItem ? "✏️ Edit Category" : "➕ Add New Category"}
      </h2>

      <input
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
        className="w-full border px-4 py-2 rounded"
      />

      <input
        name="description"
        placeholder="Description"
        value={data.description}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <input
        name="theme"
        placeholder="Theme"
        value={data.theme}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <input
        type="date"
        name="releaseDate"
        value={data.releaseDate}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <input
        name="label"
        placeholder="Label (optional)"
        value={data.label}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <input
        name="phrase"
        placeholder="Phrase (optional)"
        value={data.phrase}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <div className="flex flex-col gap-2">
        <label>Cover Image</label>
        <input
          type="file"
          name="coverImage"
          ref={imageRef}
          onChange={handleChange}
          accept="image/*"
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Teaser Video</label>
        <input
          type="file"
          name="teaserVideo"
          ref={videoRef}
          onChange={handleChange}
          accept="video/*"
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          {editingItem ? "Update" : "Create"}
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
