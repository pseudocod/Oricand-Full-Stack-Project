package dd.projects.demo.address.exception;

public class AddressNotFoundException extends RuntimeException {
    public AddressNotFoundException(Long id) {
        super("Address with ID " + id + " not found.");
    }
}
