package dd.projects.demo.contact.exception;

public class ContactMessageNotFoundException extends RuntimeException {
    public ContactMessageNotFoundException(String message) {
        super(message);
    }
} 