package dd.projects.demo.loyalty.dto;

import dd.projects.demo.loyalty.LoyaltyStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoyaltyCardResponseDto {
    private Long id;
    private Long userId;
    private Integer points;
    private LoyaltyStatus status;
    private LocalDateTime lastUpdated;
    private Integer discountPercentage;
    private Integer pointsToNextStatus;
} 