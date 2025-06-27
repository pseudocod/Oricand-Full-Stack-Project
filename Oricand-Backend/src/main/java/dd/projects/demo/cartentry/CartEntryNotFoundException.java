package dd.projects.demo.cartentry;

public class CartEntryNotFoundException extends RuntimeException {
    public CartEntryNotFoundException(Long id) {
        super("Cart entry not found with id: " + id);
    }
}
