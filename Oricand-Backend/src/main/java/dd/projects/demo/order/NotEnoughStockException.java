package dd.projects.demo.order;

public class NotEnoughStockException extends RuntimeException {
    public NotEnoughStockException(String productName, Integer availableStock) {
        super("Not enough stock for product: " + productName
                + ". Available stock: " + availableStock);
    }
}
