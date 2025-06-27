package dd.projects.demo.order;

public class InvalidOrderStatusTransitionException extends RuntimeException {
    public InvalidOrderStatusTransitionException(String message) {
        super(message);
    }
    
    public static InvalidOrderStatusTransitionException fromDeliveredToPending() {
        return new InvalidOrderStatusTransitionException(
            "Cannot change status from DELIVERED back to PENDING"
        );
    }
    
    public static InvalidOrderStatusTransitionException fromCancelledToOther(OrderStatus attemptedStatus) {
        return new InvalidOrderStatusTransitionException(
            "Cannot change status of a cancelled order to " + attemptedStatus
        );
    }
    
    public static InvalidOrderStatusTransitionException invalidTransition(OrderStatus from, OrderStatus to) {
        return new InvalidOrderStatusTransitionException(
            String.format("Invalid status transition from %s to %s", from, to)
        );
    }
} 