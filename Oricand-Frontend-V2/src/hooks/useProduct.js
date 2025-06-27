import { useState, useEffect } from 'react';
import { fetchProductById } from '../services/productService';

export const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (err) {
                console.error('Failed to load product:', err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    return { product, loading, error };
}; 