import { useCategories } from "../hooks/useCategories";
import { useUrlParams } from "../hooks/useUrlParams";
import ProductsGrid from "../components/product/ProductsGrid";
import ProductFilter from "../components/product/ProductFilter";
import ActiveFilters from "../components/product/ActiveFilters";
import ErrorState from "../components/common/ErrorState/ErrorState";
import { useProductsByCategory } from "../hooks/useProductsByCategory";
import LoadingState from "../components/common/LoadingState/LoadingState";
import Logo from "../components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

export default function AllProducts() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const { sortOption, selectedCategory, filters, updateSort, updateCategory } =
    useUrlParams(categories);

  const {
    products: finalProducts,
    loading: productsLoading,
    error: productsError,
  } = useProductsByCategory(
    selectedCategory !== "1" ? selectedCategory : null,
    sortOption === "default" ? "" : sortOption
  );

  const selectedCategoryObj = categories.find(
    (cat) => cat.id === parseInt(selectedCategory)
  );

  if (productsLoading || categoriesLoading) {
    return <LoadingState />;
  }

  if (productsError || categoriesError) {
    return <ErrorState error={productsError || categoriesError} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-offwhite"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="min-h-[60vh] bg-cover bg-center bg-no-repeat flex flex-col justify-between"
        style={{
          backgroundImage: `url(${
            selectedCategory === "1"
              ? "/src/assets/images/all-products.jpg"
              : `${import.meta.env.VITE_MEDIA_URL}${selectedCategoryObj?.coverImageUrl}`
          })`,
        }}
      >
        <div className="px-6 md:px-12 pt-12">
          <Logo />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(filters)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-6 md:px-12"
          >
            <ActiveFilters filters={filters} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-end px-6 md:px-12 pb-8 md:pb-12"
        >
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            sortOption={sortOption}
            onCategoryChange={updateCategory}
            onSortChange={updateSort}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 md:px-12 py-5"
      >
        <div className="mb-16">
          <div className="inline-flex items-start gap-4 text-gray-900">
            <motion.h1
              key={selectedCategory}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-8xl xl:text-9xl font-semibold tracking-normal whitespace-nowrap"
            >
              {selectedCategory === "1"
                ? "ALL PRODUCTS"
                : selectedCategoryObj?.name.toUpperCase()}
            </motion.h1>
            <motion.span
              key={finalProducts.length}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-light"
            >
              {finalProducts.length}
            </motion.span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sortOption + selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ProductsGrid
              products={finalProducts}
              categoryName={selectedCategoryObj?.name}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
