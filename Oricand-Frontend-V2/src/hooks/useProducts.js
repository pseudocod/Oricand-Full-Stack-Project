import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchProductsByCategoryId,
  updateProduct,
} from "../services/productService";

export default function useProducts(categoryId = null, sortBy = "") {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = categoryId 
        ? await fetchProductsByCategoryId(categoryId, sortBy)
        : await fetchAllProducts(sortBy);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [categoryId, sortBy]);

  useEffect(() => {
    load();
  }, [load]);

  /** → POST */
  const add = async (payload) => {
    await createProduct(payload);
    toast.success("Product created");
    load();
  };

  /** → PUT */
  const edit = async (id, payload) => {
    await updateProduct(id, payload);
    toast.success("Product updated");
    load();
  };

  /** → DELETE */
  const remove = async (id) => {
    await deleteProduct(id);
    toast.success("Product deleted");
    load();
  };

  return { products, loading, error, add, edit, remove };
}
