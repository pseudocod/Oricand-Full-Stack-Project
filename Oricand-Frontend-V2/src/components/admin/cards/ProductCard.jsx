import ProductImageGallery from "../../product/ProductImage/ProductImageGallery";
import ImageUploadInput from "../inputs/ImageUploadInput";

export default function ProductCard({ product, onRefresh }) {
  return (
    <>
      <h2 className="text-xl font-medium mb-4">{product.name}</h2>
      <ProductImageGallery
        productId={product.id}
        images={product.images}
        onRefresh={onRefresh}
      />
      <ImageUploadInput productId={product.id} onUploadComplete={onRefresh} />
    </>
  );
}
