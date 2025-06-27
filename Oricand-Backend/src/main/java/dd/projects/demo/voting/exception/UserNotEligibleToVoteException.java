package dd.projects.demo.voting.exception;

public class UserNotEligibleToVoteException extends RuntimeException {
    public UserNotEligibleToVoteException(String message) {
        super(message);
    }
} 