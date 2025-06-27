package dd.projects.demo.order;

public class GuestOrderValidationException extends RuntimeException {
    public GuestOrderValidationException(String message) {
        super(message);
    }
    
    public static GuestOrderValidationException missingEmail() {
        return new GuestOrderValidationException("Email is required for guest orders");
    }
    
    public static GuestOrderValidationException missingFirstName() {
        return new GuestOrderValidationException("First name is required for guest orders");
    }
    
    public static GuestOrderValidationException missingLastName() {
        return new GuestOrderValidationException("Last name is required for guest orders");
    }
    
    public static GuestOrderValidationException invalidEmail(String email) {
        return new GuestOrderValidationException("Invalid email format: " + email);
    }
} 