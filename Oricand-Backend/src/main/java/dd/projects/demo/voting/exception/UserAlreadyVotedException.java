package dd.projects.demo.voting.exception;

public class UserAlreadyVotedException extends RuntimeException {
    public UserAlreadyVotedException(String message) {
        super(message);
    }
} 