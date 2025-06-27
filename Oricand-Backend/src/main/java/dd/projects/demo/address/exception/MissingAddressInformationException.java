package dd.projects.demo.address.exception;

public class MissingAddressInformationException extends RuntimeException {
    public MissingAddressInformationException() {
        super("Either addressId or address must be provided.");
    }
}

