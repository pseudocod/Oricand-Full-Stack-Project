package dd.projects.demo.loyalty;

import dd.projects.demo.loyalty.dto.LoyaltyCardResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface LoyaltyCardMapper {
    
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "discountPercentage", source = "status", qualifiedByName = "getDiscountPercentage")
    @Mapping(target = "pointsToNextStatus", source = "points", qualifiedByName = "calculatePointsToNextStatus")
    LoyaltyCardResponseDto toResponseDto(LoyaltyCard loyaltyCard);

    @Named("getDiscountPercentage")
    default int getDiscountPercentage(LoyaltyStatus status) {
        return status.getDiscountPercentage();
    }

    @Named("calculatePointsToNextStatus")
    default Integer calculatePointsToNextStatus(Integer currentPoints) {
        if (currentPoints >= 1000) {
            return 0;
        } else {
            return 1000 - currentPoints;
        }
    }
} 