package dd.projects.demo.product.image;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/images")
@RequiredArgsConstructor
public class ProductImageController {

    private final ProductImageService productImageService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> uploadImages(
            @PathVariable Long productId,
            @RequestParam("files") List<MultipartFile> files) {
        productImageService.uploadImages(productId, files);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{imageId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteImage(
            @PathVariable Long productId,
            @PathVariable Long imageId) {
        productImageService.deleteImage(productId, imageId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{imageId}/feature")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> setFeaturedImage(
            @PathVariable Long productId,
            @PathVariable Long imageId) {
        productImageService.setFeaturedImage(productId, imageId);
        return ResponseEntity.noContent().build();
    }
}
