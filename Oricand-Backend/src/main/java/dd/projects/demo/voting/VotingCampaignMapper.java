package dd.projects.demo.voting;

import dd.projects.demo.voting.dto.VotingCampaignRequestDto;
import dd.projects.demo.voting.dto.VotingCampaignResponseDto;
import dd.projects.demo.voting.dto.VotingOptionRequestDto;
import dd.projects.demo.voting.dto.VotingOptionResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class VotingCampaignMapper {
    
    @Autowired
    protected VoteRepository voteRepository;
    
    @Mapping(target = "options", expression = "java(mapOptions(campaign))")
    @Mapping(target = "totalVotes", expression = "java(calculateTotalVotes(campaign))")
    @Mapping(target = "active", expression = "java(campaign.isActive())")
    @Mapping(target = "hasEnded", expression = "java(campaign.hasEnded())")
    @Mapping(target = "userHasVoted", ignore = true)
    @Mapping(target = "userVotedOptionId", ignore = true)
    public abstract VotingCampaignResponseDto toResponseDto(VotingCampaign campaign);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", constant = "DRAFT")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "votes", ignore = true)
    @Mapping(target = "options", expression = "java(mapOptionsFromRequest(dto.getOptions()))")
    public abstract VotingCampaign toEntity(VotingCampaignRequestDto dto);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "campaign", ignore = true)
    @Mapping(target = "votes", ignore = true)
    public abstract VotingOption toOptionEntity(VotingOptionRequestDto dto);
    
    protected List<VotingOption> mapOptionsFromRequest(List<VotingOptionRequestDto> optionDtos) {
        if (optionDtos == null) return List.of();
        
        return optionDtos.stream()
                .map(this::toOptionEntity)
                .toList();
    }
    
    protected int calculateTotalVotes(VotingCampaign campaign) {
        if (campaign.getOptions() == null) return 0;
        
        return campaign.getOptions().stream()
                .mapToInt(option -> (int) voteRepository.countByOptionId(option.getId()))
                .sum();
    }
    
    protected List<VotingOptionResponseDto> mapOptions(VotingCampaign campaign) {
        if (campaign.getOptions() == null) return List.of();
        
        int totalVotes = calculateTotalVotes(campaign);
        
        return campaign.getOptions().stream()
                .map(option -> {
                    VotingOptionResponseDto dto = new VotingOptionResponseDto();
                    dto.setId(option.getId());
                    dto.setName(option.getName());
                    dto.setDescription(option.getDescription());
                    dto.setDisplayOrder(option.getDisplayOrder());
                    
                    int voteCount = (int) voteRepository.countByOptionId(option.getId());
                    dto.setVoteCount(voteCount);
                    
                    double percentage = totalVotes > 0 ? (double) voteCount / totalVotes * 100 : 0;
                    dto.setPercentage(Math.round(percentage * 100.0) / 100.0);
                    
                    return dto;
                })
                .sorted((a, b) -> Integer.compare(
                    a.getDisplayOrder() != null ? a.getDisplayOrder() : 0,
                    b.getDisplayOrder() != null ? b.getDisplayOrder() : 0
                ))
                .toList();
    }
} 