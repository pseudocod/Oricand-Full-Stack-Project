import { useState, useEffect } from 'react';
import { fetchProductsByCategoryId, fetchAllProducts } from '../services/productService';

export const useProductsByCategory = (categoryId, sortBy = "") => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = categoryId 
                    ? await fetchProductsByCategoryId(categoryId, sortBy)
                    : await fetchAllProducts(sortBy);
                setProducts(data);
            } catch (err) {
                console.error('Failed to load products for category:', err);
                setError('Failed to load products for this category');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [categoryId, sortBy]);

    return { products, loading, error };
}; 