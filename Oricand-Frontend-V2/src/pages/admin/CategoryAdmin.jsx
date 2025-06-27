import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";
import CategoryForm from "../../components/admin/forms/CategoryForm";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AdminRow from "../../components/admin/rows/AdminRow";
import CategoryRow from "../../components/admin/rows/CategoryRow";

export default function CategoryAdmin() {
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchAllCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingItem) {
        await updateCategory(editingItem.id, formData);
        toast.success("Category updated");
      } else {
        await createCategory(formData);
        toast.success("Category created");
      }
      setEditingItem(null);
      loadCategories();
    } catch {
      toast.error("Save failed");
    }
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(pendingDeleteId);
      toast.success("Category deleted");
      loadCategories();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  const stats = {
    total: categories.length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-4xl font-light text-gray-900">
          CATEGORY MANAGEMENT
        </h1>
        <p className="text-gray-600">Define drops and thematic collections</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-4 border border-gray-200 rounded-lg w-full max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <CategoryForm
          onSubmit={handleCreateOrUpdate}
          editingItem={editingItem}
          onCancel={() => setEditingItem(null)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All Categories</h2>
          <div className="text-sm text-gray-500">
            Showing {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No categories found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <CategoryRow
                  category={cat}
                  onEdit={() => setEditingItem(cat)}
                  onDelete={() => requestDelete(cat.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this category?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
