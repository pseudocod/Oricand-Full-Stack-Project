package dd.projects.demo.voting.exception;

public class VotingOptionNotFoundException extends RuntimeException {
    public VotingOptionNotFoundException(String message) {
        super(message);
    }
} 