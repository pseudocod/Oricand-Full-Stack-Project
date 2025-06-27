package dd.projects.demo.order;

public class OrderCancellationException extends RuntimeException {
    public OrderCancellationException(String message) {
        super(message);
    }
    
    public static OrderCancellationException forInvalidStatus(OrderStatus currentStatus) {
        return new OrderCancellationException(
            "Order cannot be cancelled. Current status: " + currentStatus + 
            ". Orders can only be cancelled when status is PENDING."
        );
    }
    
    public static OrderCancellationException forUnauthorizedAccess(Long orderId) {
        return new OrderCancellationException(
            "You are not authorized to cancel order with ID: " + orderId
        );
    }
} 