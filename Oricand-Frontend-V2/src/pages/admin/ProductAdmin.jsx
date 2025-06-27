import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductForm from "../../components/admin/forms/ProductForm";
import ProductCard from "../../components/admin/cards/ProductCard";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import {
  fetchAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../../services/productService";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const handleEdit = (product) => {
    setEditingItem(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(pendingDeleteId);
      toast.success("Product deleted");
      loadProducts();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateProduct(editingItem.id, formData);
        toast.success("Product updated");
      } else {
        await createProduct(formData);
        toast.success("Product created");
      }
      loadProducts();
      setEditingItem(null);
    } catch (err) {
      toast.error("Failed to submit product");
      console.error(err);
    }
  };

  // Calculate stats
  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock > 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-4xl font-light text-gray-900">
          PRODUCT MANAGEMENT
        </h1>
        <p className="text-gray-600">Manage coffee and merchandise products</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Stock</p>
              <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <ProductForm
          onSubmit={handleSubmit}
          editingItem={editingItem}
          onCancel={() => setEditingItem(null)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
          <div className="text-sm text-gray-500">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <ProductCard product={product} onRefresh={loadProducts} />
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => requestDelete(product.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
