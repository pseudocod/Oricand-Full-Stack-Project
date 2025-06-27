package dd.projects.demo.voting.exception;

public class VotingCampaignNotActiveException extends RuntimeException {
    public VotingCampaignNotActiveException(String message) {
        super(message);
    }
} 