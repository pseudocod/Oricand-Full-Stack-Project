package dd.projects.demo.voting.dto;

import lombok.Data;

@Data
public class VotingOptionRequestDto {
    private String name;
    private String description;
    private Integer displayOrder;
} 