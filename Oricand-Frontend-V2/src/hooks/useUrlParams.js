import { useEffect, useState, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export const useUrlParams = (categories) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSortOption(params.get("sort") || "default");

    const categoryFromUrl = categoryName || "all";
    const selectedCategoryId =
      categoryFromUrl === "all"
        ? "1"
        : categories.find((c) => c.name === categoryFromUrl)?.id.toString() || "1";
    setSelectedCategory(selectedCategoryId);

    const newFilters = {};
    params.forEach((value, key) => {
      if (key.startsWith("filter_")) {
        const attributeName = key.replace("filter_", "");
        newFilters[attributeName] = value.split(",");
      }
    });
    setFilters(newFilters);
  }, [categories, location.search, categoryName]);

  const updateSort = useCallback((value) => {
    const params = new URLSearchParams(location.search);
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [location.search, location.pathname, navigate]);

  const updateCategory = useCallback((categoryId) => {
    const categoryName =
      categoryId === "1"
        ? "all"
        : categories.find((cat) => cat.id === parseInt(categoryId))?.name;
    navigate(`/collections/${categoryName}${location.search}`);
  }, [categories, location.search, navigate]);

  return { 
    sortOption, 
    selectedCategory, 
    filters,
    updateSort,
    updateCategory
  };
};
