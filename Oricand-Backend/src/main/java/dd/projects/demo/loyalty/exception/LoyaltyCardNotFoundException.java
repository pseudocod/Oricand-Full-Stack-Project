package dd.projects.demo.loyalty.exception;

public class LoyaltyCardNotFoundException extends RuntimeException {
    public LoyaltyCardNotFoundException(String message) {
        super(message);
    }
} 