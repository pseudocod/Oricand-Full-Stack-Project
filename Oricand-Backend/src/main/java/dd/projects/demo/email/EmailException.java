package dd.projects.demo.email;

public class EmailException extends RuntimeException {
    public EmailException(String message) {
        super(message);
    }

    public EmailException(String message, Throwable cause) {
        super(message, cause);
    }

    public static EmailException templateNotFound(String templateName) {
        return new EmailException("Email template not found: " + templateName);
    }

    public static EmailException sendingFailed(String recipient, Throwable cause) {
        return new EmailException("Failed to send email to: " + recipient, cause);
    }
} 