package dd.projects.demo.voting;

import dd.projects.demo.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    
    boolean existsByCampaignAndUser(VotingCampaign campaign, User user);
    
    Optional<Vote> findByCampaignAndUser(VotingCampaign campaign, User user);
    
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.campaign.id = :campaignId")
    long countByCampaignId(@Param("campaignId") Long campaignId);
    
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.option.id = :optionId")
    long countByOptionId(@Param("optionId") Long optionId);
} 