package dd.projects.demo.voting.exception;

public class VotingCampaignNotFoundException extends RuntimeException {
    public VotingCampaignNotFoundException(String message) {
        super(message);
    }
} 