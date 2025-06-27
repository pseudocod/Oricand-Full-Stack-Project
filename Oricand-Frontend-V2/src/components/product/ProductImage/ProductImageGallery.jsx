import toast from "react-hot-toast";
import {
  deleteProductImage,
  setFeaturedImage,
} from "../../../services/productService";

export default function ProductImageGallery({ productId, images, onRefresh }) {
  const handleDeleteImage = async (imageId) => {
    try {
      await deleteProductImage(productId, imageId);
      toast.success("Image deleted");
      onRefresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSetFeatured = async (imageId) => {
    try {
      await setFeaturedImage(productId, imageId);
      toast.success("Featured image updated");
      onRefresh();
    } catch {
      toast.error("Failed to update featured image");
    }
  };

  return (
    <div className="flex gap-4 flex-wrap mb-4">
      {images.map((img) => (
        <div
          key={img.id}
          className={`relative border rounded overflow-hidden w-32 h-32 ${
            img.featured ? "ring-4 ring-black" : ""
          }`}
        >
          <img
            src={`${import.meta.env.VITE_MEDIA_URL}${img.url}`}
            alt="Product"
            className="object-cover w-full h-full"
          />
          <button
            onClick={() => handleDeleteImage(img.id)}
            className="absolute top-0 right-0 text-xs bg-red-600 text-white px-1 cursor-pointer"
          >
            ✕
          </button>
          {!img.featured && (
            <button
              onClick={() => handleSetFeatured(img.id)}
              className="absolute bottom-0 left-0 text-xs bg-black text-white px-1 cursor-pointer"
            >
              Feature
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
