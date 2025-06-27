import { useState } from "react";
import { uploadProductImages } from "../../../services/productService";
import toast from "react-hot-toast";

export default function ImageUploadInput({ productId, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const invalidFile = files.find((file) => !file.type.startsWith("image/"));
    if (invalidFile) {
      toast.error(`Invalid file: ${invalidFile.name}`);
      return;
    }

    setUploading(true);
    try {
      await uploadProductImages(productId, files);
      toast.success("Images uploaded");
      onUploadComplete?.();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        id={`image-upload-${productId}`}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        disabled={uploading}
        className="hidden"
      />

      <label
        htmlFor={`image-upload-${productId}`}
        className={`block w-full border px-3 py-2 rounded text-center cursor-pointer select-none
          ${
            uploading
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-offwhite hover:bg-gray-50"
          }`}
      >
        {uploading ? "Uploading..." : "Choose Images"}
      </label>
    </div>
  );
}
