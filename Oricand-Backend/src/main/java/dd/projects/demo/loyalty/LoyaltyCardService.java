package dd.projects.demo.loyalty;

import dd.projects.demo.loyalty.dto.LoyaltyCardResponseDto;
import dd.projects.demo.loyalty.exception.LoyaltyCardAlreadyExistsException;
import dd.projects.demo.loyalty.exception.LoyaltyCardNotFoundException;
import dd.projects.demo.user.User;
import dd.projects.demo.user.UserRepository;
import dd.projects.demo.user.exception.UserNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoyaltyCardService {

    private final LoyaltyCardRepository loyaltyCardRepository;
    private final UserRepository userRepository;
    private final LoyaltyCardMapper loyaltyCardMapper;

    private static final int LOYALTY_THRESHOLD = 1000;

    @Transactional
    public LoyaltyCardResponseDto createLoyaltyCard(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        if (loyaltyCardRepository.findByUser(user).isPresent()) {
            throw new LoyaltyCardAlreadyExistsException("Loyalty card already exists for user: " + userId);
        }

        LoyaltyCard loyaltyCard = LoyaltyCard.builder()
                .user(user)
                .points(0)
                .status(LoyaltyStatus.REGULAR)
                .build();

        return loyaltyCardMapper.toResponseDto(loyaltyCardRepository.save(loyaltyCard));
    }

    @Transactional
    public void addPoints(Long userId, int points) {
        if (points < 0) {
            throw new IllegalArgumentException("Points cannot be negative");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        LoyaltyCard loyaltyCard = loyaltyCardRepository.findByUser(user)
                .orElseThrow(() -> new LoyaltyCardNotFoundException("Loyalty card not found for user: " + userId));

        loyaltyCard.setPoints(loyaltyCard.getPoints() + points);
        
        if (loyaltyCard.getPoints() >= LOYALTY_THRESHOLD) {
            loyaltyCard.setStatus(LoyaltyStatus.ORICAND_LOYAL);
        }

        loyaltyCardRepository.save(loyaltyCard);
    }

    public LoyaltyCardResponseDto getLoyaltyCard(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        LoyaltyCard loyaltyCard = loyaltyCardRepository.findByUser(user)
                .orElseThrow(() -> new LoyaltyCardNotFoundException("Loyalty card not found for user: " + userId));

        return loyaltyCardMapper.toResponseDto(loyaltyCard);
    }

    public int getDiscountPercentage(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        LoyaltyCard loyaltyCard = loyaltyCardRepository.findByUser(user)
                .orElseThrow(() -> new LoyaltyCardNotFoundException("Loyalty card not found for user: " + userId));

        return loyaltyCard.getStatus().getDiscountPercentage();
    }

    public boolean isEligibleToVote(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        LoyaltyCard loyaltyCard = loyaltyCardRepository.findByUser(user)
                .orElseThrow(() -> new LoyaltyCardNotFoundException("Loyalty card not found for user: " + userId));

        return loyaltyCard.getStatus() == LoyaltyStatus.ORICAND_LOYAL;
    }
} 