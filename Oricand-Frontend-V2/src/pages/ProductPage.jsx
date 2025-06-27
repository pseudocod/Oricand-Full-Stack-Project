import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCategory } from "../hooks/useCategory";
import AddToCartBar from "../components/product/AddToCartBar";
import { useRef, useState, useEffect } from "react";
import CategoryPreview from "../components/category/CategoryPreview";
import ProductAttributes from "../components/product/ProductAttributes/ProductAttributes";
import ProductDescription from "../components/product/ProductDescription";
import ProductHero from "../components/product/ProductHero";
import Logo from "../components/ui/Logo";

export default function ProductPage() {
  const { productId } = useParams();
  const { product, loading: productLoading } = useProduct(productId);
  const { category, loading: categoryLoading } = useCategory(
    product?.categoryId
  );
  const [quantity, setQuantity] = useState(1);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const addToCartRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!addToCartRef.current) return;
      const { bottom } = addToCartRef.current.getBoundingClientRect();
      setShowFloatingBar(bottom < 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (productLoading || categoryLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-lg animate-pulse">Loading Product...</div>
      </div>
    );
  }

  const featuredImage =
    product.images.find((img) => img.featured) || product.images[0];

  const groupedAttributes = product.attributes.reduce((acc, attr) => {
    if (!acc[attr.attributeName]) acc[attr.attributeName] = [];
    acc[attr.attributeName].push(attr.value);
    return acc;
  }, {});

  const descriptionLines = product.description.split("\n").slice(1);

  return (
    <>
      <div className="text-black">
        {showFloatingBar && (
          <div className="fixed bottom-0 left-0 w-full z-50">
            <AddToCartBar product={product} />
          </div>
        )}

        <ProductHero
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          addToCartRef={addToCartRef}
          featuredImage={featuredImage}
        />

        <ProductAttributes groupedAttributes={groupedAttributes} />

        <ProductDescription descriptionLines={descriptionLines} />

        {category && (
          <CategoryPreview
            categoryName={category.name}
            categoryId={category.id}
            videoUrl={
              category.teaserVideoUrl
                ? `${import.meta.env.VITE_MEDIA_URL}${category.teaserVideoUrl}`
                : null
            }
          />
        )}
      </div>
    </>
  );
}
