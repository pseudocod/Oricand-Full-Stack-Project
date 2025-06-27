package dd.projects.demo.product.image;

import dd.projects.demo.product.Product;
import dd.projects.demo.product.ProductRepository;
import dd.projects.demo.product.exception.ProductNotFoundException;
import dd.projects.demo.product.image.exception.ImageStorageException;
import dd.projects.demo.product.image.exception.InvalidFileTypeException;
import dd.projects.demo.product.image.exception.ProductImageNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProductImageService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    public void uploadImages(Long productId, List<MultipartFile> files) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        Path uploadDir = Paths.get("uploads/products/");
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new ImageStorageException("Failed to create upload directory", e);
        }

        for (MultipartFile file : files) {
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new InvalidFileTypeException("Only image uploads are allowed.");
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filepath = Paths.get("uploads/products/", filename);

            try {
                Files.copy(file.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new ImageStorageException("Failed to store file: " + filename, e);
            }

            ProductImage image = ProductImage.builder()
                    .filename(filename)
                    .url("/uploads/products/" + filename)
                    .product(product)
                    .build();

            productImageRepository.save(image);
        }
    }

    @Transactional
    public void deleteImage(Long productId, Long imageId) {
        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ProductImageNotFoundException(imageId));

        if (!image.getProduct().getId().equals(productId)) {
            throw new IllegalArgumentException("Image does not belong to the given product.");
        }

        try {
            Path path = Paths.get("uploads/products/", image.getFilename());
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new ImageStorageException("Failed to delete image from disk", e);
        }

        productImageRepository.delete(image);
    }

    @Transactional
    public void setFeaturedImage(Long productId, Long imageId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        ProductImage image = productImageRepository.findById(imageId)
                .orElseThrow(() -> new ProductImageNotFoundException(imageId));

        if (!image.getProduct().getId().equals(productId)) {
            throw new IllegalArgumentException("Image does not belong to the given product.");
        }

        product.getImages().forEach(img -> img.setFeatured(false));

        image.setFeatured(true);

        productImageRepository.saveAll(product.getImages());
    }

}
