import { useState, useEffect } from 'react';
import { fetchCategoryById } from '../services/categoryService';

export const useCategory = (categoryId) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategory = async () => {
            try {
                setLoading(true);
                const data = await fetchCategoryById(categoryId);
                setCategory(data);
            } catch (err) {
                console.error('Failed to load category:', err);
                setError('Failed to load category');
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            loadCategory();
        }
    }, [categoryId]);

    return { category, loading, error };
}; 