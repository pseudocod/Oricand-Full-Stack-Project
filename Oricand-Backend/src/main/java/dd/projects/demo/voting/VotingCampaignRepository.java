package dd.projects.demo.voting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VotingCampaignRepository extends JpaRepository<VotingCampaign, Long> {
    
    List<VotingCampaign> findByStatusOrderByCreatedAtDesc(VotingStatus status);
    
    @Query("SELECT vc FROM VotingCampaign vc WHERE vc.status = 'ACTIVE' AND vc.startDate <= :now AND vc.endDate > :now")
    List<VotingCampaign> findActiveCampaigns(@Param("now") LocalDateTime now);
    
    @Query("SELECT vc FROM VotingCampaign vc WHERE vc.status = 'ACTIVE' AND vc.startDate <= :now AND vc.endDate > :now ORDER BY vc.createdAt DESC")
    Optional<VotingCampaign> findCurrentActiveCampaign(@Param("now") LocalDateTime now);
    
    @Query("SELECT vc FROM VotingCampaign vc LEFT JOIN FETCH vc.options WHERE vc.id = :id")
    Optional<VotingCampaign> findByIdWithOptionsAndVotes(@Param("id") Long id);
} 