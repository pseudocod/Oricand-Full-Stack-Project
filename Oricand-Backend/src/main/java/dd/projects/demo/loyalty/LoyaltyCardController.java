package dd.projects.demo.loyalty;

import dd.projects.demo.loyalty.dto.LoyaltyCardResponseDto;
import dd.projects.demo.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loyalty")
@RequiredArgsConstructor
public class LoyaltyCardController {

    private final LoyaltyCardService loyaltyCardService;
    private final CurrentUserProvider currentUserProvider;

    @GetMapping("/my-card")
    public ResponseEntity<LoyaltyCardResponseDto> getMyLoyaltyCard() {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(loyaltyCardService.getLoyaltyCard(userId));
    }

    @GetMapping("/discount")
    public ResponseEntity<Integer> getMyDiscount() {
        Long userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(loyaltyCardService.getDiscountPercentage(userId));
    }

    @GetMapping("/can-vote")
    public ResponseEntity<Boolean> canVoteOnDrops() {
        Long userId = currentUserProvider.getCurrentUserId();
        boolean canVote = loyaltyCardService.isEligibleToVote(userId);
        return ResponseEntity.ok(canVote);
    }
} 