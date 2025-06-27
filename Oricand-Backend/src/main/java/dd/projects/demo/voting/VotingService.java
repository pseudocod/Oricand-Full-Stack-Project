package dd.projects.demo.voting;

import dd.projects.demo.loyalty.LoyaltyStatus;
import dd.projects.demo.security.CurrentUserProvider;
import dd.projects.demo.user.User;
import dd.projects.demo.user.UserRepository;
import dd.projects.demo.user.exception.UserNotFoundException;
import dd.projects.demo.voting.dto.VoteRequestDto;
import dd.projects.demo.voting.dto.VotingCampaignRequestDto;
import dd.projects.demo.voting.dto.VotingCampaignResponseDto;
import dd.projects.demo.voting.exception.UserNotEligibleToVoteException;
import dd.projects.demo.voting.exception.VotingCampaignNotFoundException;
import dd.projects.demo.voting.exception.VotingOptionNotFoundException;
import dd.projects.demo.voting.exception.UserAlreadyVotedException;
import dd.projects.demo.voting.exception.VotingCampaignNotActiveException;
import dd.projects.demo.voting.exception.NoActiveCampaignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VotingService {
    
    private final VotingCampaignRepository votingCampaignRepository;
    private final VoteRepository voteRepository;
    private final VotingCampaignMapper votingCampaignMapper;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;
    
    public VotingCampaignResponseDto getCurrentActiveCampaign() {
        VotingCampaign campaign = votingCampaignRepository.findCurrentActiveCampaign(LocalDateTime.now())
                .orElseThrow(() -> new NoActiveCampaignException("No active voting campaign at the moment"));
        
        VotingCampaignResponseDto dto = votingCampaignMapper.toResponseDto(campaign);
        
        Long userId = currentUserProvider.getCurrentUserIdOrNull();
        if (userId != null) {
            User user = getCurrentUserOrThrow();
            setUserVotingInfo(dto, campaign, user);
        }
        
        return dto;
    }
    
    public VotingCampaignResponseDto getCampaignById(Long campaignId) {
        VotingCampaign campaign = votingCampaignRepository.findByIdWithOptionsAndVotes(campaignId)
                .orElseThrow(() -> new VotingCampaignNotFoundException("Voting campaign not found with ID: " + campaignId));
        
        VotingCampaignResponseDto dto = votingCampaignMapper.toResponseDto(campaign);
        
        Long userId = currentUserProvider.getCurrentUserIdOrNull();
        if (userId != null) {
            User user = getCurrentUserOrThrow();
            setUserVotingInfo(dto, campaign, user);
        }
        
        return dto;
    }
    
    @Transactional
    public VotingCampaignResponseDto submitVote(VoteRequestDto voteRequest) {
        User user = getCurrentUserOrThrow();
        
        if (!canUserVote()) {
            throw new UserNotEligibleToVoteException("Only loyal members can participate in voting");
        }
        
        VotingCampaign campaign = votingCampaignRepository.findByIdWithOptionsAndVotes(voteRequest.getCampaignId())
                .orElseThrow(() -> new VotingCampaignNotFoundException("Voting campaign not found"));
        
        if (!campaign.isActive()) {
            throw new VotingCampaignNotActiveException("Voting campaign is not currently active");
        }
        
        if (voteRepository.existsByCampaignAndUser(campaign, user)) {
            throw new UserAlreadyVotedException("User has already voted in this campaign");
        }
        
        VotingOption option = campaign.getOptions().stream()
                .filter(opt -> opt.getId().equals(voteRequest.getOptionId()))
                .findFirst()
                .orElseThrow(() -> new VotingOptionNotFoundException("Voting option not found"));
        
        Vote vote = Vote.builder()
                .campaign(campaign)
                .option(option)
                .user(user)
                .build();
        
        voteRepository.save(vote);
        
        VotingCampaignResponseDto dto = votingCampaignMapper.toResponseDto(campaign);
        setUserVotingInfo(dto, campaign, user);
        return dto;
    }
    
    @Transactional
    public VotingCampaignResponseDto createCampaign(VotingCampaignRequestDto campaignRequest) {
        VotingCampaign campaign = votingCampaignMapper.toEntity(campaignRequest);
        
        if (campaign.getOptions() != null) {
            for (VotingOption option : campaign.getOptions()) {
                option.setCampaign(campaign);
            }
        }
        
        VotingCampaign savedCampaign = votingCampaignRepository.save(campaign);
        return votingCampaignMapper.toResponseDto(savedCampaign);
    }
    
    @Transactional
    public VotingCampaignResponseDto updateCampaignStatus(Long id, VotingStatus newStatus) {
        VotingCampaign campaign = votingCampaignRepository.findById(id)
                .orElseThrow(() -> new VotingCampaignNotFoundException("Voting campaign not found with ID: " + id));
        
        campaign.setStatus(newStatus);
        VotingCampaign savedCampaign = votingCampaignRepository.save(campaign);
        return votingCampaignMapper.toResponseDto(savedCampaign);
    }

    public List<VotingCampaignResponseDto> getAllCampaigns() {
        return votingCampaignRepository.findAll().stream()
                .map(votingCampaignMapper::toResponseDto)
                .toList();
    }

    public boolean canUserVote() {
        User user = getCurrentUserOrThrow();
        return user.getLoyaltyCard() != null && 
               user.getLoyaltyCard().getStatus() == LoyaltyStatus.ORICAND_LOYAL;
    }
    
    private User getCurrentUserOrThrow() {
        Long userId = currentUserProvider.getCurrentUserId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID " + userId));
    }
    
    private void setUserVotingInfo(VotingCampaignResponseDto dto, VotingCampaign campaign, User user) {
        voteRepository.findByCampaignAndUser(campaign, user).ifPresentOrElse(
            vote -> {
                dto.setUserHasVoted(true);
                dto.setUserVotedOptionId(vote.getOption().getId());
            },
            () -> dto.setUserHasVoted(false)
        );
    }
}
