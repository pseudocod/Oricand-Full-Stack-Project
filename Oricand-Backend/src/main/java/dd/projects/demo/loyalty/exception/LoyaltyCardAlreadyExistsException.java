package dd.projects.demo.loyalty.exception;

public class LoyaltyCardAlreadyExistsException extends RuntimeException {
    public LoyaltyCardAlreadyExistsException(String message) {
        super(message);
    }
} 