package dd.projects.demo.user.exception;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }
    
    public static InvalidTokenException expired() {
        return new InvalidTokenException("Password reset token has expired");
    }
    
    public static InvalidTokenException notFound() {
        return new InvalidTokenException("Invalid password reset token");
    }
    
    public static InvalidTokenException alreadyUsed() {
        return new InvalidTokenException("Password reset token has already been used");
    }
} 