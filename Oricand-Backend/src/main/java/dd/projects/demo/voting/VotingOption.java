package dd.projects.demo.voting;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "voting_options")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VotingOption {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    private VotingCampaign campaign;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "display_order")
    private Integer displayOrder;
    
    @OneToMany(mappedBy = "option", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vote> votes;
    
    public int getVoteCount() {
        return votes != null ? votes.size() : 0;
    }
} 