package dd.projects.demo.address.exception;

public class UnauthorizedAddressAccessException extends RuntimeException {
    public UnauthorizedAddressAccessException() {
        super("You do not have permission to access this address.");
    }
}
