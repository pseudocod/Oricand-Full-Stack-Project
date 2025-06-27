import { useState, useEffect } from 'react';
import { fetchAllCategories } from '../services/categoryService';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                console.log('Categories API response:', data);
                // Ensure data is an array before setting it
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error('Categories data is not an array:', data);
                    setError('Invalid categories data format');
                }
                setLoading(false);
            } catch (err) {
                console.error('Failed to load categories:', err);
                setError('Failed to load categories');
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    return { categories, loading, error };
}; 