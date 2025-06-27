package dd.projects.demo.product.image.exception;

public class ProductImageNotFoundException extends RuntimeException {
    public ProductImageNotFoundException(Long id) {
        super("Product image with ID " + id + " not found.");
    }
}
