package dd.projects.demo.voting.dto;

import lombok.Data;

@Data
public class VotingOptionResponseDto {
    private Long id;
    private String name;
    private String description;
    private Integer displayOrder;
    private int voteCount;
    private double percentage;
} 