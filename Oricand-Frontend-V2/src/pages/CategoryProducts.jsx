import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useCategory } from "../hooks/useCategory";
import { themeConfig } from "../config/themeConfig";
import CategoryVisualIntro from "../components/category/CategoryVisualIntro";
import ProductsGrid from "../components/product/ProductsGrid";
import ProductDescription from "../components/product/ProductDescription";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const { products, loading: productsLoading } =
    useProductsByCategory(categoryId);
  const { category, loading: categoryLoading } = useCategory(categoryId);

  if (productsLoading || categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-lg animate-pulse">Loading Drop...</div>
      </div>
    );
  }

  if (!category) return null;

  const theme = themeConfig[category.theme] || themeConfig.default;

  return (
    <div className={`min-h-screen bg-offwhite ${theme.gradient}`}>
      <CategoryVisualIntro category={category} />
      <ProductDescription descriptionLines={category.description.split("\n")} />
      <ProductsGrid products={products} categoryName={category.name} />
    </div>
  );
}
