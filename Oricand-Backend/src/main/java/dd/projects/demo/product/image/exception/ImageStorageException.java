package dd.projects.demo.product.image.exception;

public class ImageStorageException extends RuntimeException {
    public ImageStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
