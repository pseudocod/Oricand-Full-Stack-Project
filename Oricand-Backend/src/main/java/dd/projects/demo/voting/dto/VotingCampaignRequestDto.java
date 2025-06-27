package dd.projects.demo.voting.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class VotingCampaignRequestDto {
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<VotingOptionRequestDto> options;
} 