package dd.projects.demo.cart.exceptions;

public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(Long id) {
        super("Cart not found with id: " + id);
    }
}
