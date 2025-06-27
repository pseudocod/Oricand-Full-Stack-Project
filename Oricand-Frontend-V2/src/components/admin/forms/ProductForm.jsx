import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchAllCategories } from "../../../services/categoryService";
import { fetchSelectedAttributes } from "../../../services/selectedAttributeService";

export default function ProductForm({ onSubmit, editingItem, onCancel }) {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    availableQuantity: "",
    categoryId: "",
    selectedAttributeIds: [],
  });

  const [categories, setCategories] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [cats, attrs] = await Promise.all([
          fetchAllCategories(),
          fetchSelectedAttributes(),
        ]);
        setCategories(cats);
        setSelectedAttributes(attrs);
      } catch {
        toast.error("Failed to load categories or attributes");
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    if (editingItem) {
      setData({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price,
        availableQuantity: editingItem.availableQuantity,
        categoryId: editingItem.categoryId?.toString() || "",
        selectedAttributeIds: editingItem.attributes?.map((a) => a.id) || [],
      });
    } else {
      setData({
        name: "",
        description: "",
        price: "",
        availableQuantity: "",
        categoryId: "",
        selectedAttributeIds: [],
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleAttribute = (id) => {
    setData((prev) => ({
      ...prev,
      selectedAttributeIds: prev.selectedAttributeIds.includes(id)
        ? prev.selectedAttributeIds.filter((x) => x !== id)
        : [...prev.selectedAttributeIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...data,
        price: parseFloat(data.price),
        availableQuantity: parseInt(data.availableQuantity),
        categoryId: Number(data.categoryId),
      };

      await onSubmit(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 space-y-6 max-w-xl">
      <h2 className="text-2xl font-medium">
        {editingItem ? "✏️ Edit Product" : "➕ Add New Product"}
      </h2>

      <div className="space-y-2">
        <input
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="availableQuantity"
          type="number"
          placeholder="Quantity"
          value={data.availableQuantity}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="categoryId"
          value={data.categoryId}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Attributes</label>
        <div className="flex flex-wrap gap-2">
          {selectedAttributes.map((attr) => (
            <label key={attr.id} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={data.selectedAttributeIds.includes(attr.id)}
                onChange={() => toggleAttribute(attr.id)}
              />
              {attr.attributeName}: {attr.value}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-richblack text-offwhite px-4 py-2 rounded hover:bg-offwhite hover:text-richblack border transition cursor-pointer"
        >
          {loading
            ? editingItem
              ? "Updating..."
              : "Creating..."
            : editingItem
            ? "Update Product"
            : "Create Product"}
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
