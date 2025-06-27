package dd.projects.demo.voting.dto;

import lombok.Data;

@Data
public class VoteRequestDto {
    private Long campaignId;
    private Long optionId;
} 