package dd.projects.demo.loyalty;

import dd.projects.demo.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "loyalty_cards")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoyaltyCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private Integer points;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoyaltyStatus status;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }

    public void addPoints(Integer pointsToAdd) {
        this.points += pointsToAdd;
        updateStatus();
    }

    private void updateStatus() {
        if (this.points >= 1000) {
            this.status = LoyaltyStatus.ORICAND_LOYAL;
        }
    }
} 