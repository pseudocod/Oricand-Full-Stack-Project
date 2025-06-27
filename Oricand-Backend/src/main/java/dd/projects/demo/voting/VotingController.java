package dd.projects.demo.voting;

import dd.projects.demo.voting.dto.VoteRequestDto;
import dd.projects.demo.voting.dto.VotingCampaignRequestDto;
import dd.projects.demo.voting.dto.VotingCampaignResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voting")
@RequiredArgsConstructor
public class VotingController {
    
    private final VotingService votingService;
    
    @GetMapping("/current")
    public ResponseEntity<VotingCampaignResponseDto> getCurrentVotingCampaign() {
        return ResponseEntity.ok(votingService.getCurrentActiveCampaign());
    }
    
    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<VotingCampaignResponseDto> getCampaignById(@PathVariable Long campaignId) {
        return ResponseEntity.ok(votingService.getCampaignById(campaignId));
    }
    
    @PostMapping("/vote")
    public ResponseEntity<VotingCampaignResponseDto> submitVote(@RequestBody VoteRequestDto voteRequest) {
        return ResponseEntity.ok(votingService.submitVote(voteRequest));
    }
    
    @GetMapping("/eligibility")
    public ResponseEntity<Boolean> checkVotingEligibility() {
        return ResponseEntity.ok(votingService.canUserVote());
    }
    
    @GetMapping("/admin/campaigns")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<VotingCampaignResponseDto>> getAllCampaigns() {
        return ResponseEntity.ok(votingService.getAllCampaigns());
    }
    
    @PostMapping("/admin/campaigns")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VotingCampaignResponseDto> createCampaign(@RequestBody VotingCampaignRequestDto campaignRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(votingService.createCampaign(campaignRequest));
    }
    
    @PutMapping("/admin/campaigns/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<VotingCampaignResponseDto> updateCampaignStatus(@PathVariable Long id, @RequestBody VotingStatus status) {
        return ResponseEntity.ok(votingService.updateCampaignStatus(id, status));
    }
} 