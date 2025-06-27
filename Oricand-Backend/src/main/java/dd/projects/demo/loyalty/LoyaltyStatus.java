package dd.projects.demo.loyalty;

public enum LoyaltyStatus {
    REGULAR(0),
    ORICAND_LOYAL(15);

    private final int discountPercentage;

    LoyaltyStatus(int discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public int getDiscountPercentage() {
        return discountPercentage;
    }
} 