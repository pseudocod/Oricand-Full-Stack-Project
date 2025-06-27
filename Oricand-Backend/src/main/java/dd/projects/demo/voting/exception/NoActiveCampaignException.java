package dd.projects.demo.voting.exception;

public class NoActiveCampaignException extends RuntimeException {
    public NoActiveCampaignException(String message) {
        super(message);
    }
} 