package dd.projects.demo.voting.dto;

import dd.projects.demo.voting.VotingStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class VotingCampaignResponseDto {
    
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private VotingStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<VotingOptionResponseDto> options;
    private int totalVotes;
    private boolean active;
    private boolean hasEnded;
    
    // User-specific fields (only populated when user is authenticated)
    private boolean userHasVoted;
    private Long userVotedOptionId;
} 