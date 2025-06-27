package dd.projects.demo.security.exception;

public class InvalidRefreshTokenException extends RuntimeException {

    public InvalidRefreshTokenException(String message) {
        super(message);
    }

    public InvalidRefreshTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public static InvalidRefreshTokenException invalidToken() {
        return new InvalidRefreshTokenException("Invalid refresh token format");
    }

    public static InvalidRefreshTokenException tokenNotFound() {
        return new InvalidRefreshTokenException("Refresh token not found");
    }

    public static InvalidRefreshTokenException tokenExpired() {
        return new InvalidRefreshTokenException("Refresh token has expired");
    }

    public static InvalidRefreshTokenException tokenRevoked() {
        return new InvalidRefreshTokenException("Refresh token has been revoked");
    }

    public static InvalidRefreshTokenException wrongTokenType() {
        return new InvalidRefreshTokenException("Token is not a valid refresh token");
    }
} 